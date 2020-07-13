<template>
  <div id="Adicionagem">
    <div class="card container mt-3" style="margin-top:100px">
      <div class="card-header">
        <div class="row">
          <div class="col-sm-8">
            <h5 class="float-left">Adicionar Parada</h5>
          </div>
          <div class="col-sm-4">
            <button class="btn btn-warning float-right" @click="GoBack">
              <i class="fas fa-undo-alt"></i>
              Voltar
            </button>
          </div>
        </div>
      </div>

      <div class="card-body">
        <form @submit.prevent="salvar">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="nome"
              v-model="parada.nome"
              placeholder="Nome"
              required
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="localizacao"
              v-model="parada.localizacao"
              placeholder="Localização"
              required
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="horario"
              v-model="parada.horario"
              placeholder="Horário"
              required
            />
          </div>

          <div class="btn-group w-100" role="group">
            <input type="submit" class="btn btn-primary" value="Salvar" />
            <input type="reset" class="btn btn-danger" value="Limpar" />
          </div>
        </form>
      </div>
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
      }
    };
  },
  mounted() {
    if (this.$route.params.id >= 0) {
      this.editarCampos();
    }
  },
  methods: {
    editarCampos() {
      this.axios
        .get(this.$MainURL + "/paradas/" + this.$route.params.id)
        .then(response => (this.parada = response.data));
    },
    salvar() {
      if (this.parada.idParadas){
        this.axios.put(this.$MainURL + "/paradas/" + this.parada.idParadas, this.parada)
        .then((response) => {
          alert("Parada de id: " + response.data.idParadas + " alterada com sucesso!")
          this.GoBack();
          })
      } else{
        this.axios
          .post(this.$MainURL + "/paradas", this.parada, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
          .then(response => {
            alert(
              `Ok! Parada cadastrada com código ${response.data.idParadas}`
            );
            this.GoBack();
          });
      }
      this.parada = {};
    },
    GoBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>


<style scoped>
</style>


