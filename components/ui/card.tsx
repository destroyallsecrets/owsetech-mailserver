import * as React from "react"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return <div className={["rounded-retro border-2 border-retroBlue bg-white text-retroBlue shadow-retro", className].filter(Boolean).join(" ")} {...props}>{children}</div>;
}
export function CardHeader({ className, children, ...props }: { className?: string; children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={["flex flex-col space-y-1.5 p-6", className].filter(Boolean).join(" ")} {...props}>{children}</div>;
}
export function CardTitle({ className, children, ...props }: { className?: string; children?: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={["text-2xl font-semibold leading-none tracking-tight text-retroBlue", className].filter(Boolean).join(" ")} {...props}>{children}</h3>;
}
export function CardContent({ className, children, ...props }: { className?: string; children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={["p-6 pt-0", className].filter(Boolean).join(" ")} {...props}>{children}</div>;
}
