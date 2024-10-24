/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
            source: '/home',
            destination: '/',
            permanent: false,
        },
        {
            source: '/index',
            destination: '/',
            permanent: false,
        },
        {
            source: '/app',
            destination: '/',
            permanent: false,
        },
        {
            source: '/admin',
            destination: '/admin/login',
            permanent: false,
        }
      ];
    },
};
  
export default nextConfig;
  