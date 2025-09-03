"use client";

import { SignIn } from "@clerk/nextjs";
import { RetroWindow } from "../../components/RetroWindow";
import { useEffect, useState } from "react";

export default function Auth() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#e5e3db] flex items-center justify-center p-4">
        <RetroWindow title="Sign In">
          <div className="p-8 text-center">
            <div className="text-xl text-retroBlue">Loading...</div>
          </div>
        </RetroWindow>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e5e3db] flex items-center justify-center p-4">
      <RetroWindow title="Sign In">
        <div className="p-8">
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto w-full max-w-3xl",
                card: "bg-white shadow-retro border-4 border-[#b0b0b0] p-8",
                headerTitle: "text-2xl font-bold text-retroBlue",
                headerSubtitle: "text-lg text-retroBlue/60",
                formButtonPrimary: "bg-retroBlue hover:bg-retroBlue/80 text-white font-bold py-4 px-8 rounded",
                formFieldInput: "border-2 border-[#b0b0b0] p-4 text-xl w-full",
                formFieldLabel: "text-lg font-medium text-retroBlue",
                dividerLine: "border-t-2 border-[#b0b0b0]",
                dividerText: "text-retroBlue/60",
                footerActionLink: "text-retroBlue hover:text-retroBlue/80",
              },
            }}
          />
        </div>
      </RetroWindow>
    </div>
  );
}
