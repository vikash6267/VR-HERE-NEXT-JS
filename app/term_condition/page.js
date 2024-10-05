import React from 'react'
import Component from "./component"
function page() {
  return (
    <div>
        <Component />
    </div>
  )
}

export default page

// Function to generate metadata for the Terms and Conditions page
export const generateMetadata = () => {
    return {
      title: 'Terms and Conditions - VR Here',
      description: 'Review the comprehensive Terms and Conditions of VR Here at vrhere.in, your trusted platform for PG room rentals and tiffin services. Ensure you understand and agree to these terms before using our services.',

      icons: {
        icon: "/favicon.ico",
      },
    };
  };
  