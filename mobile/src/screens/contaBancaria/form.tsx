import { useState } from 'react';

import { Loading } from '@components/Loading';
import { Container } from './styles';

import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenTitulo } from '@components/ScreenTitulo';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';

export function ContaBancariaForm() {
    const navigation = useNavigation();

    async function handleOnPressGravar(){

    } 

    return(
        <Container>
            <ScreenHeader showBackButton handleOnPress={ () => navigation.navigate('Conta Bancaria') } />
            <ScreenTitulo titulo='Conta Bancaria' />
            
            <Button descricao='Gravar' onPress={ handleOnPressGravar } />
        </Container>
    )
}