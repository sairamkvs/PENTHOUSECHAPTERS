"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { PortfolioItem } from "@/types";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  item: PortfolioItem | null;
}

export default function Lightbox({ isOpen, onClose, item }: LightboxProps) {
  if (!item) return null;

  const isVideo = item.mediaType === "video";

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <Dialog.Portal forceMount>
            {/* Backdrop Blur Overlay */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl"
              />
            </Dialog.Overlay>

            {/* Content Centering Container */}
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 focus:outline-none"
              >
                <div className="relative w-full max-w-6xl bg-brand-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row h-auto max-h-[90vh] md:max-h-[85vh] z-[10001]">
                  
                  {/* Left Column: Media Showcase Screen */}
                  <div className="flex-1 bg-black min-h-[30vh] md:min-h-0 relative flex items-center justify-center select-none overflow-hidden">
                    {isVideo ? (
                      item.mediaUrl.includes("youtube.com") || item.mediaUrl.includes("youtu.be") ? (
                        <iframe
                          src={item.mediaUrl}
                          className="w-full h-full aspect-video border-none"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                          title={item.title}
                        />
                      ) : (
                        <video
                          src={item.mediaUrl}
                          className="w-full h-full object-contain aspect-video"
                          controls
                          autoPlay
                          playsInline
                        />
                      )
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.mediaUrl}
                        alt={item.title}
                        className="w-full h-full object-contain max-h-[40vh] md:max-h-[80vh]"
                        loading="lazy"
                      />
                    )}
                  </div>

                  {/* Right Column: Metadata / Credits Panel */}
                  <div className="w-full md:w-[360px] xl:w-[420px] bg-brand-black border-t md:border-t-0 md:border-l border-white/10 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-none select-none">
                    <div className="flex flex-col gap-5">
                      
                      {/* Header Details */}
                      <div>
                        <span className="font-outfit text-[9px] font-bold tracking-[0.25em] text-brand-gold uppercase block mb-1">
                          {item.categoryLabel}
                        </span>
                        <h3 className="font-syne text-xl md:text-2xl font-extrabold text-white uppercase leading-tight tracking-wide">
                          {item.title}
                        </h3>
                      </div>

                      {/* Story / Description */}
                      <div className="border-t border-white/5 pt-4">
                        <h4 className="font-outfit text-[9px] font-bold tracking-widest text-white/40 uppercase mb-1.5">
                          THE CONCEPT
                        </h4>
                        <p className="font-inter text-xs text-brand-muted leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Specs Detail Table */}
                      <div className="border-t border-white/5 pt-4 flex flex-col gap-2.5">
                        {item.client && (
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="font-outfit font-bold tracking-wider text-white/40 uppercase">CLIENT</span>
                            <span className="font-inter text-white font-medium">{item.client}</span>
                          </div>
                        )}
                        {item.year && (
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="font-outfit font-bold tracking-wider text-white/40 uppercase">YEAR</span>
                            <span className="font-mono text-white/80">{item.year}</span>
                          </div>
                        )}
                      </div>

                      {/* Services Tag Pill list */}
                      {item.servicesProvided && item.servicesProvided.length > 0 && (
                        <div className="border-t border-white/5 pt-4">
                          <h4 className="font-outfit text-[9px] font-bold tracking-widest text-white/40 uppercase mb-2">
                            SERVICES DELIVERED
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {item.servicesProvided.map((serviceName) => (
                              <span
                                key={serviceName}
                                className="px-2 py-0.5 rounded-full border border-white/10 bg-white/5 font-outfit text-[9px] font-semibold text-white/90 tracking-wide"
                              >
                                {serviceName}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Creative Team Credits */}
                      {item.credits && (
                        <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
                          <h4 className="font-outfit text-[9px] font-bold tracking-widest text-white/40 uppercase mb-1">
                            PRODUCTION TEAM
                          </h4>
                          {item.credits.director && item.credits.director !== "N/A" && (
                            <div className="flex justify-between items-center text-[11px]">
                              <span className="font-inter text-brand-muted/80">Director</span>
                              <span className="font-outfit font-bold tracking-wide text-white">{item.credits.director}</span>
                            </div>
                          )}
                          {item.credits.dop && item.credits.dop !== "N/A" && (
                            <div className="flex justify-between items-center text-[11px]">
                              <span className="font-inter text-brand-muted/80">Cinematographer</span>
                              <span className="font-outfit font-bold tracking-wide text-white">{item.credits.dop}</span>
                            </div>
                          )}
                          {item.credits.editor && item.credits.editor !== "N/A" && (
                            <div className="flex justify-between items-center text-[11px]">
                              <span className="font-inter text-brand-muted/80">Editor</span>
                              <span className="font-outfit font-bold tracking-wide text-white">{item.credits.editor}</span>
                            </div>
                          )}
                        </div>
                      )}

                    </div>

                    {/* Modal Close Action Button */}
                    <Dialog.Close asChild className="mt-6 md:mt-8">
                      <button
                        onClick={onClose}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-brand-gold hover:text-black transition-all duration-300 font-outfit text-xs font-bold tracking-widest cursor-none shadow-[0_0_15px_rgba(255,255,255,0.01)] hover:shadow-[0_0_15px_rgba(229,169,25,0.15)] focus:outline-none"
                        data-magnetic
                      >
                        <X className="h-4 w-4" />
                        CLOSE PROJECT
                      </button>
                    </Dialog.Close>

                  </div>

                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  );
}
