FROM node:alpine

# Create app folder
RUN mkdir -p /app
WORKDIR /app

# Cache npm dependencies
COPY package.json yarn.lock /app/

RUN yarn

# Copy application files
COPY . /app

EXPOSE 8080

CMD ["node", "src/index.js"]
