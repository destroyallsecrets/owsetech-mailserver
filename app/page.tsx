"use client";
import Inbox from "../components/Inbox";

// Disable static generation to prevent build issues with Convex
export const dynamic = 'force-dynamic';

export default function Home() {
  return <Inbox />;
}
