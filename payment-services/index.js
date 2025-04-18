const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const app = express();
const port = 3003;

app.use(express.json());

// MongoDB connection with retry
const connectMongo = async () => {
  let retries = 5;
  while (retries > 0) {
    try {
      const mongoUri = process.env.MONGODB_URI || 'mongodb://mongodb:27017/cafe';
      await mongoose.connect(mongoUri);
      console.log('Payment Service connected to MongoDB');
      break;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      retries--;
      if (retries === 0) throw error;
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};
connectMongo().catch(console.error);

// Payment Schema
const paymentSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  orderId: Number,
  amount: Number,
  status: String,
});

const Payment = mongoose.model('Payment', paymentSchema);

app.post('/payments', async (req, res) => {
  const { orderId, amount } = req.body;
  if (!orderId || !amount) {
    return res.status(400).json({ error: 'Order ID and amount required' });
  }

  try {
    // Verify order with Order Service
    const orderResponse = await axios.get(`http://order-service:3002/orders/${orderId}`);
    const order = orderResponse.data;

    if (order.total !== amount) {
      return res.status(400).json({ error: 'Payment amount does not match order total' });
    }

    const paymentCount = await Payment.countDocuments();
    const payment = new Payment({ id: paymentCount + 1, orderId, amount, status: 'completed' });
    await payment.save();

    // Update order status
    await axios.patch(`http://order-service:3002/orders/${orderId}`, { status: 'paid' });

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

app.listen(port, () => {
  console.log(`Payment Service running on port ${port}`);
});