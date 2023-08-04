import { useState } from  'react';
import { TouchableOpacityProps } from "react-native";
import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker';
import { Container } from "./styles";

type Props = DropDownPickerProps & {
  items: [];
  setItens: () => void;
}

export function ComboBox({items, setItens, ...rest }: Props) {
    const [ open, setOpen ] = useState(false);
    const [ value, setValue ] = useState(null);

    return (
        <Container>
            <DropDownPicker open={ open } setOpen={ setOpen } value={ value } setValue={ setValue }
                items={ items } setItems={ setItens } {...rest} />
        </Container>
    )
}