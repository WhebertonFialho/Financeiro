import AsyncStorage from '@react-native-async-storage/async-storage';

import { TIPO_CARTAO_COLLECTION } from '@storage/storageConfig'
import { TipoCartaoDTO } from '../_DTOs/TipoCartaoDTO';

export async function TipoCartaoGravar(novoTipoCartao: TipoCartaoDTO) {
  try {
    const stored = await AsyncStorage.getItem(TIPO_CARTAO_COLLECTION);
    const storedTiposCartao : TipoCartaoDTO[] = stored ? JSON.parse(stored) : [];
    const tipoCartaoExiste = storedTiposCartao.filter(banco => banco.codigo === novoTipoCartao.codigo);

    if(tipoCartaoExiste.length > 0) 
      return
    
    const storage = JSON.stringify([...storedTiposCartao, novoTipoCartao]);
    await AsyncStorage.setItem(TIPO_CARTAO_COLLECTION, storage);

  } catch (error) {
    throw error;
  }
}