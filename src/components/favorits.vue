<template>
  <div class="row justify-center">
    <div class="col-sm-11 col-xs-12">
      <div class="col items-center">
        <div class="col q-mx-sm text-caption">
          <div class="col">Cançons favorites:</div>
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
                <th class="text-center thTitol"><q-icon name="music_note"/></th>
                <th class="text-center thNumero">#</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(info,index) in llistatCansonsFavorites"
                :key="`llC-${index}`"
                @click="MostrarCansoDeLaTaula(info.idCanso, info.idioma, info.llibre, info.numero)"
              >
                <td v-if="info.llibre == 'Vermell'" class="bg-red text-white text-center">V</td>
                <td v-if="info.llibre == 'Blau'" class="bg-blue-10 text-white text-center">B</td>
                <td v-if="info.llibre == 'nadales'" class="bg-grey text-white text-center">N</td>

                <td @click.prevent class="q-px-xs tdTitol">
                  <q-icon name="fiber_new" color="green-14" size="sm" v-if="info.estat== 'nova'" />
                  {{ info.titol }}
                </td>

                <td class="text-center">
                  <q-icon name="volume_up" v-if="info.audio" />
                </td>
                <td class="text-center">
                  <q-icon name="music_note" v-if="info.acords" />
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
import { defineComponent, ref, computed } from 'vue';
import { useCansoStore } from '../stores/example-store'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'



export default defineComponent({
  name: "componentBusacarPerText",


  setup() {

    const $router = useRouter()
    const $q = useQuasar()
    const $store = useCansoStore()

    // const llistaCansonsTrobades = ref([]) 
    
    const llistatCansonsFavorites = computed( () => {
      var arrFavorites = $store.favorites;
      var arrDBC = $store.arrDadesBasiquesCansons;
      // console.log( "arrDBC", arrDBC )
      var llistat = [];

      arrFavorites.forEach(function(objFav) {
        var objTemp = {};
        objTemp.idCanso = objFav.idCanso;
        objTemp.idioma = objFav.idioma;

        const objDBC = arrDBC.find( obj => obj.id == objFav.idCanso )
        // console.log("objDBC", objDBC )
        objTemp.llibre = objDBC.cansonerNom
        objTemp.numero = objDBC.numero;
        objTemp.titol = objDBC.titol;
        objTemp.estat = objDBC.estat;
        objTemp.audio = objDBC.audio;
        objTemp.acords = objDBC.acords;

        llistat.push(objTemp);
      });

      // return llistat.sort(function(a, b) {
      //   return a.numero - b.numero;
      // });

      return llistat;
    })    
    
 
    
    const MostrarCansoDeLaTaula = (id, idioma, cansonerNom, cansonerNumero) => {
      $router.push({ name: "canso", query: { id, idioma, cansonerNom, cansonerNumero } })
    }

    
    
    return {
      llistatCansonsFavorites,  MostrarCansoDeLaTaula
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