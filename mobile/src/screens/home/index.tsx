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
   
    function handleOnPressSair() {
        signOut();
    }

    return(
        <Container>
            <ScreenHeader/>
            <ScreenTitulo titulo='Home' />
            <Button descricao='Sair' tipo='DANGER' onPress={ handleOnPressSair } />
        </Container>
    )

}