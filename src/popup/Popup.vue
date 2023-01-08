<script setup lang="ts">
import { useProxyControls } from "./composition/ProxyControls.hook";
import { useEditable } from "./composables/Editable.hook";
import { useCustomProxiesFormatter } from "./composition/CustomProxiesFormatter.hook";
import About from './About.vue'

const {
  isProxyEnabled,
  isProxyCustom,
  customProxies
} = useProxyControls()

const { model: editedProxies, save, reset, isChanged } = useEditable(customProxies)

useCustomProxiesFormatter(editedProxies)

function clear () {
  customProxies.value = []
}

const locale = {
  isEnabled: 'Enable TON Proxy',
  isCustom: 'Use custom proxies',
  custom: {
    title: 'Custom proxies',
    host: 'Host',
    comment: 'Comment'
  },
  buttons: {
    save: "Save",
    reset: "Reset",
    clear: "Clear",
  },
  createdBy: 'Created by',
}
</script>

<template>
  <main class="column q-pa-md" :class="$style.main">
    <About/>

    <QItem>
      <QItemSection side>
        <QIcon name="switch_access_shortcut"/>
      </QItemSection>

      <QItemSection>
        <QCheckbox v-model="isProxyEnabled"
                   class="non-selectable"
                   :label="locale.isEnabled"/>
      </QItemSection>
    </QItem>

    <QExpansionItem v-model="isProxyCustom"
                    :header-class="$style.expansion_header">
      <template #header>
        <QItemSection side>
          <QIcon name="settings"/>
        </QItemSection>

        <QItemSection>
          <QCheckbox v-model="isProxyCustom"
                     class="non-selectable"
                     :label="locale.isCustom"/>
        </QItemSection>
      </template>

      <QScrollArea :class="$style.scroll">
        <QItem v-for="(customProxy, index) in editedProxies"
             :key="index">
          <QItemSection side>
            <QCheckbox v-model="customProxy.isEnabled"
            :disable="index === editedProxies.length - 1"/>
          </QItemSection>

          <QItemSection no-wrap>
            <QInput v-model="customProxy.host"
                    outlined
                    dense
                    :label="locale.custom.host"/>
          </QItemSection>

          <QItemSection no-wrap>
            <QInput v-model="customProxy.comment"
                    outlined
                    dense
                    :label="locale.custom.comment"/>
          </QItemSection>
        </QItem>
      </QScrollArea>

      <div class="q-gutter-md">
        <QBtn :label="locale.buttons.save"
              color="primary"
              :disable="!isChanged"
              @click="save"/>

        <QBtn :label="locale.buttons.reset"
              flat
              :disable="!isChanged"
              color="negative"
              @click="reset"/>

        <QBtn :label="locale.buttons.clear"
              flat
              @click="clear"/>
      </div>
    </QExpansionItem>
  </main>
</template>

<style lang="scss" module>
.main {
  width: 50rem;
}

.scroll {
  height: 23rem;
}

.expansion_header :global(.q-focus-helper) {
  opacity: 0 !important;
}
</style>
