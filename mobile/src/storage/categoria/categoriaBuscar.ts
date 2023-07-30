import AsyncStorage from '@react-native-async-storage/async-storage';

import { CATEGORIA_COLLECTION } from '@storage/storageConfig';
import { CategoriaDTO } from '../_DTOs/CategoriaDTO';

export async function CategoriaBuscar() {
  try {
    const storage = await AsyncStorage.getItem(CATEGORIA_COLLECTION);
    const categorias: CategoriaDTO[] = storage ? JSON.parse(storage) : [];

    return categorias;
  } catch (error) {
    throw error;
  }
}