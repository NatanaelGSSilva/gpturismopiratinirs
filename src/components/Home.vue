<template>
<div>
    <header class="fundo" style="margin-top:80px">
        <div class="fundo2">
            <div class="container" id="sobre">
                <div class="row">

                    <div class="col-md-6 text-center align-self-center text-white  mt-5">
                        <h2>Quem somos</h2>
                        <hr>
                        <h5>Conecendo um pouco sobre o grupo GP</h5>
                        <br>
                        <p>
                            Com sua sede na rua 31 de Março nº 336. Gp, gerida por seu proprietário Roberti Porto se expande a cada ano que começa. Garantindo uma viagem com conforto e qualidade para seus frequentadores de cursos técnicos e universitários em Pelotas, a GP no ano
                            passdo deu inicia a essa modalidade com apenas nove passageiros e um excursao.
                        </p>

                    </div>
                    <div class="col-md-6 ">
                        <img src="../img/Carro.jpg" alt="onibus" class="img-fluid mt-5 d-none d-md-block">
                    </div>
                </div>
            </div>
        </div>
        
    </header>

    <!-- excursoes -->

            
        <div class="row">
            

            <div class="container-fluid" style="text-align: center; margin-top: 80px;">
                <h2>Veja nossas Excursões</h2>
            <div id="turismo" class="container mx-auto" v-for="excursao in excursoes"  v-bind:key="excursao.id" style="margin-top:30px ">
                <img @click.prevent="seleciona(excursao.idExcursoes)" :src="excursao.foto" class="mx-2 my-2 float-left" width="280" height="200">  
            </div>
            </div>
        </div>

            <div class="container-fluid" style="text-align: center; margin-top: 80px;">
                <h2>Veja nossas Viagens com rotas definidas</h2>

          <table class="table table-hover table-sm" >
            <thead>
              <tr>
                <th>Cód.</th>
                <th>Saida</th>
                <th>Destino</th>
                <th>Valor</th>
                <th>Horário Saída</th>
                <th>Horário Chegada</th>
                <th>Tipo Viagem</th>

              </tr>
            </thead>
  
            <tbody>
                
              <tr v-for="viagem in viagens"  v-bind:key="viagem.idViagens">

                <td v-if="viagem.tipoViagem == 1">{{viagem.idViagens}}</td>
                <td v-if="viagem.tipoViagem == 1">{{viagem.cidadePartida}}</td>
                <td v-if="viagem.tipoViagem == 1">{{viagem.cidadeChegada}}</td>
                <td v-if="viagem.tipoViagem == 1">{{viagem.valor}}</td>
                <td v-if="viagem.tipoViagem == 1">{{viagem.horaPartida}}</td>
                <td v-if="viagem.tipoViagem == 1">{{viagem.horaChegada}}</td>
                <td v-if="viagem.tipoViagem == 1">{{viagem.tipoViagem}}</td>
                <td></td>

              </tr>
            </tbody>
          </table>
</div>
    <!-- LOCALIZAÇÃO -->
    <section class="bg-secondary text-white mt-3 py-4" id="contato">
        <div class="container">
            <h3 id="localizacao">Localização</h3>
            <div class="row">
                <div class="col-md-8 embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3394.1459830269096!2d-52.34405208514863!3d-31.711907017780735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95104ab669219c43%3A0x92c8964baadf54f7!2sAv.%20Fernando%20Os%C3%B3rio%2C%204500%20-%20Centro%2C%20Pelotas%20-%20RS%2C%2096070-000!5e0!3m2!1spt-BR!2sbr!4v1567643435658!5m2!1spt-BR!2sbr"
                        frameborder="0" style="border:0;" allowfullscreen=""></iframe>
                </div>
                <div class="col-md-4 text-center align-self-center">
                    <h4>Av. Fernando Osório, 4500</h4>
                    <h5>Bairro: Três Vendas</h5>
                    <h5>Pelotas - RS</h5>
                    <h5>Fone: 9999.9999</h5>
                    <h5>E-mail: gpturismo@gmail.com</h5>
                </div>
            </div>
        </div>
    </section>


    </div>
</template>



<script>
import axios from 'axios'
export default {
  data() {
    return {
      viagens: null,
      excursoes: null
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      axios
        .get(this.$MainURL +"/viagens")
        .then(response => (this.viagens = response.data));
    axios.get(this.$MainURL +"/excursoes")
        .then(response => (this.excursoes = response.data));
    },
  seleciona(idEx) {
        this.$router.push({name: "Excursao", params:{id: idEx}})
    }
    
    },
    filters: {
        estiloMoeda(value) {
            return value.toLocaleString('pt-br', {minimumFractionDigits: 2})
        }
    }
}
</script>

<style scoped>
.fundo {
    background: url(../img/horizonte.jpg);
    background-size: cover;
    min-height: 450px;
    position: relative;
}

.fundo2 {
    background: rgba(11, 56, 97, 0.7);
    position: absolute;
    width: 100%;
    height: 100%;
}


</style>