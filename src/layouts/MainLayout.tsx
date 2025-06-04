import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import { selectCartItemCount } from '@/features/cart/cartSlice';
import { selectIsDarkMode, selectIsMobileMenuOpen, setMobileMenuOpen } from '@/features/ui/uiSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { ThemeProvider } from '@/components/ui/theme-provider';
import FashionAssistant from '@/components/ai/FashionAssistant';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const dispatch = useAppDispatch();
  const { user, logout } = useAuth();
  const totalCartItems = useSelector(selectCartItemCount);
  const isDarkMode = useSelector(selectIsDarkMode);
  const isMobileMenuOpen = useSelector(selectIsMobileMenuOpen);

  const handleMobileMenuToggle = () => {
    dispatch(setMobileMenuOpen(!isMobileMenuOpen));
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-soft">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  NepFashion
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden sm:flex sm:items-center sm:space-x-8">
                <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:text-primary-600">
                  Products
                </Link>
                {user?.role === 'store' && (
                  <Link to="/store/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-primary-600">
                    Store Dashboard
                  </Link>
                )}
                {user?.role === 'admin' && (
                  <Link to="/admin/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-primary-600">
                    Admin Panel
                  </Link>
                )}
                <Link to="/cart" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 relative">
                  Cart
                  {totalCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {totalCartItems}
                    </span>
                  )}
                </Link>
                {user ? (
                  <>
                    <Link to="/profile" className="text-gray-700 dark:text-gray-200 hover:text-primary-600">
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="text-gray-700 dark:text-gray-200 hover:text-primary-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-primary-600">
                    Login
                  </Link>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="sm:hidden flex items-center">
                <button
                  onClick={handleMobileMenuToggle}
                  className="text-gray-700 dark:text-gray-200"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isMobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden bg-white dark:bg-gray-800 shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/products"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-600"
                >
                  Products
                </Link>
                {user?.role === 'store' && (
                  <Link
                    to="/store/dashboard"
                    className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-600"
                  >
                    Store Dashboard
                  </Link>
                )}
                {user?.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-600"
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  to="/cart"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-600"
                >
                  Cart ({totalCartItems})
                </Link>
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-600"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-600"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 shadow-soft mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  About Us
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  NepFashion is your one-stop destination for Nepali fashion.
                  We connect local stores with fashion enthusiasts across Nepal.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Us
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Email: info@nepfashion.com</li>
                  <li>Phone: +977-1-4XXXXXX</li>
                  <li>Address: Kathmandu, Nepal</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} NepFashion. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
      <FashionAssistant />
    </ThemeProvider>
  );
};

export default MainLayout; 