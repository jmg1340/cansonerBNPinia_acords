<template>
  <div class="row justify-center">
    <div class="col-md-8 col-sm-10 col-xs-12">
      
      <!-- CHECKBOX CANÇONERS -->
      <div class="row justify-center">
        <q-card class="col-9">
          <div class="row q-gutter-xs justify-around q-pb-xs">
            <q-checkbox v-model="seleccioCansoners" val="Vermell" label="C. Vermell" color="red" class="col-auto"/>
            <q-checkbox
              v-model="seleccioCansoners"
              val="Blau"
              label="C. Blau"
              color="blue-10"
              class="col-auto"
            />
          </div>
        </q-card>
      </div>


      <!-- TEXT DE BUSQUEDA -->
      <div class="row justify-center q-mt-lg q-mx-sm">
        <div class="col-sm-8 col-xs-12">
          <div class="row no-wrapq-gutter-md items-start justify-center">
            <q-input
              class="col"
              outlined
              bottom-slots
              v-model="inputText"
              label="Introduir TEXT"
              dense

              :rules="[val => !!val || 'tecleja algo...']"
              @keyup.enter="buscar"
            >
              <template v-slot:before>
                <q-icon name="help" />
              </template>

              <template v-slot:append>
                <q-icon
                  v-if="inputText !== ''"
                  name="close"
                  @click="inputText = ''"
                  class="cursor-pointer q-mr-md"
                />
              </template>
            </q-input>

            <q-btn
              class="col-sm-3 col-md-3 q-ml-sm"
              color="primary"
              glossy
              dense
              label="Buscar"
              @click="buscar"
            />
          </div>
        </div>
      </div>


      <!-- TAULA RESULTATS BUSQUEDA -->
      <div class="row q-mx-sm text-caption">
        <div class="col">
          Cançons trobades:
          <q-chip text-color="black" color="yellow-6" dense>{{ llistaCansonsTrobades.length }}</q-chip>
        </div>
      </div>


      <q-markup-table

        dense
        bordered
        class="q-mx-sm"
        separator="cell"
      >
        <thead class="bg-grey-4 text-black">
          <tr onclick="MostrarCansoDeLaTaula">
            <th class="text-center thCansoner">C</th>
            <th class="text-center thTitol">Titol</th>
            <th class="text-center thTitol">
              <div class="row inline items-center justify-center">
                <q-icon name="volume_up" class="col" />
                <q-checkbox
                  class="col q-mr-xs"
                  v-model="nomesAudio"
                  dense
                  color="black"
                  @click.native="buscar"
                />
              </div>
            </th>
            <th class="text-center thNumero"><q-icon name="music_note"/></th>
            <th class="text-center thNumero">#</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(info,index) in llistaCansonsTrobades"
            :key="`llC-${index}`"
            @click="MostrarCansoDeLaTaula(info.id, info.idioma, info.cansonerNom, info.numero)"
          >


            <td v-if="info.cansonerNom == 'Vermell'" class="bg-red text-white text-center">V</td>
            <td v-if="info.cansonerNom == 'Blau'" class="bg-blue-10 text-white text-center">B</td>
            <!-- <td v-if="info.llibre == 'nadales'" class="bg-grey text-white text-center">N</td> -->

            <td class="q-px-xs tdTitol">
              <!-- <router-link :to="'{ name: \'canso\', query: { idCanso: '+info.idCanso+', llibre: '+info.llibre+',numero: '+info.numero+',idioma: '+info.idioma+' } }'"> -->


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

      <br/><br/><br/>

      <q-page-sticky position="bottom-right" :offset="[10, 10]">
        <q-btn round size="md" icon="keyboard_double_arrow_up" color="primary" @click="vesAlComensament"/>
      </q-page-sticky>
    </div>

  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useCansoStore } from '../stores/example-store'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'



