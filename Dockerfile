FROM node:12.22.2-alpine as build

WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/app/dist/coin-tracker-client /usr/share/nginx/html
