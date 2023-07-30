import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/AppError'

import { CATEGORIA_COLLECTION } from '@storage/storageConfig'
import { CategoriaDTO } from '../_DTOs/CategoriaDTO';

export async function CategoriaGravar(descricao: string) {
  try {
    const stored = await AsyncStorage.getItem(CATEGORIA_COLLECTION);
    const storedCategorias : CategoriaDTO[] = stored ? JSON.parse(stored) : [];
    const categoriaExiste = storedCategorias.filter(categoria => categoria.descricao === descricao);

    if(categoriaExiste.length > 0) 
      throw new AppError('Categoria já Castrada.');
    
    const storage = JSON.stringify([...storedCategorias, { codigo: uuid.v4(), descricao: descricao }]);
    await AsyncStorage.setItem(CATEGORIA_COLLECTION, storage);

  } catch (error) {
    throw error;
  }
}