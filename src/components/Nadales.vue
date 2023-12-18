<template>
  <div class="row justify-center">
    <div class="col-sm-11 col-xs-12">
      <div class="col items-center">
        <div class="col q-mx-sm text-caption">
          <div class="col">Nadales:</div>
        </div>

        <div class="col justify-center">
          <q-markup-table dense bordered class="q-mx-sm" separator="cell">
            <thead class="bg-grey-4 text-black">
              <tr>
                <th class="text-center thCansoner">C</th>
                <th class="text-center thTitol">Titol</th>
                <th class="text-center thTitol">
                  <div class="row inline items-center justify-center">
                    <q-icon name="volume_up" class="col" />
                  </div>
                </th>
                <th class="text-center thNumero">#</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(info,index) in llistatNadales"
                :key="`llC-${index}`"
                @click="mostrarCansoDeLaTaula(info.idCanso, info.idioma, info.llibre, info.numero)"
              >
                <td v-if="info.llibre == 'vermell'" class="bg-red text-white text-center">V</td>
                <td v-if="info.llibre == 'blau'" class="bg-blue-10 text-white text-center">B</td>
                <td v-if="info.llibre == 'nadales'" class="bg-grey text-white text-center">N</td>

                <td @click.prevent class="q-px-xs tdTitol">
                  <q-icon name="fiber_new" color="green-14" size="sm" v-if="info.estat== 'nova'" />
                  {{ info.titol }}
                </td>

                <td class="text-center">
                  <q-icon name="volume_up" v-if="info.audio" />
                </td>
                <td class="text-center">{{info.numero}}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, defineComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router'

import arrNadales from "../cansoner/nadales.js"

export default defineComponent({
  name: "componentBusacarPerText",

  setup () {
    const router = useRouter()
    // const $q = useQuasar()
    // const store = useCansoStore()

    const llistaCansonsTrobades = ref([])
    const llistatNadales = computed( () => { 
        console.log("arrNadales", arrNadales)
        // var arrNadales = nadales;
        var llistat = [];
  
        arrNadales.forEach(function(canso) {
          var objTemp = {};
          objTemp.idCanso = canso.id;
  
          Object.keys( canso.idiomes).forEach( idioma => {
  
            objTemp.idioma = idioma;
            objTemp.llibre = canso.idiomes[idioma].cansoners[0].nom;
            objTemp.titol = canso.idiomes[idioma].titol;
            objTemp.numero = canso.idiomes[idioma].cansoners[0].numero;
            objTemp.audio = canso.idiomes[idioma].audio;
            objTemp.estat = canso.idiomes[idioma].estat;
            
          })
          llistat.push(objTemp);
        });
   
        console.log("llistat", llistat)
        return llistat;
      }
    )

    const mostrarCansoDeLaTaula = (id, idioma, cansonerNom, cansonerNumero) => {
      router.push({ name: "canso", query: { id, idioma, cansonerNom, cansonerNumero } })
    }    

    return {
      llistatNadales,
      mostrarCansoDeLaTaula
    }
  }

});
</script>


<style>
.thCansoner {
  width: 10%;
}
.thTitol {
  width: 80%;
}
.thNumero {
  width: 10%;
}

.tdTitol {
  white-space: normal !important;
}

.DIVcasella {
  width: 50px;
  height: 50px;
}

.DIVred {
  background-color: red;
}
.DIVblue {
  background-color: blue;
}
.DIVgrey {
  background-color: grey;
}

.borde {
  border: 1px solid black;
}
</style>