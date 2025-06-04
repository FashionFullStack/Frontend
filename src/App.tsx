import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import ProfileCompletion from '@/components/profile/ProfileCompletion';
import RequireProfile from '@/components/auth/RequireProfile';

// Temporary components until actual pages are implemented
const Login = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Login Page</h1>
    <p>Coming soon...</p>
  </div>
);

const Register = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Register Page</h1>
    <p>Coming soon...</p>
  </div>
);

const Profile = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
    <p>Coming soon...</p>
  </div>
);

const AdminDashboard = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
    <p>Coming soon...</p>
  </div>
);

const StoreDashboard = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Store Dashboard</h1>
    <p>Coming soon...</p>
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/complete" element={<ProfileCompletion />} />

            {/* Protected consumer routes */}
            <Route
              path="/cart"
              element={
                <RequireProfile>
                  <Cart />
                </RequireProfile>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={['consumer', 'store', 'admin']}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Protected store routes */}
            <Route
              path="/store/dashboard/*"
              element={
                <ProtectedRoute allowedRoles={['store']}>
                  <StoreDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected admin routes */}
            <Route
              path="/admin/dashboard/*"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MainLayout>
      </Router>
    </Provider>
  );
}

export default App;
