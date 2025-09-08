FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npx @nestjs/cli build

FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY prisma ./prisma/

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/node_modules/@prisma ./node_modules/@prisma

RUN mkdir -p /usr/src/app/dist && \
    ln -sf /usr/src/app/dist/src/main.js /usr/src/app/dist/main.js

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
