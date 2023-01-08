const TON_DOMAINS = {domains}
const PROXIES = {proxies}

function FindProxyForURL (url, host) {
  if (TON_DOMAINS.some(domain => host.endsWith(domain)))
    return PROXIES.map(proxy => `PROXY ${{proxy}}`).join(';')

  return 'DIRECT'
}
