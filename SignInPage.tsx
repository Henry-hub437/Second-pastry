import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

// --- HELPER COMPONENTS (ICONS) ---

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s12-5.373 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
    </svg>
);


// --- TYPE DEFINITIONS ---

export interface Testimonial {
  avatarSrc: string;
  name: string;
  handle: string;
  text: string;
}

interface SignInPageProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  heroImageSrc?: string;
  testimonials?: Testimonial[];
  onSignIn?: (event: React.FormEvent<HTMLFormElement>) => void;
  onGoogleSignIn?: () => void;
  onResetPassword?: () => void;
  onCreateAccount?: () => void;
  onBack?: () => void;
}

// --- SUB-COMPONENTS ---

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-brand-dark/10 bg-brand-dark/5 backdrop-blur-sm transition-colors focus-within:border-brand-gold/70 focus-within:bg-brand-gold/5">
    {children}
  </div>
);

const TestimonialCard = ({ testimonial, delay }: { testimonial: Testimonial, delay: string }) => (
  <div className={`${delay} animate-element flex items-start gap-3 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/20 p-5 w-64 shadow-lg scale-in`}>
    <img src={testimonial.avatarSrc} className="h-10 w-10 object-cover rounded-2xl" alt="avatar" />
    <div className="text-sm leading-snug">
      <p className="flex items-center gap-1 font-medium">{testimonial.name}</p>
      <p className="text-brand-dark/60 italic">{testimonial.handle}</p>
      <p className="mt-1 text-brand-dark/80">{testimonial.text}</p>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

export const SignInPage: React.FC<SignInPageProps> = ({
  title = <span className="font-light text-brand-dark tracking-tighter">Welcome Back</span>,
  description = "Access your account and continue your culinary journey with us",
  heroImageSrc = "https://images.unsplash.com/photo-1550966841-3ee7adac1af3?auto=format&fit=crop&q=80&w=1600",
  testimonials = [
    {
      avatarSrc: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
      name: "Jean Dupont",
      handle: "@jeandu",
      text: "The best croissants I've had outside of Paris. Pure magic!"
    },
    {
      avatarSrc: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
      name: "Sola Adeleke",
      handle: "@solacooks",
      text: "The ambiance is unmatched in Lagos. My second office."
    }
  ],
  onSignIn,
  onGoogleSignIn,
  onResetPassword,
  onCreateAccount,
  onBack
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-brand-cream overflow-hidden">
      {/* Left column: sign-in form */}
      <section className="flex-1 flex items-center justify-center p-8 mt-16 md:mt-0">
        <div className="w-full max-w-md">
          <button 
            onClick={onBack}
            className="mb-8 text-brand-dark/60 hover:text-brand-gold transition-colors flex items-center gap-2 group animate-element animate-delay-100"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Eric Kayser
          </button>
          
          <div className="flex flex-col gap-6">
            <h1 className="animate-element animate-delay-200 text-4xl md:text-5xl font-semibold leading-tight">{title}</h1>
            <p className="animate-element animate-delay-300 text-brand-dark/60">{description}</p>

            <form className="space-y-5" onSubmit={onSignIn}>
              <div className="animate-element animate-delay-400">
                <label className="text-sm font-medium text-brand-dark/60 ml-1">Email Address</label>
                <GlassInputWrapper>
                  <input name="email" type="email" placeholder="Enter your email address" className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none" />
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-500">
                <label className="text-sm font-medium text-brand-dark/60 ml-1">Password</label>
                <GlassInputWrapper>
                  <div className="relative">
                    <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center">
                      {showPassword ? <EyeOff className="w-5 h-5 text-brand-dark/40 hover:text-brand-gold transition-colors" /> : <Eye className="w-5 h-5 text-brand-dark/40 hover:text-brand-gold transition-colors" />}
                    </button>
                  </div>
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-600 flex items-center justify-between text-sm px-1">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="rememberMe" className="w-4 h-4 rounded border-brand-dark/20 text-brand-gold focus:ring-brand-gold" />
                  <span className="text-brand-dark/80">Keep me signed in</span>
                </label>
                <a href="#" onClick={(e) => { e.preventDefault(); onResetPassword?.(); }} className="hover:underline text-brand-gold transition-colors font-medium">Reset password</a>
              </div>

              <button type="submit" className="animate-element animate-delay-700 w-full rounded-2xl bg-brand-dark py-4 font-medium text-brand-cream hover:bg-brand-gold transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
                Sign In
              </button>
            </form>

            <div className="animate-element animate-delay-800 relative flex items-center justify-center">
              <span className="w-full border-t border-brand-dark/10"></span>
              <span className="px-4 text-xs uppercase tracking-widest text-brand-dark/40 bg-brand-cream absolute">Or continue with</span>
            </div>

            <button onClick={onGoogleSignIn} className="animate-element animate-delay-900 w-full flex items-center justify-center gap-3 border border-brand-dark/10 rounded-2xl py-4 hover:bg-brand-dark/5 transition-all duration-300">
                <GoogleIcon />
                Continue with Google
            </button>

            <p className="animate-element animate-delay-1000 text-center text-sm text-brand-dark/60">
              New to Eric Kayser? <a href="#" onClick={(e) => { e.preventDefault(); onCreateAccount?.(); }} className="text-brand-gold font-bold hover:underline transition-colors uppercase tracking-widest text-xs">Create Account</a>
            </p>
          </div>
        </div>
      </section>

      {/* Right column: hero image + testimonials */}
      {heroImageSrc && (
        <section className="hidden md:block flex-1 relative p-4">
          <div 
            className="absolute inset-4 rounded-[2rem] bg-cover bg-center animate-slide-right overflow-hidden group shadow-2xl" 
            style={{ backgroundImage: `url(${heroImageSrc})` }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/10 transition-colors duration-700"></div>
            
            {/* Quotes/Testimonials */}
            {testimonials.length > 0 && (
              <div className="absolute bottom-12 left-0 right-0 flex gap-4 px-8 w-full justify-center">
                <TestimonialCard testimonial={testimonials[0]} delay="animate-delay-1000" />
                {testimonials[1] && <div className="hidden lg:flex"><TestimonialCard testimonial={testimonials[1]} delay="animate-delay-1200" /></div>}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
