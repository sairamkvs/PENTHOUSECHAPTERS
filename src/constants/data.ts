import { ServiceItem, PortfolioItem, ProcessStep } from "@/types";

export const BRAND_NAME = "PENTHOUSE CHAPTERS";
export const BRAND_TAGLINE = "Where Vision Becomes Visual";
export const BRAND_MISSION = "Bridging brands with people through strategic visual storytelling.";

export const BIO_TEXT = {
  paragraph1: "We believe great visuals do more than capture attention—they build trust, communicate purpose, and inspire action. Every frame we create is designed with strategy, creativity, and precision to help brands connect with the right audience and achieve meaningful business growth.",
  paragraph2: "Our approach combines cinematic storytelling with modern marketing insights, enabling businesses to communicate their vision through compelling visual content. From startups establishing their identity to established enterprises strengthening their market presence, we create content that delivers impact across every platform."
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "commercial-films",
    title: "Commercial Films",
    description: "Creative advertising campaigns that capture attention, strengthen brand identity, and inspire customer action.",
    details: ["Advertising Campaigns", "TV Commercials", "Social Ads", "Cinema Ads"],
    mediaUrl: "/videos/coffee-craft.webm"
  },
  {
    id: "corporate-films",
    title: "Corporate Films",
    description: "Professional company profiles, manufacturing films, corporate presentations, employer branding, and internal communication videos.",
    details: ["Company Profiles", "Industrial Shoots", "Internal Communications", "Event Recaps"],
    mediaUrl: "/videos/city-timelapse.webm"
  },
  {
    id: "brand-films",
    title: "Brand Films",
    description: "Authentic stories that communicate your brand's purpose, values, and vision through cinematic storytelling.",
    details: ["Brand Documentaries", "Founder Stories", "Manifesto Videos", "CSR Films"],
    mediaUrl: "/videos/sample-2.mp4"
  },
  {
    id: "product-films",
    title: "Product Films",
    description: "High-quality product showcases, launch campaigns, demonstrations, and e-commerce visuals designed to increase engagement and sales.",
    details: ["3D Product Renders", "Close-up Showcases", "Explainer Videos", "Social Commerce"],
    mediaUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "social-media",
    title: "Social Media Content",
    description: "Strategic short-form content including Instagram Reels, YouTube videos, campaign creatives, promotional edits, and digital advertisements.",
    details: ["Instagram Reels", "TikTok Creatives", "YouTube Shorts", "Dynamic Promos"],
    mediaUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "photography",
    title: "Photography",
    description: "Premium professional photography spanning commercial, product, corporate, industrial, lifestyle, and architecture.",
    details: ["Commercial & Product", "Corporate Headshots", "Architecture & Interiors", "Lifestyle Shoots"],
    mediaUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "immersive-experiences",
    title: "360° Immersive Experiences",
    description: "Transform properties with interactive virtual tours, providing realistic and engaging viewing environments.",
    details: ["Real Estate Tours", "Hotels & Resorts", "Luxury Showrooms", "Holiday Rentals"],
    mediaUrl: "/videos/interior.webm"
  },
  {
    id: "aerial-cinematography",
    title: "Aerial Cinematography",
    description: "Professional drone filming and photography for real estate, hospitality, construction, and large-scale events.",
    details: ["4K Drone Footage", "Site Surveys", "Tourism Promotion", "Event Coverage"],
    mediaUrl: "/videos/drone.webm"
  },
  {
    id: "post-production",
    title: "Post Production",
    description: "Complete post-production solutions including editing, cinematic color grading, sound design, and VFX.",
    details: ["Precision Editing", "Color Grading", "Sound Design", "VFX & Motion Graphics"],
    mediaUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1400&q=80"
  }
];

