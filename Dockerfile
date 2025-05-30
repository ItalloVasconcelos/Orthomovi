# Etapa 1: Build da aplicação com Bun
FROM oven/bun:1.1 AS builder

WORKDIR /app

# Copia arquivos essenciais para o build
COPY bun.lockb package.json ./
COPY tsconfig.json vite.config.ts tailwind.config.ts ./
COPY index.html ./
COPY public ./public
COPY src ./src

# Instala dependências e gera o build do Vite
RUN bun install --frozen-lockfile
RUN bun run build

# Etapa 2: Imagem leve apenas para servir os arquivos estáticos
FROM nginx:alpine

# Copia o build do Vite (por padrão, gerado em /app/dist)
COPY --from=builder /app/dist /usr/share/nginx/html

# Remove a config padrão do nginx (opcional)
RUN rm /etc/nginx/conf.d/default.conf

# Adiciona sua configuração personalizada do nginx (deve estar no mesmo diretório do Dockerfile)
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
