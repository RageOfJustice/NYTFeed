import AsyncStorage from '@react-native-async-storage/async-storage';
import { name as appName } from '../../app.json';

let cache: Record<string, unknown> = {};

export const setItem = async <Value>(key: string, value: Value) => {
  const appKey = `${appName}:${key}`;
  cache[key] = value;
  await AsyncStorage.setItem(appKey, JSON.stringify(value));
};

export const getItem = async <Value>(key: string, defaultValue?: Value) => {
  if (cache[key]) return cache[key];

  try {
    const appKey = `${appName}:${key}`;
    const value = await AsyncStorage.getItem(appKey);
    if (!value) return defaultValue;

    const parsedValue = JSON.parse(value);
    cache[key] = parsedValue;
    return parsedValue;
  } catch {
    return defaultValue;
  }
};

export const clearStorage = async () => {
  cache = {};
  await AsyncStorage.clear();
};
