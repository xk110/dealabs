### STAGE 1: Build ###
FROM node:latest AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:latest
COPY default.conf /etc/nginx/conf.d
COPY --from=build /usr/src/app/dist/dealabs /usr/share/nginx/html