import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

export const mmkvStorage = new MMKV();

// mmkvStorage.clearAll();

export const zustandMMKVStorage: StateStorage = {
  setItem: (name: string, value: string) => {
    mmkvStorage.set(name, value);
  },
  getItem: (name: string) => {
    const value = mmkvStorage.getString(name);
    return value ?? null;
  },
  removeItem: (name: string) => {
    mmkvStorage.delete(name);
  },
};
