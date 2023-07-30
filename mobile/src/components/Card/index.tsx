import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

type Props = TouchableOpacityProps & {
    titulo: string;
}

export function Card({ titulo, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Title>{titulo}</Title>
      <Icon />
    </Container>
  )
}


