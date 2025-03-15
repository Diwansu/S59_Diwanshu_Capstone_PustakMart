import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);
  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
