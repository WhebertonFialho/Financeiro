import AsyncStorage from '@react-native-async-storage/async-storage';

import { BANDEIRA_CARTAO_COLLECTION } from '@storage/storageConfig';
import { BandeiraCartaoDTO } from '../_DTOs/BandeiraCartaoDTO';

export async function BandeiraCartaoBuscar() {
  try {
    const storage = await AsyncStorage.getItem(BANDEIRA_CARTAO_COLLECTION);
    const bandeirasCartao: BandeiraCartaoDTO[] = storage ? JSON.parse(storage) : [];

    return bandeirasCartao;
  } catch (error) {
    throw error;
  }
}