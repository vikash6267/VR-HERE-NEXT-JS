// app/your-page/page.js

import React from "react";
import Component from "./data";

export default function Page({ parmas }) {
  return (
    <div>
      <Component />
    </div>
  );
}

export async function generateMetadata({ params }) {
  return {
    title: "PG Rooms Near VIT Bhopal", // Title
    description:
      "Discover affordable and comfortable PG rooms near VIT Bhopal, Kothari, and surrounding areas, perfect for students seeking convenient accommodation.", // Description
    keywords:
      "PG rooms near VIT Bhopal, student accommodation near Kothari, affordable PGs in Bhopal, best PG rooms near VIT, lodging for students Bhopal", // Keywords tailored for better SEO
    authors: "VR HERE", // Update as needed
    openGraph: {
      title: "PG Rooms Near VIT Bhopal", // Open Graph title
      description:
        "Explore the best budget-friendly PG rooms close to VIT Bhopal and Kothari, ideal for students looking for quality living arrangements.", // Open Graph description
      url: "https://vrhere.in", // Your actual URL
      images: [
        {
          url: "https://vrhere.in/favicon.ico", // Update with an appropriate image URL
          width: 800,
          height: 600,
          alt: "Comfortable and affordable PG rooms near VIT Bhopal", // Alt text for the image
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "PG Rooms Near VIT Bhopal", // Twitter title
      description:
        "Find the most affordable PG rooms near VIT Bhopal and Kothari with excellent amenities and student-friendly services.", // Twitter description
      image: "https://vrhere.in/favicon.ico", // Update with an appropriate image URL
    },
    icons: {
      icon: "/favicon.ico", // Keep or update as needed
    },
  };
}
