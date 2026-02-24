import { createBrowserRouter } from 'react-router-dom';
import UserHistory from '../pages/UserHistory';
import UserModify from '../pages/UserModify';
import AdminLayout from '../layout/AdminLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        path: '/admin/users',
        element: <UserHistory />,
      },
      {
        path: '/admin/user/modify',
        element: <UserModify />,
      },
    ],
  },
]);
