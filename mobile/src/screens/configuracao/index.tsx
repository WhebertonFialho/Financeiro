import { useState, useCallback, useRef } from 'react';
import { TextInput } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppToastGravarErro, AppToastGravarSucesso } from '@utils/appToast';
import { api } from '@services/api';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenTitulo } from '@components/ScreenTitulo';
import { Container } from './styles';

import { configuracaoBuscar } from '@storage/configuracao/configuracaoBuscar';
import { configuracaoGravar } from '@storage/configuracao/configuracaoGravar';
import { configuracaoRemover } from '@storage/configuracao/configuracaoRemover';


import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

export function Configuracao() {
    const navigation = useNavigation<AuthNavigatorRoutesProps>();
    const urlServidorInputRef = useRef<TextInput>(null);
    const [ urlServidor, setUrlServidor ] = useState('');

    async function handleGravarConfiguracao() {
        try {
            if(urlServidor.trim().length > 0)
                await configuracaoGravar(urlServidor);
            else
                await configuracaoRemover()       

            api.defaults.baseURL = `http://${urlServidor}`;
            urlServidorInputRef.current?.blur();

            AppToastGravarSucesso();
            navigation.goBack();
        } catch (error) {
            console.log(error);
            AppToastGravarErro();
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