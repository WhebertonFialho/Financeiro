import { useEffect, useState } from 'react';
import { Container } from './styles';

import { BancoDTO } from '@DTOs/BancoDTO';

import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenTitulo } from '@components/ScreenTitulo';
import { BancoBuscar } from '@storage/banco/bancoBuscar';

type comboBoxProps = {
    label: string;
    value: string;
}

export function Home() {
    const [ bancos, setBancos ] = useState([]);

    async function carregarDados() {
        const storage = await BancoBuscar();
        const listaBancos = storage ? storage : [];
        let lista : comboBoxProps[] = [];

        listaBancos.map((item) => (
            lista = [ ...lista, {
                label: item.codigo,
                value: item.descricao
            }]
        ))
        
        setBancos(lista)
    }

    useEffect(() => {
        carregarDados()
    }, [])

    return(
        <Container>
            <ScreenHeader/>
            <ScreenTitulo titulo='Home' />
        </Container>
    )
}