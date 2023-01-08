import { storage, StorageKey, StorageValues } from "../services/Storage";
import { Ref, ref, watch } from "vue";

export function useLocalStorageRef<
  K extends StorageKey,
  T extends StorageValues[K]
>(key: K, defaultValue: T) {
  const lsValue = storage.get(key)
  const data = ref(lsValue ?? defaultValue) as Ref<T>;

  watch(data, value => storage.set(key, value))

  return data
}
