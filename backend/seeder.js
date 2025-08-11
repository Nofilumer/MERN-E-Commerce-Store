import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import Category from './models/categoryModel.js';

dotenv.config();

// Sample categories
const categories = [
  { name: 'Electronics' },
  { name: 'Clothing' },
  { name: 'Home & Kitchen' },
  { name: 'Books' },
  { name: 'Sports & Outdoors' },
  { name: 'Beauty & Personal Care' },
  { name: 'Toys & Games' },
  { name: 'Automotive' }
];

// Sample products
const products = [
  {
    name: 'iPhone 15 Pro',
    image: '/images/iphone15pro.jpg',
    brand: 'Apple',
    quantity: 50,
    category: null, // Will be replaced with actual category ID
    description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system',
    rating: 4.8,
    numReviews: 125,
    price: 999,
    countInStock: 25
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    image: '/images/galaxys24.jpg',
    brand: 'Samsung',
    quantity: 40,
    category: null,
    description: 'Premium Android phone with S Pen, 200MP camera, and AI features',
    rating: 4.7,
    numReviews: 89,
    price: 1199,
    countInStock: 30
  },
  {
    name: 'MacBook Air M3',
    image: '/images/macbookair.jpg',
    brand: 'Apple',
    quantity: 30,
    category: null,
    description: 'Ultra-thin laptop with M3 chip, 18-hour battery life',
    rating: 4.9,
    numReviews: 156,
    price: 1099,
    countInStock: 15
  },
  {
    name: 'Nike Air Max 270',
    image: '/images/nikeairmax.jpg',
    brand: 'Nike',
    quantity: 100,
    category: null,
    description: 'Comfortable running shoes with Air Max cushioning technology',
    rating: 4.5,
    numReviews: 234,
    price: 150,
    countInStock: 60
  },
  {
    name: 'Instant Pot Duo',
    image: '/images/instantpot.jpg',
    brand: 'Instant Pot',
    quantity: 25,
    category: null,
    description: '7-in-1 programmable pressure cooker, slow cooker, and rice cooker',
    rating: 4.6,
    numReviews: 512,
    price: 89,
    countInStock: 20
  },
  {
    name: 'Harry Potter Box Set',
    image: '/images/harrypotter.jpg',
    brand: 'Bloomsbury',
    quantity: 20,
    category: null,
    description: 'Complete collection of 7 Harry Potter books in hardcover',
    rating: 4.9,
    numReviews: 1023,
    price: 120,
    countInStock: 12
  },
  {
    name: 'Wilson Tennis Racket',
    image: '/images/wilsonracket.jpg',
    brand: 'Wilson',
    quantity: 35,
    category: null,
    description: 'Professional tennis racket with carbon fiber frame',
    rating: 4.4,
    numReviews: 78,
    price: 199,
    countInStock: 18
  },
  {
    name: 'Dyson V15 Detect',
    image: '/images/dysonv15.jpg',
    brand: 'Dyson',
    quantity: 15,
    category: null,
    description: 'Cordless vacuum with laser dust detection and LCD screen',
    rating: 4.7,
    numReviews: 145,
    price: 649,
    countInStock: 8
  },
  {
    name: 'LEGO Star Wars Millennium Falcon',
    image: '/images/legofalcon.jpg',
    brand: 'LEGO',
    quantity: 10,
    category: null,
    description: 'Ultimate collector series with 7541 pieces',
    rating: 4.8,
    numReviews: 89,
    price: 799,
    countInStock: 5
  },
  {
    name: 'The North Face Jacket',
    image: '/images/northface.jpg',
    brand: 'The North Face',
    quantity: 45,
    category: null,
    description: 'Waterproof and breathable outdoor jacket for all weather',
    rating: 4.6,
    numReviews: 167,
    price: 299,
    countInStock: 22
  },
  {
    name: 'Sony WH-1000XM5',
    image: '/images/sonyheadphones.jpg',
    brand: 'Sony',
    quantity: 30,
    category: null,
    description: 'Industry-leading noise canceling wireless headphones',
    rating: 4.7,
    numReviews: 298,
    price: 399,
    countInStock: 15
  },
  {
    name: 'Nintendo Switch OLED',
    image: '/images/switcholed.jpg',
    brand: 'Nintendo',
    quantity: 20,
    category: null,
    description: 'Gaming console with vibrant 7-inch OLED screen',
    rating: 4.8,
    numReviews: 234,
    price: 349,
    countInStock: 10
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany();
    await Product.deleteMany();
    console.log('Cleared existing data');

    // Insert categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`Created ${createdCategories.length} categories`);

    // Map products to categories
    const productsWithCategories = products.map((product, index) => ({
      ...product,
      category: createdCategories[index % createdCategories.length]._id
    }));

    // Insert products
    const createdProducts = await Product.insertMany(productsWithCategories);
    console.log(`Created ${createdProducts.length} products`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
