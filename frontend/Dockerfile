# === Build ===
FROM node:16.13.2-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . ./

RUN yarn build

# === Nginx ===
FROM nginx:latest

COPY --from=build /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
