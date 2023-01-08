import { Ref, watchEffect } from "vue";

enum BadgeState {
  Enabled,
  Disabled,
}

const badgeColors: Record<BadgeState, chrome.action.ColorArray> = {
  [BadgeState.Enabled]: [1, 109, 169, 255],
  [BadgeState.Disabled]: [160, 0, 0, 255],
}

const badgeTexts = {
  [BadgeState.Enabled]: ' ON ',
  [BadgeState.Disabled]: ' OFF ',
}

export function useChromeBadge (isEnabled: Readonly<Ref<boolean>>) {
  watchEffect(async () => {
    const state = isEnabled.value ? BadgeState.Enabled : BadgeState.Disabled

    await Promise.all([
      chrome.action.setBadgeBackgroundColor({ color: badgeColors[state] }),
      chrome.action.setBadgeText({ text: badgeTexts[state] })
    ])
  })
}
