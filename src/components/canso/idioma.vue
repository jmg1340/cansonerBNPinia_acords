<template>

  <div class="row justify-center"
  :class="{classFonsClar: !store.temaFosc,
            classFonsFosc: store.temaFosc }"

  >
    <!-- <pre> {{ idioma.audio }}</pre> -->
    <div class="col-auto q-pa-md q-mb-md">
      <!-- <div class="text-center text-h6 text-grey-5"> {{ idioma.titol }}</div> -->
      <cmp_Lletra 
        :lletra="props.idioma.lletra"
      />
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    </div>
  </div>
  
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import cmp_Lletra from "./lletra.vue"
import { useCansoStore } from '../../stores/example-store'

export default defineComponent({
  components: { cmp_Lletra },
  props: {
    idioma: {
      type: Object,
      required: true
    }
  },


  setup( props ){
    const store = useCansoStore()

    // watch( () => props.idioma, (newX) => {
    //   console.log("***** nou 'IDIOMA ******", newX)
    // })

    return {store, props}

  }


})



</script>
