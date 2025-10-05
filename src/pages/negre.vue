<template >
  <div class="negre">

    <div class="row items-top justify-evenly">
      <!-- <div class="col-auto borde"> -->
        <!-- <div class="column"> -->
          <div class="col-auto">
            <img id="logo" src="~assets/logoBN_partsColom.svg" alt="Logo">
          </div>

          <div class="col text-center">
            <img v-if="imatgeJesus" class="borde2" src="~assets/Jesus3_gif2.gif" style="height: 95vh"/>
            <!-- <img v-if="imatgeJesus" class="borde2" src="~assets/JesusUlls.gif" style="heigth: 100vh"/> -->
          </div>


          <div class="col-1">
            <div class="column">
              <div class="col text-caption text-right borde2">
                {{seleccioCansoner}}
              </div>
              <div class="col text-caption text-right borde2">
                {{inputNumero}}
              </div>
            </div>

          </div>
        <!-- </div> -->
      <!-- </div> -->
      <!-- <div class="column  "> -->
      <!-- </div> -->
    </div>



    <!-- <div class="column items-center borde">
      <div class="col q-gutter-lg "> -->

        
        <!-- <img v-if="imatgeJesus" class="col q-mr-md" src="~assets/JesusUlls.gif" style="width: 89%"/> -->

        <!-- <div class="row">
          <img class="col q-mr-md" style="height: 50px; max-width: 50px" src="~assets/www.png" />
          <div class="col">www.bonanova.cat</div>
        </div>
        <div class="row">
          <q-img class="col q-mr-md" style="height: 50px; max-width: 50px" src="~assets/insta.png" />
          <div class="col">@bonanova.cat</div>
        </div>
        <div class="row">
          <q-img class="col q-mr-md" style="height: 50px; max-width: 50px" src="~assets/twitter.png" />
          <div class="col">@bonanova.cat</div>
        </div>
        <div class="row">
          <q-img class="col q-mr-md" style="height: 50px; max-width: 75px" src="~assets/youtube.png" />
          <div class="col">canal "grup Bona Nova"</div>
        </div>-->


      <!-- </div>
    </div> -->

  </div>
</template>


<script>

import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useCansoStore } from '../stores/example-store'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'



export default defineComponent({
  name: "negre",

  setup() {

    const router = useRouter()
    const $q = useQuasar()
    const store = useCansoStore()


    onMounted(() => {
      if ($q.sessionStorage.getItem("imatgePaginaNegre"))
        imatgeJesus.value = $q.sessionStorage.getItem("imatgePaginaNegre");

      document.addEventListener("keydown", funcEventNegre)
    })

    onUnmounted(() => {
      $q.sessionStorage.set("imatgePaginaNegre", imatgeJesus.value);
      document.removeEventListener("keydown", funcEventNegre)
    })


    const seleccioCansoner = ref("")
    const inputNumero = ref("")
    const imatgeJesus = ref(false) 


    const funcEventNegre =  (event) => {
      console.log("event.key", event.key)
      switch( event.key ){

        case "T":
        case "t":
          router.push({ name: 'cercar' });
          break;

        case "J":
        case "j":
          imatgeJesus.value = !imatgeJesus.value
          break;

        case "N":
        case "n":
          router.back();
          break;

        case "V":
        case "v":
          seleccioCansoner.value = "Vermell";
          break;

        case "B":
        case "b":
          seleccioCansoner.value = "Blau";
          break;


        case "VK_DELETE":   //windows
        case "kVK_ForwardDelete":  // MAC
        case "Delete":
          inputNumero.value = "";
          break;

        case "VK_RETURN":   //windows
        case "kVK_Return":  // MAC
        case "Enter":
          mostrarCansoNumero();
          break;

        default:
          if (inputNumero.value.length < 3 && !isNaN(event.key)) inputNumero.value = inputNumero.value.concat(event.key);
          // inputNumero.value += event.key;
          console.log(`tecla ${event.key}`)
          break;

      }

    }

    const mostrarCansoNumero = async () => {
      console.log( "seleccioCansoner", seleccioCansoner.value)
      console.log( "inputNumero", inputNumero.value )
      
      
      const arr = store.arrDadesBasiquesCansons.filter( (c) => c.cansonerNom === seleccioCansoner.value && c.numero == inputNumero.value )
      
      switch ( arr.length ) {
        case 0:
          $q.notify(`No existeix la cançó numero ${inputNumero.value} en el cançoner '${seleccioCansoner.value}'`)
          break
        case 1:
          // s'ha trobat un resultat (un unic idioma)
          router.push({ name: "canso", query: { id: arr[0].id, idioma: arr[0].idioma, cansonerNom: arr[0].cansonerNom, cansonerNumero: arr[0].numero } })
          break
        default:
          // s'ha trobat més d'un resultat ( 2 idiomes tenen mateix cansoner i numero )

          const arrIdiomesaTriar = arr.map( o => ( { label: o.idioma, value: o.idioma } ) )

          $q.dialog({
            title:
              "La següent cançó te mateix cançoner i número de cançó per cada idioma. Quin idioma vols veure ?",
            //message: 'Tria idioma:',
            options: {
              type: "radio",
              model: null,
              // inline: true,
              items: arrIdiomesaTriar
            },
            cancel: false,
            stackButtons: true,
            persistent: true
          })
          .onOk( data =>   {
            const idioma = data;
            const obj = arr.find( o => o.idioma === idioma )
            router.push({ name: "canso", query: {  id: obj.id, idioma: obj.idioma, cansonerNom: obj.cansonerNom, cansonerNumero: obj.numero  } });
          })
      }


    }




    return {
      seleccioCansoner, inputNumero, imatgeJesus,
      funcEventNegre, mostrarCansoNumero
    }
  }




})
</script>


<style lang="css" scoped>
  .negre{
    background-color: black;
    color: #222222;
    /* text-align: center; */
    height: 100vh;
    width: 100%;

  }

  .borde{
    border: 1px solid red;
  }



  .moveToCenter {
    animation-name: moveToCenter;
    animation-duration: 3s;
    animation-fill-mode: both;
  }

  @keyframes intro {
    0% {
      width: 150px;
      transform: translate(0, 0) scale(0) rotateY(0deg);
    }
    50% {
      width: 150px;
      transform: translate(calc(50vw - 50%), calc(50vh - 50%)) scale(3) rotateY(360deg);
    }
    100% {
      width: 112px;
      transform: translate(0, 0) scale(1) rotateY(720deg);
    }
  }
  #logo {
    position: absolute;
    top: 0;
    left: 0;
    width: 112px; /* Final width */
    animation: intro 3s ease-in-out;
  }

</style>
