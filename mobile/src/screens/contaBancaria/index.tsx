import { useState } from 'react';
import { FlatList } from 'react-native';

import { Loading } from '@components/Loading';
import { Container } from './styles';

import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenTitulo } from '@components/ScreenTitulo';
import { ListaVazia } from '@components/ListaVazia';
import { Card } from '@components/Card';
import { Button } from '@components/Button';

export function ContaBancaria() {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ contasBancaria, setContasBancaria ] = useState([]);

    function handleAbrirContaBancaria(codigo : string){

    }

    function handleNovaContaBancaria(){

    }

    return(
        <Container>
            <ScreenHeader/>
            <ScreenTitulo titulo='Conta Bancaria' />
            { isLoading ? <Loading /> :
                <FlatList data={contasBancaria} 
                    keyExtractor={item => item} ListEmptyComponent={() => ( <ListaVazia/> )} 
                    contentContainerStyle={contasBancaria.length === 0 && { flex: 1 }}
                    renderItem={({ item }) => (
                    <Card  titulo={item} onPress={() => handleAbrirContaBancaria(item)} /> )} />
            }

            <Button descricao='Criar Conta Bancaria' onPress={ handleNovaContaBancaria } />
        </Container>
    )
}