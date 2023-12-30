<template>
  <!-- <q-scroll-area style="height: 100vh; width: 100vh;" :visible="false"> -->

  <q-layout view="hHh lpR fFf">


    <q-header elevated class="bg-yellow-3" v-if="opcions.capsalera == false">
      <!-- <div > -->

      <!-- CAPÇALERA -->
      <div class="row justify-between items-center">


        <!-- CANÇONER I NUMERO DE CANÇO -->
        <div class="col">
          <div class="column">
            <div class="col block ">
              <q-chip :color="(cansoner == 'Vermell') ? 'red-8' : (cansoner == 'Blau') ? 'blue-8' : 'grey-8'"
                text-color="white" style="font-size: 12px">
                <q-avatar color="black" text-color="white text-bold">
                  {{ numero }}
                </q-avatar>
                llibre {{ cansoner }}
              </q-chip>
            </div>

          </div>
        </div>

        <!-- ICONA FAVORIT  i COMPARTIR -->
        <div class="row justify-center items-center">
          <div class="col" v-if="opcions.mostrarIconaFavorit == true">
            <q-icon v-if="esCansoFavorita == false" style="color: #545454; font-size: 1.5rem;" dense
              name="favorite_border" @click="afegirFavorits()" />



            <transition name="bounce">
              <q-icon v-if="esCansoFavorita == true" style="color: #ff0000; font-size: 2rem;" dense name="favorite"
                @click="treureFavorits()" />
            </transition>

          </div>
          <q-fab class="col" color="grey-4" flat text-color="black" icon="share" direction="down" padding="xs"
            v-if="!opcions.amagaSocialLinks">
            <q-fab-action color="orange-10" @click="advertenciaCorreu = true" label="Correu" external-label
              label-position="left">
              <q-icon name="mail" size="l" />
            </q-fab-action>
            <q-fab-action type="a" color="green-8" @click="compartirCanso('whatsapp')" label="WhatsApp" external-label
              label-position="left" data-action="share/whatsapp/share">
              <q-icon name="img:WhatsApp.svg" size="lg" />
            </q-fab-action>
          </q-fab>

        </div>


        <!-- BOTO OPCIONS i TORNAR -->
        <div class="col text-right q-mt-xs">
          <q-btn color="grey-8" dense size="sm" rounded @click="mostrarOpcionsCanso" icon="settings" aria-label="Opcions"
            class="q-mr-sm" />

          <q-btn color="brown-7" label="Tornar" size="sm" no-caps rounded push @click="tornarAlBuscador" class="q-mr-xs">
          </q-btn>
        </div>

      </div>

      <!-- TITOL  i BANDERES-->
      <div class="row justify-between items-center">

        <!-- TITOL -->
        <q-chip dense class="col bg-yellow-2 text-grey-8 q-ml-xs" style="font-size: 12px; overflow-wrap: break-word;">
          "{{ canso.idiomes[tabIdioma].titol }}"
        </q-chip>
        <!-- <div class="col  text-grey-8 q-ma-xs" style="font-size: 11ps">"{{ canso.idiomes[tabIdioma].titol }}"</div> -->


        <!--  BANDERES  -->
        <q-card class="col-auto bg-yellow-2 q-my-xs q-mr-xs">
          <div class="row justify-end" v-if="arrIdiomes.length > 1">
            <q-tabs v-model="tabIdioma" dense class="text-grey" active-color="primary" indicator-color="primary"
              align="center" narrow-indicator>
              <q-tab v-for="(idioma2, index) in arrIdiomes" :key="'t' + index" :name="idioma2"
                :icon="'img:/banderes/' + objBanderes[idioma2]" />
            </q-tabs>
          </div>

        </q-card>
      </div>

      <!-- </div> -->
    </q-header>



    <q-page-container>

      <div v-for="(_idioma, index) in arrIdiomes" :key="`_idioma-${index}`" :name="_idioma"
        class="column no-wrap flex-start" :class="{ 'classFonsFosc': store.temaFosc }"
        v-touch-swipe.mouse.right.left="mostrarSeguentCanso">

        <div v-if="_idioma == tabIdioma">

          <!-- ESTROFES i TORNADES -->

          <div class="q-my-md text-left">

            <q-tab-panels v-model="tabIdioma" animated>
              <q-tab-panel v-for="(idioma, index) in arrIdiomes" :key="'tp' + index" :name="idioma">
                <!-- <div :style="{'font-size': opcions.pfontSize  + 'px' }"> -->
                <div :style="{ 'font-size': opcions.pfontSize + 'px', fontWeight: opcions.pbold ? 'bold' : '' }">
                  <cmp_idioma :idioma="canso.idiomes[tabIdioma]" />
                </div>
              </q-tab-panel>
            </q-tab-panels>

          </div>
        </div>


      </div>



    </q-page-container>






    <!-- FOOTER -->
    <q-footer elevated model="!opcions.amagaReproductor" class="bg-yellow-3">
      <!-- REPRODUCTOR MULTIMEDIA -->
      <q-media-player type="audio" background-color="black" radius="0rem" dense :sources="canso.idiomes[tabIdioma].audio"
        v-if="canso.idiomes[tabIdioma].audio && !opcions.amagaReproductor" class="q-m">
      </q-media-player>
    </q-footer>

  </q-layout>





  <!-- dialeg per OPCIONS -->

  <q-dialog v-model="activarOpcionsCanso" persistent>
    <q-card style="width: 350px" class="q-px-sm q-pb-md">

      <div class="text-blue">
        <div class="text-h6">Opcions lletra cançó</div>
      </div>
      <q-card-section>

        <q-item dense>
          <q-item-section avatar>
            <q-icon name="format_size" />
          </q-item-section>
          <q-item-section>
            <q-slider color="red" label label-always v-model="opcions.pfontSize" :min="10" :max="100" :step="1" />
          </q-item-section>
        </q-item>

        <q-item dense class="q-mt-xs">
          <q-item-section avatar>
            <q-checkbox v-model="opcions.pbold" label="Negreta" color="black" />
          </q-item-section>
        </q-item>
      </q-card-section>

      <div class="text-blue">
        <div class="text-h6">Altres opcions</div>
      </div>
      <q-card-section>
        <q-item dense class="">
          <q-item-section avatar>
            <q-checkbox v-model="opcions.activarAcords" label="Acords (si n'hi ha)" color="black"
              @update:model-value="funcActivarAcords()" />
          </q-item-section>
        </q-item>
        <q-separator color="red-8" inset />
        <!-- <q-item dense class="">
            <q-item-section avatar>
              <q-checkbox v-model="opcions.temaFosc" label="Tema fosc" color="black" />
            </q-item-section>
          </q-item>
          <q-separator color="red-8" inset /> -->
        <q-item dense class="">
          <q-item-section avatar>
            <q-checkbox v-model="opcions.amagaReproductor" label="Amaga reproductor" color="black" />
          </q-item-section>
        </q-item>
        <q-separator color="red-8" inset />
        <!-- <q-item dense class="">
            <q-item-section avatar>
              <q-checkbox v-model="opcions.capsalera" label="Amaga capçalera" color="black" />
            </q-item-section>
          </q-item> -->

        <q-item dense class="">
          <q-item-section avatar>
            <q-checkbox v-model="opcions.activarCanviCanso" label="Canviar cançó al lliscar dit horitzontalment"
              color="black" />
          </q-item-section>
        </q-item>
        <q-separator color="red-8" inset />
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" @click="tancarOpcionsCanso" />
      </q-card-actions>
    </q-card>
  </q-dialog>





  <!-- dialeg per ADVERTENCIA CORREU -->

  <q-dialog v-model="advertenciaCorreu" persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-red-10 text-white" style="width: 450px">
      <q-card-section>
        <div class="text-h6 ">Advertència</div>
      </q-card-section>

      <q-card-section class=" bg-red-9 text-whiteq-pt-none">
        S'utilitzarà la teva app del correu. Si la teva app és GMAIL no funcionarà bé:<br />
        1. Si la cançó te àudio, el seu enllaç no s'incorporà correctament al correu i la lletra no s'incorpora.<br />
        2. Si la cançó no te àudio, la lletra s'incorpora tota seguida sense respectar finals de paràgraf.
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" @click="compartirCanso('email')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>






