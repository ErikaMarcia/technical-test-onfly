<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-grey-11">
      <q-toolbar>
        <q-toolbar-title>
          <q-img src="../assets/OnflyLogo.png" style="height: 40px; max-width: 200px;"  :fit="'contain'"/>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
        v-if="drawer"
        side="right"
        v-model="drawer"
        show-if-above
        :breakpoint="700"
        overlay
        persistent
        click-to-close
        v-show="drawer"
        modal
        no-router-dismiss
      >
        <div class="close-drawer" @click="closeDrawer"></div>
        <div v-show="hotel" class="body-drawer bg-grey-11 q-pl-md q-pr-md q-pt-md">
          <div class="row flex items-center">
              <div class="text-caption text-grey-7 q-pr-xs" >{{ hotel.stars }}</div>
              <q-rating
                v-model="modelStars"
                size="1.5em"
                color="amber-6"
                readonly
              />
            </div>
            <div class="row text-h4 text-grey-9 q-pt-sm">{{hotel.name}}</div>
            <div class="text-weight-regular text-subtitle2 text-grey-8">{{ hotel.address.fullAddress }} , {{ hotel.address.city }} - {{ hotel.address.state }}</div>
            <div class="row">
              <q-carousel style="width: 100%; height: 300px; border-radius: 10px; margin: auto;"
              animated
              v-model="slide"
              arrows
              infinite
              control-type="regular"
              control-color="white"
              >
                <q-carousel-slide v-for="(imgSrc, index) in hotel.images" :key="index" :name="index" :img-src="imgSrc" />
              </q-carousel>
              <q-chip text-color="white" style="background-color: #000000b3; margin: auto; margin-top: -35px;">
                {{ slide + 1 }}/{{ hotel.images.length }}
              </q-chip>
            </div>
            <div class="row text-h5 text-weight-regular q-mt-md text-grey-9">
              Facilidades do hotel
            </div>
            <hr>
            <div class="row justify-evenly q-mt-md">
              <div class="row items-center" v-for="amenity in hotel.amenities" :key="amenity.key">
              <q-icon size="1.5em"  color="grey-6" :name="amenity.key" />
              <span class="text-weight-regular text-h6 text-grey-8 q-ml-md">{{ amenity.label }}</span>
            </div>
            </div>
            <div class="row text-h5 text-weight-regular q-mt-md text-grey-9">
              Conheça um pouco mais
            </div>
            <div class="row text-weight-regular text-h6 text-grey-8 q-ml-md">
              {{ hotel.description }}
            </div>
        </div>
      </q-drawer>
    <q-page-container class="bg-grey-12" >
      <router-view @open-drawer="onOpenDrawer"/>
    </q-page-container>

  </q-layout>
</template>
<style lang="sass">
.q-drawer, .fit
  width: 100vw !important
  background-color: transparent !important
  display: flex
  .close-drawer
    width: 30vw
    height: 100%
    background-color: #0000009c
  .body-drawer
    width: 70vw
    height: 100%
    overflow-y: auto

</style>
<script lang="ts">
import { ref } from 'vue'
import { Hotel } from '../components/models'

export default {
  setup () {
    const drawer = ref(false)
    const slide = ref<number>(0)
    const hotel = ref<Hotel>(null)
    const modelStars = ref<number>(null)
    function onOpenDrawer (data: Hotel) {
      drawer.value = !drawer.value
      hotel.value = data
      modelStars.value = parseFloat(hotel.value.stars)
    }
    return {
      drawer,
      onOpenDrawer,
      hotel,
      modelStars,
      slide
    }
  },
  methods: {
    closeDrawer () {
      this.drawer = false
    }
  }
}
</script>
