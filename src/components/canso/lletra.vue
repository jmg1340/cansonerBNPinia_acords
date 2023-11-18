<template>
  <!-- <pre>{{ estrofa }}</pre> -->
    
    <div
      v-for="(objEstrofa, index) in props.lletra" 
      :key="index"
      :class="{classTornadaTemaClar: objEstrofa.tipus=='tornada' && !store.temaFosc,
                  classTornadaTemaFosc: objEstrofa.tipus=='tornada' && store.temaFosc,
                  classEstrofaTemaClar: objEstrofa.tipus=='estrofa' && !store.temaFosc,
                  classEstrofaTemaFosc: objEstrofa.tipus=='estrofa' && store.temaFosc,
                  classFonsClar: !store.temaFosc,
                  classFonsFosc: store.temaFosc
                  }"
    >


      <!-- <div class="row items-center no-wrap clDades">
        <div class="col">tipus: {{ objEstrofa.tipus }}</div>
        <div class="col">visibleAlsMusics: {{ objEstrofa.visibleAlsMusics }}</div>
      </div> -->





      <!-- ACORDS DESACTIVATS -->
      
      <div v-if="store.activarAcords === false">
        <!-- <div>separador DESACTIVAT</div> -->

        <div class="row items-center no-wrap"
            v-if="objEstrofa.tipus !== 'anotacio'">

            <!-- MOSTRA TOTES LES ESTROFES MENYS LES 'ANOTACIONS' -->
            <cmp_Estrofa
              :estrofa="objEstrofa"
              class="col q-pa-sm "
              :class="{bordeDret: objEstrofa.vegades}"
            />
            <div 
              class="col-auto q-pl-xs text-grey-9 text-center" 
              :style="{'font-size': '70%'}"
              v-if="objEstrofa.vegades && objEstrofa.tipus !== 'anotacio'" >
                (x{{ objEstrofa.vegades }})
            </div>
        </div>
        
        
        <q-separator 
          v-if="objEstrofa.tipus !== 'anotacio'"
          color="grey-6" 
          size="2px" 
          :spaced="store.activarAcords ? 'xs' : 'lg'" />

      </div>
      
      
      <!-- ACORDS ACTIVATS -->
      <div v-else-if="objEstrofa.visibleAlsMusics !== false">
        <!-- <div>separador ACTIVAT</div> -->
        <div class="row items-center no-wrap"
              if="objEstrofa.visibleAlsMusics != false">
          <div class="col">
            <cmp_Estrofa
            :estrofa="objEstrofa"
            :index="index"
            class="q-pa-sm"
            :class="{'bg-grey-2': objEstrofa.tipus === 'anotacio', bordeDret: objEstrofa.vegades}"
            />
          </div>

          <div 
            class="col-auto q-pl-xs text-grey-9 text-center" 
            :style="{'font-size': '80%'}"
            v-if="objEstrofa.vegades && objEstrofa.visibleAlsMusics !== false" >
              (x{{ objEstrofa.vegades }})
          </div>
        </div>

        
        <q-separator 
          v-if="( objEstrofa.tipus === 'estrofa' && objEstrofa.visibleAlsMusics !== false) ||
                ( objEstrofa.tipus === 'tornada')" 
          color="blue-6" 
          size="1px" 
          :spaced="store.activarAcords ? 'xs' : 'lg'" />


      </div>
      

      
      
    </div>
    

</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import cmp_Estrofa from "./estrofa.vue"
import { useCansoStore } from '../../stores/example-store'

export default defineComponent({
  components: { cmp_Estrofa },
  props:{
    lletra: {
      type: Array,
      required: true
    }
  },

  setup( props ){
    const store = useCansoStore()

    // watch( () => props.lletra, (newX) => {
    //   console.log("***** nova LLETRA ******", newX)
    // })


    return { store, props}

  }


})



</script>


<style scoped>
  .bordeDret {
    border-right: 1px dashed grey;
  }

  .borde {
    border: 2px dashed blue;
  }

  .clDades {
    border: 1px solid red;
    color: darkgrey;
    font-size: 12px;
  }
</style>