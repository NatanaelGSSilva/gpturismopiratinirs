<template>
<div>
  
    <div class="container">
        <h2>Gráfico Relacionando Excursões x Clics</h2>
        <GChart
            type="PieChart"
            :data="excursoesClics"
        />

    </div>
    </div>
</template>

<script>
import axios from 'axios'
import { GChart } from 'vue-google-charts'

export default {
  components: {
    GChart
  },
  data () {
    return {
        excursoesClics: [['Cidade', 'Nº clics']]
    }
  },
  mounted() {
      axios.get(this.$MainURL+"/excursoes_qtd")
           .then(response => {
               const excursoes = response.data
               excursoes.forEach(excursao => {
                    this.excursoesClics.push([excursao.destino, excursao.num])
               }) 
           })
  }  
}
</script>

<style scoped>

</style>