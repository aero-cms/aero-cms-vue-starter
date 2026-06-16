FROM node:22-alpine AS build
WORKDIR /app
ARG NUXT_PUBLIC_CMS_API_URL=http://api:8090
ARG NUXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NUXT_PUBLIC_ADMIN_ORIGIN=http://admin:80
ENV NUXT_PUBLIC_CMS_API_URL=$NUXT_PUBLIC_CMS_API_URL
ENV NUXT_PUBLIC_SITE_URL=$NUXT_PUBLIC_SITE_URL
ENV NUXT_PUBLIC_ADMIN_ORIGIN=$NUXT_PUBLIC_ADMIN_ORIGIN
COPY package*.json ./
RUN npm ci 2>/dev/null || npm install
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
COPY --from=build /app/.output ./
EXPOSE 3000
CMD ["node", "server/index.mjs"]
