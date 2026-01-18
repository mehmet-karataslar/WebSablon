// BackBlaze B2 Storage Service
// Note: For client-side uploads, you should use pre-signed URLs from your API

interface UploadOptions {
    fileName: string;
    contentType: string;
    folder?: string;
}

interface UploadResult {
    url: string;
    fileId: string;
    fileName: string;
}

// Environment variables (server-side only)
const B2_KEY_ID = process.env.B2_APPLICATION_KEY_ID;
const B2_APP_KEY = process.env.B2_APPLICATION_KEY;
const B2_BUCKET_NAME = process.env.B2_BUCKET_NAME;
const B2_ENDPOINT = process.env.B2_BUCKET_ENDPOINT;

class BackBlazeStorage {
    private authorized = false;
    private authToken = '';
    private apiUrl = '';
    private downloadUrl = '';

    async authorize(): Promise<void> {
        if (this.authorized) return;

        const credentials = btoa(`${B2_KEY_ID}:${B2_APP_KEY}`);

        const response = await fetch('https://api.backblazeb2.com/b2api/v2/b2_authorize_account', {
            headers: {
                Authorization: `Basic ${credentials}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to authorize with BackBlaze B2');
        }

        const data = await response.json();
        this.authToken = data.authorizationToken;
        this.apiUrl = data.apiUrl;
        this.downloadUrl = data.downloadUrl;
        this.authorized = true;
    }

    async getUploadUrl(): Promise<{ uploadUrl: string; authToken: string }> {
        await this.authorize();

        // First, get bucket ID
        const bucketsResponse = await fetch(`${this.apiUrl}/b2api/v2/b2_list_buckets`, {
            method: 'POST',
            headers: {
                Authorization: this.authToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accountId: B2_KEY_ID?.split(':')[0],
                bucketName: B2_BUCKET_NAME,
            }),
        });

        const bucketsData = await bucketsResponse.json();
        const bucketId = bucketsData.buckets?.[0]?.bucketId;

        if (!bucketId) {
            throw new Error('Bucket not found');
        }

        // Get upload URL
        const uploadUrlResponse = await fetch(`${this.apiUrl}/b2api/v2/b2_get_upload_url`, {
            method: 'POST',
            headers: {
                Authorization: this.authToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bucketId }),
        });

        const uploadData = await uploadUrlResponse.json();

        return {
            uploadUrl: uploadData.uploadUrl,
            authToken: uploadData.authorizationToken,
        };
    }

    async upload(file: Blob | ArrayBuffer, options: UploadOptions): Promise<UploadResult> {
        const { uploadUrl, authToken } = await this.getUploadUrl();

        const filePath = options.folder
            ? `${options.folder}/${options.fileName}`
            : options.fileName;

        const response = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                Authorization: authToken,
                'Content-Type': options.contentType,
                'X-Bz-File-Name': encodeURIComponent(filePath),
                'X-Bz-Content-Sha1': 'do_not_verify',
            },
            body: file,
        });

        if (!response.ok) {
            throw new Error('Failed to upload file to BackBlaze B2');
        }

        const data = await response.json();

        return {
            url: `${B2_ENDPOINT}/${filePath}`,
            fileId: data.fileId,
            fileName: data.fileName,
        };
    }

    getPublicUrl(filePath: string): string {
        return `${B2_ENDPOINT}/${filePath}`;
    }
}

export const backblazeStorage = new BackBlazeStorage();
