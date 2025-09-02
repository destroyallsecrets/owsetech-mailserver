"use client";
import { ConvexProvider } from "../lib/ConvexProvider";
import { convex } from "../lib/convexClient";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.className + " bg-background text-foreground min-h-screen"}>
      <ConvexProvider client={convex}>{children}</ConvexProvider>
    </div>
  );
}
