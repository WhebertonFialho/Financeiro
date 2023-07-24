import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from 'styled-components/native';
import Toast from 'react-native-toast-message'

import { Home } from '@screens/home';
import { Categoria } from '@screens/categoria';
import { Configuracao } from '@screens/configuracao';

import type { StackNavigationOptions } from '@react-navigation/stack';
const { Navigator, Screen } = createDrawerNavigator();

export function AppRoutes(){
  const { COLORS } = useTheme();

  const slyleMenu : StackNavigationOptions = {
      headerShown: false,
      drawerActiveBackgroundColor: {
        color: '#000'
      },
      drawerLabelStyle: {
        color: COLORS.WHITE
      },
      drawerStyle: {
        backgroundColor: COLORS.GRAY_500,
        width: 240
      } 
  }

  return(
    <>
      <Navigator screenOptions={ slyleMenu } >
        <Screen name="Home" component={ Home } />
        <Screen name="Categoria" component={ Categoria } />
        <Screen name="Configuração" component={ Configuracao } />
      </Navigator>
      <Toast />
    </>
  );
}