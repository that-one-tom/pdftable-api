FROM node:14
WORKDIR /usr/src/app
COPY . .
RUN npm install && mkdir uploads
EXPOSE 8080
CMD ["node", "app.js"]
