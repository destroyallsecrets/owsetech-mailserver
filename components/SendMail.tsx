"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useRouter, useSearchParams } from "next/navigation";
import { Id } from "../convex/_generated/dataModel";

export default function SendMail() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userSearch, setUserSearch] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [draftId, setDraftId] = useState<Id<"mail"> | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get parameters from URL
  useEffect(() => {
    const draftParam = searchParams.get("draft");
    const toParam = searchParams.get("to");
    const subjectParam = searchParams.get("subject");
    const bodyParam = searchParams.get("body");
    
    if (draftParam) {
      setDraftId(draftParam as Id<"mail">);
    }
    
    // Set reply parameters if present
    if (toParam) setTo(toParam);
    if (subjectParam) setSubject(subjectParam);
    if (bodyParam) setBody(bodyParam);
  }, [searchParams]);

  const sendMail = useMutation(api.mail.send);
  const saveDraft = useMutation(api.mail.saveDraft);
  const users = useQuery(api.users.searchUsers, { query: userSearch });
  const draft = useQuery(api.mail.get, draftId ? { id: draftId } : "skip");

  // Draft functionality disabled
  useEffect(() => {
    // Draft loading disabled
  }, [draft]);

  const handleSend = async () => {
    setError(null);
    setSuccess(null);
    
    // Validate to address: must be username@domain
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/.test(to)) {
      setError("Recipient must be in the format username@domain");
      return;
    }
    
    try {
      await sendMail({ to, subject, body, isDraft: false });
      setSuccess("Mail sent successfully!");
      setTimeout(() => router.push("/"), 1500);
    } catch (err: any) {
      setError(err.message || "Failed to send mail");
    }
  };

  const handleSaveDraft = async () => {
    setError(null);
    setSuccess(null);
    
    try {
      const id = await saveDraft({ 
        id: draftId || undefined, 
        to, 
        subject, 
        body 
      });
      setDraftId(id);
      setSuccess("Draft saved!");
    } catch (err: any) {
      setError(err.message || "Failed to save draft");
    }
  };

  const selectUser = (user: any) => {
    setTo(`${user.username}@${user.domain}`);
    setUserSearch("");
    setShowUserDropdown(false);
  };

  const filteredUsers = users?.filter(user => 
    user.username.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.domain.toLowerCase().includes(userSearch.toLowerCase()) ||
    (user.displayName && user.displayName.toLowerCase().includes(userSearch.toLowerCase()))
  ) || [];

  return (
    <div className="min-h-screen bg-[#e5e3db] flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-retro border-4 border-[#b0b0b0] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-retroBlue">
            {draftId ? "Edit Draft" : "Compose Mail"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="space-y-6">
            {/* Recipient Field with User Search */}
            <div className="relative">
              <label className="block text-lg font-medium mb-2">To:</label>
              <Input 
                placeholder="Search users or type username@domain" 
                value={userSearch || to}
                onChange={e => {
                  const value = e.target.value;
                  setUserSearch(value);
                  setTo(value);
                  setShowUserDropdown(value.length > 0 && !value.includes("@"));
                }}
                onFocus={() => setShowUserDropdown(userSearch.length > 0 && !userSearch.includes("@"))}
                className="text-xl py-4"
                required 
              />
              
              {/* User Dropdown */}
              {showUserDropdown && filteredUsers.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border-2 border-[#b0b0b0] rounded shadow-lg max-h-48 overflow-y-auto">
                  {filteredUsers.slice(0, 10).map((user) => (
                    <div
                      key={`${user.username}@${user.domain}`}
                      className="px-4 py-3 hover:bg-[#f5f5f5] cursor-pointer border-b border-[#e0e0e0]"
                      onClick={() => selectUser(user)}
                    >
                      <div className="font-medium">{user.username}@{user.domain}</div>
                      {user.displayName && (
                        <div className="text-sm text-gray-600">{user.displayName}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Subject:</label>
              <Input 
                placeholder="Subject" 
                value={subject} 
                onChange={e => setSubject(e.target.value)} 
                className="text-xl py-4"
                required 
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Message:</label>
              <Textarea 
                placeholder="Write your message here..." 
                value={body} 
                onChange={e => setBody(e.target.value)} 
                className="text-lg"
                required 
                rows={8} 
              />
            </div>

            {error && (
              <div className="text-red-600 text-lg font-semibold bg-red-50 p-3 rounded border-2 border-red-200">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-600 text-lg font-semibold bg-green-50 p-3 rounded border-2 border-green-200">
                {success}
              </div>
            )}

            <div className="flex gap-4">
              <Button 
                variant="outline" 
                type="button" 
                className="flex-1 text-xl py-6" 
                onClick={() => router.push("/")}
              >
                Cancel
              </Button>
              <Button 
                type="button" 
                variant="outline"
                className="flex-1 text-xl py-6" 
                onClick={handleSaveDraft}
              >
                Save Draft
              </Button>
              <Button 
                type="submit" 
                className="flex-1 text-xl py-6 bg-retroBlue hover:bg-retroBlue/80"
              >
                Send Mail
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
