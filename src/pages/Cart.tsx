import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { RootState } from '../store';
import { updateQuantity, removeFromCart, clearCart } from '../store/slices/cartSlice';
import type { CartItem } from '../store/slices/cartSlice';
import { products } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface CartProduct extends Product {
  quantity: number;
  size?: string;
  color?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  store: {
    id: string;
    name: string;
  };
}

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector<RootState, CartItem[]>((state) => state.cart.items);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        setIsLoading(true);
        const productDetails = await Promise.all(
          cartItems.map(async (item: CartItem) => {
            const product = await products.getById(item.id);
            return {
              ...product,
              quantity: item.quantity,
              size: item.size,
              color: item.color,
            };
          })
        );
        setCartProducts(productDetails);
      } catch (err) {
        setError('Failed to load cart items');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartProducts();
  }, [cartItems]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = subtotal > 1000 ? 0 : 100;
  const total = subtotal + shippingCost;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
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

  if (cartProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button as={Link} to="/products">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Shopping Cart
      </h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-7">
          {cartProducts.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="flex py-6 border-b border-gray-200 dark:border-gray-700"
            >
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                    <h3>
                      <Link to={`/products/${item.id}`}>{item.name}</Link>
                    </h3>
                    <p className="ml-4">
                      NPR {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {item.store.name}
                  </p>
                  {item.size && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Size: {item.size}
                    </p>
                  )}
                  {item.color && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Color: {item.color}
                    </p>
                  )}
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="p-1 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      -
                    </button>
                    <span className="text-gray-500 dark:text-gray-400">
                      Qty {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="p-1 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6">
            <Button variant="outline" onClick={handleClearCart}>
              Clear Cart
            </Button>
          </div>
        </div>

        <div className="mt-16 rounded-lg bg-gray-50 dark:bg-gray-800 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Order summary
          </h2>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">Subtotal</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                NPR {subtotal.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Shipping estimate
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                NPR {shippingCost.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="text-base font-medium text-gray-900 dark:text-white">
                Order total
              </p>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                NPR {total.toLocaleString()}
              </p>
            </div>
          </div>

          <Button
            onClick={() => navigate('/checkout')}
            fullWidth
            className="mt-6"
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart; 