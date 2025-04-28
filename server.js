const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/scm-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define schemas
const InventorySchema = new mongoose.Schema({
  productId: String,
  name: String,
  quantity: Number,
  location: String,
  lastUpdated: Date
});

const OrderSchema = new mongoose.Schema({
  orderId: String,
  products: [{
    productId: String,
    quantity: Number
  }],
  status: String,
  createdAt: Date
});

const models = {
  Inventory: mongoose.model('Inventory', InventorySchema),
  Order: mongoose.model('Order', OrderSchema)
};

// API Endpoints
app.get('/api/inventory', async (req, res) => {
  const inventory = await models.Inventory.find();
  res.json(inventory);
});

app.post('/api/inventory/update', async (req, res) => {
  await models.Inventory.updateOne(
    { productId: req.body.productId },
    { $inc: { quantity: req.body.quantity } }
  );
  res.json({ success: true });
});

// Add more endpoints for orders, analytics, etc.

app.listen(3001, () => console.log('Server running on port 3001'));