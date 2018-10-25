import { createStackNavigator } from 'react-navigation';
import Home from '../screens/Home';
import Example from '../screens/Example';

const Router = createStackNavigator(
  {
    Home,
    Example,
  },
  {
    initialRouteName: 'Home',
  }
);

export default Router;
