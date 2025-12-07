FROM node:24-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci

FROM node:24-alpine AS development

WORKDIR /app

COPY package*.json ./

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start:dev"]

FROM dependencies AS builder

WORKDIR /app

COPY . .

RUN npm run build

FROM node:24-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/doc ./doc

EXPOSE 4000

CMD ["npm", "run", "start:prod"]