
import AuthRoute from '../../app/auth/AuthRoute';
import UserRoute from '../../app/auth/UserRoute';

const Routes = [
  {
    route: UserRoute,
    url: 'users',
  },
  {
    gaurd: false,
    route: AuthRoute,
    url: 'auth',
  },

];

export default Routes;
