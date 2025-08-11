import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import Category from './models/categoryModel.js';

dotenv.config();

const verifySeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Count products
    const productCount = await Product.countDocuments();
    console.log(`✅ Found ${productCount} products in database`);

    // Count categories
    const categoryCount = await Category.countDocuments();
    console.log(`✅ Found ${categoryCount} categories in database`);

    // Show first few products
    const products = await Product.find().limit(3).populate('category');
    console.log('\n📦 Sample products:');
    products.forEach(product => {
      console.log(`- ${product.name} - $${product.price} (${product.category.name})`);
    });

    // Show all categories
    const categories = await Category.find();
    console.log('\n🏷️  Categories:');
    categories.forEach(category => {
      console.log(`- ${category.name}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error verifying seed:', error);
    process.exit(1);
  }
};

verifySeed();
