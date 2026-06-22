import { defineStore } from 'pinia';
import cansonerunic from "../cansoner/cansonerUnic"
import nadales from "../cansoner/nadales"

export const useCansoStore = defineStore('canso', {
  state: () => ({
    cansonerUnic: cansonerunic.concat(nadales),
  
    // idCanso: null,
    // idioma: null,
    // llibre: null,

    
    activarOpcionsCanso: false,

    favorites: [
      // {idCanso: "4", idioma: "ES"},
      // {idCanso: "20", idioma: "ES"},
      // {idCanso: "15", idioma: "ES"},
      // {idCanso: "7", idioma: "ES"},
      // {idCanso: "30", idioma: "ES"},
    ],

    activarAcords: false,
    temaFosc: false

  }),




  getters: {
    arrDadesBasiquesCansons: (state) => {
      // [ id, idioma, cansonerNom, cansonerNumero ]
      return state.cansonerUnic.reduce( (ac, c) => {
        let arr = []

        const arrIdiomes = Object.keys( c.idiomes )
        arrIdiomes.forEach ( i => {
          
          const arrCansoners = Object.values( c.idiomes[i].cansoners )
          arrCansoners.forEach ( cn => {
            
            const obj = {}
            obj.id = c.id
            obj.idioma = i
            obj.titol = c.idiomes[i].titol

            obj.cansonerNom = cn.nom
            obj.numero = cn.numero
            obj.estat = cn.estat

            obj.audio = c.idiomes[i].hasOwnProperty('audio') && c.idiomes[i].audio !== null 
            obj.acords = c.idiomes[i].lletra.some( estrofa => {
              return estrofa.paragraf.some( ( linia ) => linia.hasOwnProperty('acordsASobre') ) 
            })
    

            arr.push(obj)
            
          })

        })

        return [ ...ac, ...arr ]

      }, [])
    },


    arrayNomsCansoners : (state) => {
      console.log("arrDadesBasiquesCansons", state.arrDadesBasiquesCansons)
      return state.arrDadesBasiquesCansons.reduce( (ac, c) => {
        if (! ac.includes( c.cansonerNom )){
          ac.push( c.cansonerNom )
          return ac
        } else {
          return ac
        }
      }, [])
    }

  },
  actions: {

    setOpcioAcords(trueFalse) { this.activarAcords = trueFalse },
    setOpcioTemaFosc(trueFalse) { this.temaFosc = trueFalse }

  },
});
