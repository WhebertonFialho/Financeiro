import { useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppToastErro, AppToastInformacao } from '@utils/appToast';
import { AppError } from '@utils/AppError';
import { Container, Form } from './styles';

import { storageUsuarioBuscar } from '@storage/auth/storageUsuario';

import { UsuarioDTO } from '@DTOs/UsuarioDTO';

import { BancoDTO } from '@DTOs/BancoDTO';
import BancoDAO from '@DAOs/BancoDAO'

import { Loading } from '@components/Loading';
import { ComboBox, ComboBoxProps } from '@components/ComboBox';
import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenTitulo } from '@components/ScreenTitulo';
import { Button } from '@components/Button';
import { Input } from '@components/Input';


export function ContaBancariaForm() {
    const navigation = useNavigation();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ usuario, setUsuario ] = useState<UsuarioDTO>();
    const [ bancoSelecionado, setBancoSelecionado ] = useState<[]>([]);
    const [ bancos, setBancos ] = useState<ComboBoxProps[]>([]);
    
    const [ descricaoConta, setDescricaoConta ] = useState('');
    const [ agenciaConta, setAgenciaConta ] = useState('');
    const [ numeroConta, setNumeroConta ] = useState('');
    const [ valorIncialConta, setValorIncialConta ] = useState('');


    async function handleOnPressGravar(){

    } 

    useFocusEffect(useCallback(() => {
        async function carregarDados() {
            try {
                setIsLoading(true);
                const storageUsuario = await storageUsuarioBuscar();
                setUsuario(storageUsuario);
            } 
            catch (error) {
                if(error instanceof AppError)
                    AppToastInformacao(error.menssagem);
                else 
                    AppToastInformacao('Não foi possivel carregar dados.');
            }
            finally {
                setIsLoading(false);
            }

            let lista : ComboBoxProps[] = [];
            BancoDAO.RequestAll()
                .then((retorno) => {
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

        carregarDados();
    }, []))

    return(
        <Container>
            <ScreenHeader showBackButton handleOnPress={ () => navigation.navigate('Conta Bancaria') } />
            <ScreenTitulo titulo='Conta Bancaria' />
            
            { isLoading ? <Loading /> :
                <Form>
                    <Input autoCapitalize='characters' autoCorrect={false} returnKeyType="done" value={ descricaoConta } 
                        onChangeText={ setDescricaoConta } placeholder="Descrição Conta" style={{ marginBottom: 5 }} />

                    <ComboBox itemSelecionado={ bancoSelecionado } setItemSelecionado={ setBancoSelecionado } items={ bancos } />

                    <Input autoCapitalize='characters' autoCorrect={false} returnKeyType="done" value={ agenciaConta } 
                        onChangeText={ setAgenciaConta } placeholder="Agencia Conta" style={{ marginBottom: 5, marginTop: 5 }} />

                    <Input autoCapitalize='characters' autoCorrect={false} returnKeyType="done" value={ numeroConta } 
                        onChangeText={ setNumeroConta } placeholder="Numero Conta" style={{ marginBottom: 5 }} />

                    <Input autoCapitalize='characters' autoCorrect={false} returnKeyType="done" value={ valorIncialConta } 
                        onChangeText={ setValorIncialConta } placeholder="Valor Incial" style={{ marginBottom: 5 }} />
                </Form>
            }
            <Button descricao='Gravar' onPress={ handleOnPressGravar } />
        </Container>
    )
}