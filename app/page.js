import React from 'react'
import Home from './component/homeComponent';
function page() {
  return (
    <>
      <Home />
    </>
  )
}

export default page



export function generateMetadata() {
  return {
    metadataBase: new URL('https://vrhere.in/'), // Set the metadataBase to your domain

    title: "VR Here - Best PG and Tiffin Services Near VIT Bhopal",
    description: "Discover the best PG accommodations and Tiffin centers close to VIT Bhopal. We offer great deals in Ashta, Kothari, and Sehore. Visit VR Here",
    keywords: "PG rooms near VIT Bhopal, Tiffin services VIT Bhopal, Affordable PG near VIT Bhopal, Student accommodation VIT Bhopal",
    icons: {
      icon: '/favicon.ico',
    },
    openGraph: {
      title: "Affordable PG Rooms and Tiffin Services Near VIT Bhopal",
      description: "Explore the best PG accommodations and Tiffin services in Ashta, Sehore, and Kothari Kalan, near VIT Bhopal.",
      url: "https://vrhere.in/",
      type: "website",
      images: [
        {
          url: "/favicon.ico", // Larger image for social media previews
          width: 1200,
          height: 630,
          alt: "Affordable PG and Tiffin Services Near VIT Bhopal"
        }
      ],
    },
  };
}
