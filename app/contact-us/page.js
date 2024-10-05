
import React from 'react'
import Contact from './Contact'

function page() {
  return (
    <>
    <Contact />
    </>
  )
}

export default page


export const metadata = {
    title: "Contact VR HERE", // Title
    description: "Get in touch with VR HERE for the best Tiffin services and meal options near VIT Bhopal. We are here to help you with any inquiries or feedback.", // Description
    keywords: "contact VR HERE, Tiffin services inquiry, meal options near VIT Bhopal, student meal services, affordable Tiffin providers", // Keywords tailored for better SEO
    authors: "VR HERE", // Update as needed
    openGraph: {
        title: "Contact VR HERE", // Open Graph title
        description: "Reach out to VR HERE for inquiries about Tiffin services near VIT Bhopal. We are dedicated to providing the best meal solutions for students and professionals.", // Open Graph description
        url: "https://vrhere.in/contact", // Your actual URL for the contact page
        images: [
            {
                url: "https://vrhere.in/favicon.ico", // Update with an appropriate image URL for the contact page
                width: 800,
                height: 600,
                alt: "Contact VR HERE for Tiffin services inquiries", // Alt text for the image
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact VR HERE", // Twitter title
        description: "Have questions about our Tiffin services near VIT Bhopal? Contact VR HERE for quick responses and quality meal options.", // Twitter description
        image: "https://vrhere.in/favicon.ico", // Update with an appropriate image URL for the contact page
    },
    icons: {
        icon: "/favicon.ico", // Keep or update as needed
    },
};
