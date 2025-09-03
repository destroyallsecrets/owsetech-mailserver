import { Suspense } from "react";
import SendMail from "../../components/SendMail";

// Disable static generation to prevent RSC prefetch issues
export const dynamic = 'force-dynamic';

export default function SendPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#e5e3db] flex items-center justify-center"><div className="text-xl">Loading...</div></div>}>
      <SendMail />
    </Suspense>
  );
}
