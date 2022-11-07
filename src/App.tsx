import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css';
import RedirectIfLoggedInLayout from './layouts/RedirectIfLoggedInLayout/RedirectIfLoggedInLayout';
import RequireAdminLayout from './layouts/RequireAdminLayout/RequireAdminLayout';
import RequireAuthLayout from './layouts/RequireAuthLayout/RequireAuthLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

const router = createBrowserRouter([
  {
    element: <RedirectIfLoggedInLayout />,
    children: [{ path: '/login', element: <Login /> }],
  },
  {
    element: <RequireAuthLayout />,
    children: [
      { path: '/', element: <Navigate to="/home" /> },
      { path: '/home', element: <Home /> },
      { path: '/error', element: <Error /> },
      {
        path: '/admin',
        element: <RequireAdminLayout />,
        children: [
          { path: '', element: <Navigate to="/dashboard" /> },
          { path: 'dashboard', element: <Dashboard /> },
        ],
      },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
