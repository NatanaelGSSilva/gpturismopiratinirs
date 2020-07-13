<template>
  <div id="listagemParadas">
    <div class="container mt-3">
      <div class="card">
        <div class="card-header">
          <h5 class="float-left">Paradas Atuais</h5>
        </div>
        <div class="card-body">
          <table class="table table-hover table-sm">
            <thead>
              <tr>
                <th>Cód.</th>
                <th>Nome</th>
                <th>Localização</th>
                <th>Horário</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="parada in paradas" v-bind:key="parada.idParadas">
                <td>{{parada.idViagensParadas}}</td>
                <td>{{parada.nome}}</td>
                <td>{{parada.localizacao}}</td>
                <td>{{parada.horario}}</td>

                <td>
                  <button
                    title="Remover"
                    class="btn btn-danger mr-1"
                    @click="remover(parada.idViagensParadas)"
                  >
                    <i class="far fa-minus-square"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h5 class="float-left">Paradas Disponíveis</h5>
        </div>
        <div class="card-body">
          <table class="table table-hover table-sm">
            <thead>
              <tr>
                <th>Cód.</th>
                <th>Nome</th>
                <th>Localização</th>
                <th>Horário</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="paradaa in paradasAtuais" v-bind:key="paradaa.idParadas">
                <td>{{paradaa.idParadas}}</td>
                <td>{{paradaa.nome}}</td>
                <td>{{paradaa.localizacao}}</td>
                <td>{{paradaa.horario}}</td>

                <td>
                  <button
                    title="Editar"
                    class="btn btn-success mr-1"
                    @click="adicionar(paradaa.idParadas)"
                  >
                    <i class="far fa-plus-square"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numero: this.$route.params.id,
      paradas: null,
      paradasAtuais: null,
      parada: {
        idViagens: null,
        idParadas: null,
        idViagensParadas: null
      }
    };
  },
  mounted() {
    this.listar();
    this.listarAdicionadas();
  },
  methods: {
    adicionar(id) {
      this.parada.idViagens = this.numero;
      this.parada.idParadas = id;
      this.axios
        .post(this.$MainURL + "/viagensParadas", this.parada, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
        .then(response => {
          alert(
            `Ok! Parada adicionada com código ${response.data.idViagensParadas}`
          );
          this.listar();
          this.listarAdicionadas();
        });
      this.parada = {};
    },
    remover(id) {
      console.log(id);
      this.axios
        .delete(this.$MainURL + "/viagensParadas/" + id)
        .then(response => {
          alert(
            `Ok! Parada removida com código ${response.data.id}`
          );
          this.listar();
          this.listarAdicionadas();
        });
    },
    listarAdicionadas() {
      this.axios
        .get(this.$MainURL + "/paradas")
        .then(response => (this.paradasAtuais = response.data));
    },
    listar() {
      this.axios
        .get(this.$MainURL + "/viagensParadas/paradas/" + this.numero)
        .then(response => (this.paradas = response.data));
    }
  }
};
</script>

<style scoped>
</style>