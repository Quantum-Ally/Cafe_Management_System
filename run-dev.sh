#!/bin/bash

# Start MongoDB if not already running
echo "Checking if MongoDB is running..."
if ! nc -z localhost 27017 2>/dev/null; then
  echo "MongoDB is not running. Please start MongoDB before continuing."
  echo "If you're using Docker, you can run: docker run -d -p 27017:27017 --name mongodb mongo:latest"
  echo "If you're using MongoDB Atlas, make sure to update the .env file with your connection string."
  exit 1
fi

# Install dependencies if node_modules doesn't exist
echo "Checking for dependencies..."
for d in api-gateway menu-services order-services payment-services inventory-services customer-services; do
  if [ ! -d "$d/node_modules" ]; then
    echo "Installing dependencies for $d..."
    (cd $d && npm install)
  fi
done

# Start all services
echo "Starting all services..."
npx concurrently \
  "cd api-gateway && node index.js" \
  "cd menu-services && node index.js" \
  "cd order-services && node index.js" \
  "cd payment-services && node index.js" \
  "cd inventory-services && node index.js" \
  "cd customer-services && node index.js" 