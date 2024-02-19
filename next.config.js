/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    i18n: {
      locales: ["en", "fr", "sq", "it"],
      defaultLocale: "en",
      domains: [
        {
          domain: "127.0.0.1",
          defaultLocale: "en",
        },
      ],
      
    }
}

module.exports = nextConfig;