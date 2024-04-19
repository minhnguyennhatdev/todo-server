FROM node:18-alpine

LABEL boybetby <boybetby@gmail.com>

ARG PORT=8001
ARG DOCKER_IMAGE_NAME=todo-server

# Create app directory
RUN mkdir -p /usr/src/${DOCKER_IMAGE_NAME}
WORKDIR /usr/src/${DOCKER_IMAGE_NAME}

# Install app dependencies
COPY package.json yarn.lock /usr/src/${DOCKER_IMAGE_NAME}/
RUN yarn install --frozen-lockfile --non-interactive --cache-folder .yarn-cache

# Bundle app source
COPY . /usr/src/${DOCKER_IMAGE_NAME}

EXPOSE ${PORT}
CMD [ "yarn", "start" ]