import { createBrowserRouter } from 'react-router-dom';
import UserHistory from '../pages/UserHistory';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <UserHistory />,
  },
]);
