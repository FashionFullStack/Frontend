import type { Product } from '../services/api';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';
import Button from './ui/Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { _id, name, price, images, category } = product;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ id: _id, quantity: 1 }));
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist({ id: _id }));
  };

  return (
    <Link to={`/products/${_id}`} className="group">
      <div className="aspect-h-4 aspect-w-3 w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src={images[0]}
          alt={name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm text-gray-700 dark:text-gray-200">{name}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {category.replace('_', ' ').toUpperCase()}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          Rs. {price.regular.toLocaleString()}
        </p>
      </div>
    </Link>
  );
};

export type { ProductCardProps };
export default ProductCard; 