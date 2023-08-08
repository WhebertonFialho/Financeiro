import uuid from 'react-native-uuid'; 
import { useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppToastGravarErro, AppToastGravarSucesso, AppToastInformacao } from '@utils/appToast';
import { AppError } from '@utils/AppError';

import { Loading } from '@components/Loading';
import { ComboBox, ComboBoxProps } from '@components/ComboBox';
import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenTitulo } from '@components/ScreenTitulo';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

import { storageUsuarioBuscar } from '@storage/auth/storageUsuario';

import BancoDAO from '@DAOs/BancoDAO';
import ContaBancariaDAO from '@DAOs/ContaBancariaDAO';

import { UsuarioDTO } from '@DTOs/UsuarioDTO';
import { BancoDTO } from '@DTOs/BancoDTO';
import { ContaBancariaDTO } from '@DTOs/ContaBancariaDTO'; 

import { Container, Form } from './styles';

export function ContaBancariaForm() {
    const navigation = useNavigation();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ usuario, setUsuario ] = useState<UsuarioDTO>();
    const [ bancoSelecionado, setBancoSelecionado ] = useState('');
    const [ bancos, setBancos ] = useState<ComboBoxProps[]>([]);
    
    const [ codigoConta, setCodigoConta ] = useState<string>('');
    const [ descricaoConta, setDescricaoConta ] = useState('');
    const [ agenciaConta, setAgenciaConta ] = useState('');
    const [ numeroConta, setNumeroConta ] = useState('');
    const [ valorIncialConta, setValorIncialConta ] = useState('');

    async function handleOnPressGravar() {

        if(descricaoConta.trim().length === 0)
            return AppToastInformacao('Preencha a Descrição.');

        if(agenciaConta.trim().length === 0)
            return AppToastInformacao('Preencha a Agencia.');

        if(numeroConta.trim().length === 0)
            return AppToastInformacao('Preencha a Numero Conta.');

        const novaContaBancaria : ContaBancariaDTO = {
            codigo: codigoConta.length === 0 ?  uuid.v4() : codigoConta,
            descricao: descricaoConta,
            banco: bancoSelecionado,
            agencia: agenciaConta,
            nro_conta: numeroConta,
            valor_inicial: valorIncialConta,
            usuario: usuario?.id
        }

        setIsLoading(true);
        ContaBancariaDAO.RequestByCodigo(novaContaBancaria.codigo)
            .then(res => {
                ContaBancariaDAO.Update(novaContaBancaria)
                    .then(res => {
                        AppToastGravarSucesso();
                        setIsLoading(false);
                    })
                    .catch(err => {
                        AppToastGravarErro();
                        setIsLoading(false)
                    });
            })
            .catch(err => {
                ContaBancariaDAO.Create(novaContaBancaria)
                .then(res => {
                    AppToastGravarSucesso();
                    setIsLoading(false);
                })
                .catch(err => {
                    AppToastGravarErro();
                    setIsLoading(false)
                })
            })
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
    }, []));

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