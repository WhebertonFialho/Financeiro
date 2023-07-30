import AsyncStorage from '@react-native-async-storage/async-storage';

import { CATEGORIA_COLLECTION } from '@storage/storageConfig';
import { CategoriaBuscar } from './categoriaBuscar';

export async function CategoriaRemover(codigoCategoria: string) {
  try {
    const storage = await CategoriaBuscar();
    const categoriasFiltrada = storage.filter(categoria => categoria.codigo !== codigoCategoria);
    const categorias = JSON.stringify(categoriasFiltrada);

    await AsyncStorage.setItem(CATEGORIA_COLLECTION, categorias);

  } catch (error) {
    throw error;
  }
}