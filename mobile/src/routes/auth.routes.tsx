import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message'

import { Login } from '@screens/login';
import { Configuracao } from '@screens/configuracao';

type AuthRoutes = {
  login: undefined;
  configuracao: undefined;
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <>
      <Navigator screenOptions={{ headerShown: false }}>
          <Screen name="login" component={Login} />
          <Screen name="configuracao" component={ Configuracao } />
      </Navigator>
      <Toast />
    </>
  )
}