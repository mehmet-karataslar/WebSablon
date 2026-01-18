// Property types - Placeholder
export interface Property {
    id: string;
    title: string;
    price: number;
    type: 'sale' | 'rent';
    propertyType: 'apartment' | 'house' | 'office' | 'land';
    area: number;
    rooms: number;
    location: string;
    images: string[];
}
