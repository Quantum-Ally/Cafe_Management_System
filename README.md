# Cafe Management System

A microservices-based system designed for a bustling urban cafe shop. This system allows customers to browse the menu, place orders, make payments, and track loyalty points.

## Architecture

The system consists of six microservices:

1. **API Gateway (Port 3000)**: Central entry point that routes requests to appropriate microservices
2. **Menu Service (Port 3001)**: Manages the cafe menu and item availability
3. **Order Service (Port 3002)**: Handles order processing and coordinates with other services
4. **Payment Service (Port 3003)**: Processes payments and records transactions
5. **Inventory Service (Port 3004)**: Maintains stock levels and updates inventory
6. **Customer Service (Port 3005)**: Manages customer profiles and loyalty points

## Features

- Browse menu items and check availability
- Place orders for multiple items
- Process payments
- Track and update inventory in real-time
- Manage customer loyalty points
- Simulate real-time cafe operations

## Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- MongoDB (containerized or external)

## Getting Started

### Database Configuration

1. Create a `.env` file based on the `.env.example` template.
2. Set your MongoDB connection string in the `.env` file.
3. Seed the database with initial data:
   ```
   npm install
   npm run seed
   ```

### Running with Docker Compose

1. Clone the repository:
   ```
   git clone https://github.com/Quantum-Ally/Cafe_Management_System.git
   cd Cafe_Management_System
   ```

2. Build and start the containers:
   ```
   docker-compose up --build
   ```

3. Access the API at `http://localhost:3100` (Docker environment)

When running in Docker, the services are mapped to the following ports:
- API Gateway: http://localhost:3100
- Menu Service: http://localhost:3101
- Order Service: http://localhost:3102
- Payment Service: http://localhost:3103
- Inventory Service: http://localhost:3104
- Customer Service: http://localhost:3105

### Running Locally for Development

1. Install dependencies for all services:
   ```
   npm run install-all
   ```

2. Start all services:
   ```
   npm run dev
   ```

   Or on Windows:
   ```
   run-dev.bat
   ```

   Or on Linux/macOS:
   ```
   chmod +x run-dev.sh
   ./run-dev.sh
   ```

## Use Case Scenario

This system supports a customer, Emma, who uses the cafe mobile app to:

1. Browse the menu and check her loyalty points
2. Order a latte ($4.0) and blueberry muffin ($3.0) for takeaway
3. Pay for her order (total $7.0)
4. Receive confirmation while the cafe updates inventory
5. Earn loyalty points (7 points for a $7 order)

## API Endpoints

### Menu Service
- GET `/menu` - Get all menu items
- GET `/menu/:id` - Get a specific menu item

### Order Service
- POST `/orders` - Create a new order
- GET `/orders/:id` - Get a specific order

### Payment Service
- POST `/payments` - Process a payment for an order

### Inventory Service
- POST `/inventory/update` - Update inventory levels

### Customer Service
- GET `/customers/:id` - Get customer details
- POST `/customers/update-points` - Update customer loyalty points

## CI/CD Pipeline

The project includes GitHub Actions workflows for continuous integration and deployment:

1. Automatically builds Docker images on pushes to the main branch
2. Pushes images to Docker Hub
3. Requires Docker Hub credentials to be set as repository secrets

## Implementation Details

- MongoDB is used for persistent storage across all services
- Each service is containerized using Docker
- Services communicate with each other via HTTP requests
- The API Gateway uses http-proxy-middleware for routing 