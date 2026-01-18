// Supabase Database Types
// Run `npx supabase gen types typescript` to generate from your schema

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

// Placeholder database types - replace with generated types
export interface Database {
    public: {
        Tables: {
            // Example table structure
            items: {
                Row: {
                    id: string;
                    created_at: string;
                    updated_at: string;
                    title: string;
                    description: string | null;
                    image_url: string | null;
                    price: number | null;
                    category: string | null;
                    is_active: boolean;
                };
                Insert: {
                    id?: string;
                    created_at?: string;
                    updated_at?: string;
                    title: string;
                    description?: string | null;
                    image_url?: string | null;
                    price?: number | null;
                    category?: string | null;
                    is_active?: boolean;
                };
                Update: {
                    id?: string;
                    created_at?: string;
                    updated_at?: string;
                    title?: string;
                    description?: string | null;
                    image_url?: string | null;
                    price?: number | null;
                    category?: string | null;
                    is_active?: boolean;
                };
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
    };
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Row'];

export type InsertTables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Insert'];

export type UpdateTables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Update'];
