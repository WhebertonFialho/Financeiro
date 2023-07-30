import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native'; 
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import theme from './src/theme';
import { Routes } from './src/routes';
import { Loading } from '@components/Loading';

import { AuthContextProvider } from '@contexts/AuthContext';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <AuthContextProvider>
          { fontsLoaded ? <Routes /> : <Loading /> }
        </AuthContextProvider>
      </>
    </ThemeProvider>
  );
}