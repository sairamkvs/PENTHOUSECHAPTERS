"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  type?: "success" | "error" | "info";
  duration?: number;
}

type ToastContextType = {
  toast: (props: Omit<ToastProps, "id">) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const toast = React.useCallback(({ duration = 4000, ...props }: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, duration, ...props }]);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastPrimitive.Provider>
        {children}
        
        {toasts.map(({ id, title, description, type = "success", duration }) => (
          <ToastPrimitive.Root
            key={id}
            duration={duration}
            onOpenChange={(open) => !open && removeToast(id)}
            className={cn(
              "fixed bottom-4 right-4 z-[99999] flex w-full max-w-sm flex-col gap-1.5 rounded-lg border p-4 shadow-xl backdrop-blur-md transition-all md:bottom-6 md:right-6",
              "animate-[slideIn_150ms_cubic-bezier(0.16,1,0.3,1)] data-[state=closed]:animate-[fadeOut_100ms_ease-in]",
              type === "success" && "border-emerald-500/30 bg-emerald-950/95 text-white",
              type === "error" && "border-rose-500/30 bg-rose-950/95 text-white",
              type === "info" && "border-brand-gold/30 bg-brand-black/95 text-white"
            )}
          >
            <div className="flex items-start gap-3">
              {type === "success" && <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />}
              {type === "error" && <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />}
              {type === "info" && <Info className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />}
              
              <div className="flex-1">
                {title && (
                  <ToastPrimitive.Title className="font-outfit text-sm font-semibold tracking-wide">
                    {title}
                  </ToastPrimitive.Title>
                )}
                {description && (
                  <ToastPrimitive.Description className="text-xs text-white/80 mt-1 leading-relaxed">
                    {description}
                  </ToastPrimitive.Description>
                )}
              </div>
              
              <ToastPrimitive.Close asChild>
                <button className="text-white/40 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-brand-gold rounded">
                  <X className="h-4 w-4" />
                </button>
              </ToastPrimitive.Close>
            </div>
          </ToastPrimitive.Root>
        ))}
        
        <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-[99999] flex flex-col p-4 md:p-6 gap-2 w-full max-w-sm" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
