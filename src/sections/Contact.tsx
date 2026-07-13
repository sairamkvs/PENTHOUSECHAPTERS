"use client";

import { useState } from "react";
import { Mail, Phone, MessageSquare, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { motion as motionFramer, AnimatePresence } from "framer-motion";
import { CONTACT_INFO } from "@/constants/data";
import { useToast } from "@/components/UI/Toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "commercial",
    message: ""
  });

  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        type: "error"
      });
      return;
    }

    setIsPending(true);

    // Simulate network submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsPending(false);
    setIsSubmitted(true);
    
    toast({
      title: "Inquiry Submitted!",
      description: "Thank you for reaching out, we will get back to you shortly.",
      type: "success"
    });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      projectType: "commercial",
      message: ""
    });
    setIsSubmitted(false);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-brand-black px-6 md:px-12 py-24 md:py-36 border-t border-white/5 overflow-hidden"
    >
      {/* Glow effects */}
      <div className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-brand-gold/5 blur-[150px] pointer-events-none" />
      <div className="absolute -top-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-amber-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Side: Contact Info */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[1px] w-8 bg-brand-gold" />
            <h2 className="font-outfit text-xs font-bold tracking-[0.3em] text-brand-gold uppercase">
              CONTACT US
            </h2>
          </div>
          
          <h3 className="font-syne text-3xl md:text-5xl font-extrabold text-white mb-6 uppercase leading-tight">
            Your Growth Begins With Better Stories.
          </h3>
          
          <p className="font-inter text-sm md:text-base text-brand-muted leading-relaxed mb-12 max-w-md">
            Whether you are launching a new brand, promoting a product, or telling your company's story, we are here to transform your vision into compelling visual experiences.
          </p>

          <div className="flex flex-col gap-6">
            {/* Phone */}
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-4 group cursor-none focus:outline-none"
              data-cursor="hover"
            >
              <div className="p-3.5 rounded-full border border-white/10 bg-white/5 text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all duration-300">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-brand-muted tracking-wider uppercase block">Call Us</span>
                <span className="text-sm font-semibold text-white group-hover:text-brand-gold transition-colors">{CONTACT_INFO.phone}</span>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center gap-4 group cursor-none focus:outline-none"
              data-cursor="hover"
            >
              <div className="p-3.5 rounded-full border border-white/10 bg-white/5 text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all duration-300">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-brand-muted tracking-wider uppercase block">Email Us</span>
                <span className="text-sm font-semibold text-white group-hover:text-brand-gold transition-colors">{CONTACT_INFO.email}</span>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={CONTACT_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group cursor-none focus:outline-none"
              data-cursor="hover"
            >
              <div className="p-3.5 rounded-full border border-white/10 bg-white/5 text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all duration-300">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-brand-muted tracking-wider uppercase block">WhatsApp</span>
                <span className="text-sm font-semibold text-white group-hover:text-brand-gold transition-colors">Chat Instantly</span>
              </div>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-12">
            <a
              href={CONTACT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-outfit text-xs font-bold tracking-widest text-brand-muted hover:text-brand-gold uppercase transition-colors cursor-none"
              data-cursor="hover"
            >
              Instagram
            </a>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <a
              href={CONTACT_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-outfit text-xs font-bold tracking-widest text-brand-muted hover:text-brand-gold uppercase transition-colors cursor-none"
              data-cursor="hover"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 w-full">
          <motionFramer.div
            layout
            className="w-full glass-panel glass-panel-glow rounded-2xl p-6 md:p-10 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motionFramer.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-8"
                  noValidate
                >
                  <div className="flex flex-col gap-6">
                    {/* Name Input */}
                    <div className="relative w-full">
                      <input
                        type="text"
                        name="name"
                        id="form-name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full border-b border-white/10 bg-transparent py-3 text-white outline-none focus:border-brand-gold transition-colors duration-300 text-sm md:text-base cursor-none"
                        required
                      />
                      <label
                        htmlFor="form-name"
                        className="absolute left-0 top-3 text-xs md:text-sm text-brand-muted/70 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base peer-focus:top-[-12px] peer-focus:text-xs peer-focus:text-brand-gold peer-[:not(:placeholder-shown)]:top-[-12px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-brand-gold"
                      >
                        Full Name *
                      </label>
                    </div>

                    {/* Email Input */}
                    <div className="relative w-full">
                      <input
                        type="email"
                        name="email"
                        id="form-email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full border-b border-white/10 bg-transparent py-3 text-white outline-none focus:border-brand-gold transition-colors duration-300 text-sm md:text-base cursor-none"
                        required
                      />
                      <label
                        htmlFor="form-email"
                        className="absolute left-0 top-3 text-xs md:text-sm text-brand-muted/70 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base peer-focus:top-[-12px] peer-focus:text-xs peer-focus:text-brand-gold peer-[:not(:placeholder-shown)]:top-[-12px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-brand-gold"
                      >
                        Email Address *
                      </label>
                    </div>

                    {/* Project Type Dropdown */}
                    <div className="relative w-full flex flex-col gap-2">
                      <label htmlFor="form-type" className="text-xs text-brand-gold tracking-widest uppercase">
                        Project Interest
                      </label>
                      <select
                        name="projectType"
                        id="form-type"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full border border-white/10 bg-brand-dark px-4 py-3 rounded-lg text-white text-sm md:text-base outline-none focus:border-brand-gold cursor-none"
                      >
                        <option value="commercial">Commercial Films</option>
                        <option value="corporate">Corporate Films</option>
                        <option value="brand">Brand Documentaries</option>
                        <option value="product">Product Showcases</option>
                        <option value="photography">Photography</option>
                        <option value="immersive">360° Immersive Virtual Tours</option>
                        <option value="aerial">Aerial / Drone Shoots</option>
                        <option value="post">Post Production Services</option>
                      </select>
                    </div>

                    {/* Message Input */}
                    <div className="relative w-full mt-4">
                      <textarea
                        name="message"
                        id="form-message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder=" "
                        rows={4}
                        className="peer w-full border-b border-white/10 bg-transparent py-3 text-white outline-none focus:border-brand-gold transition-colors duration-300 resize-none text-sm md:text-base cursor-none"
                        required
                      />
                      <label
                        htmlFor="form-message"
                        className="absolute left-0 top-3 text-xs md:text-sm text-brand-muted/70 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base peer-focus:top-[-12px] peer-focus:text-xs peer-focus:text-brand-gold peer-[:not(:placeholder-shown)]:top-[-12px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-brand-gold"
                      >
                        Tell Us About Your Project *
                      </label>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-brand-gold hover:bg-white text-black font-outfit text-sm font-bold tracking-wider transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold disabled:opacity-50 disabled:cursor-not-allowed cursor-none group"
                    data-cursor="hover"
                  >
                    {isPending ? "SENDING INQUIRY..." : "SEND INQUIRY"}
                    {!isPending && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                  </button>
                </motionFramer.form>
              ) : (
                /* Premium Success Overlay Card (Checklist refinement) */
                <motionFramer.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center text-center py-6"
                >
                  <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-400 mb-6 border border-emerald-500/20">
                    <CheckCircle2 className="h-10 w-10 animate-pulse" />
                  </div>
                  
                  <h4 className="font-syne text-xl md:text-2xl font-bold text-white uppercase tracking-wider mb-4">
                    Inquiry Received!
                  </h4>
                  
                  <p className="font-inter text-sm md:text-base text-brand-muted leading-relaxed max-w-md mb-8">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your message has been routed to our creative producers. We will review your project details and get in touch with you within 24 hours.
                  </p>

                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-brand-gold bg-white/5 hover:bg-brand-gold/10 text-white hover:text-brand-gold font-outfit text-xs font-bold tracking-widest uppercase transition-colors cursor-none focus:outline-none"
                    data-cursor="hover"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Send Another Message
                  </button>
                </motionFramer.div>
              )}
            </AnimatePresence>
          </motionFramer.div>
        </div>

      </div>
    </section>
  );
}
