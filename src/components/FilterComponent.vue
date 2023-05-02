<template>
    <q-card style="width: 80vw; height: 230px;">
        <q-card-section>
            <div class="text-h5">Reservar hotel</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-form class="form-with-button" @submit.prevent="submit">
            <label class="text-subtitle1">Destino</label>
            <q-input outlined v-model="destiny" :rules="[val => !!val || 'Por favor, preencha seu destino!']" dense autocomplete="off"/>
            <q-btn class="rounded btn-filter" label="Alterar busca" type="submit" :disable="disableSubmitButton" style=""/>
          </q-form>
        </q-card-section>
    </q-card>
</template>

<style lang="sass">
.form-with-button
  display: flex
  flex-direction: column
  justify-content: flex-end
  height: 100%

.btn-filter
  color: white
  background-color: $color-primary
  border-radius: 50px
  width: 190px
  height: 45px
  font-size: 1rem
  margin-left: auto

</style>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import placeData from '../data/place.json'
import { Place } from './models'

export default defineComponent({
  name: 'FilterComponent',
  emits: ['update:city'],
  data () {
    const places = ref<Place[]>()
    return {
      destiny: 'Belo Horizonte',
      disableSubmitButton: true,
      places
    }
  },
  created () {
    this.places = placeData
  },
  watch: {
    destiny () {
      this.disableSubmitButton = this.destiny.trim().length === 0
    }
  },
  methods: {
    submit () {
      this.$emit('update:city', this.places.filter(city => city.name === this.destiny))
    }
  }
})
</script>
