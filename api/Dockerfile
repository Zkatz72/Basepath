FROM node:22

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy API source
COPY . .

EXPOSE 3001

CMD ["npm", "start"]