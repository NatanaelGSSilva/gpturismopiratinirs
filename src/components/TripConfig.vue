<template>
  <div>
    <div class="card-header" >
      <div class="row">
        <div class="col-sm-8">
          <h5 class="float-left">Lista de Paradas</h5>
        </div>
        <div class="col-sm-4">
          <router-link class="btn btn-success float-right" to="/CriarParada">
            <i class="fas fa-plus-circle"></i> Criar Parada
          </router-link>
        </div>
      </div>
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
            <td>{{parada.idParadas}}</td>
            <td>{{parada.nome}}</td>
            <td>{{parada.localizacao}}</td>
            <td>{{parada.horario}}</td>

            <td>
              <button title="Editar" class="btn btn-warning mr-1" @click="editar(parada.idParadas)">
                <i class="far fa-edit"></i>
              </button>
              <button
                title="Remover"
                class="btn btn-danger mr-1"
                @click="excluir(parada.idParadas)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parada: {
        idParadas: null,
        nome: null,
        localizacao: null,
        horario: null
      },
      paradas: null
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      this.axios
        .get(this.$MainURL + "/paradas")
        .then(response => (this.paradas = response.data));
    },
    editar(id) {
    this.$router.push({name: "CriarParadaId", params: {id: id}})

    },
    excluir(id) {
      this.axios.delete(this.$MainURL + "/paradas/" + id).then(response => {
        alert(`Removido id: ${response.data.id}`);
        this.listar();
      });
    }
  }
};
</script>