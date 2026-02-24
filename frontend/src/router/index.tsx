import { createBrowserRouter } from 'react-router-dom';
import UserHistory from '../pages/UserHistory';
import UserModify from '../pages/UserModify';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <UserHistory />,
  },
  {
    path: '/modify',
    element: <UserModify />,
  },
]);
