"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Avatar } from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { notFound } from "next/navigation";

export default function ProfileClient({ username, domain }: { username: string; domain: string }) {
  const user = useQuery(api.users.getByAddress, {
    username,
    domain,
  });

  if (user === undefined) return <div className="p-4">Loading...</div>;
  if (!user) return notFound();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-retroGray p-4">
      <div className="w-full max-w-lg bg-white rounded-retro shadow-retro border-4 border-retroBlue p-6 animate-fade-in">
        <div className="flex items-center gap-4 mb-4">
          <Avatar name={user.displayName || user.username} size={64} />
          <div className="flex-1">
            <div className="text-2xl font-extrabold text-retroBlue">@{user.username}@{user.domain}</div>
            <div className="text-sm text-retroBlue/80">{user.displayName}</div>
          </div>
          <Button variant="outline" onClick={() => window.history.back()}>Back</Button>
        </div>
        <div className="mb-2 text-base text-retroBlue/80 whitespace-pre-line">{user.bio}</div>
      </div>
    </div>
  );
}
