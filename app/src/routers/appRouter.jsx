import { Navigate, createBrowserRouter } from 'react-router';
import pages from '../pages';
import logic from '../logic';
import App from '../App';

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to={logic.isUserLoggedIn() ? '/home' : '/login'} replace />,
      },
      {
        path: 'home',
        element: logic.isUserLoggedIn() ? <pages.Home /> : <Navigate to='/login' replace />,
      },
      {
        path: 'login',
        element: <pages.Login />,
      },
      {
        path: 'register',
        element: <pages.Register />,
      },
      {
        path: '*',
        element: <pages.NotFound />,
      },
    ],
  },
];

const appRouter = createBrowserRouter(routes);

export default appRouter;
