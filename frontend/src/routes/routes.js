import LoginForm from '../pages/LoginForm';
import RegisterForm from '../pages/RegisterForm';
import HomePage from '../pages/HomePage';
import NgoPage from '../pages/NgoPage';
import VolunteerPage from '../pages/VolunteerPage';
import Corparate from '../pages/CorparatePage';
import AdminPage from '../pages/AdminPage';
import CorporateRegister from '../pages/CorporateRegister';
import NgoRegister from '../pages/NgoRegister';
import VolunteerRegister from '../pages/VolunteerRegister';

const routes = [
  {
    path: '/:id',
    children: [
      { path: '/ngo-home', element: <NgoPage /> },
      { path: '/volunteer-home', element: <VolunteerPage /> },
      { path: '/admin-home', element: <AdminPage /> },
      { path: '/corporate-home', element: <Corparate /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/register',
    element: <RegisterForm />,
  },
  {
    path: '/register/corporate',
    element: <CorporateRegister />,
  },
  {
    path: '/register/volunteer',
    element: <VolunteerRegister />,
  },
  {
    path: '/register/ngo',
    element: <NgoRegister />,
  },
];

export default routes;
