import { createDrawerNavigator, DrawerNavigationProp  } from '@react-navigation/drawer';
import { useTheme } from 'styled-components/native';
import Toast from 'react-native-toast-message'

import { Home } from '@screens/home';
import { Categoria } from '@screens/categoria';
import { ContaBancaria } from '@screens/contaBancaria';
import { ContaBancariaForm } from '@screens/contaBancaria/form';

import type { StackNavigationOptions } from '@react-navigation/stack';

type AppRoutes = {
  Home: undefined;
  Categoria: undefined;
  "Conta Bancaria": undefined;
  "contaBancariaForm": undefined;
}

const { Navigator, Screen } = createDrawerNavigator<AppRoutes>();
export type AuthNavigatorRoutesProps = DrawerNavigationProp<AppRoutes>;

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

  const hideScreenOption = {
    title: "", 
    headerShown: false, 
    drawerLabel: () => null,
    drawerItemStyle: { 
      height: 0 
    }
  }

  return(
    <>
      <Navigator screenOptions={ slyleMenu } >
        <Screen name="Home" component={ Home } />
        <Screen name="Categoria" component={ Categoria } />
        <Screen name="Conta Bancaria" component={ ContaBancaria } />
        <Screen name="contaBancariaForm" component={ ContaBancariaForm } options={ hideScreenOption } />
      </Navigator>
      <Toast />
    </>
  );
}