import { CustomProxy } from "../types/types";

export enum StorageKey {
  CustomProxies = 'CustomProxies',
  IsProxyEnabled = 'IsProxyEnabled',
  IsProxyCustom = 'IsProxyCustom',
}

export interface StorageValues {
  [StorageKey.CustomProxies]: CustomProxy[]
  [StorageKey.IsProxyEnabled]: boolean
  [StorageKey.IsProxyCustom]: boolean
}

export class PersistentStorage {
  private readonly storage: Storage

  constructor(storage: Storage) {
    this.storage = storage
  }

  get<K extends StorageKey>(key: K): StorageValues[K] | null {
    const value = this.storage.getItem(key)

    if (typeof value !== 'string')
      return null

    return JSON.parse(value)
  }

  set<K extends StorageKey>(key: K, value: StorageValues[K]): void {
    this.storage.setItem(key, JSON.stringify(value))
  }
}

export const storage = new PersistentStorage(window.localStorage)
