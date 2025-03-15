import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectionRoute.jsx';
import AdminRoute from './AdminRoute.jsx';

// Public Pages
import Home from '../pages/Home.jsx';
import Books from '../pages/Books.jsx';
import BookDetails from '../pages/BookDetails';
import Login from '../pages/Login';
import Register from '../pages/Register.jsx';

// Protected Pages
import Cart from '../pages/Cart.jsx';
import Favorites from '../pages/Favorites.jsx';
import Orders from '../pages/Orders.jsx';
import Profile from '../pages/Profile.jsx';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard.jsx';
import ManageBooks from '../pages/admin/ManageBooks.jsx';
import ManageOrders from '../pages/admin/ManageOrders.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/books" element={<ManageBooks />} />
        <Route path="/admin/orders" element={<ManageOrders />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
