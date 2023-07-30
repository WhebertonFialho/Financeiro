import AsyncStorage from '@react-native-async-storage/async-storage';

import { BANCO_COLLECTION } from '@storage/storageConfig';
import { BancoDTO } from '../_DTOs/BancoDTO';

export async function BancoBuscar() {
  try {
    const storage = await AsyncStorage.getItem(BANCO_COLLECTION);
    const bancos: BancoDTO[] = storage ? JSON.parse(storage) : [];

    return bancos;
  } catch (error) {
    throw error;
  }
}