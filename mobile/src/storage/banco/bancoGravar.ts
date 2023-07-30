import AsyncStorage from '@react-native-async-storage/async-storage';

import { BANCO_COLLECTION } from '@storage/storageConfig'
import { BancoDTO } from '../_DTOs/BancoDTO';

export async function BancoGravar(novoBanco: BancoDTO) {
  try {
    const stored = await AsyncStorage.getItem(BANCO_COLLECTION);
    const storedBancos : BancoDTO[] = stored ? JSON.parse(stored) : [];
    const bancoExiste = storedBancos.filter(banco => banco.codigo === novoBanco.codigo);

    if(bancoExiste.length > 0) 
      return
    
    const storage = JSON.stringify([...storedBancos, novoBanco]);
    await AsyncStorage.setItem(BANCO_COLLECTION, storage);

  } catch (error) {
    throw error;
  }
}