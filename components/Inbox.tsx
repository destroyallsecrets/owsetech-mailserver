
"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { Input } from "./ui/input";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";



export default function Inbox() {
  const router = useRouter();
  const { user } = useUser();

  // All hooks must be called at the top level
  const [currentFolder, setCurrentFolder] = useState("inbox");
  const [activeTab, setActiveTab] = useState("Mail");

  // Use proper mail functions with auth
  const mails = useQuery(api.mail.list, { folder: currentFolder }) || [];
  const currentUser = useQuery(api.users.getCurrentUser);
  const deleteMail = useMutation(api.mail.deleteMail);
  const restoreMail = useMutation(api.mail.restoreMail);
  const markAsRead = useMutation(api.mail.markAsRead);

  function parseAddress(address: string) {
    const [username, domain] = address.split("@");
    return { username, domain };
  }

  function formatDate(ts: number) {
    return new Date(ts).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }



  return (
    <div className="bg-[#e5e3db] min-h-screen">
      <div className="container mx-auto px-2 sm:px-8 lg:px-16 flex flex-row min-h-screen max-w-7xl">
        {/* Sidebar */}
        <aside className="w-80 bg-[#e5e3db] border-r-2 border-[#b0b0b0] flex flex-col py-0">
          <div className="font-bold text-3xl px-8 py-6 border-b-2 border-[#b0b0b0]">Navigation</div>
          <nav className="flex flex-col gap-3 py-4">
            <button
              type="button"
              onClick={() => setCurrentFolder("inbox")}
              className={`flex items-center gap-4 px-8 py-5 ${currentFolder === "inbox" ? "bg-[#3a6ea5] text-white" : "hover:bg-[#d3d3c7]"} font-bold border-2 border-[#b0b0b0] rounded-md text-2xl w-full active:scale-95 transition-all shadow-lg`}
              aria-label="View inbox folder"
            >
              <span className="inline-block w-10 h-10 bg-yellow-300 border-2 border-[#b0b0b0] mr-3 rounded-[4px]" aria-hidden="true"></span>
              Inbox
            </button>
            <Link href="/send" className="flex items-center gap-4 px-8 py-5 bg-[#3a6ea5] text-white font-bold border-2 border-[#b0b0b0] rounded-md text-2xl w-full active:scale-95 transition-all shadow-lg" aria-label="Compose new email">
              <span className="inline-block w-10 h-10 bg-green-300 border-2 border-[#b0b0b0] mr-3 rounded-[4px]" aria-hidden="true"></span>
              Compose
            </Link>
            <button
              type="button"
              onClick={() => setCurrentFolder("drafts")}
              className={`flex items-center gap-4 px-8 py-5 ${currentFolder === "drafts" ? "bg-[#3a6ea5] text-white" : "hover:bg-[#d3d3c7]"} font-bold border-2 border-[#b0b0b0] rounded-md text-2xl w-full active:scale-95 transition-all shadow-lg`}
              aria-label="View drafts folder"
            >
              <span className="inline-block w-10 h-10 bg-yellow-300 border-2 border-[#b0b0b0] mr-3 rounded-[4px]" aria-hidden="true"></span>
              Drafts
            </button>
            <button
              type="button"
              onClick={() => setCurrentFolder("sent")}
              className={`flex items-center gap-4 px-8 py-5 ${currentFolder === "sent" ? "bg-[#3a6ea5] text-white" : "hover:bg-[#d3d3c7]"} font-bold border-2 border-[#b0b0b0] rounded-md text-2xl w-full active:scale-95 transition-all shadow-lg`}
              aria-label="View sent items folder"
            >
              <span className="inline-block w-10 h-10 bg-yellow-300 border-2 border-[#b0b0b0] mr-3 rounded-[4px]" aria-hidden="true"></span>
              Sent Items
            </button>
            <button
              type="button"
              onClick={() => setCurrentFolder("deleted")}
              className={`flex items-center gap-4 px-8 py-5 ${currentFolder === "deleted" ? "bg-[#3a6ea5] text-white" : "hover:bg-[#d3d3c7]"} font-bold border-2 border-[#b0b0b0] rounded-md text-2xl w-full active:scale-95 transition-all shadow-lg`}
              aria-label="View deleted items folder"
            >
              <span className="inline-block w-10 h-10 bg-yellow-300 border-2 border-[#b0b0b0] mr-3 rounded-[4px]" aria-hidden="true"></span>
              Deleted Items
            </button>
          </nav>
        </aside>
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col bg-[#e5e3db] p-0 min-h-screen">
          {/* Tabs */}
          <div className="flex flex-row gap-0 border-b-2 border-[#b0b0b0] text-2xl">
            <button
              type="button"
              className={`px-8 py-5 border-l-2 border-t-2 border-r-2 border-[#b0b0b0] font-bold active:scale-95 transition-all ${activeTab === "Mail" ? "bg-white -mb-[2px]" : "bg-[#e5e3db] border-b-2"}`}
              onClick={() => setActiveTab("Mail")}
              aria-label="Mail tab"
            >
              Mail
            </button>
            <button
              type="button"
              className={`px-8 py-5 border-l-2 border-t-2 border-r-2 border-[#b0b0b0] font-bold active:scale-95 transition-all ${activeTab === "General" ? "bg-white -mb-[2px]" : "bg-[#e5e3db] border-b-2"}`}
              onClick={() => setActiveTab("General")}
              aria-label="General settings tab"
            >
              General
            </button>
            <button
              type="button"
              className={`px-8 py-5 border-l-2 border-t-2 border-r-2 border-[#b0b0b0] font-bold active:scale-95 transition-all ${activeTab === "View" ? "bg-white -mb-[2px]" : "bg-[#e5e3db] border-b-2"}`}
              onClick={() => setActiveTab("View")}
              aria-label="View settings tab"
            >
              View
            </button>
            <button
              type="button"
              className={`px-8 py-5 border-l-2 border-t-2 border-r-2 border-[#b0b0b0] font-bold active:scale-95 transition-all ${activeTab === "Settings" ? "bg-white -mb-[2px]" : "bg-[#e5e3db] border-b-2"}`}
              onClick={() => setActiveTab("Settings")}
              aria-label="Account settings tab"
            >
              Settings
            </button>
          </div>
          {/* Content Area */}
          <section className="flex-1 border-2 border-[#b0b0b0] m-8 bg-white p-8">
            <SignedOut>
              <div className="text-center py-12">
                <h2 className="text-3xl font-bold text-retroBlue mb-4">Welcome to Mail Server</h2>
                <p className="text-xl text-retroBlue/60 mb-8">Please sign in to access your mailbox</p>
                <SignInButton mode="modal">
                  <Button className="text-xl py-6 px-8 bg-retroBlue hover:bg-retroBlue/80">
                    Sign In to Continue
                  </Button>
                </SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              {activeTab === "Mail" && (
              <div>
                {/* Folder Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-[#b0b0b0]">
                  <h2 className="text-2xl font-bold text-retroBlue capitalize">
                    {currentFolder} ({mails?.length || 0})
                  </h2>
                  {currentUser && (
                    <div className="text-lg text-retroBlue/80">
                      {currentUser.username}@{currentUser.domain}
                    </div>
                  )}
                </div>

                {mails.map((mail) => {
                  const from = parseAddress(mail.from);
                  const to = parseAddress(mail.to);
                  const isFromCurrentUser = currentUser && mail.from === `${currentUser.username}@${currentUser.domain}`;
                  const displayAddress = isFromCurrentUser ? to : from;
                  const addressLabel = isFromCurrentUser ? "To" : "From";
                  
                  return (
                    <div
                      key={mail._id}
                      className={`flex items-center gap-4 px-6 py-4 border-b border-[#b0b0b0] hover:bg-[#f5f5f5] cursor-pointer group ${!mail.isRead && currentFolder === "inbox" ? "bg-blue-50" : ""}`}
                    >
                      <Avatar name={`@${displayAddress.username}@${displayAddress.domain}`} size={48} />
                      <div 
                        className="flex-1 min-w-0"
                        onClick={() => {
                          if (currentFolder === "inbox" && !mail.isRead) {
                            markAsRead({ id: mail._id });
                          }
                          router.push(`/mail/${mail._id}`);
                        }}
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <div className={`text-xl truncate ${!mail.isRead && currentFolder === "inbox" ? "font-bold" : "font-medium"}`}>
                            {mail.subject || "(no subject)"}
                            {mail.isDraft && <span className="text-sm text-orange-600 ml-2">[DRAFT]</span>}
                            {!mail.isRead && currentFolder === "inbox" && <span className="text-blue-600 ml-2">●</span>}
                          </div>
                          <div className="text-sm text-retroBlue/60 whitespace-nowrap">
                            {formatDate(mail._creationTime)}
                          </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <div className="text-sm text-retroBlue/80">
                            {addressLabel}: <span className="hover:underline">@{displayAddress.username}@{displayAddress.domain}</span>
                          </div>
                          <div className="text-sm text-retroBlue/60 truncate">{mail.body}</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100">
                        {/* Draft Edit Button */}
                        {mail.isDraft && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              router.push(`/send?draft=${mail._id}`);
                            }}
                          >
                            Edit
                          </Button>
                        )}
                        
                        {/* Delete/Restore Button */}
                        {currentFolder === "deleted" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              restoreMail({ id: mail._id });
                            }}
                          >
                            Restore
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              deleteMail({ id: mail._id });
                            }}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
                
                {mails?.length === 0 && (
                  <div className="text-center py-12 text-retroBlue/60 text-xl">
                    {currentFolder === "inbox" && "No messages in inbox"}
                    {currentFolder === "sent" && "No sent messages"}
                    {currentFolder === "drafts" && "No draft messages"}
                    {currentFolder === "deleted" && "No deleted messages"}
                  </div>
                )}
              </div>
            )}

            {activeTab === "General" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b-2 border-[#b0b0b0] pb-4">
                  <h2 className="text-2xl font-bold text-retroBlue">Mail Options</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <input id="auto-save-drafts" type="checkbox" className="w-6 h-6 border-2 border-[#b0b0b0] rounded" />
                    <label htmlFor="auto-save-drafts" className="text-xl cursor-pointer">Auto-save drafts</label>
                  </div>
                  <div className="flex items-center gap-4">
                    <input id="show-email-preview" type="checkbox" className="w-6 h-6 border-2 border-[#b0b0b0] rounded" />
                    <label htmlFor="show-email-preview" className="text-xl cursor-pointer">Show email preview</label>
                  </div>
                  <div className="flex items-center gap-4">
                    <input id="enable-notifications" type="checkbox" className="w-6 h-6 border-2 border-[#b0b0b0] rounded" />
                    <label htmlFor="enable-notifications" className="text-xl cursor-pointer">Enable desktop notifications</label>
                  </div>
                  <div className="pt-6">
                    <Button
                      className="text-xl py-6 px-8 bg-retroBlue hover:bg-retroBlue/80"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "View" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b-2 border-[#b0b0b0] pb-4">
                  <h2 className="text-2xl font-bold text-retroBlue">Display Settings</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label htmlFor="font-size" className="text-xl min-w-[200px]">Font Size:</label>
                    <select id="font-size" className="text-xl px-4 py-2 border-2 border-[#b0b0b0] rounded bg-white">
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-4">
                    <label htmlFor="messages-per-page" className="text-xl min-w-[200px]">Messages per page:</label>
                    <select id="messages-per-page" className="text-xl px-4 py-2 border-2 border-[#b0b0b0] rounded bg-white">
                      <option>25</option>
                      <option>50</option>
                      <option>100</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-4">
                    <label htmlFor="message-preview" className="text-xl min-w-[200px]">Message preview:</label>
                    <select id="message-preview" className="text-xl px-4 py-2 border-2 border-[#b0b0b0] rounded bg-white">
                      <option>1 line</option>
                      <option>2 lines</option>
                      <option>3 lines</option>
                    </select>
                  </div>
                  <div className="pt-6">
                    <Button
                      className="text-xl py-6 px-8 bg-retroBlue hover:bg-retroBlue/80"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Settings" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b-2 border-[#b0b0b0] pb-4">
                  <h2 className="text-2xl font-bold text-retroBlue">Account Settings</h2>
                </div>
                <div className="space-y-6">
                  <SignedIn>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <label className="block text-xl mb-2">Current Email</label>
                        <Input
                          value={user?.primaryEmailAddress?.emailAddress || "Not available"}
                          disabled
                          className="text-xl py-4 bg-[#f0f0f0]"
                        />
                      </div>
                      <div>
                        <label className="block text-xl mb-2">Display Name</label>
                        <Input
                          value={user?.fullName || ""}
                          placeholder="Your display name"
                          className="text-xl py-4"
                        />
                      </div>
                    </div>
                    <div className="pt-4 flex justify-between items-center border-t-2 border-[#b0b0b0]">
                      <div className="flex items-center gap-4">
                        <UserButton 
                          appearance={{
                            elements: {
                              avatarBox: "w-12 h-12",
                              userButtonPopoverCard: "bg-white border-2 border-[#b0b0b0]"
                            }
                          }}
                        />
                        <span className="text-xl">Manage Account</span>
                      </div>
                      <Button
                        className="text-xl py-6 px-8 bg-retroBlue hover:bg-retroBlue/80"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </SignedIn>
                  <SignedOut>
                    <div className="text-center py-8">
                      <p className="text-xl mb-4">Please sign in to access account settings</p>
                      <SignInButton mode="modal">
                        <Button className="text-xl py-6 px-8 bg-retroBlue hover:bg-retroBlue/80">
                          Sign In
                        </Button>
                      </SignInButton>
                    </div>
                  </SignedOut>
                </div>
              </div>
            )}
            </SignedIn>
          </section>
        </main>
      </div>
    </div>
  );
}
