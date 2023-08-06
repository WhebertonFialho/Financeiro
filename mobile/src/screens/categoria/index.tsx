import uuid from 'react-native-uuid';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Alert, FlatList, TextInput } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';

import { AppError } from '@utils/AppError';
import { AppToastErro, AppToastInformacao } from '@utils/appToast';
import { storageUsuarioBuscar } from '@storage/auth/storageUsuario';

import { ScreenHeader } from '@components/ScreenHeader';
import { Input } from "@components/Input";
import { Loading } from '@components/Loading';
import { ButtonIcon } from '@components/ButtonIcon'
import { ScreenTitulo } from '@components/ScreenTitulo';
import { ListaVazia } from '@components/ListaVazia';
import { ListaItem } from '@components/ListaItem';

import CategoriaDAO from '@DAOs/CategoriaDAO';
import { CategoriaDTO } from '@storage/_DTOs/CategoriaDTO';

import { Container, Form } from "./styles";
import { UsuarioDTO } from '@DTOs/UsuarioDTO';

export function Categoria() {
    const descricaoInputRef = useRef<TextInput>(null);
    const [ usuario, setUsuario ] = useState<UsuarioDTO>();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ decricaoCategoria, setDecricaoCategoria] = useState('');
    const [ categorias, setCategorias ] = useState<CategoriaDTO[]>([]);

    async function handleGravarCategoria() {     
        if(decricaoCategoria.trim().length === 0)
            return;

        setIsLoading(true);
        const novaCategoria : CategoriaDTO = { 
            codigo: uuid.v4(), 
            descricao: decricaoCategoria,
            usuario: usuario?.id
        };    
        

        CategoriaDAO.Create(novaCategoria)
            .then((res) => {
                console.log('Cadastrado com Sucesso');
            })
            .catch(erro => {
                AppToastInformacao(erro);
            })
        
        setDecricaoCategoria('');
        handleAtualizaListaCategoria();
        
        setIsLoading(false);
        descricaoInputRef.current?.blur();
        
    }

    async function handleRemoverCategoria(codigo : string) {
        setIsLoading(true);
        
        CategoriaDAO.Remove(codigo)
            .then(res => {
                handleAtualizaListaCategoria();
            })
            .catch(err => {
                AppToastErro(err);
            })

        setIsLoading(false);
    }

    async function handleAtualizaListaCategoria() {
        try {
            
            setIsLoading(true);
            CategoriaDAO.RequestAll(usuario?.id)
                .then(categorias => {
                    setCategorias(categorias);
                })
                .catch(err => {
                    console.log('Não foi possivel carregar categorias.');
                });
            
            setIsLoading(false);

        } catch (error) {
            AppToastErro('Não foi possivel carregar categorias.');
        }
    }

    async function handleClickRemover(codigo : string) {
        Alert.alert(
          'Remover',
          'Deseja remover a categoria?',
          [
            { text: 'Não', style: 'cancel' },
            { text: 'Sim', onPress: () => handleRemoverCategoria(codigo) }
          ]
        )
    }

    useEffect(() => {
        handleAtualizaListaCategoria();
    }, [usuario])

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
        }

        carregarDados();
    }, []))

    return(
        <Container>
            <ScreenHeader />
            <ScreenTitulo titulo='Categoria' />

            <Form>
                <Input autoCorrect={false} inputRef={ descricaoInputRef } value={ decricaoCategoria } onChangeText={ setDecricaoCategoria }
                    placeholder="Descrição da categoria" onSubmitEditing={ handleGravarCategoria } returnKeyType="done" />

                <ButtonIcon icone="add" tipo='SUCCESS' onPress={ handleGravarCategoria } />
            </Form>

            { isLoading ? <Loading /> : 
                <FlatList data={ categorias }
                    keyExtractor={item => item.codigo}
                    renderItem={({ item }) => ( <ListaItem descricao={item.descricao}  onRemove={() => handleClickRemover(item.codigo)} /> )}
                    ListEmptyComponent={() => ( <ListaVazia /> )}
                    showsVerticalScrollIndicator={ false }
                    contentContainerStyle={[{ paddingBottom: 100 }, categorias.length === 0 && { flex: 1 }]}
                />
            }

        </Container>
    )
}