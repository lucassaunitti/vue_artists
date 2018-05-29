<template lang="pug">
  #app
    img(src='https://assets.materialup.com/uploads/11929cf2-df90-472e-a093-670dba840e64/preview' width='100px')
    h1 {{ msg }}
    //- div(v-for="country in countries")
    //-   button(@click="getArtists(country)") {{country | captalyze}}
    select(v-model="selectedCountry")
      option(v-for="country in countries" v-bind:value="country") {{country | captalize}}
    loader(v-show="loading")
    ul
      artist(v-show="!loading" v-for="artist in artists" v-bind:artist="artist" v-bind:key="artist.mbid")
</template>

<script>
import Artist from './components/Artist.vue'
import Loader from './components/Loader.vue'
import getArtists from './api/index.js'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Make your Choice',
      selectedCountry: "japan",
      loading: true,
      artists:[],
      countries:[
        "brazil",
        "peru",
        "japan",
        "china"
      ]
    }
  },
  filters:{
    captalize: function(str){
      return str[0].toUpperCase()+str.slice(1).toLowerCase();
    }
  },
  components:{
    Artist,
    Loader
  },
  methods:{
    refreshArtists: function(){
      this.loading = true
      const self = this
      getArtists(this.selectedCountry)
        .then(function (artists) {
          self.artists = artists
          self.loading = false
        })
    }
  },
  mounted(){
    this.refreshArtists()
  },
  watch:{
    selectedCountry() {
      this.refreshArtists()
    }
  }
}
</script>

<style lang="stylus">
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    margin-top 60px

  h1, h2
    font-weight normal

  ul
    list-style-type none
    padding 0

  li
    display inline-block
    margin 0 10px

  a
    color #42b983
</style>
