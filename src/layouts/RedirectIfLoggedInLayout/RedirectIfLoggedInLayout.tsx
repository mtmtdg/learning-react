import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/helpers/hooks';
import { loggedIn } from '../../redux/slices/commonSlice';

export default function RedirectIfLoggedInLayout() {
  const isLoggedIn: boolean = useAppSelector(loggedIn);

  return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
}
