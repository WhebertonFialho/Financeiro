import AsyncStorage from '@react-native-async-storage/async-storage';

import { CARTAO_COLLECTION } from '@storage/storageConfig';
import { CartaoDTO } from '../_DTOs/CartaoDTO';

export async function CartaoBuscar() {
  try {
    const storage = await AsyncStorage.getItem(CARTAO_COLLECTION);
    const cartao: CartaoDTO[] = storage ? JSON.parse(storage) : [];

    return cartao;
  } catch (error) {
    throw error;
  }
}