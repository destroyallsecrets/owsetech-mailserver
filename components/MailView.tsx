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
  const mail = useQuery(api.mail.get, { id });
  const currentUser = useQuery(api.users.getCurrentUser);
  const deleteMail = useMutation(api.mail.deleteMail);
  const router = useRouter();

  if (mail === undefined) return (
    <div className="min-h-screen bg-[#e5e3db] flex items-center justify-center">
      <div className="text-xl">Loading...</div>
    </div>
  );

  if (mail === null) return (
    <div className="min-h-screen bg-[#e5e3db] flex items-center justify-center">
      <div className="text-xl text-red-600">You need to register an email address to view mail.</div>
    </div>
  );

  function parseAddress(address: string) {
    const [username, domain] = address.split("@");
    return { username, domain };
  }
  
  const from = parseAddress(mail.from);
  const to = parseAddress(mail.to);
  const isFromCurrentUser = currentUser && mail.from === `${currentUser.username}@${currentUser.domain}`;
  
  const handleReply = () => {
    const replyTo = isFromCurrentUser ? mail.to : mail.from;
    const replySubject = mail.subject.startsWith("Re: ") ? mail.subject : `Re: ${mail.subject}`;
    const replyBody = `\n\n--- Original Message ---\nFrom: ${mail.from}\nTo: ${mail.to}\nSubject: ${mail.subject}\n\n${mail.body}`;
    
    const params = new URLSearchParams({
      to: replyTo,
      subject: replySubject,
      body: replyBody
    });
    
    router.push(`/send?${params.toString()}`);
  };

  const handleDelete = async () => {
    await deleteMail({ id });
    router.push("/");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-[#e5e3db] flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-retro border-4 border-[#b0b0b0] bg-white">
        <CardHeader className="border-b-2 border-[#b0b0b0]">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-retroBlue">
              {mail.subject || "(no subject)"}
              {mail.isDraft && <span className="text-lg text-orange-600 ml-2">[DRAFT]</span>}
            </CardTitle>
            <div className="flex gap-2">
              {mail.isDraft && (
                <Button
                  variant="outline"
                  onClick={() => router.push(`/send?draft=${mail._id}`)}
                >
                  Edit Draft
                </Button>
              )}
              {!mail.isDraft && (
                <Button variant="outline" onClick={handleReply}>
                  Reply
                </Button>
              )}
              <Button variant="outline" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
          
          <div className="space-y-3 mt-4">
            <div className="flex items-center gap-4">
              <Avatar name={`@${from.username}@${from.domain}`} size={48} />
              <div>
                <div className="text-lg font-medium">
                  From: <Link 
                    href={`/profile/${from.username}/${from.domain}`} 
                    className="text-retroBlue hover:underline"
                  >
                    @{from.username}@{from.domain}
                  </Link>
                </div>
                <div className="text-sm text-retroBlue/60">
                  {formatDate(mail.date)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Avatar name={`@${to.username}@${to.domain}`} size={40} />
              <div className="text-lg">
                To: <Link 
                  href={`/profile/${to.username}/${to.domain}`} 
                  className="text-retroBlue hover:underline"
                >
                  @{to.username}@{to.domain}
                </Link>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="whitespace-pre-wrap text-lg leading-relaxed mb-6">
            {mail.body}
          </div>
          
          <div className="flex gap-4 pt-4 border-t-2 border-[#b0b0b0]">
            <Button 
              variant="outline" 
              onClick={() => router.push("/")}
              className="text-lg py-3 px-6"
            >
              Back to Inbox
            </Button>
            {!mail.isDraft && (
              <Button 
                onClick={handleReply}
                className="text-lg py-3 px-6 bg-retroBlue hover:bg-retroBlue/80"
              >
                Reply
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
