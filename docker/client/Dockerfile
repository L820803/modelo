# Stage 1: Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de package.json e instalar dependências
COPY ./client/package.json ./client/package-lock.json ./
RUN npm install --legacy-peer-deps

# Copiar todos os arquivos da pasta client para o diretório de trabalho
COPY ./client .

USER root

# Executar o build de produção
RUN npm run build

# Crie o diretório se não existir e ajuste as permissões
RUN mkdir -p /app/.next/cache/images && \
    chown -R node:node /app/.next

# Stage 2: Runner Stage
FROM node:18-alpine AS runner

WORKDIR /app

# Copiar apenas os arquivos essenciais da build
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/node_modules /app/node_modules

# Expor a porta do Next.js
EXPOSE 3000

# Definir a variável de ambiente para produção
ENV NODE_ENV=production
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_SECRET=2Hzkp5CXVzr6EHMjMVOKfbppY2eV/xmer12XqHXm6hk=
ENV NEXT_PUBLIC_API_URL=http://localhost:3000/server

USER root

# Comando para iniciar a aplicação em modo produção
CMD ["npm", "start"]
