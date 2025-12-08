FROM node:23.11.0-alpine AS build

WORKDIR /build

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:23.11.0-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /build/dist/ ./dist
COPY --from=build /build/prisma ./prisma

RUN npx prisma generate

EXPOSE $PORT

CMD [ "node", "dist/app.js" ]