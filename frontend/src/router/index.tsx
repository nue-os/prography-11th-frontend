import { createBrowserRouter, Navigate } from 'react-router-dom';
import UserHistory from '../pages/UserHistory';
import UserModify from '../pages/UserModify';
import AdminLayout from '../layout/AdminLayout';
import AttendanceHistory from '../pages/AttendanceHistory';
import AttendanceDetail from '../pages/AttendanceDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/admin/users" replace /> },
      {
        path: '/admin/users',
        element: <UserHistory />,
      },
      {
        path: '/admin/users/modify',
        element: <UserModify />,
      },
      {
        path: '/admin/attendance',
        element: <AttendanceHistory />,
      },
      {
        path: '/admin/attendance/1',
        element: <AttendanceDetail />,
      },
    ],
  },
]);
