"use client";

import { useParams, notFound } from "next/navigation";
import FeedbackForm from "@/pages/FeedbackPage/FeedbackForm";

const sedesDisponibles = ["sangilena-bga", "sangilena-campestre"];

export default function FeedbackBySede() {
  const params = useParams();
  const sede = params?.sede as string;

  if (!sedesDisponibles.includes(sede)) {
    notFound();
  }

  return <FeedbackForm sede={sede} />;
}
