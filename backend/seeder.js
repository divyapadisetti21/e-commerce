import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Naga Durga',
    email: 'durga@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

const products = [
  {
    name: 'Kid Tapered Slim Fit Trouser',
    image: '/images/kid-trouser.png',
    //  src:"https://foreverbuy.in/product/6683da887f779795ecfa98fd.png",
    description: 'Comfortable tapered slim fit trousers for kids.',
    brand: 'Generic',
    category: 'Kids',
    type: 'Bottomwear',
    price: 38.0,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Men Round Neck Pure Cotton T-shirt',
    image: '/images/men-polo.png',
    description: 'A classic round neck t-shirt.',
    brand: 'Generic',
    category: 'Men',
    type: 'Topwear',
    price: 64.0,
    countInStock: 15,
    rating: 4.8,
    numReviews: 25,
  },
  {
    name: 'Boy Round Neck Pure Cotton T-shirt',
    image: '/images/boy-tshirt.png',
    description: 'Durable soft round neck t-shirt for boys.',
    brand: 'Generic',
    category: 'Kids',
    type: 'Topwear',
    price: 60.0,
    countInStock: 20,
    rating: 4.6,
    numReviews: 18,
  },
  {
    name: 'Women Zip-Front Relaxed Fit Jacket',
    image: '/images/women-jacket-blue.png',
    description: 'A stylish zip-front jacket.',
    brand: 'Nike',
    category: 'Women',
    type: 'Winterwear',
    price: 74.0,
    countInStock: 8,
    rating: 4.7,
    numReviews: 22,
  },
  {
    name: 'Men Tapered Fit Flat-Front Trousers',
    image: '/images/men-trousers.png',
    description: 'Modern tapered fit trousers for men.',
    brand: 'Generic',
    category: 'Men',
    type: 'Bottomwear',
    price: 58.0,
    countInStock: 12,
    rating: 4.4,
    numReviews: 15,
  },
  {
    name: 'Girls Round Neck Cotton Top',
    image: '/images/girl-top.png',
    description: 'Cute comfortable round neck cotton top for girls.',
    brand: 'Generic',
    category: 'Kids',
    type: 'Topwear',
    price: 56.0,
    countInStock: 18,
    rating: 4.9,
    numReviews: 30,
  },
  {
    name: 'Women Zip-Front Relaxed Fit Jacket (Pink)',
    image: '/images/women-jacket-pink.png',
    description: 'Fashionable zip-front pink jacket.',
    brand: 'Generic',
    category: 'Women',
    type: 'Winterwear',
    price: 68.0,
    countInStock: 10,
    rating: 4.7,
    numReviews: 19,
  },
  {
    name: 'Men Printed Plain Cotton Shirt',
    image: '/images/men-shirt.png',
    description: 'Versatile printed cotton shirt for men.',
    brand: 'Generic',
    category: 'Men',
    type: 'Topwear',
    price: 52.0,
    countInStock: 20,
    rating: 4.3,
    numReviews: 14,
  },
  {
    name: 'Men Slim Fit Relaxed Denim Jacket',
    image: '/images/men-denim-jacket.png',
    description: 'Timeless slim fit denim jacket.',
    brand: 'Generic',
    category: 'Men',
    type: 'Winterwear',
    price: 84.0,
    countInStock: 7,
    rating: 4.8,
    numReviews: 28,
  },
  {
    name: 'Women High-Waist Jeans',
    image: '/images/women-jeans.png',
    description: 'Flattering high-waist jeans.',
    brand: "Levi's",
    category: 'Women',
    type: 'Bottomwear',
    price: 98.0,
    countInStock: 10,
    rating: 4.8,
    numReviews: 40,
  },
  {
    name: 'Kids Graphic Print Hoodie',
    image: '/images/kid-hoodie.png',
    description: 'Fun and cozy hoodie for kids.',
    brand: 'Disney',
    category: 'Kids',
    type: 'Winterwear',
    price: 42.0,
    countInStock: 25,
    rating: 4.8,
    numReviews: 35,
  },
  {
    name: 'Women Floral Summer Dress',
    image: '/images/women-dress.png',
    description: 'Light floral summer dress.',
    brand: 'Zara',
    category: 'Women',
    type: 'Topwear',
    price: 75.0,
    countInStock: 15,
    rating: 4.6,
    numReviews: 28,
  },
];

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
