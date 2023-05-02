<template >
  <q-page class="column items-center justify-evenly">
    <FilterComponent class="q-mt-md"  @update:city="getHotels"></FilterComponent>
    <div class="row items-center justify-between" style="width: 80vw;">
      <PathNavigationComponent :city="city"></PathNavigationComponent>
      <div class="row items-center" >
        <label style="margin-right: 5px;">Organizar por </label>
        <q-select style="font-style: italic;"  borderless v-model="ordeBy" :options="options" @update:modelValue="onOrderByChange"/>
      </div>
    </div>
    <div class="column items-center justify-between hotels">
      <CardHotelComponent class="q-mt-md" v-for="hotel in hotels" :key="hotel.id" :hotel="hotel" @open-drawer="onOpenDrawer"></CardHotelComponent>
    </div>
  </q-page>
</template>

<script lang="ts">
import PathNavigationComponent from '../components/PathNavigationComponent.vue'
import FilterComponent from '../components/FilterComponent.vue'
import CardHotelComponent from '../components/CardHotelComponent.vue'
import { defineComponent, ref } from 'vue'
import { Hotel, Place } from '../components/models'
import hotelPlaceData from '../data/hotel.json'

export default defineComponent({
  name: 'IndexPage',
  components: {
    FilterComponent,
    PathNavigationComponent,
    CardHotelComponent
  },
  setup (props, { emit }) {
    const hotels = ref<Hotel[]>()
    const openDrawer = ref<boolean>(false)
    const options = [
      'Recomendados',
      'Nomes',
      'Melhor Avaliados'
    ]
    const orderBy = ref(options[0])
    const onOrderByChange = (value: string) => {
      orderBy.value = value
    }
    function onOpenDrawer (hotel: Hotel) {
      emit('open-drawer', hotel)
    }

    return {
      options,
      hotels,
      orderBy,
      openDrawer,
      onOrderByChange,
      onOpenDrawer
    }
  },
  data (): { city: string, ordeBy: string } {
    return {
      ordeBy: 'Recomendados',
      city: 'Belo Horizonte'
    }
  },
  created () {
    this.getHotels()
  },
  methods: {
    getHotels (place?: Place) {
      const hotelsList = []

      if (!place) {
        hotelPlaceData.forEach((hotels) => {
          hotels.hotels.forEach(hotel => {
            hotelsList.push(hotel)
          })
        })
        this.hotels = hotelsList
        return
      }
      this.city = place[0].name
      hotelPlaceData.filter(hotel => hotel.placeId === place[0].placeId)[0].hotels.forEach(hotel => {
        hotelsList.push(hotel)
      })
      this.hotels = hotelsList
    }
  }
})
</script>
