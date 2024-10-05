import React from 'react'
import Tifin from './component'
function page({parmas}) {
  return (
    <>
        <Tifin />
    </>
  )
}

export default page


export const metadata = {
    title: "Tiffin Services Near VIT Bhopal", // Title
    description: "Discover delicious and affordable Tiffin services near VIT Bhopal, Kothari, and surrounding areas, perfect for students and professionals seeking convenient meal options.", // Description
    keywords: "Tiffin services near VIT Bhopal, student meal services near Kothari, affordable Tiffin providers in Bhopal, best Tiffin services near VIT", // Keywords tailored for better SEO
    authors: "VR HERE", // Update as needed
    openGraph: {
        title: "Tiffin Services Near VIT Bhopal", // Open Graph title
        description: "Explore the best budget-friendly Tiffin services close to VIT Bhopal and Kothari, ideal for students and working professionals looking for quality meals.", // Open Graph description
        url: "https://vrhere.in/favicon.ico", // Your actual URL for Tiffin services
        images: [
            {
                url: "https://vrhere.in/favicon.ico", // Update with an appropriate image URL for Tiffin services
                width: 800,
                height: 600,
                alt: "Delicious and affordable Tiffin services near VIT Bhopal", // Alt text for the image
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Tiffin Services Near VIT Bhopal", // Twitter title
        description: "Find the most affordable Tiffin services near VIT Bhopal and Kothari, providing home-cooked meals with excellent quality.", // Twitter description
        image: "https://vrhere.in/favicon.ico", // Update with an appropriate image URL for Tiffin services
    },
    icons: {
        icon: "/favicon.ico", // Keep or update as needed
    },
};
