FROM node:latest
WORKDIR /app
COPY package.json .
COPY index.js .
RUN npm install
CMD ["node", "index.js"]
ENV TTY true
