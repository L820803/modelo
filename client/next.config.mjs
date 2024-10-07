/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                // Todas as rotas que começam com /server serão redirecionadas para o backend Laravel
                source: '/server/:path*',
                destination: 'http://laravel/:path*',  // Redireciona para o serviço Laravel dentro do Docker
            },
        ];
    },
};

export default nextConfig;
