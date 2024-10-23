import React from 'react'
import Component from './component'
import { singleRoom } from '@/app/service/operations/room';

function page({params}) {
  const {slug} = params;
  console.log(slug)


  return (
    <div>
      <Component />
    </div>
  )
}

export default page


export async function generateMetadata({ params }) {
  const { slug } = params;

  // Fetching the singleRoom data based on slug
  const roomData = await singleRoom(slug);

  // Constructing keywords for SEO
  const keywords = `${roomData?.pgName}, best rooms in ${roomData?.Location[0]?.name}, affordable rooms, PG rooms, hostels, rooms with amenities ,near vit bhopal , near pg rooms vit bhopal, vit bhopal pg rooms, `;

  // Constructing the schema markup
  const schemaMarkup = {
    "@context": "https://schema.org/",
    "@type": "Accommodation",
    name: roomData?.pgName || "room Title",
    image: roomData?.images?.map((img) => img.url) || roomData?.images?.[0]?.url,
    description: roomData?.desc || "room Description",
    sku: roomData?.slug || "room SKU",
    brand: "VR Here",
    offers: {
      "@type": "Offer",
      url: `https://vrhere.in/single-room/${roomData?.slug || "room-id"}`,
      priceCurrency: "INR",
      price: roomData?.price || "300",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
    },
  };

  // Dynamically setting metadata based on the room data
  return {
    title: `${roomData?.pgName} - Best Room with Amenities` || 'Room Details',
    description:  `Find the best rooms at ${roomData?.pgName} with amenities like ${roomData?.wifi ? "WiFi, " : ""}${roomData?.ac ? "AC, " : ""}${roomData?.foodAvailable ? "food available, " : ""} and more. Affordable pricing at ${roomData?.price} with a deposit of ${roomData?.depositeAmount}.`,
    keywords: keywords, // Adding SEO-friendly keywords
    icons: {
      icon: roomData?.images?.[0]?.url,
    },
    openGraph: {
      title: `${roomData?.pgName} - Best Room with Amenities`,
      description: `Check out the details of this room at ${roomData?.pgName} with amenities like ${roomData?.wifi ? "WiFi, " : ""}${roomData?.ac ? "AC, " : ""}${roomData?.foodAvailable ? "food available, " : ""} and more.`,
      images: [
        {
          url: roomData?.images?.[0]?.url || '/default-room.jpg',
          alt: roomData?.pgName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${roomData?.pgName} - Best Room`,
      description: `Explore the amenities and affordable pricing at ${roomData?.pgName}. Book your room now!`,
      images: [
        {
          url: roomData?.images?.[0]?.url || '/default-room.jpg',
          alt: roomData?.pgName,
        },
      ],
    },
    // Adding the schema markup
    schemaMarkup: JSON.stringify(schemaMarkup),
  };
}
