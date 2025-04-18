const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://mongodb:27017/cafe';

const connectMongo = async () => {
  console.log('Connecting to MongoDB...');
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Menu Item Schema
const menuItemSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: String,
  price: Number,
  stock: Number,
});

// Customer Schema
const customerSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: String,
  email: String,
  loyaltyPoints: { type: Number, default: 0 },
});

// Create models
const MenuItem = mongoose.model('MenuItem', menuItemSchema);
const Customer = mongoose.model('Customer', customerSchema);

// Seed data
const seedDatabase = async () => {
  try {
    // Clear existing data
    await MenuItem.deleteMany({});
    await Customer.deleteMany({});
    
    console.log('Seeding menu items...');
    await MenuItem.insertMany([
      { id: 1, name: 'Latte', price: 4.0, stock: 100 },
      { id: 2, name: 'Blueberry Muffin', price: 3.0, stock: 50 },
      { id: 3, name: 'Cappuccino', price: 3.5, stock: 100 },
      { id: 4, name: 'Espresso', price: 2.5, stock: 100 },
      { id: 5, name: 'Chocolate Croissant', price: 3.5, stock: 40 },
    ]);
    
    console.log('Seeding customers...');
    await Customer.insertMany([
      { id: 1, name: 'Emma', email: 'emma@example.com', loyaltyPoints: 10 },
      { id: 2, name: 'John', email: 'john@example.com', loyaltyPoints: 5 },
    ]);
    
    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

const run = async () => {
  await connectMongo();
  await seedDatabase();
  process.exit(0);
};

run(); 