import express from 'express';
import multer from 'multer';
import Product from '../models/productModel.js';

const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/images');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if(product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch(err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create product with image upload (for admin)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, subCategory, price } = req.body;
    const image = `/images/${req.file.filename}`;
    const product = new Product({
      name,
      description,
      category,
      subCategory,
      price,
      image,
      countInStock: 0,
      brand: 'Generic',
      type: category,
      rating: 0,
      numReviews: 0,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create product', error });
  }
});

export default router;
