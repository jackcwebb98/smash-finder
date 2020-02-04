import Login from '../components/Login/Login';
import Geolocator from '../components/Geolocated';
import Register from '../components/Login/Register';


const routes = [
  {
    path: '/',
    component: Geolocator,
    exact: true,
  },
  // {
  //   path: '/login',
  //   component: Login,
  //   exact: true,
  // },
  // {
  //   path: '/register',
  //   component: Register,
  //   exact: true,
  // },
  // {
  //   path: '/tournaments',
  //   component: Geolocator,
  //   exact: true,
  // },

];

export default routes;
