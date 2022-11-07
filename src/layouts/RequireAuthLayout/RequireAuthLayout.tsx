import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/helpers/hooks';
import { loggedIn, selectUser } from '../../redux/slices/commonSlice';
import { AuthService } from '../../services/authService';

export default function RequireAuthLayout() {
  const isLoggedIn = useAppSelector(loggedIn);

  const user = useAppSelector(selectUser);

  const logout = () => {
    AuthService.logout();
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div>
        <div>user: {user?.name}</div>
        <button onClick={logout}>logout</button>
      </div>

      <main>
        <Outlet />
      </main>
    </>
  );
}
