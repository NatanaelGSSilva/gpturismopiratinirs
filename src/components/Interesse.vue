<template>
  <div id="interesse" style="margin-top:100px">
    <div class="container mt-3">
      <div class="card">
        <h5 class="card-header">Lista de Viagens</h5>
        <div class="card-body">
          <table class="table table-hover table-sm">
            <thead>
              <tr>
                <th>Checkbox</th>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="interesse in interesses" v-bind:key="interesse.idInteresse">
                <td>
                  <input type="checkbox" :value="interesse.idInteresse" v-model="enviar" />
                </td>
                <td>{{interesse.idInteresse}}</td>
                <td>{{interesse.nome}}</td>
                <td>{{interesse.email}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <button class="btn btn-success" @click="enviarM()">Enviar</button>
        </div>
        <div class="col-sm-6">
          <button class="btn btn-warning" @click="enviarTodos()">Enviar para Todos</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      interesses: null,
      enviar: [],
      interesse: {
        idInteresse: null,
        nome: null,
        email: null
      }
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    enviarM() {
      let id;
      let msg = "Mensagens de id: ";
      for (let i = 0; i < this.enviar.length; i++) {
        id = this.enviar.pop();
        this.axios
          .get(this.$MainURL + "/interesses/email/" + id)
          .then(response => (msg = msg + response.data.id + ", "));
        msg[msg.length - 1] = ". Enviados com sucesso.";
        alert(msg);
        msg = {}
        this.enviar = {}
      }
    },

    enviarTodos() {
      this.axios
        .get(this.$MainURL + "/enviar_todos")
        .then(alert("Enviado Email para todos com sucesso!"));
    },
    listar() {
      this.axios
        .get(this.$MainURL + "/interesses")
        .then(response => (this.interesses = response.data));
    }
  }
};
</script>