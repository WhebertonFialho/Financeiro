import AsyncStorage from '@react-native-async-storage/async-storage';

import { TIPO_CARTAO_COLLECTION } from '@storage/storageConfig';
import { TipoCartaoDTO } from '../_DTOs/TipoCartaoDTO';

export async function TipoCartaoBuscar() {
  try {
    const storage = await AsyncStorage.getItem(TIPO_CARTAO_COLLECTION);
    const tiposCartao: TipoCartaoDTO[] = storage ? JSON.parse(storage) : [];

    return tiposCartao;
  } catch (error) {
    throw error;
  }
}