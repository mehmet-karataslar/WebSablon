// Vehicle types for automotive sector module
export interface Vehicle {
    id: string;
    created_at: string;
    updated_at: string;
    title: string;
    description: string | null;
    brand: string;
    model: string;
    year: number;
    price: number;
    currency: string;
    mileage: number;
    fuel_type: 'petrol' | 'diesel' | 'electric' | 'hybrid' | 'lpg';
    transmission: 'manual' | 'automatic';
    body_type: 'sedan' | 'hatchback' | 'suv' | 'coupe' | 'wagon' | 'van' | 'pickup';
    color: string;
    engine_size: number | null;
    horsepower: number | null;
    images: string[];
    thumbnail: string | null;
    is_featured: boolean;
    is_sold: boolean;
    location: string | null;
}

export interface VehicleFilter {
    brand?: string;
    model?: string;
    minYear?: number;
    maxYear?: number;
    minPrice?: number;
    maxPrice?: number;
    fuelType?: Vehicle['fuel_type'];
    transmission?: Vehicle['transmission'];
    bodyType?: Vehicle['body_type'];
}

export interface VehicleListResponse {
    data: Vehicle[];
    total: number;
    page: number;
    pageSize: number;
}
