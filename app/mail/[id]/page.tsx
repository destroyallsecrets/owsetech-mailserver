"use client";
import MailView from "../../../components/MailView";
import { useParams } from "next/navigation";
import { Id } from "../../../convex/_generated/dataModel";

export default function MailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  if (!id) {
    return <div>Mail ID not found</div>;
  }
  
  // Convert string param to Convex Id type
  return <MailView id={id as Id<"mail">} />;
}
