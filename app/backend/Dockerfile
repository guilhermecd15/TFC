FROM node:16-alpine

WORKDIR /

COPY . .

EXPOSE 3001

ADD ./node_modules.tar.gz .

CMD ["npm", "start"]
