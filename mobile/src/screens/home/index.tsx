import { useEffect, useState } from 'react';

import { Container } from './styles';

import { useAuth } from '@hooks/useAuth';
import { BancoDTO } from '@storage/_DTOs/BancoDTO';
import BancoDAO from '@storage/_DAOs/BancoDAO';

import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenTitulo } from '@components/ScreenTitulo';
import { ComboBox } from '@components/ComboBox';
import { Button } from '@components/Button';

type comboBoxProps = {
    value: string;
    label: string;
}

export function Home() {
    const { signOut } = useAuth();
    const [ bancoSelecionado, setBancoSelecionado ] = useState<[]>([]);
    const [ bancos, setBancos ] = useState<[]>([]);

    async function carregarDados() {
        BancoDAO.RequestAll()
            .then((retorno) => {
                let lista = [];
                retorno.map((banco : BancoDTO) => {
                    lista = [ ...lista, {
                        value: banco.codigo,
                        label: banco.descricao
                    }]
                })

                setBancos(lista)
            })
            .catch(err => {
                console.log('Erro ao Buscar: ');
            })
    }

    function handleOnPressSair() {
        signOut();
    }

    function handleOnTeste(){
        console.log(bancoSelecionado)
    }

    useEffect(() => {
        carregarDados()
    }, [])

    return(
        <Container>
            <ScreenHeader/>
            <ScreenTitulo titulo='Home' />
            <ComboBox itemSelecionado={bancoSelecionado} setItemSelecionado={setBancoSelecionado} items={bancos} />
            <Button descricao='Sair' tipo='DANGER' onPress={ handleOnPressSair } />
            <Button descricao='Teste' tipo='SUCCESS' onPress={ handleOnTeste } />

        </Container>
    )

}