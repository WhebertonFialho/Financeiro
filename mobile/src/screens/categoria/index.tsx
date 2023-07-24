import { useState, useRef, useCallback } from 'react';
import { Alert, FlatList, TextInput } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';

import { AppError } from '@utils/AppError';
import { ScreenHeader } from '@components/ScreenHeader';
import { Input } from "@components/Input";
import { Loading } from '@components/Loading';

import { ButtonIcon } from '@components/ButtonIcon'

import { Container, Form, Lista } from "./styles";
import { ScreenTitulo } from '@components/ScreenTitulo';
import { ListaVazia } from '@components/ListaVazia';
import { ListaItem } from '@components/ListaItem';
import { AppToastInformacao } from '@utils/appToast';
import { CategoriaStorageDTO } from '@storage/categoria/categoriaStorageDTO';
import { categoriaBuscar } from '@storage/categoria/categoriaBuscar';
import { CategoriaGravar } from '@storage/categoria/categoriaGravar';
import { CategoriaRemover } from '@storage/categoria/categoriaRemover';

export function Categoria(){
    const descricaoInputRef = useRef<TextInput>(null);
    const [ isLoading, setIsLoading] = useState(true);
    const [ decricaoCategoria, setDecricaoCategoria] = useState('');
    const [ categorias, setCategorias ] = useState<CategoriaStorageDTO[]>([]);

    async function handleGravarCategoria() {
        try {
            if(decricaoCategoria.trim().length === 0)
                return;

            setIsLoading(true);
            await CategoriaGravar(decricaoCategoria);

            setDecricaoCategoria('');
            handleAtualizaListaCategoria();

            descricaoInputRef.current?.blur();
        } 
        catch (error) {
            if(error instanceof AppError)
                AppToastInformacao(error.menssagem);
            else {
                console.log(error);
            }    
        }
        finally {
            setIsLoading(false);
        }
    }

    async function handleRemoverCategoria(codigo : string) {
        try {
            setIsLoading(true);
            await CategoriaRemover(codigo);

            handleAtualizaListaCategoria();
        } 
        catch (error) {
            if(error instanceof AppError)
                AppToastInformacao(error.menssagem);
            else {
                console.log(error);
            }    
        }
        finally {
            setIsLoading(false);
        }
    }

    async function handleAtualizaListaCategoria() {
        try {
            setIsLoading(true);
            const storageCategorias = await categoriaBuscar();
            setCategorias(storageCategorias);
        } 
        catch (error) {
            if(error instanceof AppError)
                AppToastInformacao(error.menssagem);
            else {
                console.log(error);
                AppToastInformacao('Não foi possivel carregar categorias.');
            }
        }
        finally {
            setIsLoading(false);
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


    useFocusEffect(useCallback(() => {
        handleAtualizaListaCategoria()
    },[]))

    return(
        <Container>
            <ScreenHeader />
            <ScreenTitulo titulo='Categoria' />

            <Form>
                <Input autoCorrect={false} inputRef={ descricaoInputRef } value={ decricaoCategoria } onChangeText={ setDecricaoCategoria }
                    placeholder="Descrição da categoria" onSubmitEditing={ handleGravarCategoria } returnKeyType="done" />

                <ButtonIcon icone="add" tipo='SUCCESS' onPress={handleGravarCategoria} />
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