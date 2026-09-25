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
    mediaUrl: "https://www.osvnews.com/wp-content/uploads/2023/02/Film-photo-via-Canva-Pro.png"//"https://assets.mixkit.co/videos/preview/mixkit-fashion-woman-with-silver-glitter-makeup-40439-large.mp4"
  },
  {
    id: "corporate-films",
    title: "Corporate Films",
    description: "Professional company profiles, manufacturing films, corporate presentations, employer branding, and internal communication videos.",
    details: ["Company Profiles", "Industrial Shoots", "Internal Communications", "Event Recaps"],
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-business-people-meeting-around-a-table-41662-large.mp4"
  },
  {
    id: "brand-films",
    title: "Brand Films",
    description: "Authentic stories that communicate your brand's purpose, values, and vision through cinematic storytelling.",
    details: ["Brand Documentaries", "Founder Stories", "Manifesto Videos", "CSR Films"],
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-with-sunbeams-40488-large.mp4"
  },
  {
    id: "product-films",
    title: "Product Films",
    description: "High-quality product showcases, launch campaigns, demonstrations, and e-commerce visuals designed to increase engagement and sales.",
    details: ["3D Product Renders", "Close-up Showcases", "Explainer Videos", "Social Commerce"],
    mediaUrl: "https://www.explain-it-simple.com/wp-content/uploads/2023/11/side-view-specialized-photographer-working-studio_23-2150247219-1.jpg"//"https://assets.mixkit.co/videos/preview/mixkit-pouring-hot-coffee-into-a-cup-41703-large.mp4"
  },
  {
    id: "social-media",
    title: "Social Media Content",
    description: "Strategic short-form content including Instagram Reels, YouTube videos, campaign creatives, promotional edits, and digital advertisements.",
    details: ["Instagram Reels", "TikTok Creatives", "YouTube Shorts", "Dynamic Promos"],
    mediaUrl: "https://images.unsplash.com/photo-1683721003111-070bcc053d8b?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"//https://assets.mixkit.co/videos/preview/mixkit-girl-dancing-with-headphones-on-the-street-40994-large.mp4"
  },
  {
    id: "photography",
    title: "Photography",
    description: "Premium professional photography spanning commercial, product, corporate, industrial, lifestyle, and architecture.",
    details: ["Commercial & Product", "Corporate Headshots", "Architecture & Interiors", "Lifestyle Shoots"],
    mediaUrl: "https://media.istockphoto.com/id/1208507762/photo/natural-view-along-karakorum-mountains-at-hunza-valley-with-cherry-blossom-autumn-season.jpg?s=2048x2048&w=is&k=20&c=y8GD724ts7RvkF56q9tXRIX6F0F76fSJE0abN6l6szM="//"https://images.pexels.com/photos/147632/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "immersive-experiences",
    title: "360° Immersive Experiences",
    description: "Transform properties with interactive virtual tours, providing realistic and engaging viewing environments.",
    details: ["Real Estate Tours", "Hotels & Resorts", "Luxury Showrooms", "Holiday Rentals"],
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-pov-shot-inside-a-modern-apartment-41624-large.mp4"
  },
  {
    id: "aerial-cinematography",
    title: "Aerial Cinematography",
    description: "Professional drone filming and photography for real estate, hospitality, construction, and large-scale events.",
    details: ["4K Drone Footage", "Site Surveys", "Tourism Promotion", "Event Coverage"],
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-coastal-city-and-sea-41707-large.mp4"
  },
  {
    id: "post-production",
    title: "Post Production",
    description: "Complete post-production solutions including editing, cinematic color grading, sound design, and VFX.",
    details: ["Precision Editing", "Color Grading", "Sound Design", "VFX & Motion Graphics"],
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-editor-working-on-a-video-editing-software-41680-large.mp4"
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
    mediaUrl: "https://www.youtube.com/embed/MBvsVObj2v0",
    videoProvider: "youtube",
    aspectRatio: "video",
    client: "Roasters Guild",
    year: "2025",
    servicesProvided: [
      "Director of Photography",
      "Color Grading",
      "Post Production",
    ],
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
    //credits: { director: "Vikram Sen", dop: "Amit Kumar", editor: "Vikram Sen" }
  },
  {
    id: "port-3",
    title: "Vanguard Corporate Summit",
    category: "corporate",
    categoryLabel: "Corporate Film",
    description: "A fast-paced, inspiring highlight reel of an international technology keynote, combining multicam feeds and motion titles.",
    mediaType: "video",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-business-people-meeting-around-a-table-41662-large.mp4",
    videoProvider: "direct",
    aspectRatio: "video",
    client: "Vanguard Tech Inc",
    year: "2025",
    servicesProvided: ["Live Multi-Cam Coverage", "Motion Titles", "Highlight Reel Production"],
    //credits: { director: "Rohan Das", dop: "Ramesh Sharma", editor: "Preeti Sahay" }
  },
  {
    id: "port-4",
    title: "The Glass Villa 360°",
    category: "immersive",
    categoryLabel: "Immersive 360° Tour",
    description: "An interactive architectural walk-through of an award-winning glass villa nestled in a forest landscape.",
    mediaType: "video",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-pov-shot-inside-a-modern-apartment-41624-large.mp4",
    videoProvider: "direct",
    aspectRatio: "portrait",
    client: "Glasshouse Developments",
    year: "2025",
    servicesProvided: ["Immersive 360 Video Capture", "Spatial Experience Design", "Aerial Inspection"],
    //credits: { director: "Elena Rostova", dop: "Suresh Babu", editor: "Elena Rostova" }
  },
  {
    id: "port-5",
    title: "Coastal Coastlines Drone",
    category: "aerial",
    categoryLabel: "Aerial Cinematography",
    description: "A series of sweeping 4K drone shots highlighting the intersection of jagged volcanic rocks and pristine blue oceans.",
    mediaType: "video",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-coastal-city-and-sea-41707-large.mp4",
    videoProvider: "direct",
    aspectRatio: "video",
    client: "Blue Horizon Tourism",
    year: "2026",
    servicesProvided: ["Drone Operations", "Landscape Cinematography", "4K Color Grade"],
    //credits: { director: "Kartik Ayyar", dop: "Siddharth Nair", editor: "Kartik Ayyar" }
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
    //credits: { director: "Zara Hadid", dop: "Zara Hadid", editor: "Zara Hadid" }
  },
  {
    id: "port-7",
    title: "Cinematic Grade Reel 2026",
    category: "post",
    categoryLabel: "Post Production / VFX",
    description: "A showcase of high-end color correction, multi-layered compositing, and visual effect transformations.",
    mediaType: "video",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-editor-working-on-a-video-editing-software-41680-large.mp4",
    videoProvider: "direct",
    aspectRatio: "video",
    client: "Penthouse Chapters Showreel",
    year: "2026",
    servicesProvided: ["Color Correcting", "Multi-layered compositing", "VFX Transformations"],
    //credits: { director: "Penthouse Chapters Studio", dop: "Various Contributors", editor: "Anish Patel" }
  },
  {
    id: "port-8",
    title: "Luxury Suite Walkthrough",
    category: "immersive",
    categoryLabel: "Immersive 360° Tour",
    description: "Interactive marketing visuals created for a five-star presidential suite resort, boosting bookings by 40%.",
    mediaType: "image",
    mediaUrl: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1200",
    aspectRatio: "square",
    client: "Presidential Suites Resort",
    year: "2025",
    servicesProvided: ["360 Photography Stills", "Virtual Tour Orchestration"],
    //credits: { director: "Neha Roy", dop: "Neha Roy", editor: "Neha Roy" }
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
