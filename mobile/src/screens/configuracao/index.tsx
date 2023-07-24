import { useState, useCallback, useRef } from 'react';
import { TextInput } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { AppToastSucesso, AppToastErro } from '@utils/appToast';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenTitulo } from '@components/ScreenTitulo';
import { Container } from './styles';

import { configuracaoBuscar } from '@storage/configuracao/configuracaoBuscar';
import { configuracaoGravar } from '@storage/configuracao/configuracaoGravar';
import { configuracaoRemover } from '@storage/configuracao/configuracaoRemover';

export function Configuracao() {
    const urlServidorInputRef = useRef<TextInput>(null);
    const [ urlServidor, setUrlServidor ] = useState('');

    async function handleGravarConfiguracao() {
        try {
            if(urlServidor.trim().length === 0)
                await configuracaoRemover()   
            else
                await configuracaoGravar(urlServidor);

            AppToastSucesso();
            urlServidorInputRef.current?.blur();
        } catch (error) {
            console.log(error);
            AppToastErro();
        }
        
    }

    async function carregarDados(){
        const storedConfiguracao = await configuracaoBuscar()
        const url = storedConfiguracao ? storedConfiguracao : '';
        
        setUrlServidor(url)
    }

    useFocusEffect(useCallback(() => {
        carregarDados()
    },[]))

    return(
        <Container>
            <ScreenHeader/>
            <ScreenTitulo titulo='Configuração Servidor' />
            <Input autoCorrect={false} returnKeyType="done" inputRef={ urlServidorInputRef } value={ urlServidor } onChangeText={ setUrlServidor }
                placeholder="URL Servidor" onSubmitEditing={ handleGravarConfiguracao }/>
            <Button descricao='Gravar' tipo='SUCCESS' onPress={ handleGravarConfiguracao }/>
        </Container>
    )
}