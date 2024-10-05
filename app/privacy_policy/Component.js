'use client';
import React from 'react';
import NavbarContainer from '../component/common/Navbar/Navbar';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <NavbarContainer />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p>
            Welcome to VR Here, the premier platform for connecting users with
            reliable PG room rentals and tiffin services. Your privacy is
            critically important to us. This Privacy Policy outlines how we
            collect, use, and safeguard your personal information when you use
            our services at <strong>vrhere.in</strong>.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
          <p>
            At VR Here, we collect various types of information to provide you
            with a seamless experience on <strong>vrhere.in</strong>. This includes:
          </p>
          <ul className="list-disc list-inside ml-6">
            <li>
              <strong>Vendor Information:</strong> Details about the rooms,
              including amenities, pricing, and availability, provided by PG
              vendors.
            </li>
            <li>
              <strong>User Information:</strong> Personal details such as your
              name, email address, and phone number to facilitate communication
              and service delivery.
            </li>
            <li>
              <strong>Usage Data:</strong> Information on how you interact with
              our platform, which helps us improve our services.
            </li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. How We Use Information</h2>
          <p>
            The information we collect is used to enhance your experience on VR
            Here. Specifically, we use your data to:
          </p>
          <ul className="list-disc list-inside ml-6">
            <li>Facilitate bookings and service requests for PG rooms and tiffin services.</li>
            <li>Communicate with you regarding your inquiries or orders.</li>
            <li>Improve and personalize the functionality of our platform.</li>
            <li>
              Ensure the security of our users by monitoring for any
              unauthorized access or misuse.
            </li>
          </ul>
          <p className="mt-2">
            We do not share your personal information with third parties without
            your explicit consent, except as necessary to provide the services
            you have requested.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
          <p>
            VR Here is committed to protecting your personal information. We
            employ advanced security measures, including encryption and
            firewalls, to safeguard your data against unauthorized access,
            alteration, or disclosure. We continuously review our security
            practices to ensure that your data is protected at all times on <strong>vrhere.in</strong>.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. User Rights</h2>
          <p>
            As a valued user of VR Here, you have the right to:
          </p>
          <ul className="list-disc list-inside ml-6">
            <li>
              Access the personal information we hold about you and request
              corrections or updates.
            </li>
            <li>
              Request the deletion of your personal data, subject to any legal
              obligations that may require us to retain certain information.
            </li>
            <li>
              Withdraw your consent to the processing of your data at any time.
            </li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, please contact us at{" "}
            <a
              href="mailto:vrhere.in@gmail.com"
              className="text-blue-500"
            >
              vrhere.in@gmail.com
            </a>.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time to reflect
            changes in our practices or legal requirements. We encourage you to
            review this policy periodically to stay informed about how we are
            protecting your information on <strong>vrhere.in</strong>.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
          <p>
            If you have any questions or concerns about our Privacy Policy or
            the way we handle your information, please don't hesitate to reach
            out to us. You can contact us via email at{" "}
            <a
              href="mailto:vrhere.in@gmail.com"
              className="text-blue-500"
            >
              vrhere.in@gmail.com
            </a>{" "}
            or by phone at{" "}
            <a href="tel:+916267144122" className="text-blue-500">
              +91 6267144122
            </a>
            ,{" "}
            <a href="tel:+919009594537" className="text-blue-500">
              +91 9009594537
            </a>
            . Our support team is here to assist you with any inquiries or
            concerns.
          </p>
        </section>
      </div>
    </div>
  );
};

// Add the generateMetadata function for SEO
export const generateMetadata = () => {
  return {
    title: "Privacy Policy - VR Here",
    description:
      "Explore the Privacy Policy of VR Here at vrhere.in, your trusted platform for PG room rentals and tiffin services. Learn how we collect, use, and protect your personal information, and understand your rights as a user.",
  };
};

export default PrivacyPolicy;
