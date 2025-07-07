"use client";

import { useParams, redirect } from "next/navigation";

const redirects = [
  { slug: "feedback-sangilena-bga", url: "https://systeapp.com/feedback/sangilena-bga" },
  { slug: "feedback-sangilena-campestre", url: "https://systeapp.com/feedback/sangilena-campestre" },
];

export default function ShortenerPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const match = redirects.find((r) => r.slug === slug);

  if (match) {
    redirect(match.url);
  }

  redirect("/not-found");
}
