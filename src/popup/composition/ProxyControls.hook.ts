import { computed, watchEffect } from "vue";
import { StorageKey } from "../services/Storage";
import { useLocalStorageRef } from "../composables/LocalStorageRef.hook";
import { useProxiesApplier } from "./ProxiesApplier.hook";
import { CustomProxy } from "../types/types";
import { useChromeBadge } from "./ChromeBadge.hook";

export function useProxyControls () {
  const isProxyEnabled = useLocalStorageRef(StorageKey.IsProxyEnabled, false)
  const isProxyCustom = useLocalStorageRef(StorageKey.IsProxyCustom, false)
  const customProxies = useLocalStorageRef(StorageKey.CustomProxies, [] as CustomProxy[])

  useChromeBadge(isProxyEnabled)

  const currentProxies = computed(() => {
    if (!isProxyEnabled.value)
      return []

    if (isProxyCustom.value)
      return customProxies.value.filter(el => el.isEnabled && el.host).map(el => el.host)

    return getDefaultProxies()
  })

  useProxiesApplier(currentProxies)

  return {
    currentProxies,
    customProxies,
    isProxyEnabled,
    isProxyCustom
  }
}

function getDefaultProxies () {
  return ['in1.ton.org:8080', 'in2.ton.org:8080', 'in3.ton.org:8080']
}
