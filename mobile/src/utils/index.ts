import {useEffect} from 'react';

export const delay = (ms : number) => new Promise(
  resolve => setTimeout(resolve, ms)
);