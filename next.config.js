// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/Login",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["d1muf25xaso8hp.cloudfront.net"],
  },
};
