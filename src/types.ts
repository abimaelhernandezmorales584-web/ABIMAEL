export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'tacos' | 'tortas' | 'quesatacos' | 'gringas' | 'bebidas' | 'carnes';
  image?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
}
