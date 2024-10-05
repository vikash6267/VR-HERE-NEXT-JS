/** @type {import('next').NextConfig} */
const nextConfig = {
    
    trailingSlash: true,
    images: {
        remotePatterns: [{
          hostname:'res.cloudinary.com'
        }],
      },
    };
    
    export default nextConfig;
    