export default defineComponent({
  name: "componentBuscarPerText",

  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const store = useCansoStore()


    const cansonerUnic = ref( store.cansonerUnic )
    const seleccioCansoners = ref( ['Blau', 'Vermell'] )
    const inputText = ref("")
    const nomesAudio = ref(false)

    let cansonersFiltrats = []
    const llistaCansonsTrobades = ref([]) 



    onMounted(() => {
      if ($q.sessionStorage.getItem("key_seleccioCansoners") != undefined)
      seleccioCansoners.value = $q.sessionStorage.getItem( "key_seleccioCansoners" );

      if ($q.sessionStorage.getItem("key_inputText") != undefined)
        inputText.value = $q.sessionStorage.getItem("key_inputText");

      if ($q.sessionStorage.getItem("key_llistaCansonsTrobades"))
        llistaCansonsTrobades.value = $q.sessionStorage.getItem( "key_llistaCansonsTrobades"  );

      if ($q.sessionStorage.getItem("key_nomesAudio"))
        nomesAudio.value = $q.sessionStorage.getItem("key_nomesAudio");
    })

    onUnmounted(() => {
      guardarVariablesSessio();
    })





    const vesAlComensament = () => {
      // console.log("Estic a vesAlComensament")
      window.scrollTo(0,0);
      // location.href = "#/canso/#inici";
    }


    const MostrarCansoDeLaTaula = (id, idioma, cansonerNom, cansonerNumero) => {
      router.push({ name: "canso", query: { id, idioma, cansonerNom, cansonerNumero } })
    }

    const buscar = () =>{
      // Filtrem pels cansoners seleccionats
      // cansonersFiltrats = cansoners.value.filter( obj => cansonersSeleccionats.value.includes( obj.clau ) )
      // console.log("cansonersSeleccionats.value", cansonersSeleccionats.value)
      cansonersFiltrats = store.arrDadesBasiquesCansons.filter( obj => seleccioCansoners.value.includes( obj.cansonerNom) )

      // console.log( "cansonersFiltrats", cansonersFiltrats )
      // console.log( arrDadesPeraConsulta() )


      // ferm la busqueda segons el text a buscar
      // let llistaCansonsTrobades = []
      // console.log( "arrDadesPeraConsulta", arrDadesPeraConsulta())
      llistaCansonsTrobades.value = arrDadesPeraConsulta().filter( objDPC => {
        return objDPC.lletra.some ( liniaTxt => {
          // console.log( objDPC.numero + " - " + liniaTxt )
          return senseAccents(liniaTxt.toLowerCase()).includes( senseAccents(inputText.value.toLowerCase()) )
        })
      }).map ( obj => ({ id: obj.id, cansonerNom: obj.cansonerNom, numero: obj.numero, estat: obj.estat, idioma: obj.idioma, titol: obj.titol, acords: obj.acords, audio: obj.audio })
      ).filter ( obj => {
        if ( nomesAudio.value ){
          return obj.audio === true
        } else {
          return true
        }
      }).sort ( (a, b) => a.numero - b.numero )

      // console.log( "llistaCansonsTrobades",  llistaCansonsTrobades.value )

    }


    // Preparem les dades sobre la que farem la busqueda
    // Afegim a les dades basiques de les cançons FILTRADES la lletra
    // Quedarà un array de { id canço,  idioma cançó, nom cançoner, numero cançó, estat, titol canço, lletra cançó, acords(true/false), audio(true/false) }
    const arrDadesPeraConsulta = () => {

      let arrDPC = []
      cansonersFiltrats.forEach( objDBC => {
        var objR = JSON.parse(JSON.stringify( objDBC ))

        const objCansoIdioma = store.cansonerUnic.find( c => c.id === objDBC.id ).idiomes[objDBC.idioma]

        // convertim les estrofes en un unic array amb nomès el text de la lletra
        // objR.lletra = objCanso.idioma[strIdioma].lletra.reduce( (arr, estrofa ) => {
        objR.lletra = objCansoIdioma.lletra.reduce( (arr, estrofa ) => {
          return arr.concat (estrofa.paragraf.map( ( linia ) => linia.text) )
        }, [])

        // afegim el titol a la lletra
        objR.lletra.unshift( objCansoIdioma.titol)


        // quan faig push de objR, tots valors son de l'ultim objecte (¿?)
        // console.log( "objR:", JSON.parse(JSON.stringify(objR)))
        arrDPC.push( JSON.parse(JSON.stringify(objR)) )


      })

      console.log( 'arrDPC', arrDPC.find( obj => obj.cansonerNom === "Vermell" && obj.numero === 223 ))
      return arrDPC
    }


    const senseAccents = (s) => {
      var r = s.toLowerCase();
      //r = r.replace(new RegExp(/\s/g),"");
      r = r.replace(new RegExp(/[àáâãäå]/g), "a");
      r = r.replace(new RegExp(/[èéêë]/g), "e");
      r = r.replace(new RegExp(/[ìíîï]/g), "i");
      //r = r.replace(new RegExp(/ñ/g),"n");
      r = r.replace(new RegExp(/[òóôõö]/g), "o");
      r = r.replace(new RegExp(/[ùúûü]/g), "u");

      return r;
    }

    const guardarVariablesSessio = () => {
      $q.sessionStorage.set("key_seleccioCansoners", seleccioCansoners.value);
      $q.sessionStorage.set("key_inputText", inputText.value);
      $q.sessionStorage.set("key_llistaCansonsTrobades", llistaCansonsTrobades .value);
      $q.sessionStorage.set("key_nomesAudio", nomesAudio.value);
    }








    return {
      seleccioCansoners, inputText, nomesAudio, llistaCansonsTrobades,
      buscar, vesAlComensament, MostrarCansoDeLaTaula
    }
  }







});
</script>







<style>

  .q-table--dense .q-table th:first-child, .q-table--dense .q-table td:first-child {
      padding: 0x;
  }

  .thCansoner {
    width: 5%;
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
