FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

ENV MONGO=mongodb://jurus:frhnd2330@35.227.17.140:27017/jurus

EXPOSE 9090
CMD [ "npm", "start" ]
