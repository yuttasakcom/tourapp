FROM node:alpine

# Create app folder
RUN mkdir -p /app
WORKDIR /app

# Cache npm dependencies
COPY package.json yarn.lock /app/

RUN yarn install --production

# Copy application files
COPY . /app

EXPOSE 4000

CMD ["yarn", "start"]
