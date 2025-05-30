# Etapa 1: Build da aplicação
FROM oven/bun:1.1 AS builder

WORKDIR /app

# Copia apenas os arquivos essenciais primeiro para cache eficiente
COPY bun.lockb package.json ./
COPY tsconfig.json vite.config.ts tailwind.config.ts ./
COPY public ./public
COPY src ./src

# Instala dependências e builda o projeto
RUN bun install --frozen-lockfile
RUN bun run build

# Etapa 2: Imagem leve apenas para servir arquivos estáticos
FROM nginx:alpine

# Copia o build do Vite (saída em /app/dist por padrão)
COPY --from=builder /app/dist /usr/share/nginx/html

# Remove a configuração padrão do Nginx (opcional, para personalizar)
RUN rm /etc/nginx/conf.d/default.conf

# Adiciona uma configuração básica do Nginx
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
