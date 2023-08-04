import { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Container } from './styles';

import { useAuth } from '@hooks/useAuth';
import { BancoDTO } from '@storage/_DTOs/BancoDTO';
import BancoDAO from '@storage/_DAOs/BancoDAO';

import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenTitulo } from '@components/ScreenTitulo';
import { Button } from '@components/Button';

type comboBoxProps = {
    value: string;
    label: string;
}

export function Home() {
    const [ bancos, setBancos ] = useState<comboBoxProps[]>([]);
    const [ open, setOpen ] = useState(false);
    const [ value, setValue ] = useState(null);

    const { signOut } = useAuth();

    async function carregarDados() {
        BancoDAO.RequestAll()
            .then((retorno : BancoDTO[]) => (
                let lista : comboBoxProps[] = [];
                retorno.map((banco : BancoDTO) => {
                    lista = { ...lista, {
                        value: banco.codigo,
                        label: banco.descricao
                    } }
                })
                
                setBancos(lista)
            ))
            .catch(err => {
                console.log('Erro ao Buscar: ');
            })  

        
    }

    function handleOnPressSair() {
        signOut();
    }

    useEffect(() => {
        carregarDados()
    }, [])

    return(
        <Container>
            <ScreenHeader/>
            <ScreenTitulo titulo='Home' />
            <Button descricao='Sair' tipo='DANGER' onPress={ handleOnPressSair } />
            <DropDownPicker
                searchable={true}
                open={open}
                value={value}
                items={bancos}
                setValue={setValue}
                setItems={setBancos}
                setOpen={setOpen}
                />

        </Container>
    )
}