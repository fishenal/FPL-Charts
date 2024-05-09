/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "zh"],
    defaultLocale: "en",
    localeDetection: false,
  },
};

module.exports = nextConfig;
