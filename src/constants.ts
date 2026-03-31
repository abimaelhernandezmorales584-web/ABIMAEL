import { MenuItem, MenuCategory } from './types';

export const CATEGORIES: MenuCategory[] = [
  { id: 'tacos', name: 'Tacos', icon: 'Taco' },
  { id: 'tortas', name: 'Tortas', icon: 'Sandwich' },
  { id: 'quesatacos', name: 'Quesatacos', icon: 'Star' },
  { id: 'gringas', name: 'Gringas', icon: 'Flame' },
  { id: 'bebidas', name: 'Bebidas', icon: 'Beer' },
  { id: 'carnes', name: 'Carnes', icon: 'Beef' },
];

export const MENU_ITEMS: MenuItem[] = [
  // Tacos
  { id: 't1', name: 'Asada', description: 'Taco de asada tradicional.', price: 10, category: 'tacos', image: '/tacos.jpg' },
  { id: 't2', name: 'Cuerito', description: 'Taco de cuerito tierno.', price: 10, category: 'tacos', image: '/cuerito_longaniza.jpg' },
  { id: 't3', name: 'Longaniza', description: 'Taco de longaniza bien doradita.', price: 10, category: 'tacos', image: '/cuerito_longaniza.jpg' },
  { id: 't4', name: 'Campechano', description: 'Taco campechano (mezcla de carnes).', price: 10, category: 'tacos', image: '/tacos.jpg' },
  { id: 't5', name: 'Cabeza', description: 'Taco de cabeza.', price: 10, category: 'tacos', image: '/tacos.jpg' },
  { id: 't6', name: 'Hubre', description: 'Taco de hubre.', price: 10, category: 'tacos', image: '/tacos.jpg' },
  { id: 't7', name: 'Tripa', description: 'Taco de tripa bien frita.', price: 15, category: 'tacos', image: '/tacos.jpg' },

  // Tortas
  { id: 'to1', name: 'Asada', description: 'Torta de asada con todos los ingredientes.', price: 18, category: 'tortas', image: '/tortas.jpg' },
  { id: 'to2', name: 'Cuerito', description: 'Torta de cuerito.', price: 18, category: 'tortas', image: '/tortas.jpg' },
  { id: 'to3', name: 'Longaniza', description: 'Torta de longaniza.', price: 18, category: 'tortas', image: '/tortas.jpg' },
  { id: 'to4', name: 'Campechano', description: 'Torta campechana.', price: 18, category: 'tortas', image: '/tortas.jpg' },
  { id: 'to5', name: 'Especiales', description: 'Lleva jamón, mucha carne y queso.', price: 25, category: 'tortas', image: '/tortas.jpg' },

  // Quesatacos
  { id: 'q1', name: 'Asada', description: 'Quesataco de asada.', price: 20, category: 'quesatacos', image: '/quesatacos.jpg' },
  { id: 'q2', name: 'Cuerito', description: 'Quesataco de cuerito.', price: 20, category: 'quesatacos', image: '/quesatacos.jpg' },
  { id: 'q3', name: 'Longaniza', description: 'Quesataco de longaniza.', price: 20, category: 'quesatacos', image: '/quesatacos.jpg' },
  { id: 'q4', name: 'Campechano', description: 'Quesataco campechano.', price: 20, category: 'quesatacos', image: '/quesatacos.jpg' },
  { id: 'q5', name: 'Especiales', description: 'Quesataco especial.', price: 22, category: 'quesatacos', image: '/quesatacos.jpg' },

  // Gringas
  { id: 'g1', name: 'Asada', description: 'Gringa de asada.', price: 30, category: 'gringas', image: '/gringa.jpg' },
  { id: 'g2', name: 'Cuerito', description: 'Gringa de cuerito.', price: 30, category: 'gringas', image: '/gringa.jpg' },
  { id: 'g3', name: 'Longaniza', description: 'Gringa de longaniza.', price: 30, category: 'gringas', image: '/gringa.jpg' },
  { id: 'g4', name: 'Campechano', description: 'Gringa campechana.', price: 30, category: 'gringas', image: '/gringa.jpg' },

  // Bebidas
  { id: 'b1', name: 'Jamaica (600ml)', description: 'Agua natural de Jamaica de 600 mililitros.', price: 15, category: 'bebidas', image: '/Aguas-Frescas-Jamaica.png' },
  { id: 'b2', name: 'Horchata', description: 'Agua natural de Horchata.', price: 15, category: 'bebidas', image: '/horchata.png' },
  { id: 'b3', name: 'Refresco (600ml)', description: 'Cualquier sabor.', price: 28, category: 'bebidas', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80' },
  { id: 'b4', name: 'Refresco (3L)', description: 'Cualquier sabor.', price: 60, category: 'bebidas', image: '/coca.jpg' },

  // Carnes
  { id: 'c1', name: 'Un Kilo', description: 'Venta de carne por kilo.', price: 350, category: 'carnes', image: '/carne_kilo.jpg' },
  { id: 'c2', name: 'Medio Kilo', description: 'Venta de carne por medio kilo.', price: 175, category: 'carnes', image: '/carne_kilo.jpg' },
  { id: 'c3', name: 'Un Cuarto', description: 'Venta de carne por un cuarto.', price: 87, category: 'carnes', image: '/carne_kilo.jpg' },
];
