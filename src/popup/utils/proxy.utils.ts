
export function setProxy(value: unknown) {
  const data: chrome.types.ChromeSettingSetDetails = {
    scope: 'regular',
    value
  }

  return new Promise(resolve => chrome.proxy.settings.set(data, resolve))
}

export function getProxy(options: chrome.types.ChromeSettingGetDetails = {}) {
  return new Promise<chrome.types.ChromeSettingGetResultDetails>(
    resolve => chrome.proxy.settings.get(options, resolve)
  )
}
