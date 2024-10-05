import React from 'react'
import PrivacyPolicy from './Component'

function page() {
  return (
    <div>
        <PrivacyPolicy />
    </div>
  )
}

export default page


export const generateMetadata = () => {
    return {
      title: 'Privacy Policy - VR Here',
      description: 'Explore the Privacy Policy of VR Here at vrhere.in, your trusted platform for PG room rentals and tiffin services. Learn how we collect, use, and protect your personal information, and understand your rights as a user.',
      icons: {
        icon: "/favicon.ico",
      },
    };
  };