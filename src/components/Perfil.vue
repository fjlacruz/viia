<template>
  <div>
    <input type="hidden" name="id_usario" :value="$route.params.id_usario" />
    <div class="q-pa-lg"></div>
    <div class="row justify-center">
      <div class="col-12 col-md-8 q-pa-xs">
        <q-card class="my-card">
          <div class="row justify-center">
            <div class="col-12 col-md-3 q-pa-xs">
              <img :src="formEditar.foto" :alt="formEditar.foto" style="height: 180px; max-width: 180px">
            </div>
          </div>
          <q-card-section>Editar mi usuario</q-card-section>
          <q-form id="editarUsuario" @submit.prevent="editar">
            <q-separator inset />
            <q-card-section>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.nombres"
                  name="nombres"
                  id="nombres"
                  filled
                  hint="Nombres"
                  dense="dense"
                  :value="formEditar.nombres"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.apellidos"
                  name="apellidos"
                  id="apellidos"
                  filled
                  hint="Apellidos"
                  dense="dense"
                  :value="formEditar.apellidos"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.rut"
                  name="rut"
                  id="rut"
                  filled
                  hint="Rut"
                  dense="dense"
                  :value="formEditar.rut"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>

              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.usuario"
                  name="usuario"
                  id="usuario"
                  filled
                  hint="Usuario"
                  dense="dense"
                  :value="formEditar.usuario"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.telefono"
                  name="telefono"
                  id="telefono"
                  filled
                  hint="Telefono"
                  dense="dense"
                  :value="formEditar.telefono"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.email"
                  name="email"
                  id="email"
                  filled
                  hint="Email"
                  dense="dense"
                  :value="formEditar.email"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>

              <div class="col-12 col-xs-12 q-pa-xs">
                <input type="hidden" name="estatus" :value="estatus" />
                <input type="hidden" name="id_usuario" :value="formEditar.id_usuario" />
                <input type="hidden" name="rol" :value="rol" />
              </div>&nbsp;
              <q-separator inset />&nbsp;
              <div class="col-6 col-xs-6 q-pa-xs">
                <q-btn icon-right="send" label="Editar" type="submit" color="primary" />&nbsp;
                <q-btn
                  icon-right="cancel"
                  label="Cancelar"
                  type="submit"
                  color="orange"
                  to="/menuPrincipal"
                />
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
      rol: "",
      estatus: ""
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
      const id_usuario = this.$route.params.id_usuario;
      axios
        .get(
          "https://idsistemas15.com/proyectos/api_viia/usuarios/getUsers?id_usuario=" + id_usuario
        )
        .then(res => {
          this.formEditar = res.data.response[0];
          this.rol = res.data.response[0].rol;
          this.estatus = res.data.response[0].estatus;
          //this.nombres = res.data.nombres[0].nombres;
        });
    },
    editar() {
      const form = document.getElementById("editarUsuario");
      axios
        .post(
          "https://idsistemas15.com/proyectos/api_viia/usuarios/editarUsuario",
          new FormData(form)
        )
        .then(res => {
          this.respuesta = res.data;
          if (res.data.response == "success") {
            this.$q.notify({
              message: "Usuario editado",
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
