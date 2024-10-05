import React from 'react'
import Componet from '../SingleTifin'
import { singleTifin } from '@/app/service/operations/tifin';
function page({params}) {
    const {slug} = params;
    console.log(slug)
  return (
    <div>

        <Componet />
    </div>
  )
}

export default page





export async function generateMetadata({ params }) {
  const { slug } = params;

  // Fetching the singleTifin data based on slug
  const tifinData = await singleTifin(slug);

  // Constructing keywords for SEO, including location
  const locationKeywords = "VIT Bhopal University, tiffin service near VIT Bhopal, food delivery near VIT Bhopal";
  const keywords = `${tifinData?.tag?.join(", ") || "tiffin service, food delivery"}, ${locationKeywords} ${tifinData?.name}, best tifin center in ${tifinData?.Location[0]?.name}`;

  // Constructing schema markup for structured data
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tifinData?.name || "Default Product Title",
    image: tifinData?.images?.[0]?.url || "default-image-url.jpg",
    description: `Check out our affordable and tasty tiffin service near VIT Bhopal University.`,
    offers: {
      "@type": "Offer",
      url: `https://vrhere.in/tifin/${tifinData?.slug}`,
      priceCurrency: "INR",
      price: tifinData?.price || "0",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
    },
    location: {
      "@type": "Place",
      name: "VIT Bhopal University",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kothari Kalan",
        addressRegion: "Madhya Pradesh",
        postalCode: "466115", // Update as necessary
        addressCountry: "IN",
      },
    },
  };

  return {
    title: tifinData?.name || "Default Product Title",
    description: tifinData?.description || "Discover the best tiffin service near VIT Bhopal University with affordable pricing and delicious food.",
    keywords: keywords, // Adding SEO-friendly keywords
    icons: {
      icon: tifinData?.images?.[0]?.url || "default-icon-url.jpg",
    },
    openGraph: {
      title: tifinData?.name || "Default Product Title",
      url: `https://vrhere.in/tifin/${tifinData?.slug || "product-id"}`,
      description: tifinData?.description || "Check out our affordable and tasty tiffin service near VIT Bhopal University.",
      image: tifinData?.images?.[0]?.url || "default-image-url.jpg",
      site_name: "VR Here",
      // Removed invalid OpenGraph type
    },
    twitter: {
      card: 'summary_large_image',
      title: tifinData?.name || "Default Product Title",
      description: tifinData?.description || "Discover delicious food with our tiffin service near VIT Bhopal University.",
      image: tifinData?.images?.[0]?.url || "default-image-url.jpg",
    },
    schemaMarkup: schemaMarkup, // Schema markup
  };
}
