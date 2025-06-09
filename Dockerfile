FROM oven/bun:1.1 AS builder

WORKDIR /app

# Copia tudo do projeto para dentro do container
COPY . .

RUN bun install
RUN bun run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
