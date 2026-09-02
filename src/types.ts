export interface BookTheme {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ResonanceItem {
  id: number;
  text: string;
}

export interface BookFormat {
  id: string;
  name: string;
  badge?: string;
  description: string;
  features: string[];
}

export interface RetailerOption {
  name: string;
  type: string;
  badge: string;
  url: string;
  logoText: string;
}

export interface PreOrderFormData {
  fullName: string;
  email: string;
  preferredFormats: string[];
  city?: string;
  country?: string;
  note?: string;
}
