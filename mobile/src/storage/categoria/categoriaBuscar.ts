import AsyncStorage from '@react-native-async-storage/async-storage';

import { CATEGORIA_COLLECTION } from '@storage/storageConfig';
import { CategoriaStorageDTO } from './categoriaStorageDTO';

export async function categoriaBuscar() {
  try {
    const storage = await AsyncStorage.getItem(CATEGORIA_COLLECTION);
    const categorias: CategoriaStorageDTO[] = storage ? JSON.parse(storage) : [];

    return categorias;
  } catch (error) {
    throw error;
  }
}