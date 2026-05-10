import React, { useState, useEffect, useRef } from 'react';
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
  Home as HomeIcon, 
  PenTool, 
  ShieldCheck, 
  Clock, 
  Award, 
  Instagram, 
  Linkedin, 
  Facebook 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 1. FORMSPREE BACKEND ENDPOINT
// ==========================================
const FORMSPREE_URL = "https://formspree.io/f/xqenyjdy";

// ==========================================
// 2. STATIC DATA & CONSTANTS
// ==========================================
const SERVICES = [
  {
    title: "Artisan Boulangerie",
    description: "Traditional French breads baked fresh throughout the day",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
    icon: <HomeIcon className="w-6 h-6" />
  },
  {
    title: "Exquisite Patisserie",
    description: "Handcrafted cakes, tarts, and pastries that bring the authentic taste of Paris",
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800",
    icon: <PenTool className="w-6 h-6" />
  },
  {
    title: "Luxury Dining Room",
    description: "Elegant French-Nigerian fusion dining experience in a sophisticated setting",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800",
    icon: <Building2 className="w-6 h-6" />
  }
];

const REVIEWS = [
  {
    name: "Chioma N.",
    role: "Lagos Foodie",
    content: "The croissants here transport me straight to Paris. Best brunch spot in Victoria Island!",
    rating: 5
  },
  {
    name: "Tunde O.",
    role: "Business Executive",
    content: "An exceptional place for corporate dinners. The atmosphere is quiet, elegant, and highly professional.",
    rating: 5
  },
  {
    name: "Amara E.",
    role: "Regular Guest",
    content: "Their attention to detail in pastries is unmatched. The customer service matches the luxury quality.",
    rating: 5
  }
];

const FAQS = [
  {
    question: "Do I need a reservation for dining?",
    answer: "While we accept walk-ins for the bakery and café, we highly recommend making a reservation for lunch and dinner peak hours to guarantee a table."
  },
  {
    question: "What are your opening hours in Victoria Island?",
    answer: "We are open daily from 7:00 AM to 10:00 PM, serving fresh breakfast, lunch, and dinner."
  },
  {
    question: "Do you offer catering services?",
    answer: "Yes, we provide luxury catering and custom pastry orders for private and corporate events. Please contact our management team."
  }
];

interface HeroProps {
  contactRef: React.RefObject<HTMLDivElement | null>;
}

// ==========================================
// 3. NAV COMPONENT
// ==========================================
interface NavProps {
  onScrollToContact: () => void;
}

