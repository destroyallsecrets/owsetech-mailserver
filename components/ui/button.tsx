import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive";
  size?: "default" | "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
  type?: "submit" | "reset" | "button";
}

const base = "inline-flex items-center justify-center rounded-retro text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retroBlue focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-retroGray"
const variants = {
  default: "bg-retroBlue text-white hover:bg-retroBlue/80 shadow-retro",
  outline: "border-2 border-retroBlue bg-white text-retroBlue hover:bg-retroGray/20 hover:text-retroBlue shadow-insetRetro",
  destructive: "bg-red-600 text-white hover:bg-red-700 shadow-retro"
}
const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3",
  lg: "h-11 px-8"
}

export function Button({ className, variant = "default", size = "default", ...props }: ButtonProps) {
  return (
    <button
      className={[
        base,
        variants[variant],
        sizes[size],
        className
      ].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
