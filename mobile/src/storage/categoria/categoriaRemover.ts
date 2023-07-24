import AsyncStorage from '@react-native-async-storage/async-storage';

import { CATEGORIA_COLLECTION } from '@storage/storageConfig';
import { categoriaBuscar } from './categoriaBuscar';

export async function CategoriaRemover(codigoCategoria: string) {
  try {
    const storage = await categoriaBuscar();
    const categoriasFiltrada = storage.filter(categoria => categoria.codigo !== codigoCategoria);
    const categorias = JSON.stringify(categoriasFiltrada);

    await AsyncStorage.setItem(CATEGORIA_COLLECTION, categorias);

  } catch (error) {
    throw error;
  }
}