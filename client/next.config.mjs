/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                // Todas as rotas que começam com /server serão redirecionadas para o backend Laravel
                source: '/server/:path*',
                destination: 'http://laravel/:path*',  // Redireciona para o serviço Laravel dentro do Docker
            },
        ];
    },
    // Outras configurações
    reactStrictMode: true,
    swcMinify: true,  // Ativar minificação em produção
    output: 'standalone',  // Importante para permitir SSR em produção
};

export default nextConfig;
