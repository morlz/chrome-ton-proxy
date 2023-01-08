import pacTemplate from './pac.js?raw'
import format from "string-template";

interface PacScriptOptions {
  proxies: string[]
  domains: string[]
}

export function getPacScript (options: PacScriptOptions) {
  return format(pacTemplate, {
    proxies: JSON.stringify(options.proxies),
    domains: JSON.stringify(options.domains),
  })
}
