# hadolint ignore=DL3007
FROM cgr.dev/chainguard/node:latest AS build

WORKDIR /build

COPY package.json package-lock.json ./

RUN npm ci

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

RUN npm run build

RUN npm ci --omit=dev && npm cache clean --force


FROM gcr.io/distroless/nodejs24-debian13:latest

WORKDIR /app

COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/dist ./dist
COPY --from=build /build/prisma ./prisma
COPY --from=build /build/package.json ./package.json

EXPOSE $PORT

CMD [ "dist/server.js" ]