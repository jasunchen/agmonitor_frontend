# pull official base image
FROM node:16

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm config set unsafe-perm true
RUN npm install -g npm@8.4.0
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache


# add app
COPY ./ ./

RUN chown -R node /app/node_modules

USER node

# start app
CMD ["npm", "run", "start"]