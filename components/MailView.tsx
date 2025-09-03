"use client";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar } from "./ui/avatar";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MailView({ id }: { id: Id<"mail"> }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#e5e3db] flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-retro border-4 border-[#b0b0b0] bg-white">
        <CardHeader className="border-b-2 border-[#b0b0b0]">
          <CardTitle className="text-2xl font-bold text-retroBlue text-center">
            Mail Functionality Temporarily Disabled
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8 text-center">
          <div className="text-lg leading-relaxed mb-6 text-retroBlue/80">
            Mail viewing is currently unavailable. Please check back later.
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => router.push("/")}
            className="text-lg py-3 px-6 bg-retroBlue hover:bg-retroBlue/80 text-white"
          >
            Back to Inbox
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
