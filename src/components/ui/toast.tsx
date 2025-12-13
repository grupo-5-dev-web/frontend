"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";

import { cva } from "class-variance-authority";
import { cn } from "../utils";

type ToastProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & {
  message: string;
  variant?: "default" | "success" | "error";
};

const toastVariants = cva("max-w-md rounded-md border p-4 shadow-lg ", {
  variants: {
    variant: {
      default: "bg-stone-100 border-stone-200",
      success: "bg-emerald-500 border-emerald-600 text-white",
      error: "bg-rose-500 border-rose-600 text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Toast = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, message, variant = "default", ...props }, ref) => (
  <ToastPrimitive.Provider swipeDirection="right">
    <ToastPrimitive.Root
      className={cn(toastVariants({ variant, className }))}
      ref={ref}
      {...props}
    >
      <ToastPrimitive.Description className="text-sm font-medium">
        {message}
      </ToastPrimitive.Description>
    </ToastPrimitive.Root>
    <ToastPrimitive.Viewport className="fixed top-0 right-0 flex p-8 w-auto max-w-full z-50" />
  </ToastPrimitive.Provider>
));
Toast.displayName = ToastPrimitive.Root.displayName;

export { Toast };