function Nav({ onScrollToContact }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-brand-cream/90 backdrop-blur-md py-4 shadow-md' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="font-serif text-2xl tracking-widest text-brand-dark flex items-center gap-2">
          <span>ERIC KAYSER</span>
          <span className="text-xs bg-brand-gold text-white px-2 py-0.5 rounded font-sans tracking-normal">LAGOS</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider uppercase text-brand-dark">
          <a href="#services" className="hover:text-brand-gold transition-colors">Services</a>
          <a href="#about" className="hover:text-brand-gold transition-colors">Why Us</a>
          <a href="#reviews" className="hover:text-brand-gold transition-colors">Testimonials</a>
          <button 
            onClick={onScrollToContact}
            className="px-6 py-2.5 bg-brand-dark text-brand-cream rounded-full hover:bg-brand-gold hover:text-brand-dark transition-all duration-300"
          >
            Contact Us
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-brand-dark">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-cream border-b border-brand-dark/10 p-8 flex flex-col gap-6 text-center z-50 shadow-xl"
          >
            <a href="#services" onClick={() => setIsOpen(false)} className="text-lg font-serif">Services</a>
            <a href="#about" onClick={() => setIsOpen(false)} className="text-lg font-serif">Why Us</a>
            <a href="#reviews" onClick={() => setIsOpen(false)} className="text-lg font-serif">Testimonials</a>
            <button 
              onClick={() => { setIsOpen(false); onScrollToContact(); }}
              className="bg-brand-dark text-brand-cream px-6 py-3 rounded-full font-serif"
            >
              Contact Us
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ==========================================
// 4. HERO & RESERVATION COMPONENT
// ==========================================
function Hero({ contactRef }: HeroProps) {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('2 People');
  const [time, setTime] = useState('');
  const [isReserved, setIsReserved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !time) {
      alert("Please fill in your name and preferred time!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
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
        const errData = await response.json();
        alert(errData.error || "Submission failed. Please check your Formspree backend link.");
      }
    } catch (error) {
      alert("Error sending reservation. Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600" 
          alt="Eric Kayser Restaurant" 
          className="w-full h-full object-cover brightness-[0.85]" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cream via-brand-cream/40 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Side Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-cream bg-brand-gold text-white font-bold text-[10px] flex items-center justify-center">
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

          <h1 className="text-5xl md:text-7xl font-light leading-[1.1] tracking-tight mb-8 text-brand-dark">
            A Bit of <br />
            <span className="italic font-serif text-brand-gold">Paris</span> <br />
            in Lagos.
          </h1>
          
          <p className="text-lg text-brand-dark/90 max-w-xl mb-10 leading-relaxed font-medium">
            Artisan bakery, luxury dining, and soulful ambiance. Experience the legendary craftsmanship of Eric Kayser in Victoria Island.
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

        {/* Right Side Reservation Form */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div ref={contactRef} className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-2xl relative z-10" id="contact">
            <h3 className="text-2xl font-serif mb-2 text-center text-brand-dark">Reserve Your Table</h3>
            
            {isReserved ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-16 h-16 bg-brand-gold text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-2xl font-serif text-brand-dark">Reservation Sent!</h4>
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
                    <label className="block text-[10px] uppercase tracking-widest font-bold mb-1 ml-4 text-brand-dark">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-brand-cream/50 border-none rounded-full px-6 py-3 focus:ring-2 focus:ring-brand-gold transition-all text-brand-dark" 
                      placeholder="Enter name" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold mb-1 ml-4 text-brand-dark">Guests</label>
                      <select 
                        name="guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full bg-brand-cream/50 border-none rounded-full px-6 py-3 focus:ring-2 focus:ring-brand-gold transition-all appearance-none cursor-pointer text-brand-dark"
                      >
                        <option>2 People</option>
                        <option>4 People</option>
                        <option>6+ People</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold mb-1 ml-4 text-brand-dark">Time</label>
                      <input 
                        type="time" 
                        name="time"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-brand-cream/50 border-none rounded-full px-6 py-3 focus:ring-2 focus:ring-brand-gold transition-all text-brand-dark" 
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-4 bg-brand-gold text-white font-bold rounded-full shadow-lg shadow-brand-gold/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? "Sending..." : "Get Reservation"}
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// 5. SERVICES COMPONENT
// ==========================================
function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-brand-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block">The Experience</span>
            <h2 className="text-4xl md:text-6xl font-light text-brand-dark">Artisan Soul in <br /> Every Crust</h2>
          </div>
          <p className="text-brand-dark/50 max-w-sm mb-2">
            From our world-renowned baguettes to our signature dinner menu, every detail is crafted to perfection.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div key={index} className="group bg-brand-cream/30 rounded-3xl p-6 hover:bg-white hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-cream flex items-center justify-center text-brand-gold shrink-0">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-serif mb-2 text-brand-dark">{service.title}</h3>
                  <p className="text-brand-dark/60 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 6. WHY CHOOSE US COMPONENT
// ==========================================
function WhyUs() {
  const features = [
    { icon: <Clock />, title: "Baked Fresh Hourly", desc: "Our ovens never rest so your croissants are always perfectly warm and flaky." },
    { icon: <Award />, title: "French Master Chefs", desc: "Under the guidance of authentic Parisian-trained pastry artisans." },
    { icon: <ShieldCheck />, title: "Premium Ingredients", desc: "We import raw ingredients directly from France to keep the authentic taste." }
  ];

  return (
    <section id="about" className="py-24 bg-brand-cream/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-brand-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block">The Heritage</span>
              <h2 className="text-4xl md:text-5xl font-light text-brand-dark leading-tight">The Art of True <br /><span className="font-serif italic text-brand-gold">French Baking</span></h2>
            </div>
            <p className="text-brand-dark/75 leading-relaxed text-lg">
              At Eric Kayser, we honor standard traditional recipes. Our natural liquid leavening methods guarantee that each loaf of bread is uniquely flavorful and perfectly textured.
            </p>
            <div className="space-y-6">
              {features.map((feat, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="text-brand-gold p-2 bg-white rounded-xl shadow-md">{feat.icon}</div>
                  <div>
                    <h4 className="font-bold text-brand-dark">{feat.title}</h4>
                    <p className="text-brand-dark/60 text-sm">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[550px] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800" 
              alt="Baking Process" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 7. REVIEWS COMPONENT
// ==========================================
function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Guest Stories</span>
          <h2 className="text-4xl font-serif text-brand-dark">Loved by Lagosians</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, i) => (
            <div key={i} className="bg-brand-cream/20 p-8 rounded-3xl border border-brand-cream/50 relative">
              <div className="flex text-brand-gold mb-6">
                {Array.from({ length: rev.rating }).map((_, idx) => (
                  <Star key={idx} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-brand-dark/80 italic mb-6 leading-relaxed">"{rev.content}"</p>
              <div>
                <h4 className="font-bold text-brand-dark">{rev.name}</h4>
                <p className="text-brand-gold text-xs uppercase tracking-wider">{rev.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 8. FAQ COMPONENT
// ==========================================
function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-24 bg-brand-cream/20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Got Questions?</span>
          <h2 className="text-4xl font-serif text-brand-dark">Frequently Asked</h2>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-cream">
              <button 
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-brand-cream/10 transition-colors"
              >
                <span className="font-bold text-brand-dark text-md">{faq.question}</span>
                <ChevronDown className={`text-brand-gold transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-brand-dark/70 text-sm leading-relaxed border-t border-brand-cream/50 pt-3">{faq.answer}</p>
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

// ==========================================
// 9. FOOTER COMPONENT
// ==========================================
function Footer({ onScrollToContact }: { onScrollToContact: () => void }) {
  return (
    <footer className="bg-brand-dark text-brand-cream pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <h3 className="font-serif text-2xl tracking-widest text-white">ERIC KAYSER</h3>
          <p className="text-xs text-brand-cream/50">Experience traditional culinary excellence in Victoria Island, Lagos.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-gold"><Instagram size={20} /></a>
            <a href="#" className="hover:text-brand-gold"><Linkedin size={20} /></a>
            <a href="#" className="hover:text-brand-gold"><Facebook size={20} /></a>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-4 uppercase tracking-wider text-white text-sm">Navigation</h4>
          <ul className="space-y-2 text-sm text-brand-cream/70">
            <li><a href="#services" className="hover:text-white">Services</a></li>
            <li><a href="#about" className="hover:text-white">Why Us</a></li>
            <li><a href="#reviews" className="hover:text-white">Reviews</a></li>
            <li><button onClick={onScrollToContact} className="hover:text-white">Reserve Table</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 uppercase tracking-wider text-white text-sm">Hours</h4>
          <ul className="space-y-2 text-sm text-brand-cream/70">
            <li>Monday - Sunday</li>
            <li>7:00 AM - 10:00 PM</li>
            <li className="text-brand-gold text-xs">Holidays Inclusive</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 uppercase tracking-wider text-white text-sm">Location</h4>
          <ul className="space-y-3 text-sm text-brand-cream/70">
            <li className="flex gap-2"><MapPin size={16} className="text-brand-gold shrink-0" /> Victoria Island, Lagos</li>
            <li className="flex gap-2"><Phone size={16} className="text-brand-gold shrink-0" /> 08035795879</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 pt-8 text-center text-xs text-brand-cream/40">
        <p>&copy; {new Date().getFullYear()} Eric Kayser Lagos. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

// ==========================================
// 10. MAIN APP EXPORT
// ==========================================
export default function App() {
  const contactFormRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    if (contactFormRef.current) {
      contactFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream font-sans selection:bg-brand-gold selection:text-brand-dark">
      <Nav onScrollToContact={scrollToContact} />
      <Hero contactRef={contactFormRef} />
      <Services />
      <WhyUs />
      <Reviews />
      <FAQ />
      <Footer onScrollToContact={scrollToContact} />
    </div>
  );
}
