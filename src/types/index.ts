export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details?: string[];
  mediaUrl?: string; // URL for hovered image/video preview
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "films" | "corporate" | "photography" | "immersive" | "aerial" | "post";
  categoryLabel: string;
  description: string;
  mediaType: "image" | "video";
  mediaUrl: string; // Source URL (direct MP4, YouTube Embed, or high-res image)
  videoProvider?: "youtube" | "vimeo" | "direct";
  aspectRatio?: "video" | "square" | "portrait";
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface BrandItem {
  id: string;
  name: string;
}
