/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SignInPage } from './SignInPage';
import { 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Star, 
  ChevronDown, 
  Menu, 
  X, 
  Building2, 
  Home, 
  PenTool, 
  ShieldCheck,
  Clock,
  Award,
  Instagram,
  Linkedin,
  Facebook
} from 'lucide-react';

// ========================================================
// 🛑 YOUR FORMSPREE LINK IS PLACED HERE!
// ========================================================
const FORMSPREE_URL = "https://formspree.io/f/xqenyjdy";


const SERVICES = [
  {
    title: "Artisan Boulangerie",
    description: "Traditional French breads baked fresh throughout the day using natural leaven and premium flour.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
    fallback: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
    icon: <Home className="w-6 h-6" />
  },
  {
    title: "Exquisite Patisserie",
    description: "Handcrafted cakes, tarts, and pastries that bring the authentic taste of Paris to Victoria Island.",
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800",
    fallback: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800",
    icon: <Building2 className="w-6 h-6" />
  },
  {
    title: "Luxury Dining",
    description: "A sophisticated culinary journey featuring French classics and contemporary global cuisine.",
    image: "https://images.unsplash.com/photo-1550966841-3ee7adac1af3?auto=format&fit=crop&q=80&w=800",
    fallback: "https://images.unsplash.com/photo-1550966841-3ee7adac1af3?auto=format&fit=crop&q=80&w=800",
    icon: <PenTool className="w-6 h-6" />
  }
];

const REVIEWS = [
  {
    name: "Tunde Alabi",
    comment: "The best croissants in Lagos, hands down. The ambiance at the Bishop Aboyade Cole location is exactly what Victoria Island needed.",
    role: "Regular Guest",
    rating: 5
  },
  {
    name: "Sarah Johnson",
    comment: "A bit of Paris in Lagos indeed! The private dining room was perfect for our corporate brunch. Impeccable service.",
    role: "Food Critic",
    rating: 5
  },
  {
    name: "Emeka Okafor",
    comment: "The pastry selection is unmatched. You can taste the quality of the ingredients in every bite of their sourdough.",
    role: "Local Resident",
    rating: 5
  }
];

const FAQS = [
  {
    question: "Do you offer private dining for corporate events?",
    answer: "Yes, our Victoria Island location features a sophisticated private dining room perfect for business meetings, brunches, and celebrations."
  },
  {
    question: "Are your breads baked fresh daily?",
    answer: "Absolutely. All our breads and pastries are artisanally crafted and baked fresh on-site every single day."
  },
  {
    question: "Do you offer delivery across Lagos?",
    answer: "Yes, you can place orders through our delivery partners or contact us directly for bulk orders and catering."
  }
];

