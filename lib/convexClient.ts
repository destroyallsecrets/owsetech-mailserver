import { ConvexReactClient } from "convex/react";

// TODO: Replace with your actual Convex deployment URL
export const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
