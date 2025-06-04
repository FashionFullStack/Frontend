import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { products } from '../services/api';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';
import Button from '../components/ui/Button';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  store: {
    id: string;
    name: string;
  };
  sizes: string[];
  colors: string[];
  specifications: {
    material: string;
    care: string[];
    fit: string;
  };
}

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const data = await products.getById(id!);
        setProduct(data);
        if (data.sizes.length > 0) setSelectedSize(data.sizes[0]);
        if (data.colors.length > 0) setSelectedColor(data.colors[0]);
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        id: product.id,
        quantity,
        size: selectedSize,
        color: selectedColor,
      })
    );
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    dispatch(addToWishlist({ id: product.id }));
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <Button
          variant="secondary"
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Image gallery */}
        <div className="flex flex-col">
          <div className="aspect-h-4 aspect-w-3 rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-h-4 aspect-w-3 rounded-lg overflow-hidden ${
                  selectedImage === index
                    ? 'ring-2 ring-primary-500'
                    : 'ring-1 ring-gray-200 dark:ring-gray-700'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="mt-10 lg:mt-0 lg:ml-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {product.name}
          </h1>
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900 dark:text-white">
              NPR {product.price.toLocaleString()}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Description
            </h3>
            <div className="mt-2 prose prose-sm text-gray-500 dark:text-gray-400">
              {product.description}
            </div>
          </div>

          {/* Size picker */}
          {product.sizes.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Size
                </h3>
                <Link
                  to="/size-guide"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Size guide
                </Link>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium hover:bg-gray-50 focus:outline-none ${
                      selectedSize === size
                        ? 'border-primary-500 text-primary-600'
                        : 'border-gray-300 text-gray-900 dark:border-gray-600 dark:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color picker */}
          {product.colors.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Color
              </h3>
              <div className="mt-4 grid grid-cols-4 gap-4">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium hover:bg-gray-50 focus:outline-none ${
                      selectedColor === color
                        ? 'border-primary-500 text-primary-600'
                        : 'border-gray-300 text-gray-900 dark:border-gray-600 dark:text-white'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity picker */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Quantity
            </h3>
            <div className="mt-4 flex items-center space-x-4">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                -
              </button>
              <span className="text-gray-900 dark:text-white">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart and wishlist */}
          <div className="mt-8 flex flex-col space-y-4">
            <Button onClick={handleAddToCart} fullWidth>
              Add to Cart
            </Button>
            <Button
              variant="outline"
              onClick={handleAddToWishlist}
              fullWidth
            >
              Add to Wishlist
            </Button>
          </div>

          {/* Product specifications */}
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Specifications
            </h3>
            <div className="mt-4 prose prose-sm text-gray-500 dark:text-gray-400">
              <ul role="list">
                <li>Material: {product.specifications.material}</li>
                <li>Fit: {product.specifications.fit}</li>
                {product.specifications.care.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Store info */}
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Sold by
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {product.store.name}
                </p>
              </div>
              <Link
                to={`/stores/${product.store.id}`}
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                Visit Store
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 