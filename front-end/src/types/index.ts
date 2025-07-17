export interface User {
  id: string | number;
  email: string;
  password?: string;
  role: 'client' | 'professionnel' | 'admin' | 'business'; // ← vérifie ici aussi
}

export interface Client extends User {
  firstName: string;
  lastName: string;
  phone?: string; // facultatif
  city?: string;  // facultatif
}

export interface Business extends User {
  name: string;
  sector: string;
  location: {
    city: string;
    district: string;
  };
  phone: string;
  description: string;
  yearsOfExperience: number;
  featured: boolean;
  rating: number;
  projects: Project[];
  reviews: Review[];
}

export interface Project {
  id: string;
  businessId: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}


export interface Review {
  id: string;
  businessId: string;
  clientId: string;
  clientName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface QuoteRequest {
  id: number;  // ici number car c’est souvent un auto-increment
  clientId: number;
  businessId: number;
  description: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCity?: string;
  status: 'pending' | 'responded' | 'refused' | 'completed' | 'cancelled';
  createdAt: string;
}
export interface Realisation {
  id: number;
  business_id: number;
  filename: string;
  description: string;
  created_at: string;
}
