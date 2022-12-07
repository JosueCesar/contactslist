import { createStackNavigator } from '@react-navigation/stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Auth from '../screens/AuthStack/Auth';
import Login from '../screens/AuthStack/Login';
import Register from '../screens/AuthStack/Register';
import Home from '../screens/Home'
import { useAuth } from '../hooks/auth';

type RootStackParamList = {
  Auth:  undefined;
  Login: undefined;
  Register: undefined;
  Home:  undefined;
};

export type NavProps = NativeStackScreenProps<RootStackParamList, 'Auth'>

const Stack = createStackNavigator<RootStackParamList>();

const Routes: React.FC = () => {
  const { user } = useAuth();

  return JSON.stringify(user) !== '{}' ?
    <Stack.Navigator
      defaultScreenOptions={{ headerShown: false }}
      initialRouteName={"Home"}
    >
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    </Stack.Navigator>
  :
    <Stack.Navigator
      defaultScreenOptions={{ headerShown: false }}
      initialRouteName={"Auth"}
    >
      <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    </Stack.Navigator>
}

export default Routes;