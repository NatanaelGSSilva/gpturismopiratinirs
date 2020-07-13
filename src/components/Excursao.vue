<template>

    <div class="container"  style="margin-top:100px">
        <h2>Deixe seu email para Interesse nessa Excursão
            <button class="btn btn-warning float-right" @click="goBack">
                <i class="fas fa-undo"></i> Voltar</button>
        </h2>
        <form @submit.prevent="salvar">
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="modelo">Nome completo</label>
                        <input type="text" id="nome" class="form-control" required
                               v-model="interesse.nome" ref="modelo">
                    </div>
                </div>
            
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="text" id="email" class="form-control" required
                               v-model="interesse.email" >
                    </div>
 
                </div>
            </div>


      <button type="submit" class="btn btn-success px-4 mr-2">
        <i class="far fa-save"></i> Enviar
      </button>
      <button type="reset" class="btn btn-danger px-4">
        <i class="far fa-window-restore"></i> Limpar
      </button>
      <div class="container">
        <div class="col-sm-9 mx-2 my-2 float-left">
          <img v-bind:src="excursoes.foto" width="600" height="400" alt="Foto da Excursão" />
        </div>
      </div>
      <div class="card-body">
        <table class="table table-hover table-sm">
          <thead>
            <tr>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr lass="table table-hover table-sm">
              <td>{{excursoes.detalheExcursoes}}</td>
            </tr>
          </tbody>
        </table>

        <table class="table table-hover table-sm">
          <thead>
            <tr>
              <th>Data de Partida</th>
              <th>Data de Chegada</th>
            </tr>
          </thead>
          <tbody>
            <tr lass="table table-hover table-sm">
              <td>{{excursoes.dataPartida}}</td>
              <td>{{excursoes.dataChegada}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      interesse: {
        nome: null,
        email: null,
        idExcursoes: this.$route.params.id
      },
      excursoes: null
    };
  },
  methods: {
    listar(id) {
      axios
        .get(this.$MainURL + "/excursoes/" + id)
        .then(response => (this.excursoes = response.data));
    },
    salvar() {
      this.axios
        .post(this.$MainURL + "/interesses", this.interesse, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        .then(response => {
          alert(
            `Ok! Viagem cadastrado com código ${response.data.idInteresse}`
          );
          this.sal(response.data.idInteresse);
        });

      this.interesse = {};
      this.$refs.nome.focus();
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  },
  mounted() {
    this.listar(this.$route.params.id);
  }
};
</script>

<style scoped>
</style>