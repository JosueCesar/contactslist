import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/Routes';
import AppProvider from './src/hooks';

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    </AppProvider>
  );
}
