import AsyncStorage from '@react-native-async-storage/async-storage';

import { TIPO_LANCAMENTO_COLLECTION } from '@storage/storageConfig';
import { TipoLancamentoDTO } from '../_DTOs/TipoLancamentoDTO';

export async function TipoLancamentoBuscar() {
  try {
    const storage = await AsyncStorage.getItem(TIPO_LANCAMENTO_COLLECTION);
    const tiposLancamento: TipoLancamentoDTO[] = storage ? JSON.parse(storage) : [];

    return tiposLancamento;
  } catch (error) {
    throw error;
  }
}