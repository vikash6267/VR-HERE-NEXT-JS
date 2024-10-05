import React from 'react'
import Component from '../page'
import { singleLocation } from '@/app/service/operations/room'

export async function generateMetadata({ params }) {
  const { id } = params;
  
  // Fetching the singleLocation data
  const locationData = await singleLocation(id);

  // Constructing keywords for SEO
  const keywords = `${locationData?.name}, Tiffin service near ${locationData?.name}, best tiffin service, homemade food, affordable tiffin, healthy meals near ${locationData?.name}`;

  // Dynamically setting metadata based on the location data
  return {
    title: `${locationData?.name} - Best Tiffin Service Near You` || 'Tiffin Service Details',
    description:  `Order the best homemade tiffin service near ${locationData?.name}. Enjoy affordable, healthy, and fresh meals delivered to your doorstep.`,
    keywords: keywords, // Adding keywords
    openGraph: {
      title: `${locationData?.name} - Best Tiffin Service`,
      description: `Looking for affordable and healthy tiffin services? Get fresh meals delivered near ${locationData?.name}.`,
      images: [
        {
          url: '/favicon.ico',
          alt: locationData?.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${locationData?.name} - Best Tiffin Service`,
      description: `Order fresh and healthy tiffin service near ${locationData?.name} for affordable and delicious meals.`,
      images: [
        {
          url: '/favicon.ico',
          alt: locationData?.name,
        },
      ],
    },
  };
}


function page({ params }) {
  const { id } = params

  return (
    <>
      <Component />
    </>
  )
}

export default page
