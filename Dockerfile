# Dockerfile for Next.js
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Set environment variable at build time
ARG NEXT_PUBLIC_AUTH_BASE_URL
ENV NEXT_PUBLIC_AUTH_BASE_URL=$NEXT_PUBLIC_AUTH_BASE_URL

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
