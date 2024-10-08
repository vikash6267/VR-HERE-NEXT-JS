import React from 'react'
import Component from '../page'
import { singleLocation } from '@/app/service/operations/room'

export async function generateMetadata({ params }) {
  const { id } = params;
  
  // Fetching the singleLocation data
  const locationData = await singleLocation(id);

  // Constructing keywords for SEO
  const keywords = `${locationData?.name}, PG near ${locationData?.name}, PG rooms, hostels, affordable rooms, rentals near ${locationData?.name}`;

  // Dynamically setting metadata based on the location data
  return {
    title: `${locationData?.name} - Best PG Rooms Near You` || 'Location Details',
    description:  `Find the best PG rooms near ${locationData?.name} for affordable and comfortable living.`,
    keywords: keywords, // Adding keywords
    openGraph: {
      title: `${locationData?.name} - Best PG Rooms`,
      description: `Check out affordable PG rooms and rentals near ${locationData?.name}.`,
      images: [
        {
          url: '/favicon.ico',
          alt: locationData?.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${locationData?.name} - Best PG Rooms`,
      description: locationData?.description || `Find comfortable PG rooms near ${locationData?.name}.`,
      images: [
        {
          url:  '/favicon.ico',
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
