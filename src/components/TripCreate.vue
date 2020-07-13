<template>
  <div  id="Adicionagem">
    <div class="card container mt-3" >
      <div class="card-header">
        <div class="row" >
          <div class="col-sm-8" >
            <h5 class="float-left" >Adicionar Viagens</h5>
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
              name="cidadeSaida"
              v-model="viagem.cidadePartida"
              placeholder="Origem"
              required
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="cidadeChegada"
              v-model="viagem.cidadeChegada"
              placeholder="Destino"
              required
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="horaSaida"
              v-model="viagem.horaPartida"
              placeholder="Horas da Partida"
              required
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="horaChegada"
              v-model="viagem.horaChegada"
              placeholder="Horas da Chegada"
              required
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="valor"
              v-model="viagem.valor"
              placeholder="Valor"
              required
            />
          </div>

          <span>Tipo da Viagem</span>
          <div class="form-group">
            <input type="radio" name="tipoViagem" v-model="viagem.tipoViagem" value="1" />
            <label class="ml-1" for="estudante">Estudante</label>
            <input
              class="ml-3"
              type="radio"
              name="tipoViagem"
              v-model="viagem.tipoViagem"
              value="2"
            />
            <label class="ml-1" for="excursao">Excursão</label>
          </div>

          <div v-if="viagem.tipoViagem == 2">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                name="dataPartida"
                v-model="excursao.dataPartida"
                placeholder="Data da Partida"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                name="dataChegada"
                v-model="excursao.dataChegada"
                placeholder="Data da Chegada"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                name="foto"
                v-model="excursao.foto"
                placeholder="Foto URL"
                required
              />
            </div>

            <div class="form-group">
              <input
                type="text"
                class="form-control"
                name="detalheExcursoes"
                v-model="excursao.detalheExcursoes"
                placeholder="Detalhes sobre a Excursão"
                required
              />
            </div>
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
      numero: this.$route.params.id,
      viagem: {
        idViagens: null,
        cidadePartida: null,
        cidadeChegada: null,
        horaPartida: null,
        horaChegada: null,
        valor: null,
        tipoViagem: null
      },
      excursao: {
        idExcursoes: null,
        dataPartida: null,
        dataChegada: null,
        foto: null,
        detalheExcursoes: null,
        idViagens: null
      }
    };
  },
  mounted() {
    if (this.$route.params.id >= 0) {
      this.editarCampos();
    }
  },
  methods: {
    salvar() {
      if (this.viagem.idViagens) {
        this.axios
          .put(this.$MainURL + "/viagens/" + this.viagem.idViagens, this.viagem)
          .then(response => {
            alert(
              "Viagem de id: " +
                response.data.idViagens +
                " alterada com sucesso!"
            );
            this.GoBack();
          });

        if (this.viagem.tipoViagem == 2) {
          this.axios
            .put(
              this.$MainURL + "/excursoes/" + this.excursao.idExcursoes,
              this.excursao
            )
            .then(response => {
              alert(
                "Excursão de id: " +
                  response.data.idExcursoes +
                  " alterado com sucesso"
              );
              this.GoBack();
            });
        }
      } else {
        if (this.viagem.tipoViagem == 2) {
          this.axios
            .post(this.$MainURL + "/viagens", this.viagem, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
            .then(response => {
              alert(
                `Ok! Viagem cadastrado com código ${response.data.idViagens}`
              );
              this.sal(response.data.idViagens);
            });
        } else {
          this.axios
            .post(this.$MainURL + "/viagens", this.viagem, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
            .then(response => {
              alert(
                `Ok! Viagem cadastrado com código ${response.data.idViagens}`
              );
              this.GoBack();
            });
        }
      }
    },
    sal(id) {
      setTimeout(() => {
        this.excursao.idViagens = id;
        this.axios
          .post(this.$MainURL + "/excursoes", this.excursao, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
          .then(this.GoBack());
      }, 3000);
    },
    // -----------------------------------------------------------------------------------
    editarCampos() {
      this.axios
        .get(this.$MainURL + "/viagens/" + this.numero)
        .then(response => {
          this.viagem = response.data;
          if (response.data.tipoViagem == 2) {
            this.carregaExcursao(response.data.idViagens);
          }
        });
    },

    carregaExcursao(id) {
      this.axios
        .get(this.$MainURL + "/excursoes/viagem/" + id)
        .then(response => (this.excursao = response.data));
    },
    // -----------------------------------------------------------------------------------
    GoBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>


<style scoped>
</style>


