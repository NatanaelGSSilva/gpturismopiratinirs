<template>
  <div id="listagem" >
    <div class="container mt-3">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-sm-8">
              <h5 class="float-left">Lista de Viagens</h5>
            </div>

            <div class="col-sm-4">
              <router-link class="btn btn-success float-right" to="/CriarViagem">
                <i class="fas fa-plus-circle"></i> Criar Viagem
              </router-link>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-hover table-sm">
            <thead>
              <tr>
                <th>Cód.</th>
                <th>Saida</th>
                <th>Destino</th>
                <th>Valor</th>
                <th>Horário Saída</th>
                <th>Horário Chegada</th>
                <th>Tipo Viagem</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="viagem in viagens" v-bind:key="viagem.idViagens">
                <td>{{viagem.idViagens}}</td>
                <td>{{viagem.cidadePartida}}</td>
                <td>{{viagem.cidadeChegada}}</td>
                <td>{{viagem.valor}}</td>
                <td>{{viagem.horaPartida}}</td>
                <td>{{viagem.horaChegada}}</td>
                <td v-if="viagem.tipoViagem == 1">Estudante</td>
                <td v-else>Excursão</td>
                <td>
                  <button
                    title="Excluir"
                    class="btn btn-danger mr-1"
                    @click="excluir(viagem.idViagens)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                  <button
                    title="Editar"
                    class="btn btn-warning mr-1"
                    @click="editar(viagem.idViagens)"
                  >
                    <i class="far fa-edit"></i>
                  </button>
                  <!-- Alterar para 1 de volta dps -->
                  <router-link
                    :to="{name: 'MenuParadas', params: {id: viagem.idViagens}}"
                    v-if="viagem.tipoViagem == 1"
                    title="Editar Paradas"
                    class="btn btn-info"
                  >
                    <i class="far fa-plus-square"></i>
                  </router-link>
                  <!-- Como mandar o id para outra página? Para usar de referência para editar, linkar, etc -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="float-right">
      <div class="row input-group mt-3">
        <input type="text" class="form-control" v-model="filtro" placeholder="Insira a Cidade" />
        <button class="btn btn-info ml-2" @click.prevent="pesquisar">Pesquisar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "listagem",
  data() {
    return {
      viagens: null,
      filtro: ""
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    pesquisar() {
      this.axios
        .get(this.$MainURL + `/viagens/excursoes/${this.filtro}`)
        .then(response => (this.viagens = response.data));
    },
    editar(id) {
      this.$router.push({ name: "CriarViagemId", params: { id: id } });
    },
    listar() {
      this.axios
        .get(this.$MainURL + "/viagens")
        .then(response => (this.viagens = response.data));
    },

    excluir(id) {
      this.axios.delete(this.$MainURL + "/viagens/" + id).then(response => {
        alert("Viagem de id: " + response.data.id + " excluído.");

        this.listar();
      });
    }
  }
};
</script>

<style scoped>
</style>