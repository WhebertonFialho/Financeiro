import { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Loading } from '@components/Loading';
import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenTitulo } from '@components/ScreenTitulo';
import { ListaVazia } from '@components/ListaVazia';
import { Card } from '@components/Card';
import { Button } from '@components/Button';

import ContaBancariaDAO from '@DAOs/ContaBancariaDAO';

import { ContaBancariaDTO } from '@DTOs/ContaBancariaDTO';

import { Container } from './styles';

export function ContaBancaria() {
    const navigation = useNavigation();

    const [ isLoading, setIsLoading ] = useState(false);
    const [ contasBancaria, setContasBancaria ] = useState<ContaBancariaDTO[]>([]);

    function handleAbrirContaBancaria(codigo : string){
        navigation.navigate('contaBancariaForm', { codigoConta: codigo });
    }

    function handleNovaContaBancaria(){
        navigation.navigate('contaBancariaForm', { codigoConta: '' });
    }

    useFocusEffect(useCallback(() => {
        async function carregarDados() {
            ContaBancariaDAO.RequestAll()
                .then((retorno) => {
                    setContasBancaria(retorno)
                })
                .catch(err => {
                    console.log('Erro ao Buscar: ');
                })
        }

        carregarDados();
    }, []));

    return(
        <Container>
            <ScreenHeader/>
            <ScreenTitulo titulo='Conta Bancaria' />
            { isLoading ? <Loading /> :
                <FlatList data={contasBancaria} 
                    keyExtractor={item => item.codigo} 
                    ListEmptyComponent={() => ( <ListaVazia/> )} 
                    contentContainerStyle={contasBancaria.length === 0 && { flex: 1 }}
                    renderItem={({ item }) => (
                        <Card  titulo={item.descricao} onPress={() => handleAbrirContaBancaria(item.codigo)} /> 
                    )} 
                />
            }

            <Button descricao='Criar Conta Bancaria' onPress={ handleNovaContaBancaria } />
        </Container>
    )
}