export const PROCESS_DATA: ProcessStep[] = [
  {
    id: "process-discovery",
    number: "01",
    title: "Discovery",
    description: "We begin by understanding your business, audience, objectives, and communication goals to align our vision with yours."
  },
  {
    id: "process-strategy",
    number: "02",
    title: "Strategy",
    description: "Our creative team develops concepts, scripts, messaging frameworks, and production plans tailored to your marketing goals."
  },
  {
    id: "process-production",
    number: "03",
    title: "Production",
    description: "Using professional cinema-grade equipment and an experienced crew, we execute the shoot with artistic precision."
  },
  {
    id: "process-post",
    number: "04",
    title: "Post Production",
    description: "We refine raw footage through meticulous editing, cinematic color grading, immersive sound design, and custom graphics."
  },
  {
    id: "process-delivery",
    number: "05",
    title: "Delivery",
    description: "We package and deliver optimized assets formatted specifically for television, digital ads, web platforms, and social media."
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "port-1",
    title: "The Spirit of Craftsmanship",
    category: "films",
    categoryLabel: "Commercial Film",
    description:
      "A visually striking advertisement highlighting artisanal coffee roasting using slow-motion macro cinematography.",
    mediaType: "video",
    mediaUrl: "/videos/coffee-craft.webm",
    videoProvider: "direct",
    aspectRatio: "video",
    client: "Roasters Guild",
    year: "2025",
    servicesProvided: ["Director of Photography", "Color Grading", "Post Production"],
  },
  {
    id: "port-2",
    title: "Modern Solitude",
    category: "photography",
    categoryLabel: "Commercial Photography",
    description: "High-contrast architectural study focusing on minimalism, shadows, and clean raw materials.",
    mediaType: "image",
    mediaUrl: "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1200",
    aspectRatio: "square",
    client: "Arch-Design Magazine",
    year: "2026",
    servicesProvided: ["Creative Direction", "Architectural Photography"],
  },
  {
    id: "port-3",
    title: "Vanguard Corporate Summit",
    category: "corporate",
    categoryLabel: "Corporate Film",
    description: "A fast-paced, inspiring highlight reel of an international technology keynote, combining multicam feeds and motion titles.",
    mediaType: "video",
    mediaUrl: "/videos/city-timelapse.webm",
    videoProvider: "direct",
    aspectRatio: "video",
    client: "Vanguard Tech Inc",
    year: "2025",
    servicesProvided: ["Live Multi-Cam Coverage", "Motion Titles", "Highlight Reel Production"],
  },
  {
    id: "port-4",
    title: "The Glass Villa 360°",
    category: "immersive",
    categoryLabel: "Immersive 360° Tour",
    description: "An interactive architectural walk-through of an award-winning glass villa nestled in a forest landscape.",
    mediaType: "video",
    mediaUrl: "/videos/interior.webm",
    videoProvider: "direct",
    aspectRatio: "video",
    client: "Glasshouse Developments",
    year: "2025",
    servicesProvided: ["Immersive 360 Video Capture", "Spatial Experience Design", "Aerial Inspection"],
  },
  {
    id: "port-5",
    title: "Coastal Coastlines Drone",
    category: "aerial",
    categoryLabel: "Aerial Cinematography",
    description: "A series of sweeping 4K drone shots highlighting the intersection of jagged volcanic rocks and pristine blue oceans.",
    mediaType: "video",
    mediaUrl: "/videos/drone.webm",
    videoProvider: "direct",
    aspectRatio: "video",
    client: "Blue Horizon Tourism",
    year: "2026",
    servicesProvided: ["Drone Operations", "Landscape Cinematography", "4K Color Grade"],
  },
  {
    id: "port-6",
    title: "Chasing Shadows",
    category: "photography",
    categoryLabel: "Lifestyle Photography",
    description: "A lifestyle series focusing on urban fashion and play of streetlights during golden hour in Paris.",
    mediaType: "image",
    mediaUrl: "https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&w=1200",
    aspectRatio: "portrait",
    client: "Luxe Couture",
    year: "2026",
    servicesProvided: ["Golden Hour Portraiture", "Editorial Styling"],
  },
  {
    id: "port-7",
    title: "Cinematic Grade Reel 2026",
    category: "post",
    categoryLabel: "Post Production / VFX",
    description: "A showcase of high-end color correction, multi-layered compositing, and visual effect transformations.",
    mediaType: "video",
    mediaUrl: "/videos/sample-1.mp4",
    videoProvider: "direct",
    aspectRatio: "video",
    client: "Penthouse Chapters Showreel",
    year: "2026",
    servicesProvided: ["Color Correcting", "Multi-layered compositing", "VFX Transformations"],
  },
  {
    id: "port-8",
    title: "Luxury Suite Walkthrough",
    category: "photography",
    categoryLabel: "Architectural & Resort Photography",
    description: "Interactive marketing visuals created for a five-star presidential suite resort, boosting bookings by 40%.",
    mediaType: "image",
    mediaUrl: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1200",
    aspectRatio: "square",
    client: "Presidential Suites Resort",
    year: "2025",
    servicesProvided: ["360 Photography Stills", "Virtual Tour Orchestration"],
  },
  {
    id: "port-9",
    title: "The Timeless Chronograph",
    category: "photography",
    categoryLabel: "Commercial Product Photography",
    description: "Macro studio study capturing intricate brushed titanium and sapphire crystal reflection for luxury timepieces.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80",
    aspectRatio: "square",
    client: "Solitude Watches",
    year: "2026",
    servicesProvided: ["Studio Lighting", "Macro Product Photography", "Digital Retouching"],
  },
  {
    id: "port-10",
    title: "Elysian Estate",
    category: "photography",
    categoryLabel: "Architectural Photography",
    description: "Warm ambient dusk architectural exposure capturing the clean geometry and landscape synthesis of a private estate.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    aspectRatio: "video",
    client: "Grid Developers",
    year: "2025",
    servicesProvided: ["Twilight Photography", "Architectural Composition", "Color Mastery"],
  },
  {
    id: "port-11",
    title: "Nordic Horizon",
    category: "photography",
    categoryLabel: "Landscape & Editorial",
    description: "Fine art editorial capturing dramatic coastal atmospheric contrast and raw topography across northern fjords.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1400&q=80",
    aspectRatio: "portrait",
    client: "Blue Horizon Tourism",
    year: "2026",
    servicesProvided: ["Location Scouting", "Landscape Expedition", "Curatorial Retouching"],
  }
];

export const BRANDS_DATA = [
  { id: "b1", name: "Apex Tech" },
  { id: "b2", name: "Luxe Resorts" },
  { id: "b3", name: "Nova Apparel" },
  { id: "b4", name: "Solitude Watches" },
  { id: "b5", name: "Zenith Motors" },
  { id: "b6", name: "Summit Coffee Co." },
  { id: "b7", name: "Aero Logistics" },
  { id: "b8", name: "Grid Developers" }
];

export const CONTACT_INFO = {
  phone: "+91 98765 43210",
  email: "penthousechapters@gmail.com",
  whatsapp: "https://wa.me/919876543210",
  instagram: "https://instagram.com/penthousechapters",
  linkedin: "https://linkedin.com/company/penthousechapters",
  address: "Studio 4A, Creative Hub, Sector 5, Bangalore, India"
};
