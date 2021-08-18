FROM node:12 as build-stage-moderator
WORKDIR /app
COPY package*.json ./
#RUN rm package-lock.json
RUN npm install 
RUN npm install @vue/cli-service
COPY ./ .
RUN npm run build

FROM nginx as production-stage-moderator
RUN mkdir /app
COPY --from=build-stage-moderator /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
