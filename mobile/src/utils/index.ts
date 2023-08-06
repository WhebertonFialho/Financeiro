import {useEffect} from 'react';
import { storageUsuarioBuscar } from '@storage/auth/storageUsuario';

export const delay = (ms : number) => new Promise(
  resolve => setTimeout(resolve, ms)
);