<script>
import objNadales from "../cansoner/nadales.js"

import { defineComponent, ref, onMounted, onUnmounted, computed, watch, watchEffect } from 'vue';
import { useCansoStore } from '../stores/example-store'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import cmp_idioma from "../components/canso/idioma.vue"



export default defineComponent({
  name: 'canso',

  components: {
    cmp_idioma
  },


  setup() {
    const $router = useRouter()
    const route = useRoute()
    const $q = useQuasar()
    const store = useCansoStore()


    // const strIdioma = ref(route.query.idioma)
    const optionsToggle = ref([])
    const objBanderes = ref({
      CAT: "banderaCatalana.svg",    // "~assets/banderaCatalana.svg"
      ES: "banderaEspanyola.svg",
    })


    const advertenciaCorreu = ref(false)

    const id = ref(route.query.id)
    // console.log( "id", id.value )
    const tabIdioma = ref(route.query.idioma)
    const cansoner = ref(route.query.cansonerNom)
    const numero = ref(route.query.cansonerNumero)



    const opcions = ref({
      pfontSize: 16,
      pbold: false,
      capsalera: false,
      amagaReproductor: false,
      mostrarIconaFavorit: true,
      amagaSocialLinks: false,
      temaFosc: false,
      activarCanviCanso: false,
      activarAcords: false
    })


    const canso = ref(store.cansonerUnic.find(obj => obj.id == id.value))
    const arrIdiomes = computed(() => Object.keys(canso.value.idiomes))



    onMounted(() => {
      console.log("-- Estic a onMounted --")
      if ($q.localStorage.getItem("CansonerBN_key_opcions"))
        opcions.value = $q.localStorage.getItem("CansonerBN_key_opcions");
      // console.log("opcions MOUNT", opcions.value )
      if (opcions.value.activarAcords === undefined) {
        opcions.value.activarAcords = false
        store.setOpcioAcords(false)
      } else {
        store.setOpcioAcords(opcions.value.activarAcords)
      }
      if (opcions.value.capsalera === undefined) opcions.value.capsalera = false

      // generarOpcionsIdioma()

      document.addEventListener("keydown", funcEventTecles)

    })


    onUnmounted(() => {
      // guardem les opcions
      // console.log("opcions UNMOUNT", opcions.value )

      $q.localStorage.set("CansonerBN_key_opcions", opcions.value);
      document.removeEventListener("keydown", funcEventTecles)
    })



    watch(tabIdioma, (newIdioma) => {
      const arrIdiomesCanso = Object.keys(canso.value.idiomes)

      let arr = []  // [ {idioma, cansoner, numero} ]
      arrIdiomesCanso.forEach(idioma => {
        const arrCansoners = canso.value.idiomes[idioma].cansoners

        arrCansoners.forEach(objCansoner => {
          arr.push({
            idioma: idioma,
            cansoner: objCansoner.nom,
            numero: objCansoner.numero
          })
        })
      })

      cansoner.value = arr.find(obj => obj.idioma === newIdioma).cansoner
      numero.value = arr.find(obj => obj.idioma === newIdioma).numero

      window.scrollTo(0, 0);
    })


    // watchEffect( () => {
    //   console.log( "tabIdioma", tabIdioma.value)
    //   // console.log( "valAnterior", valAnterior )
    //   // console.log( "valActual", valActual )

    //   const objCanso = canso.value
    //   // console.log( "objCanso", objCanso)

    //   const arrIdiomesCanso = Object.keys(canso.value.idiomes)
    //   // console.log( arrIdiomesCanso)

    //   let arr = []  // [ {idioma, cansoner, numero} ]
    //   arrIdiomesCanso.forEach( idioma => {
    //     const arrCansoners = canso.value.idiomes[idioma].cansoners

    //     arrCansoners.forEach( objCansoner => {
    //       arr.push ({
    //         idioma: idioma,
    //         cansoner: objCansoner.nom,
    //         numero: objCansoner.numero
    //       })
    //     })
    //   })

    //   // console.log ("arr", arr)

    //   cansoner.value = arr.find( obj => obj.idioma === tabIdioma.value ).cansoner
    //   numero.value = arr.find( obj => obj.idioma === tabIdioma.value ).numero
    // })


    // const objCansoner = computed( () => {
    //   const objCansonerBlauVermell = $store.objCansoner
    //   return Object.assign(objCansonerBlauVermell, objNadales)
    // })

    // const objCanso = computed ( () =>{
    //   return objCansoner.value[codiCanso.value]
    // })



    const activarOpcionsCanso = computed(() => {
      return store.activarOpcionsCanso
    })

    const funcActivarAcords = () => {
      store.setOpcioAcords(opcions.value.activarAcords)
    }


    const funcEventTecles = (event) => {
      switch (event.key) {
        case "T":
        case "t":
          $router.push({ name: 'cercar' });
          break;

        case "N":
        case "n":
          $router.push({ name: "negre" });
          break;

        case "A":
        case "a":
          opcions.value.capsalera = !opcions.value.capsalera;
          break;

        case "R":
        case "r":
          opcions.value.amagaReproductor = !opcions.value.amagaReproductor;
          break;

        // case "M":
        // case "m":
        //   opcions.value.amagaSocialLinks = !opcions.value.amagaSocialLinks;
        //   break;

        // case "O":
        // case "o":
        //   opcions.value.mostrarIconaFavorit = !opcions.value.mostrarIconaFavorit;
        //   break;

        case "F":
        case "f":
          opcions.value.temaFosc = !opcions.value.temaFosc;
          store.setOpcioTemaFosc(opcions.value.temaFosc)
          break;

        case "G":
        case "g":
          opcions.value.pbold = !opcions.value.pbold;
          break;

        case "I":
        case "i":
          console.log("I apretada")
          window.scrollTo(0, 0);
          // location.href = "#/canso/#inici";;         
          break;

        case "C":
        case "c":
          console.log("C apretada")
          if (arrIdiomes.value.length > 1) {
            tabIdioma.value = (tabIdioma.value == "ES" ? "CAT" : "ES")
            window.scrollTo(0, 0);
            // location.href = "#/canso/#inici";;         
          }
          break;

        case "+":
          console.log("+ apretada")
          opcions.value.pfontSize++
          break;

        case "-":
          console.log("- apretada")
          opcions.value.pfontSize--
          break;
      }
    }

    const generarOpcionsIdioma = () => {
      optionsToggle.value = []
      console.log("arrIdiomes", arrIdiomes.value)
      arrIdiomes.value.forEach(idioma => {
        optionsToggle.value.push({
          label: idioma,
          value: idioma
        })
      }, this)
    }




    const esCansoFavorita = computed(() => {
      var arrFavorites = store.favorites

      var x = false
      x = arrFavorites.some(function (obj) {
        return obj.idCanso == id.value && obj.idioma == tabIdioma.value
      }, this)
      return x
    })


    const afegirFavorits = () => {
      let objecte = {
        idCanso: id.value,
        idioma: tabIdioma.value
      }
      console.log("AFEGIR objecte: " + JSON.stringify(objecte))
      // $store.actAfegirFavorits( objecte );
      store.favorites.push(objecte)
      // var arrFavorites = $store.favorites
      $q.localStorage.set("CansonerBN_key_favorits", store.favorites);

    }




    const treureFavorits = () => {
      let objecte = {
        idCanso: id.value,
        idioma: tabIdioma.value
      }
      console.log("TREURE objecte: " + JSON.stringify(objecte))

      var arrFavorites = store.favorites
      console.log(JSON.stringify(arrFavorites))

      var index = store.favorites.findIndex((obj_arr) => {
        return obj_arr.idCanso === objecte.idCanso && obj_arr.idioma === objecte.idioma
      })
      console.log("Index: " + index)

      // $store.actTreureFavorits( index );
      store.favorites.splice(index, 1)
      console.log(JSON.stringify(arrFavorites))

      // var arrFavorites = $store.favorites
      $q.localStorage.set("CansonerBN_key_favorits", store.favorites);

    }




    const compartirCanso = (socialMedia) => {
      advertenciaCorreu.value = false

      let asumpte = "Cançó \"" + canso.value.idiomes[tabIdioma.value].titol.toUpperCase() + "\""
      let text = ""


      /* si existeix audio, incorporem enllaç al missatge*/
      let arrAudio = canso.value.idiomes[tabIdioma.value].audio

      if (arrAudio != null) {
        text = "ÀUDIO:\n"
        text += "https://drive.google.com/open?id=" + arrAudio[0].src.substring(arrAudio[0].src.lastIndexOf("=") + 1)
      }

      text += "\n\n\nLLETRA:\n\n"   // %0D%0A = return


      /* Incorporem la lletra de la canço */
      canso.value.idiomes[tabIdioma.value].lletra.forEach(function (objEstrofa) {

        objEstrofa.paragraf.forEach(function (linia) {
          text += linia.text + "\n"
        })
        text += "\n\n"
      })

      // incorprem enllaços a bonanova.cat, cançoner i pregàries
      text += "\n\n"
      text += "https://cansoner.bonanova.cat \n\n"
      text += "https://bonanova.cat \n"
      text += "https://pregaries.bonanova.cat \n"

      console.log(text)


      /* Al GMAIL es trunca el contingut de text per lo que encodeURIComponent */
      // if ($q.platform.is.android) {
      //   text = encodeURIComponent(text)
      // }

      console.log("PLATAFORMA?: ", $q.platform)

      if ($q.platform.is.mobile) {

        switch (socialMedia) {
          case "email":
            console.log("enviar a traves de EMAIL");
            location.href = "mailto:?subject=" + asumpte + "&body=" + encodeURIComponent(text)
            break
          case "whatsapp":
            console.log("enviar a traves de WHATSAPP");
            // per passar new "carriage returns" substituir els "\n" per "%0a"
            text = text.replace(/\n/g, "%0a")
            window.open("whatsapp://send?text=" + text, '_blank')
            break
        }

      } else {

        $q.notify({
          message: 'Funcionalitat només operativa en dispositius mòbils',
          icon: 'sentiment_very_dissatisfied',
          position: 'top',
          timeout: 2000
        })


      }

    }

    const tancarOpcionsCanso = () => {
      store.activarOpcionsCanso = false
    }

    const vesAlComensament = () => {
      // console.log("Estic a vesAlComensament")
      window.scrollTo(0, 65);
      // location.href = "#/canso/#inici";
    }



    const mostrarSeguentCanso = ({ evt, ...newInfo }) => {
      console.log("*** Estic a SEGUENT_CANSO ***")

      if (opcions.value.activarCanviCanso === false) return


      // Filtrem les dades basiques de les cançons segons el cansoner i idioma

      let arrLlibNumIdIdioma = store.arrDadesBasiquesCansons.filter(obj => obj.idioma === tabIdioma.value && obj.cansonerNom === cansoner.value)
        .sort((a, b) => { return a.numero - b.numero; })

      // console.log("arrLlibNumIdIdioma", arrLlibNumIdIdioma);

      console.log("CANSONER", cansoner.value)
      console.log("NUMERO", numero.value)
      // localitzem la posicio de la canço actual en el array filtrat
      const posicio = arrLlibNumIdIdioma.findIndex(obj => obj.cansonerNom === cansoner.value && obj.numero == numero.value)
      console.log("posicio", posicio);


      let objSeguentCanso
      // Busquem la següent posicio en funcio de si es l'anterior o la propera
      if (newInfo.direction == "left") {
        console.log("swift ESQUERRE")
        // si la posicio acutal no es la ultima posicio del array, mostrem la canço
        if (posicio !== arrLlibNumIdIdioma.length - 1) {
          objSeguentCanso = arrLlibNumIdIdioma[posicio + 1]
        }
      } else if (newInfo.direction == "right") {
        // si la posicio actual no es la primera posicio del array, mostrem la canço
        if (posicio !== 0) {
          objSeguentCanso = arrLlibNumIdIdioma[posicio - 1]
        }
      }

      console.log("objSeguentCanso", objSeguentCanso)

      // $router.replace({ name: "canso", query: { 
      //   id: objSeguentCanso.id, 
      //   idioma: objSeguentCanso.idioma, 
      //   cansonerNom: objSeguentCanso.cansonerNom, 
      //   cansonerNumero: objSeguentCanso.numero
      // } })

      id.value = objSeguentCanso.id

      tabIdioma.value = objSeguentCanso.idioma
      console.log("tabIdioma:", tabIdioma.value)

      canso.value = store.cansonerUnic.find(obj => obj.id == id.value)
      console.log("canso.value", canso.value)

      cansoner.value = objSeguentCanso.cansonerNom
      numero.value = objSeguentCanso.numero

      console.log("1er paragraf", canso.value.idiomes[tabIdioma.value].lletra[0].paragraf)

      // generarOpcionsIdioma()
      window.scrollTo(0, 0);
      return
    }

    // watch(canso, (newX) => {
    //   console.log("***** nova 'canso ******", newX)
    // })    

    // $router.beforeEach((to, from) => {
    //   console.log( "From", from)
    //   console.log( "To", to)
    //   if (to.params.id !== from.params.id) {
    //     canso.value = store.cansonerUnic.find( obj => obj.id == route.params.id)
    //     // tabIdioma.value
    //     generarOpcionsIdioma()
    //   }
    //   return true
    // })    

    const tornarAlBuscador = () => {
      $router.go(-1);
    }

    const mostrarOpcionsCanso = () => {
      store.activarOpcionsCanso = true
      // $store.mutActivarOpcionsCanso(true)
    }



    return {
      store, canso, cansoner, numero, tabIdioma, optionsToggle, advertenciaCorreu, opcions, objBanderes,
      arrIdiomes, activarOpcionsCanso, esCansoFavorita,
      funcActivarAcords, funcEventTecles, afegirFavorits, treureFavorits, compartirCanso, tancarOpcionsCanso, vesAlComensament, mostrarSeguentCanso, tornarAlBuscador, mostrarOpcionsCanso
    }
  }





})
</script>


<style lang="css" scoped>
.q-tab,
.q.tab__content,
.q-tab-panel {
  padding: 0px;
}

.q-tabs__dense .q-tab {
  min-height: 16px;
}


/*
  @media screen and (min-width: 100px) { 
    p{
      font-size: 1.3em !important;
    }

  }

  @media screen and (min-width: 768px) { 
    p{
      font-size: 2em !important;
    }

  }

*/

.borde {
  border: 1px solid blue;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}

.bounce-leave-active {
  /* animation: bounce-in .5s reverse; */
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
}


.classTornadaTemaClar {
  color: #c10015;
}

.classTornadaTemaFosc {
  color: #f8c75d;
}

.classEstrofaTemaClar {
  color: black;
}

.classEstrofaTemaFosc {
  color: white;
}

.classFonsClar {
  background-color: white;
}

.classFonsFosc {
  background-color: black;
}
</style>