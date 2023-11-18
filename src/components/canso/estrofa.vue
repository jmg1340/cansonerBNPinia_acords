<template>
  <!-- <pre>{{ estrofa }}</pre> -->
  <!-- <div>{{ store.opcioAcords }}</div> -->
  <div>
    <!-- {{ store.activarAcords }}  {{ estrofa.tipus }} -->
    <div v-for="(objLinia, index) in props.estrofa.paragraf" :key="index">
      <!-- <div>Visible: {{ estrofa.visibleAlsMusics === 1 && index === 0 || estrofa.visibleAlsMusics === true }}</div> -->
      <!-- <cmp_linia 
        v-if="store.activarAcords && estrofa.tipus === 'anotacio'"
        :linia="objLinia"
      /> -->

      <!-- <div class="bg-red-3">
        VisibleMusics: <b>{{ estrofa.visibleAlsMusics }}</b>  <br/>
        index: <b>{{ index }}</b>  <br/>
      </div> -->
      <cmp_linia 
        v-if="estrofa.visibleAlsMusics === 1 && index === 0 && store.activarAcords"
        :linia="objLinia"
        :tipus="estrofa.tipus"
        :index="index"
        :visibleAlsMusics="1"
      />

      <!-- <cmp_linia 
        v-if="estrofa.visibleAlsMusics === true)"
        :linia="objLinia"
        :visibleAlsMusics="estrofa.visibleAlsMusics"
        :puntsSuspensius="store.activarAcords && estrofa.visibleAlsMusics === 1 && index === 0" 
        :tipus="estrofa.tipus"
      /> -->


      <cmp_linia 
        v-else-if="estrofa.visibleAlsMusics === true && store.activarAcords"
        :linia="objLinia" :tipus="estrofa.tipus" :index="index"
      />
      
      <cmp_linia 
        v-else-if="store.activarAcords === false"
        :linia="objLinia" :tipus="estrofa.tipus" :index="index"
      />
      
    </div>

    <!-- <q-separator v-if="props.estrofa.tipus !== 'anotacio'" color="grey-6" size="1px" spaced="lg"/> -->
  </div>

</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useCansoStore } from '../../stores/example-store'
import cmp_linia from "./liniaTextAcords.vue"

export default defineComponent({
  components: { cmp_linia },
  props:{
    estrofa: {
      type: Object,
      required: true
    },
  },

  setup( props ){
    const store = useCansoStore()

    // watch( () => props.estrofa, (newX) => {
    //   console.log("***** nova ESTROFA ******", newX)
    // })



    // const estrofa = props.estrofa
    // console.log( "estrofa", estrofa )

    // {
    //   tipus: "estrofa",
    //   paragraf: [
    //     {
    //       acords: [ { nota: "Do", pos: 4},{ nota: "Si", pos: 10},{ nota: "La", pos: 20}],
    //       text: "paragraf 1 text de la linia numero 1"
    //     },
    //     {
    //       acords: [ { nota: "Mi", pos: 8},{ nota: "Fa", pos: 18}],
    //       text: "paragraf 1 text de la linia numero 2"
    //     },
    //     {
    //       text: "paragraf 1 text de la linia numero 3"
    //     },
    //     {
    //       text: "paragraf 1 text de la linia numero 4"
    //     }
    //   ]
    // }


    return { store, props }

  }


})



</script>
