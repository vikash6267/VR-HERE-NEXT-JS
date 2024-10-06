"use client"; // Ensure this is at the top

import { Provider } from 'react-redux'; // Import Redux Provider
import store from './redux/reducer/store'; // Import the Redux store
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import "./globals.css";
import localFont from 'next/font/local';

// Font imports
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "VR Here",
  "image": "https://vrhere.com/favicon.ico",
  "@id": "",
  "url": "https://yourwebsite.com",
  "telephone": "+91-6267144122",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Address near VIT Bhopal",
    "addressLocality": "Ashta",
    "addressRegion": "MP",
    "postalCode": "466116",
    "addressCountry": "IN",
  },
  "description": "Find affordable PGs near VIT Bhopal with top-notch amenities. Locations include Ashta, Sehore, and Kothari Kalan.",
  "priceRange": "$$",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
  {/* Title and Meta Tags */}
   
  {/* Favicons and Apple Touch Icon */}
  <link rel="icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="manifest" href="/manifest.json" />

  {/* Open Graph Meta Tags */}
  <meta property="og:title" content="VR Here - Find My PG" />
  <meta property="og:description" content="Explore PG Rooms And Tifin Center In Ashta, Sehore, Kothari Kalan, Near VIT Bhopal" />
  <meta property="og:url" content="https://vrhere.in/" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="/favicon.ico" />


  <script>
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NXPLMVRG');
          `}
        </script>
  {/* Structured Data for SEO */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
  />
</head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          {children}
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
