FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# This sails app will start at port 1337
EXPOSE 1337

# Start the sails backend server
CMD ["npm", "run", "prod"]
