/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["en", "ru"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "ru",
  },
};

export default nextConfig;
