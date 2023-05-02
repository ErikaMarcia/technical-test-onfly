<template>
    <q-card style="width: 80vw; height: 250px;">
      <q-card-section class="col-3" horizontal style="height: 100%">
          <q-carousel style="width: 35%; height: 100%"
            animated
            v-model="slide"
            arrows
            infinite
            control-type="regular"
            control-color="white"
          >
          <q-carousel-slide v-for="(imgSrc, index) in hotel.images" :key="index" :name="index" :img-src="imgSrc" />
          </q-carousel>
        <q-card-section class="col-5">
          <div class="text-h5 text-grey-9">{{hotel.name}}</div>
          <div class="text-weight-regular text-grey-8">{{ hotel.address.fullAddress }}</div>
          <div class="row" style="margin: 1.3em 0 1em;">
            <div class="flex items-center">
              <div class="text-caption text-grey-7" >{{ hotel.stars }}</div>
              <q-rating
                v-model="model"
                size="1.5em"
                color="amber-4"
                readonly
              />
            </div>
            <div class="bg-grey-6" style="width: 1px; height: 20px; margin: auto 1em;" ></div>
            <div v-for="amenity in hotel.amenities" :key="amenity.key">
              <q-icon size="1.5em"  color="grey-6" :name="amenity.key" />
            </div>
          </div>
          <q-chip class="bg-grey-7" text-color="white" v-if="hotel.hasBreakFast" square >Café da manhã</q-chip>
          <q-chip class="bg-grey-7" text-color="white" v-if="hotel.hasRefundableRoom" square >Reembolsável</q-chip>
          <q-chip class="bg-grey-7" text-color="white" v-if="hotel.hasAgreement" square >Contrato</q-chip>
        </q-card-section>
        <div class="bg-grey-12" style="width: 2px" ></div>
        <q-card-section class="col">
          <div class="text-body2 text-grey-8">A partir de:</div>
          <div class="text-h6 flex items-center text-grey-9"><div class="text-body2">R$</div>1332,00</div>
          <div class="text-subtitle2 text-grey-8">R$444,00/noite</div>
          <div class="text-body1 text-grey-8">Impostos inclusos</div>
          <q-btn class="rounded btn" label="Selecionar" @click="openDrawer"/>
        </q-card-section>
      </q-card-section>
    </q-card>
  </template>

<style lang="sass">
.btn
  color: white
  background-color: $color-primary
  border-radius: 50px
  width: 150px
  height: 45px
  font-size: 1rem
  margin: 30px auto
.q-carousel__control
  .q-btn
    color: gray !important

</style>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Hotel } from './models'

export default defineComponent({
  name: 'CardHotelComponent',
  props: {
    hotel: {
      type: Object as () =>Hotel,
      required: true
    }
  },
  setup (props, { emit }) {
    const slide = ref<number>(0)
    const model = ref<number>(parseFloat(props.hotel.stars))
    const openDrawer = () => {
      emit('open-drawer', props.hotel)
    }
    return {
      slide,
      model,
      openDrawer
    }
  }
})
</script>
