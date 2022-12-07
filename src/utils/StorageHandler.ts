import AsyncStorage from '@react-native-async-storage/async-storage';

namespace StorageHandler {
  function handleKey(key: string): string {
    return `@CONTACTS_LIST:${key.toUpperCase()}`;
  }

  export async function add<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(handleKey(key), JSON.stringify(value));
  }

  export async function get<T>(key: string): Promise<T | undefined> {
    const itemToParse = await AsyncStorage.getItem(handleKey(key));

    if(itemToParse) return JSON.parse(itemToParse) as T;
  }

  export async function remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(handleKey(key));
  }
}

export default StorageHandler;