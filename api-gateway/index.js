const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 3000;

app.use(express.json());

// Root route for API health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Cafe Management System API Gateway',
    services: {
      menu: '/menu',
      orders: '/orders',
      payments: '/payments',
      inventory: '/inventory',
      customers: '/customers'
    }
  });
});

// Proxy routes to respective services
app.use('/menu', createProxyMiddleware({ target: 'http://menu-service:3001', changeOrigin: true, pathRewrite: {'^/menu': ''} }));
app.use('/orders', createProxyMiddleware({ target: 'http://order-service:3002', changeOrigin: true, pathRewrite: {'^/orders': ''} }));
app.use('/payments', createProxyMiddleware({ target: 'http://payment-service:3003', changeOrigin: true, pathRewrite: {'^/payments': ''} }));
app.use('/inventory', createProxyMiddleware({ target: 'http://inventory-service:3004', changeOrigin: true, pathRewrite: {'^/inventory': ''} }));
app.use('/customers', createProxyMiddleware({ target: 'http://customer-service:3005', changeOrigin: true, pathRewrite: {'^/customers': ''} }));

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});