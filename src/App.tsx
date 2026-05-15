/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Utensils, Beer, Star, ChevronRight, MapPin, Phone, Clock, 
  Instagram, Facebook, Sandwich, Flame, Beef, ShoppingCart, 
  Plus, Minus, Trash2, X, Send, User, Home, Store, MessageSquare 
} from 'lucide-react';
import { MENU_ITEMS, CATEGORIES } from './constants';
import { MenuItem } from './types';

interface CartItem extends MenuItem {
  quantity: number;
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('tacos');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);
  
  // Checkout Form State
  const [userName, setUserName] = useState('');
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const handleSendOrder = () => {
    if (cart.length === 0 || !userName || (orderType === 'delivery' && !address)) return;

    const phoneNumber = '529681155812';
    
    let orderDetails = cart.map(item => {
      const categoryMap: Record<string, string> = {
        'tacos': 'Taco',
        'tortas': 'Torta',
        'quesatacos': 'Quesataco',
        'gringas': 'Gringa',
        'bebidas': 'Bebida',
        'carnes': 'Carne'
      };
      const category = categoryMap[item.category] || item.category;
      return `- ${item.quantity}x ${category} de ${item.name} ($${item.price * item.quantity})`;
    }).join('\n');
    
    const message = encodeURIComponent(
      `¡Hola Taqueria Chente!\n\n` +
      `*NUEVO PEDIDO*\n` +
      `--------------------------\n` +
      `*Cliente:* ${userName}\n` +
      `*Tipo:* ${orderType === 'delivery' ? `Domicilio` : `Pasar a buscar`}\n` +
      (orderType === 'delivery' ? `*Dirección:* ${address}\n` : '') +
      `--------------------------\n` +
      `*DETALLE DEL PEDIDO:*\n` +
      `${orderDetails}\n` +
      `--------------------------\n` +
      `*TOTAL:* $${cartTotal}\n` +
      (instructions ? `\n*Instrucciones:* ${instructions}` : '') +
      `\n\n¿Me podrían confirmar el pedido? ¡Gracias!`
    );

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Taco': return <Utensils className="w-5 h-5" />;
      case 'Sandwich': return <Sandwich className="w-5 h-5" />;
      case 'Star': return <Star className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Beer': return <Beer className="w-5 h-5" />;
      case 'Beef': return <Beef className="w-5 h-5" />;
      default: return <Utensils className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#2D2926] font-sans selection:bg-[#E31837] selection:text-white">
      {/* Hero Section */}
      <header className="relative h-[45vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=2000&auto=format&fit=crop"
            alt="Taqueria Chente Background"
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-[#FDFCF8] uppercase italic drop-shadow-2xl">
            Taqueria Chente
          </h1>
          <p className="text-[#FDFCF8] text-lg md:text-2xl font-medium tracking-widest uppercase mt-4 opacity-90 bg-[#E31837]/80 px-6 py-2 inline-block rounded-full">
            El Sabor de la Tradición en cada Taco
          </p>
          <div className="mt-6">
            <a 
              href="https://maps.app.goo.gl/dA1tPsEh5juSFXN9A" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
            >
              <MapPin className="w-4 h-4" /> Rancheria la estancia, km3
            </a>
          </div>
        </motion.div>
      </header>

      {/* Navigation / Categories */}
      <nav className="sticky top-0 z-50 bg-[#FDFCF8]/80 backdrop-blur-md border-b border-[#2D2926]/10 py-4">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center overflow-x-auto no-scrollbar gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 whitespace-nowrap ${
                activeCategory === cat.id 
                ? 'bg-[#E31837] text-white shadow-lg shadow-[#E31837]/20' 
                : 'text-[#2D2926]/60 hover:text-[#2D2926] hover:bg-[#2D2926]/5'
              }`}
            >
              {getIcon(cat.icon)}
              <span className="font-bold uppercase text-xs tracking-wider">{cat.name}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Menu Content */}
      <main className="max-w-5xl mx-auto px-4 py-12 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} onAdd={() => addToCart(item)} />
            ))}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.button
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 20 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-8 right-8 z-[60] bg-[#E31837] text-white p-4 rounded-full shadow-2xl flex items-center gap-3 hover:scale-110 transition-transform active:scale-95"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-white text-[#E31837] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#E31837]">
                {cartCount}
              </span>
            </div>
            <span className="font-bold uppercase tracking-widest text-sm pr-2">Ver Pedido</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-[#2D2926]/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative bg-[#FDFCF8] w-full max-w-md h-full shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-[#2D2926]/10 flex justify-between items-center bg-white">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">Tu Pedido</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-[#2D2926]/5 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                    <ShoppingCart className="w-16 h-16 mb-4" />
                    <p className="font-bold uppercase tracking-widest text-sm">Tu carrito está vacío</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-[#2D2926]/5 shadow-sm">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#2D2926]/5">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold uppercase italic text-sm">{item.name}</h3>
                        <p className="text-[#E31837] font-mono font-bold text-sm">${item.price * item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-[#2D2926]/5 rounded-full px-3 py-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-[#E31837] transition-colors">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-mono font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-[#E31837] transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-[#2D2926]/20 hover:text-[#E31837] transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-[#2D2926]/10 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold uppercase tracking-widest text-sm opacity-60">Total</span>
                    <span className="text-3xl font-mono font-bold text-[#E31837]">${cartTotal}</span>
                  </div>
                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full bg-[#E31837] text-white py-4 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#C4152F] transition-colors shadow-lg shadow-[#E31837]/20"
                  >
                    Continuar al Pago <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute inset-0 bg-[#2D2926]/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-[#2D2926]/5 flex justify-between items-center">
                <h2 className="text-3xl font-black uppercase italic tracking-tighter">Confirmar Pedido</h2>
                <button onClick={() => setIsCheckoutOpen(false)} className="p-2 hover:bg-[#2D2926]/5 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto space-y-8">
                {/* User Info */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#2D2926]/40">
                    <User className="w-4 h-4" /> ¿Quién ordena?
                  </label>
                  <input 
                    type="text" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Tu nombre completo"
                    className="w-full bg-[#2D2926]/5 border-none rounded-2xl p-4 font-bold placeholder:text-[#2D2926]/20 focus:ring-2 focus:ring-[#E31837] transition-all"
                  />
                </div>

                {/* Order Type */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#2D2926]/40">
                    <MapPin className="w-4 h-4" /> Método de entrega
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setOrderType('delivery')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                        orderType === 'delivery' 
                        ? 'border-[#E31837] bg-[#E31837]/5 text-[#E31837]' 
                        : 'border-[#2D2926]/5 bg-[#2D2926]/5 text-[#2D2926]/40'
                      }`}
                    >
                      <Home className="w-6 h-6" />
                      <span className="font-bold uppercase text-[10px] tracking-widest">A Domicilio</span>
                    </button>
                    <button 
                      onClick={() => setOrderType('pickup')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                        orderType === 'pickup' 
                        ? 'border-[#E31837] bg-[#E31837]/5 text-[#E31837]' 
                        : 'border-[#2D2926]/5 bg-[#2D2926]/5 text-[#2D2926]/40'
                      }`}
                    >
                      <Store className="w-6 h-6" />
                      <span className="font-bold uppercase text-[10px] tracking-widest">Pasar a buscar</span>
                    </button>
                  </div>
                </div>

                {/* Address (Conditional) */}
                {orderType === 'delivery' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4"
                  >
                    <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#2D2926]/40">
                      <Home className="w-4 h-4" /> Dirección de entrega
                    </label>
                    <textarea 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Calle, número, colonia y referencias..."
                      rows={3}
                      className="w-full bg-[#2D2926]/5 border-none rounded-2xl p-4 font-bold placeholder:text-[#2D2926]/20 focus:ring-2 focus:ring-[#E31837] transition-all resize-none"
                    />
                  </motion.div>
                )}

                {/* Instructions */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#2D2926]/40">
                    <MessageSquare className="w-4 h-4" /> Instrucciones adicionales
                  </label>
                  <textarea 
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Ej: Sin cebolla, mucha salsa, cambio de $500..."
                    rows={2}
                    className="w-full bg-[#2D2926]/5 border-none rounded-2xl p-4 font-bold placeholder:text-[#2D2926]/20 focus:ring-2 focus:ring-[#E31837] transition-all resize-none"
                  />
                </div>

                {/* Order Summary Mini */}
                <div className="bg-[#2D2926] text-white p-6 rounded-3xl space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest opacity-40">Resumen</h4>
                  <div className="space-y-2">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="opacity-80">{item.quantity}x {item.name}</span>
                        <span className="font-mono font-bold">${item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="font-bold uppercase tracking-widest text-xs">Total a pagar</span>
                    <span className="text-2xl font-mono font-bold text-[#E31837]">${cartTotal}</span>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-[#FDFCF8] border-t border-[#2D2926]/5">
                <button 
                  onClick={handleSendOrder}
                  disabled={!userName || (orderType === 'delivery' && !address)}
                  className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-all shadow-xl shadow-[#25D366]/20 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" /> Enviar Pedido por WhatsApp 📲
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Services Banner */}
      <section className="bg-[#E31837] text-white py-8 px-4 text-center">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black uppercase italic tracking-tighter">Pedidos a Domicilio</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black uppercase italic tracking-tighter">Encargos</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black uppercase italic tracking-tighter">Transferencias</span>
          </div>
        </div>
      </section>

      {/* Welcome Modal */}
      <AnimatePresence>
        {isWelcomeOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#2D2926]/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 40 }}
              className="relative bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl p-10 text-center space-y-8"
            >
              <div className="w-24 h-24 bg-[#E31837] rounded-full flex items-center justify-center mx-auto shadow-xl shadow-[#E31837]/30">
                <Flame className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
                  ¡Bienvenido a<br />
                  <span className="text-[#E31837]">Taqueria Chente!</span>
                </h2>
                <p className="text-sm font-bold uppercase tracking-widest text-[#2D2926]/40">
                  El Sabor de la Tradición
                </p>
              </div>
              <p className="text-[#2D2926]/60 font-medium leading-relaxed">
                Estamos listos para servirte los mejores tacos, tortas y gringas de la región. 🌮🔥
              </p>
              <button 
                onClick={() => setIsWelcomeOpen(false)}
                className="w-full bg-[#E31837] text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#C4152F] transition-all shadow-xl shadow-[#E31837]/20 flex items-center justify-center gap-3"
              >
                Ver el Menú <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer Info */}
      <footer className="bg-[#2D2926] text-[#FDFCF8] py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-tighter italic text-[#E31837]">Ubicación</h3>
            <div className="flex items-start gap-3 text-sm opacity-80">
              <MapPin className="w-5 h-5 shrink-0 text-[#E31837]" />
              <div>
                <p>Rancheria la estancia, km3, antes de materiales ramon</p>
                <a 
                  href="https://maps.app.goo.gl/dA1tPsEh5juSFXN9A" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-[#E31837] font-bold hover:underline"
                >
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-tighter italic text-[#E31837]">Horario</h3>
            <div className="flex items-start gap-3 text-sm opacity-80">
              <Clock className="w-5 h-5 shrink-0 text-[#E31837]" />
              <p>Abierto todos los días<br />¡Te esperamos!</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-tighter italic text-[#E31837]">Contacto</h3>
            <div className="flex items-start gap-3 text-sm opacity-80">
              <Phone className="w-5 h-5 shrink-0 text-[#E31837]" />
              <p className="text-lg font-bold">968 115 5812</p>
            </div>
            <div className="flex gap-4 pt-2">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-[#E31837] transition-colors" />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-[#E31837] transition-colors" />
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-16 pt-8 border-t border-white/10 text-center opacity-40 text-xs uppercase tracking-widest">
          © 2026 Taqueria Chente. El Sabor de la Tradición.
        </div>
      </footer>
    </div>
  );
}

interface MenuItemCardProps {
  item: MenuItem;
  onAdd: () => void;
  key?: React.Key;
}

function MenuItemCard({ item, onAdd }: MenuItemCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group relative flex flex-col p-4 rounded-2xl bg-white border border-[#2D2926]/5 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="w-full h-48 rounded-xl overflow-hidden bg-[#2D2926]/5 mb-4">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-black uppercase tracking-tight text-xl leading-tight italic">
              {item.name}
            </h3>
            <span className="font-mono font-bold text-[#E31837] text-xl">
              ${item.price}
            </span>
          </div>
          <p className="text-sm text-[#2D2926]/60 leading-relaxed">
            {item.description}
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 bg-[#E31837] text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#C4152F] transition-all shadow-lg shadow-[#E31837]/10"
          >
            <Plus className="w-3 h-3" /> Agregar
          </button>
        </div>
      </div>
    </motion.div>
  );
}
