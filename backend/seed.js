const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

const products = [
  {
    name: 'The Classic Reader Kit',
    slug: 'classic-reader-kit',
    description:
      'Immerse yourself in the timeless world of classic literature. This curated kit brings together the finest essentials for a truly elevated reading experience — from a handpicked classic novel to artisanal tea blends and a premium leather bookmark.',
    shortDescription: 'Timeless classics meet luxury reading essentials.',
    price: 1499,
    originalPrice: 1999,
    category: 'Classic Reads',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
    images: [
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800',
      'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=800',
    ],
    kitContents: [
      { item: 'Curated Classic Novel', description: 'Hand-selected from world literature', icon: '📚' },
      { item: 'Artisanal Tea Blend', description: 'Premium loose-leaf reading tea', icon: '🍵' },
      { item: 'Leather Bookmark', description: 'Hand-stitched genuine leather', icon: '🔖' },
      { item: 'Scented Soy Candle', description: 'Warm vanilla & sandalwood', icon: '🕯️' },
      { item: 'Reading Journal', description: 'Premium recycled paper journal', icon: '📓' },
    ],
    stock: 50,
    rating: 4.8,
    numReviews: 24,
    isFeatured: true,
    isNewArrival: false,
    tags: ['classic', 'literature', 'cozy', 'gift'],
    mood: 'Nostalgic & Warm',
    readingLevel: 'Intermediate',
  },
  {
    name: 'Midnight Fiction Escape',
    slug: 'midnight-fiction-escape',
    description:
      'Designed for the night owl who loves losing themselves in rich fictional worlds. This kit wraps you in darkness and wonder with a gripping contemporary novel, blackout blinds sticker, chamomile sleep tea, and more.',
    shortDescription: 'Your ultimate late-night reading sanctuary.',
    price: 1799,
    originalPrice: 2299,
    category: 'Fiction Escapes',
    thumbnail: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800',
    images: [
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800',
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
      'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800',
    ],
    kitContents: [
      { item: 'Contemporary Fiction Novel', description: 'Carefully curated for page-turners', icon: '📖' },
      { item: 'Chamomile Sleep Tea', description: 'Organic blend for night reading', icon: '🌸' },
      { item: 'Silk Eye Mask', description: 'Pure mulberry silk, adjustable', icon: '😴' },
      { item: 'Amber Reading Lamp Sticker', description: 'Warm light filter for screens', icon: '💡' },
      { item: 'Luxury Bookmark Set', description: 'Set of 3 hand-illustrated bookmarks', icon: '🎨' },
    ],
    stock: 35,
    rating: 4.9,
    numReviews: 18,
    isFeatured: true,
    isNewArrival: true,
    tags: ['fiction', 'night', 'cozy', 'mystery'],
    mood: 'Mysterious & Immersive',
    readingLevel: 'Advanced',
  },
  {
    name: 'The Growth Seeker Kit',
    slug: 'growth-seeker-kit',
    description:
      'Feed your mind and soul with this mindfully assembled self-improvement kit. Includes a bestselling personal development book, a daily reflection journal, grounding essential oil roller, and your SEAKH signature blend green tea.',
    shortDescription: 'Nourish your mind, elevate your life.',
    price: 1999,
    originalPrice: 2599,
    category: 'Self-Growth',
    thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
      'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800',
      'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=800',
    ],
    kitContents: [
      { item: 'Bestseller Self-Help Book', description: 'Curated for mindful growth', icon: '🌱' },
      { item: 'Daily Reflection Journal', description: '180-day guided journal', icon: '✍️' },
      { item: 'Grounding Essential Oil', description: 'Bergamot & cedarwood blend', icon: '🌿' },
      { item: 'SEAKH Signature Green Tea', description: 'Premium Japanese sencha', icon: '🍃' },
      { item: 'Mindfulness Cards', description: '52-card affirmation deck', icon: '🃏' },
    ],
    stock: 40,
    rating: 4.7,
    numReviews: 31,
    isFeatured: true,
    isNewArrival: false,
    tags: ['self-help', 'growth', 'mindfulness', 'wellness'],
    mood: 'Inspired & Purposeful',
    readingLevel: 'Beginner',
  },
  {
    name: 'Golden Hour Gift Set',
    slug: 'golden-hour-gift-set',
    description:
      'The perfect gift for someone special who deserves the finest. Our most luxurious kit, wrapped in premium handcrafted packaging with personalized message card options. A true celebration of the reading lifestyle.',
    shortDescription: 'Pure luxury, beautifully wrapped.',
    price: 2999,
    originalPrice: 3999,
    category: 'Gift Sets',
    thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800',
    images: [
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800',
      'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=800',
    ],
    kitContents: [
      { item: 'Premium Hardcover Book', description: 'Collector\'s edition', icon: '📕' },
      { item: 'Gold-Dipped Bookmark', description: '18K gold-plated artisan piece', icon: '✨' },
      { item: 'Luxury Scented Candle', description: 'Soy wax, 40-hour burn time', icon: '🕯️' },
      { item: 'Herbal Tea Sampler', description: '6 premium organic varieties', icon: '🫖' },
      { item: 'Personalized Message Card', description: 'Handwritten on cotton paper', icon: '💌' },
      { item: 'Gift Wrapping', description: 'Luxe matte black & gold packaging', icon: '🎁' },
    ],
    stock: 20,
    rating: 5.0,
    numReviews: 12,
    isFeatured: true,
    isNewArrival: true,
    tags: ['gift', 'luxury', 'premium', 'limited'],
    mood: 'Celebratory & Warm',
    readingLevel: 'Intermediate',
  },
  {
    name: 'The Weekend Wanderer',
    slug: 'weekend-wanderer-kit',
    description:
      'Curated for your perfect slow weekend. Whether you\'re on a balcony, in a garden, or tucked into your favorite armchair, this kit transforms any moment into a luxurious escape.',
    shortDescription: 'Slow down, savor every page.',
    price: 1299,
    originalPrice: 1699,
    category: 'Fiction Escapes',
    thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
    ],
    kitContents: [
      { item: 'Light Fiction Novel', description: 'Perfectly paced weekend read', icon: '🌅' },
      { item: 'Cold Brew Coffee Sachets', description: 'Premium single-origin', icon: '☕' },
      { item: 'Linen Reading Pouch', description: 'Natural linen carry bag', icon: '👜' },
      { item: 'Dried Flower Bookmark', description: 'Hand-pressed wildflowers', icon: '🌸' },
    ],
    stock: 60,
    rating: 4.6,
    numReviews: 44,
    isFeatured: false,
    isNewArrival: false,
    tags: ['weekend', 'relaxation', 'travel', 'light-read'],
    mood: 'Breezy & Joyful',
    readingLevel: 'Beginner',
  },
  {
    name: 'Collector\'s Edition: First Editions',
    slug: 'collectors-edition-first-editions',
    description:
      'For the true bibliophile. Our rarest and most exclusive kit — featuring a signed first-edition or rare collector\'s book, paired with the finest accessories money can buy. Limited to 50 units worldwide.',
    shortDescription: 'Ultra-rare. Collector\'s pride.',
    price: 5999,
    originalPrice: 7999,
    category: 'Limited Edition',
    thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
    images: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
    ],
    kitContents: [
      { item: 'Signed First Edition', description: 'Author-signed rare collector\'s book', icon: '🖊️' },
      { item: 'Certificate of Authenticity', description: 'Numbered & sealed', icon: '📜' },
      { item: 'Sterling Silver Bookmark', description: '925 sterling silver', icon: '🥈' },
      { item: 'Aged Mahogany Box', description: 'Handcrafted keepsake box', icon: '🗝️' },
      { item: 'Single-Origin Chocolate', description: '72% dark, bean-to-bar', icon: '🍫' },
    ],
    stock: 50,
    rating: 5.0,
    numReviews: 7,
    isFeatured: true,
    isNewArrival: true,
    tags: ['collectors', 'rare', 'limited', 'exclusive'],
    mood: 'Prestigious & Rare',
    readingLevel: 'Advanced',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
