import { computed, Ref, watch } from "vue";
import { setProxy } from "../utils/proxy.utils";
import { getPacScript } from "../../pac";

export function useProxiesApplier(proxies: Readonly<Ref<string[]>>) {
  const chromeProxyModel = computed(() => {
    if (!proxies.value.length)
      return { mode: 'direct' }

    return {
      mode: "pac_script",
      pacScript: {
        data: getPacScript({
          proxies: proxies.value,
          domains: ['.ton', '.adnl']
        })
      }
    }
  })

  watch(chromeProxyModel, setProxy, { immediate: true })
}
