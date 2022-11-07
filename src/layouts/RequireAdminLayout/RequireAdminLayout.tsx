import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/helpers/hooks';
import { selectIsAdmin } from '../../redux/slices/commonSlice';

export default function RequireAdminLayout() {
  const isAdmin = useAppSelector(selectIsAdmin);

  if (!isAdmin) {
    return <Navigate to="/error" replace />;
  }

  return (
    <>
      <div>admin range</div>
      <Outlet />
    </>
  );
}
