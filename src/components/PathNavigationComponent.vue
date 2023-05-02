<template>
    <q-breadcrumbs>
      <template v-slot:separator>
        <q-icon
          size="1.5em"
          name="chevron_right"
        />
      </template>
      <q-breadcrumbs-el class="color-primary" label="início"/>
      <q-breadcrumbs-el class="color-primary" label="Hotéis"/>
      <q-breadcrumbs-el class="text-grey-8" :label="`Hospedagem em ${city}`" />
    </q-breadcrumbs>
</template>

<style lang="sass">
.q-breadcrumbs__separator
  color: $color-primary
.q-breadcrumbs-el.active
  color: $color-primary

</style>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    city: String
  }
})
</script>
