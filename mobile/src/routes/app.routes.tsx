import { createDrawerNavigator } from '@react-navigation/drawer';

import { Home } from '@screens/home';
import { Configuracao } from '@screens/configuracao';

const { Navigator, Screen } = createDrawerNavigator();

export function AppRoutes(){
  return(
    <Navigator>
      <Screen name="Home" component={ Home } />
      <Screen name="Configuracao" component={Configuracao} />
    </Navigator>
  );
}