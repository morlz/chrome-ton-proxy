<script setup lang="ts">
import { version } from '../../package.json'

const locale = {
  createdBy: 'Created by',
}
</script>

<template>
  <div :class="$style.root" class="text-h6">
    <span v-text="locale.createdBy"/>
    <a href="https://t.me/devfragment" target="_blank">morlz</a>
    <span v-text="`v${version}`"/>
  </div>
</template>

<style lang="scss" module>
.root {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.2rem;
  justify-content: end;
  opacity: 0.6;
}
</style>
