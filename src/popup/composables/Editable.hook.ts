import { computed, ref, Ref, watch } from "vue";
import { cloneDeep, isEqual } from "lodash-es";

export function useEditable <T>(source: Ref<T>) {
  const model = ref(cloneDeep(source.value)) as Ref<T>

  function save () {
    source.value = cloneDeep(model.value)
  }

  function reset () {
    model.value = cloneDeep(source.value)
  }

  watch(source, value => model.value = cloneDeep(value))

  const isChanged = computed(() => !isEqual(model.value, source.value))

  return {
    model,
    save,
    reset,
    isChanged
  }
}
