"use client";

import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ReactNode, useEffect, useState } from "react";

interface ConvexProviderProps {
  children: ReactNode;
  client: ConvexReactClient;
}

export function ConvexProvider({ children, client }: ConvexProviderProps) {
  const [isClient, setIsClient] = useState(false);
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!publishableKey) {
    console.error("Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
    return <div>Configuration Error: Missing Clerk publishable key</div>;
  }

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ConvexProviderWithClerk client={client} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
