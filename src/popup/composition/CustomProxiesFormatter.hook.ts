import { Ref, watch } from "vue";
import { CustomProxy } from "../types/types";
import { isEqual } from 'lodash-es';

export function useCustomProxiesFormatter (proxies: Ref<CustomProxy[]>) {
  watch(proxies, value => {
    const shouldBe = value
      .filter((el) => el.host)
      .concat([{ isEnabled: true, host: '', comment: '' }])

    if (isEqual(value, shouldBe)) return

    proxies.value = shouldBe

    console.log(proxies.value);
  }, { deep: true, immediate: true })
}
