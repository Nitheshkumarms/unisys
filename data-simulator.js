const { Inventory, Order } = require('./models');

const products = [
  { productId: 'P1001', name: 'Widget A', quantity: 150, location: 'A1' },
  { productId: 'P1002', name: 'Gadget B', quantity: 75, location: 'B2' },
  { productId: 'P1003', name: 'Tool C', quantity: 200, location: 'C3' }
];

const simulateData = async () => {
  // Clear existing data
  await Inventory.deleteMany({});
  
  // Seed initial inventory
  await Inventory.insertMany(products);
  
  // Simulate random changes every 5 minutes
  setInterval(async () => {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const change = Math.floor(Math.random() * 10) - 5; // -5 to +5
    
    await Inventory.updateOne(
      { productId: randomProduct.productId },
      { $inc: { quantity: change } }
    );
    
    console.log(`Updated ${randomProduct.name} by ${change}`);
  }, 300000);
};

simulateData();