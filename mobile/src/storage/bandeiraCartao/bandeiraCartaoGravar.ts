import AsyncStorage from '@react-native-async-storage/async-storage';

import { BANDEIRA_CARTAO_COLLECTION } from '@storage/storageConfig'
import { BandeiraCartaoDTO } from '../_DTOs/BandeiraCartaoDTO';

export async function BandeiraCartaoGravar(novaBandeira: BandeiraCartaoDTO) {
  try {
    const stored = await AsyncStorage.getItem(BANDEIRA_CARTAO_COLLECTION);
    const storedBandeirasCartao : BandeiraCartaoDTO[] = stored ? JSON.parse(stored) : [];
    const bandeiraCartaoExiste = storedBandeirasCartao.filter(bandeira => bandeira.codigo === novaBandeira.codigo);

    if(bandeiraCartaoExiste.length > 0) 
      return
    
    const storage = JSON.stringify([...storedBandeirasCartao, novaBandeira]);
    await AsyncStorage.setItem(BANDEIRA_CARTAO_COLLECTION, storage);

  } catch (error) {
    throw error;
  }
}