<template>
  <div>
    <input type="hidden" name="id_item" :value="$route.params.id_item" />
    <div class="q-pa-lg"></div>
    <div class="row justify-center">
      <div class="col-12 col-md-8 q-pa-xs">
        <q-card class="my-card">
          <q-card-section>Editar Datos</q-card-section>

          <q-form id="editarItem" @submit.prevent="editar">
            <q-separator inset />
            <q-card-section>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.descripcion"
                  name="descripcion"
                  id="descripcion"
                  filled
                  hint="Descripcion"
                  dense="dense"
                  :value="formEditar.descripcion"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.cantidad"
                  name="cantidad"
                  id="cantidad"
                  type="number"
                  filled
                  hint="Cantidad"
                  dense="dense"
                  :value="formEditar.cantidad"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              <q-input type="hidden" name="id_item" id="id_item" :value="formEditar.id_item"></q-input>
              <q-separator inset />&nbsp;
              <div class="col-6 col-xs-6 q-pa-xs">
                <q-btn icon-right="send" label="Editar" type="submit" color="primary" />&nbsp;
                <q-btn icon-right="cancel" label="Cancelar" type="submit" color="orange" to="/menuPrincipal"/>
              </div>
            </q-card-section>
          </q-form>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import sesion from "../mixins/sesion.js";
import axios from "axios";
export default {
  name: "editar",
  data() {
    return {
      formEditar: {},
      rut: "",
      rol:"",
      estatus:""
    };
  },
  computed: {
    token() {
      return JSON.parse(this.$q.localStorage.getItem("token"));
      //console.log(token)
    }
  },
  methods: {
    getId() {
      const id_item = this.$route.params.id_item;
      axios
        .get("https://idsistemas15.com/proyectos/api_viia/items/getItems?id_item=" + id_item)
        .then(res => {
          this.formEditar = res.data.response[0];
          //console.log(this.formEditar)

        });
    },
    editar() {
      const form = document.getElementById("editarItem");
      axios
        .post(
          "https://idsistemas15.com/proyectos/api_viia/items/editarItem",
          new FormData(form)
        )
        .then(res => {
          this.respuesta = res.data;
          if (res.data.response == "success") {
            this.$q.notify({
              message: "Dato editado",
              color: "teal-6",
              icon: "warning",
              position: "bottom-right"
            });
            this.$router.push("/menuPrincipal");
          } else {
            this.$q.notify({
              message: "No se han detectado cambios",
              color: "red-5",
              icon: "warning",
              position: "bottom-right"
            });
          }
        });
    }
  },
  created() {
    this.getId();
  },
  mixins: [sesion]
};
</script>
