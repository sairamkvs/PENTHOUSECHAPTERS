"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  mediaType: "image" | "video";
  mediaUrl: string;
  title: string;
}

export default function Lightbox({ isOpen, onClose, mediaType, mediaUrl, title }: LightboxProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <Dialog.Portal forceMount>
            {/* Backdrop Overlay */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md"
              />
            </Dialog.Overlay>

            {/* Content Container */}
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed inset-0 z-[101] flex items-center justify-center p-4 focus:outline-none"
              >
                <div className="relative w-full max-w-5xl aspect-video bg-brand-black rounded-lg overflow-hidden border border-white/10 shadow-2xl flex flex-col">
                  {/* Top Header Bar */}
                  <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between px-6 z-10 pointer-events-none">
                    <Dialog.Title className="font-outfit text-xs md:text-sm font-semibold tracking-wider text-white uppercase select-none pointer-events-auto">
                      {title}
                    </Dialog.Title>
                    <Dialog.Close asChild className="pointer-events-auto">
                      <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/10 hover:bg-brand-gold hover:text-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                        aria-label="Close Lightbox"
                      >
                        <X className="h-4 w-4 md:h-5 md:w-5" />
                      </button>
                    </Dialog.Close>
                  </div>

                  {/* Media Content */}
                  <div className="flex-1 w-full h-full flex items-center justify-center bg-black">
                    {mediaType === "video" ? (
                      mediaUrl.includes("youtube.com") || mediaUrl.includes("youtu.be") ? (
                        <iframe
                          src={mediaUrl}
                          className="w-full h-full border-none"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                          title={title}
                        />
                      ) : (
                        <video
                          src={mediaUrl}
                          className="w-full h-full object-contain"
                          controls
                          autoPlay
                          playsInline
                        />
                      )
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={mediaUrl}
                        alt={title}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    )}
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
