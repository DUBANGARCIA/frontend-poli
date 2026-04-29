export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  featured: boolean;
}

export interface ProductBenefit {
  icon: string;
  title: string;
  text: string;
}

export interface ProductDetail {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  featured: boolean;
  reviews: number;
  rating: number;
  colors: string[];
  sizes: string[];
  benefits: ProductBenefit[];
}