function Nav({ onShowSignIn }: { onShowSignIn: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-brand-cream/90 backdrop-blur-md py-4 border-b border-brand-dark/10' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-dark flex items-center justify-center rounded-sm">
            <span className="text-brand-cream font-bold text-xl uppercase tracking-tighter">EK</span>
          </div>
          <span className={`text-xl font-serif tracking-widest uppercase transition-colors ${scrolled ? 'text-brand-dark' : 'text-brand-dark'}`}>
            Eric Kayser
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10 font-medium text-[10px] uppercase tracking-widest">
          <a href="#services" className="hover:text-brand-gold transition-colors">The Menu</a>
          <a href="#about" className="hover:text-brand-gold transition-colors">Ambiance</a>
          <a href="#reviews" className="hover:text-brand-gold transition-colors">Guestbook</a>
          <button 
            onClick={onShowSignIn}
            className="hover:text-brand-gold transition-colors border-l border-brand-dark/10 pl-10"
          >
            Member Login
          </button>
          <a href="#contact" className="bg-brand-dark text-brand-cream px-6 py-3 rounded-full hover:bg-brand-gold transition-all">Reserve a Table</a>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-cream border-b border-brand-dark/10 p-8 flex flex-col gap-6 md:hidden"
          >
            <a href="#services" onClick={() => setIsOpen(false)} className="text-lg font-serif">Services</a>
            <a href="#about" onClick={() => setIsOpen(false)} className="text-lg font-serif">Why Us</a>
            <a href="#reviews" onClick={() => setIsOpen(false)} className="text-lg font-serif">Testimonials</a>
            <button onClick={() => { setIsOpen(false); onShowSignIn(); }} className="text-lg font-serif text-left">Member Login</button>
            <a href="#contact" onClick={() => setIsOpen(false)} className="bg-brand-dark text-brand-cream px-6 py-3 rounded-full text-center">Contact Us</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('2 People');
  const [time, setTime] = useState('');
  const [isReserved, setIsReserved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !time) {
      alert("Please fill in your name and preferred time!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          guests: guests,
          time: time,
        }),
      });

      if (response.ok) {
        setIsReserved(true);
      } else {
        const data = await response.json();
        alert(data.error || "Something went wrong. Please check your Formspree link and try again!");
      }
    } catch (error) {
      alert("Error sending reservation. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600" 
          alt="Eric Kayser V.I. Entrance" 
          className="w-full h-full object-cover brightness-[0.85]" 
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cream via-brand-cream/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-cream bg-brand-dark/10 overflow-hidden text-[10px] flex items-center justify-center bg-brand-gold text-white font-bold">
                  {i}
                </div>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex text-brand-gold">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="font-semibold text-brand-dark">4.5/5 (4,329+ Reviews in Lagos)</p>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-light leading-[0.9] tracking-tight mb-8">
            A Bit of <br />
            <span className="italic-small italic font-serif">Paris</span> <br />
            in Lagos.
          </h1>
          
          <p className="text-xl text-brand-dark max-w-xl mb-10 leading-relaxed font-medium">
            Artisan bakery, luxury dining, and soulful ambiance. <br />
            Experience the legendary craftsmanship of Eric Kayser in the heart of Victoria Island.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#services" className="px-8 py-4 bg-brand-dark text-brand-cream rounded-full flex items-center justify-between group hover:bg-brand-gold transition-all min-w-[200px]">
              <span>Explore The Menu</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-4 text-brand-dark">
              <CheckCircle2 className="text-brand-gold" />
              <span className="text-sm font-bold tracking-wider uppercase">Open Now · V.I. Lagos</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-2xl relative z-10" id="contact">
            <h3 className="text-2xl font-serif mb-2 text-center">Reserve Your Table</h3>
            
            {isReserved ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-16 h-16 bg-brand-gold text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-2xl font-serif text-brand-dark">Reservation Request Sent!</h4>
                <p className="text-brand-dark/70 text-sm px-4">
                  Thank you, <strong>{name}</strong>. We've received your request for <strong>{guests}</strong> at <strong>{time}</strong> and will confirm your table shortly.
                </p>
                <button 
                  onClick={() => { setIsReserved(false); setName(''); setTime(''); }}
                  className="mt-4 text-xs font-bold uppercase tracking-widest text-brand-gold hover:underline"
                >
                  Book another table
                </button>
              </motion.div>
            ) : (
              <>
                <p className="text-brand-dark/60 text-sm text-center mb-6">Join us for brunch, dinner, or a quick Parisian getaway.</p>
                <form className="space-y-4" onSubmit={handleReserve}>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold mb-1 ml-4">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-brand-cream/50 border-none rounded-full px-6 py-3 focus:ring-2 focus:ring-brand-gold transition-all" 
                      placeholder="Enter name" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold mb-1 ml-4">Guests</label>
                      <select 
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full bg-brand-cream/50 border-none rounded-full px-6 py-3 focus:ring-2 focus:ring-brand-gold transition-all appearance-none cursor-pointer"
                      >
                        <option>2 People</option>
                        <option>4 People</option>
                        <option>6+ People</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font

