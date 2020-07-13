<template>
  <div class="card-body" >
    <table class="table table-hover table-sm">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Nota</th>
          <th>Avaliação</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comentario in comentarios" v-bind:key="comentario.idComentarios">
          <td>{{comentario.nomeComentario}}</td>
          <td>{{comentario.notaComentario}}</td>
          <td>{{comentario.avaliacao}}</td>
          <td>
            <!-- <button
              title="Aceitar"
              class="btn btn-accept mr-1"
              @click="aceitar(comentario.idComentarios)"
            >
              <i class="far fa-edit"></i>
            </button> -->
            <button
              title="Rejeitar"
              class="btn btn-danger mr-1"
              @click="rejeitar(comentario.idComentarios)"
            >
              <i class="far fa-trash-alt"></i>
            </button>
           <!--  <button
              title="Invisível"
              class="btn btn-danger mr-1"
              @click="invisivel(comentario.idComentarios)"
            >
              <i class="far fa-trash-alt"></i>
            </button> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comentarios: null,
      comentario: {
        idComentarios: null,
        nomeComentario: null,
        notaComentario: null,
        avaliacao: null,
        visibilidade: null,
        idExcursoes: null
      }
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    /* adicionar(id) {
      this.comentario.visibilidade = "o";
      this.axios
        .put(this.$MainURL + "/comentarios/" + id, this.comentario)
        .then(alert("Comentário visível e aprovado"));
      this.listar();
    }, */
    rejeitar(id) {
      this.axios
        .delete(this.$MainURL + "/comentarios/" + id)
        .then("Comentário excluído", this.listar());
    },
   /*  invisivel(id) {
      this.comentario.visibilidade = "x";
      this.axios
        .put(this.$MainURL + "/comentarios/" + id, this.comentario)
        .then(alert("Comentário está invisível"));
      this.listar();
    }, */
    listar() {
      this.axios
        .get(this.$MainURL + "/comentarios")
        .then(response => (this.comentarios = response.data));
    }
  }
};
</script>