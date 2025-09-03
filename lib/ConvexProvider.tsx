"use client";

import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ReactNode } from "react";

interface ConvexProviderProps {
  children: ReactNode;
  client: ConvexReactClient;
}

export function ConvexProvider({ children, client }: ConvexProviderProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  if (!publishableKey) {
    console.error("Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
    return <div>Configuration Error: Missing Clerk publishable key</div>;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ConvexProviderWithClerk client={client} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
