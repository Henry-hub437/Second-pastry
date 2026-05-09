/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SignInPage } from './components/SignInPage';
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
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background with your provided exterior photo */}
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
            <p className="text-brand-dark/60 text-sm text-center mb-6">Join us for brunch, dinner, or a quick Parisian getaway.</p>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-1 ml-4">Full Name</label>
                <input type="text" className="w-full bg-brand-cream/50 border-none rounded-full px-6 py-3 focus:ring-2 focus:ring-brand-gold transition-all" placeholder="Enter name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-1 ml-4">Guests</label>
                  <select className="w-full bg-brand-cream/50 border-none rounded-full px-6 py-3 focus:ring-2 focus:ring-brand-gold transition-all appearance-none cursor-pointer">
                    <option>2 People</option>
                    <option>4 People</option>
                    <option>6+ People</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-1 ml-4">Time</label>
                  <input type="time" className="w-full bg-brand-cream/50 border-none rounded-full px-6 py-3 focus:ring-2 focus:ring-brand-gold transition-all" />
                </div>
              </div>
              <button className="w-full py-4 bg-brand-gold text-white font-bold rounded-full shadow-lg shadow-brand-gold/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                Check Availability
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-brand-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block">The Experience</span>
            <h2 className="text-4xl md:text-6xl font-light">Artisan Soul in <br /> Every Crust</h2>
          </div>
          <p className="text-brand-dark/50 max-w-sm mb-2">
            From our world-renowned baguettes to our signature dinner menu, every detail is crafted to perfection.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5]">
                <img 
                  src={s.image} 
                  alt={s.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = s.fallback;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="text-brand-cream">
                    <p className="text-sm font-light leading-relaxed">{s.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-2">
                <div>
                  <h3 className="text-2xl font-serif group-hover:text-brand-gold transition-colors">{s.title}</h3>
                </div>
                <div className="w-10 h-10 border border-brand-dark/10 rounded-full flex items-center justify-center group-hover:bg-brand-dark group-hover:text-brand-cream transition-all">
                  <ArrowRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const USP = [
    { icon: <Clock />, title: "Daily Freshness", text: "Baked throughout the day to ensure optimal texture and taste." },
    { icon: <ShieldCheck />, title: "French Tradition", text: "Traditional methods preserved for authentic Parisian flavor." },
    { icon: <Award />, title: "Top-Tier Ambiance", text: "Voted #1 atmosphere for social dining in Victoria Island." }
  ];

  return (
    <section id="about" className="py-24 luxury-grid overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="relative z-10 oval-mask overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1600" 
                alt="Ambiance" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000";
                }}
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-brand-gold p-8 rounded-2xl text-brand-cream shadow-xl z-20 hidden md:block">
              <div className="text-4xl font-serif mb-1">4.3k+</div>
              <div className="text-[10px] uppercase tracking-widest font-bold">5-Star Experiences</div>
            </div>
          </div>
          
          <div>
            <span className="text-brand-gold font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Our philosophy</span>
            <h2 className="text-5xl font-light mb-8 leading-tight">Authenticity Meets <br /> <span className="italic font-serif">Hospitality</span></h2>
            <p className="text-lg text-brand-dark/70 mb-12 leading-relaxed">
              Eric Kayser Lagos is more than just a bakery. It's a sanctuary for the senses, bringing together the architectural charm of Paris with the vibrant energy of Victoria Island. 
            </p>

            <div className="space-y-8">
              {USP.map((u, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-dark/5 flex items-center justify-center text-brand-gold shrink-0">
                    {u.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-serif mb-2">{u.title}</h4>
                    <p className="text-brand-dark/60 text-sm leading-relaxed">{u.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-brand-dark text-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">The Verdict of <br /> Luxury Founders</h2>
          <div className="flex justify-center text-brand-gold mb-2">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="currentColor" />)}
          </div>
          <p className="text-brand-cream/60">Professional feedback from our 4,329+ project partners.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((r, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl"
            >
              <div className="mb-6 flex">
                {[...Array(r.rating)].map((_, j) => <Star key={j} size={14} className="text-brand-gold" fill="currentColor" />)}
              </div>
              <p className="text-lg font-light italic leading-relaxed mb-8 opacity-80">"{r.comment}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-serif text-brand-gold">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs uppercase tracking-widest opacity-40">{r.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Numbers Graphic */}
        <div className="absolute top-0 right-0 text-[180px] font-serif font-black opacity-[0.03] pointer-events-none select-none -translate-y-1/2 translate-x-1/4">
          4.5
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const images = [
    { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800", title: "Paris in Lagos", fallback: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800" },
    { src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800", title: "Ambiance", fallback: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800" },
    { src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800", title: "Handcrafted Excellence", fallback: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800" },
    { src: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800", title: "Luxury Selection", fallback: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800" },
    { src: "https://images.unsplash.com/photo-1560613295-88544d65076e?auto=format&fit=crop&q=80&w=800", title: "Signature Dining", fallback: "https://images.unsplash.com/photo-1560613295-88544d65076e?auto=format&fit=crop&q=80&w=800" }
  ];

  return (
    <section className="py-24 bg-brand-cream/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Social Feed</span>
          <h2 className="text-4xl font-light italic font-serif text-brand-dark">Moments from Eric Kayser</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="aspect-square rounded-2xl overflow-hidden group relative"
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = img.fallback;
                }}
              />
              <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Knowledge Base</span>
          <h2 className="text-4xl font-light">Frequently Asked</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((f, i) => (
            <div key={i} className="border-b border-brand-dark/10">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-6 flex justify-between items-center text-left group"
              >
                <span className="text-xl font-serif group-hover:text-brand-gold transition-colors">{f.question}</span>
                <div className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                  <ChevronDown />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-brand-dark/60 leading-relaxed">
                      {f.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 bg-brand-gold relative overflow-hidden text-center text-brand-cream">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-5xl md:text-7xl font-light mb-8 leading-tight">Your Table is <br /> <span className="italic font-serif">Waiting</span></h2>
        <p className="text-xl mb-12 opacity-80 max-w-2xl mx-auto">
          Visit us at Bishop Aboyade Cole St for the quintessential Parisian experience in Lagos. 
          Open daily until 10:30 PM.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a href="#contact" className="px-12 py-5 bg-brand-dark text-brand-cream rounded-full font-bold text-lg hover:bg-zinc-900 transition-all shadow-2xl">
            Book a Reservation
          </a>
          <button className="px-12 py-5 border border-brand-cream text-brand-cream rounded-full font-bold text-lg hover:bg-brand-cream hover:text-brand-gold transition-all">
            See the Full Menu
          </button>
        </div>
      </div>
      
      {/* Abstract Background Shapes with Ambiance Photo */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1600" 
          alt="Ambiance bg" 
          className="w-full h-full object-cover" 
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550966841-3ee7adac1af3?auto=format&fit=crop&q=80&w=1600";
          }}
        />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-brand-cream pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16 pb-16 border-b border-brand-dark/10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-brand-dark flex items-center justify-center rounded-sm">
                <span className="text-brand-cream font-bold text-xl tracking-tighter uppercase">EK</span>
              </div>
              <span className="text-2xl font-serif tracking-widest uppercase text-brand-dark">
                Eric Kayser
              </span>
            </div>
            <p className="text-brand-dark/60 max-w-sm leading-relaxed mb-8">
              Victoria Island's premier artisanal bakery and restaurant. Since our founding, we've remained committed to the traditional French art of baking.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-brand-dark/20 flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all cursor-pointer">
                <Instagram size={18} />
              </div>
              <div className="w-10 h-10 rounded-full border border-brand-dark/20 flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all cursor-pointer">
                <Linkedin size={18} />
              </div>
              <div className="w-10 h-10 rounded-full border border-brand-dark/20 flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all cursor-pointer">
                <Facebook size={18} />
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold uppercase tracking-widest text-xs mb-8">Visit Us</h5>
            <div className="space-y-4 text-brand-dark/60">
              <div className="flex items-start gap-3">
                <MapPin className="text-brand-gold shrink-0 mt-1" size={18} />
                <address className="not-italic text-sm">
                  864a Bishop Aboyade Cole St, <br /> Victoria Island, Lagos
                </address>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-brand-gold" size={18} />
                <a href="tel:+2349060007275" className="text-sm">+234 906 000 7275</a>
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold uppercase tracking-widest text-xs mb-8">Experience</h5>
            <ul className="space-y-4 text-sm text-brand-dark/60 font-medium tracking-wide">
              <li><a href="#services" className="hover:text-brand-gold transition-colors">Bakery Menu</a></li>
              <li><a href="#about" className="hover:text-brand-gold transition-colors">Our Story</a></li>
              <li><a href="#contact" className="hover:text-brand-gold transition-colors">Private Events</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Join the Team</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-brand-dark/40">
          <p>© 2026 Eric Kayser Lagos. Artisan Boulangerie.</p>
          <p>Handcrafted daily with love in Victoria Island.</p>
        </div>
      </div>
    </footer>
  );
}

function FlagshipEntrance() {
  return (
    <section className="py-24 bg-brand-dark text-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <span className="text-brand-gold font-bold tracking-[0.2em] text-xs uppercase mb-6 block font-sans">The Landmark</span>
            <h2 className="text-5xl font-light mb-8 leading-tight">Our Victoria Island <br /> <span className="italic font-serif">Flagship</span></h2>
            <p className="text-lg opacity-70 mb-10 leading-relaxed font-sans">
              Located at the heart of the business district, our Bishop Aboyade Cole branch is an architectural homage to the classic boulangeries of Paris. With its warm lighting and inviting storefront, it stands as a beacon for artisan quality in Lagos.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <div className="text-brand-gold font-serif text-2xl mb-2">Location</div>
                <p className="text-sm opacity-60">864a Bishop Aboyade Cole St, Victoria Island</p>
              </div>
              <div>
                <div className="text-brand-gold font-serif text-2xl mb-2">Hours</div>
                <p className="text-sm opacity-60">Daily: 7:30 AM — 10:30 PM</p>
              </div>
            </div>

            <a 
              href="https://maps.google.com/?q=Eric+Kayser+Victoria+Island+Lagos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-brand-gold font-bold uppercase tracking-widest text-sm group"
            >
              Get Directions <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative"
          >
            <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 aspect-video lg:aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600" 
                alt="Eric Kayser V.I. Entrance" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" 
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Soft Glow */}
            <div className="absolute -inset-4 bg-brand-gold/10 blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    if (showSignIn) {
      window.scrollTo(0, 0);
    }
  }, [showSignIn]);

  return (
    <div className="overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!showSignIn ? (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Nav onShowSignIn={() => setShowSignIn(true)} />
            <Hero />
            <Services />
            <WhyUs />
            <Reviews />
            <Gallery />
            <FlagshipEntrance />
            <FAQ />
            <CTA />
            <Footer />
          </motion.div>
        ) : (
          <motion.div 
            key="signin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SignInPage onBack={() => setShowSignIn(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
