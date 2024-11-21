"use client"; // Ensure this is at the top

import { Provider } from "react-redux"; // Import Redux Provider
import store from "./redux/reducer/store"; // Import the Redux store
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./globals.css";
import localFont from "next/font/local";
import Script from "next/script";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager Script */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-TCCZGFG3GB"
          dangerouslySetInnerHTML={{
            __html: `
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
            `,
          }}
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
                  window.dataLayer = window.dataLayer || [];
                   function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-TCCZGFG3GB');`}
        </Script>

        {/* Structured Data Script (Optional) */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "VR Here",
              image: "https://vrhere.com/favicon.ico",
              url: "https://vrhere.com",
              telephone: "+91-6267144122",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Address near VIT Bhopal",
                addressLocality: "Ashta",
                addressRegion: "MP",
                postalCode: "466115",
                addressCountry: "IN",
              },
              description:
                "Find affordable PGs near VIT Bhopal with top-notch amenities. Locations include Ashta, Sehore, and Kothari Kalan.",
              priceRange: "$$",
            }),
          }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          {children}
          <ToastContainer />
        </Provider>

        {/* GTM NoScript (for users with JS disabled) */}
      </body>
    </html>
  );
}
