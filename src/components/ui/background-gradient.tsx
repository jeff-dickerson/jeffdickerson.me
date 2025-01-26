import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function BackgroundGradient({
  children,
  className,
  ...props
}: BackgroundGradientProps) {
  return (
    <div
      className={cn(
        "relative group/gradient",
        "before:absolute before:w-full before:h-full before:rounded-[inherit] before:opacity-0 before:transition-opacity",
        "before:bg-[radial-gradient(circle_at_top,theme(colors.primary),transparent_75%)]",
        "hover:before:opacity-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}