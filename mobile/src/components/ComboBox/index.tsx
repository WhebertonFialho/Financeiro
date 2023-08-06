import {  Dispatch, SetStateAction  } from 'react';
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'styled-components';

export type ComboBoxProps = {
  label: string;
  value: string;
}

type Props = {
    itemSelecionado: [];
    setItemSelecionado: Dispatch<SetStateAction<[]>>;
    items: ComboBoxProps[];
}


export function ComboBox({ itemSelecionado, setItemSelecionado, items, ...rest }: Props) {
    const { COLORS, FONT_FAMILY } = useTheme()

    return (
        <View style={{backgroundColor: COLORS.GRAY_700}} >      
            <Picker 
                selectedValue={ itemSelecionado } 
                onValueChange={ setItemSelecionado }  
                placeholder="Selecione..."
                dropdownIconColor={ COLORS.WHITE }
                style={{ 
                    color: COLORS.WHITE, 
                    backgroundColor: COLORS.GRAY_700,
                    borderWidth: 0, 
                    overflow: "hidden",
                    borderBottomColor: 'purple', 
                    marginBottom: 5
                }} 
                
                itemStyle={{ 
                    backgroundColor: COLORS.GRAY_700,
                }}>
                    
                        {
                            items.map((cr : ComboBoxProps, I : number)=> {
                                return <Picker.Item key={I} label={cr.label} value={cr.value} color={ COLORS.WHITE } style={{ backgroundColor: COLORS.GRAY_700 }} />
                            })
                        }
                    
            </Picker>   
        </View>
    )
}