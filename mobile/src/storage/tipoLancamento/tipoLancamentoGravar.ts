import AsyncStorage from '@react-native-async-storage/async-storage';

import { TIPO_LANCAMENTO_COLLECTION } from '@storage/storageConfig'
import { TipoLancamentoDTO } from '../_DTOs/TipoLancamentoDTO';

export async function TipoLancamentoGravar(novoTipoLancamento: TipoLancamentoDTO) {
  try {
    const stored = await AsyncStorage.getItem(TIPO_LANCAMENTO_COLLECTION);
    const storedTiposLancamento : TipoLancamentoDTO[] = stored ? JSON.parse(stored) : [];
    const tipoLancamentoExiste = storedTiposLancamento.filter(tipoLancamento => tipoLancamento.codigo === novoTipoLancamento.codigo);

    if(tipoLancamentoExiste.length > 0) 
      return
    
    const storage = JSON.stringify([...storedTiposLancamento, novoTipoLancamento]);
    await AsyncStorage.setItem(TIPO_LANCAMENTO_COLLECTION, storage);

  } catch (error) {
    throw error;
  }
}