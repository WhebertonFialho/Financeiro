import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native';
import { color } from 'react-native-reanimated';

export type ButtonTypeProps = 'SUCCESS' | 'DANGER' | 'PRIMARY';

type Props = {
  tipo: ButtonTypeProps;
}



export const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;

  justify-content: center;
  align-items: center;

  margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<Props>(({ theme, tipo }) => ({
  size: 24,
  color: (tipo === 'SUCCESS' || tipo === 'DANGER' ? (tipo === 'SUCCESS' ? theme.COLORS.GREEN_700 : theme.COLORS.RED) : theme.COLORS.GRAY_300)
}))``;