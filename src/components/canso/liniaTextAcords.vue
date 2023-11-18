<template>
  <div>
    <div v-if=" store.activarAcords">
      <div v-if="props.linia.acordsASobre || props.linia.acordsASota">
        <div v-if="(props.linia.acordsASobre && props.linia.acordsASota)" class="lletraAmpladaFixe" >
          <div v-html="acordsTextASobre" class="text-blue text-bold margeInferior"/>
          <div v-html="textAmbEspais" class="margeInferior"/>
          <div v-html="acordsTextASota" class="text-blue text-bold"/>
        </div>
        <div v-else-if="props.linia.acordsASobre" class="lletraAmpladaFixe" >
          <div v-html="acordsTextASobre" class="text-blue text-bold margeInferior"/>
          <div v-html="textAmbEspais" class="no-wrap " />
        </div>
        <div v-else-if="props.linia.acordsASota" class="lletraAmpladaFixe" >
          <div v-html="textAmbEspais" class="margeInferior"/>
          <div v-html="acordsTextASota" class="text-blue text-bold"/>
        </div>

      </div>

      <div v-else-if="props.visibleAlsMusics && props.index == '0'">
        {{ props.linia.text  + "..." }}
      </div>
      <div v-else :class="{'text-blue text-bold lletraAmpladaFixe': props.tipus === 'anotacio'}">
        {{ props.linia.text }}
      </div>
    </div>



    <div v-else>
      <div >
        {{ props.linia.text }}
      </div>

    </div>


  </div>
</template>

<script>
import { defineComponent, watch, computed } from 'vue'
import { useCansoStore } from '../../stores/example-store'


export default defineComponent({
  name: 'liniaTextAcords',
  props: {
    linia: {
      type: Object,
      required: true
    },
    visibleAlsMusics: {
      type: [Boolean, Number],
      // required: true,
      // default: false
    },
    tipus: {
      type: String,
      // required: true,
      default: ""
    },
    index: {
      type: Number,
      // required: true,
      // default: ""
    }
  },

  setup( props ){
    const store = useCansoStore()
    // const linia = {
    //   acordsASobre: [ { nota: "Do", pos: 4},{ nota: "Si", pos: 10},{ nota: "La", pos: 20}],
    //   text: "paragraf 1.            text de la linia numero 1"
    // }



    // const linia = props.linia
    // const puntsSuspensius = props.puntsSuspensius

    // watch( () => props.linia, (newX) => {
    //   console.log("***** nova LINIA ******", newX)
    // })



    const textAmbEspais = computed ( () => props.linia.text.trimEnd() )
    

    const acordsTextASobre = computed ( () => {
      return acordsText ( props.linia.acordsASobre )
    })

    const acordsTextASota = computed ( () => {
      return acordsText ( props.linia.acordsASota )
    })


    const acordsText =  (arrAcords) => {

      if (arrAcords !== undefined) {
        const textLength = props.linia.text.length
        // console.log(textLength)

        let textAcords = " ".repeat(textLength)
        // console.log("textAcords", "[" + textAcords + "]")

        arrAcords.forEach( (obj, idx, matriu ) => {
          const arr = textAcords.split("")
          // console.log("arr", arr)


          // console.log("obj.pos", obj.pos)
          // console.log("obj.nota.length", obj.nota.length)
          const arr2 = arr.splice(obj.pos, obj.nota.length, ...obj.nota.split(""))
          // console.log("arr", arr)

          const arr3 = arr.toString()
          // console.log("arr3", arr3)

          textAcords = arr.reduce( (ac, elem) => ac + elem , "")
          // console.log("textAcords", "[" + textAcords + "]")
        })

        // console.log("textAcords", "[" + textAcords + "]")
        // console.log("textAcords.length", textAcords.length)
        return textAcords.trimEnd().replaceAll(" ", "&nbsp;")

      } else {
        return null
      }
    }


    return {
      props,
      // linia,
      textAmbEspais,
      acordsTextASobre,
      acordsTextASota,
      // puntsSuspensius,
      store
    }

  }

})
</script>


<style>
  .lletraAmpladaFixe{
    font-family: monospace, 'Courier New', Courier, monospace;
  }
  .margeInferior{
    margin-bottom: -8px;
  }
</style>
