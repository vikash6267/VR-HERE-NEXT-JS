
  export default function robots() {
    const baseURL = "https://www.vrhere.in";
    return {
      rules: {
        userAgent: "*",
        allow: ["/", "/*"],
        disallow: ["/admin/*"],
      },
      sitemap: `${baseURL}/sitemap.xml`,
    };
  }