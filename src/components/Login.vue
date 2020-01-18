<template>
  <div>
    <div class="q-pa-md q-pt-lg">
      <div class="row justify-center">
        <div class="col-12 col-md-4 q-pt-lg">
          <q-card class="my-card">
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">Login</div>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-actions>
              <q-form id="inicioSesion" @submit.prevent="login">
                <div class="row justify-center">
                  <div class="col-12 col-md-12 q-pa-md">
                    <q-input
                      v-model="rut"
                      name="rut"
                      id="rut"
                      label="RUT"
                      lazy-rules
                      filled
                      dense="dense"
                      :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                    />
                  </div>
                  <div class="col-12 col-md-12 q-pa-md">
                    <q-input
                      v-model="clave"
                      label="Clave"
                      name="clave"
                      id="clave"
                      type="password"
                      lazy-rules
                      filled
                      dense="dense"
                      :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                    />
                  </div>
                  <div class="col-12 col-md-12 q-pa-md">
                    <q-btn icon-right="send" label="Entrar" type="submit" color="primary" />
                  </div>
                </div>
              </q-form>
            </q-card-actions>
          </q-card>
          Rut:12345678 /
          Clave:12345678
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "inicioSesion",
  data() {
    return {
      rut: "",
      clave: ""
    };
  },
  methods: {
    login() {
      this.showLoading();
      const form = document.getElementById("inicioSesion");
      axios
        .post("https://idsistemas15.com/proyectos/api_viia/usuarios/userLogin/", new FormData(form))
        .then(res => {
          this.respuesta = res.data;
          //console.log(res.data); return;

          if (res.data.res == "success") {
            //this.$localStorage.set('token', JSON.stringify(res.data.token))
            this.$q.localStorage.set("token", JSON.stringify(res.data.token));
            this.$router.push("menuPrincipal");
            this.hideLoading();
          } else {
            this.$q.notify({
              message: "Credenciales No Validas",
              color: "red-5",
              icon: "warning",
              position: "bottom-right"
            });
            this.hideLoading();
            this.rut = "";
            this.clave = "";
          }
        });
    },
    showLoading() {
      this.$q.loading.show({
        message: "Procesando su peticion...</span>"
      });
    },
    hideLoading() {
      this.$q.loading.hide({
        message: "Procesando su peticion...</span>"
      });
    }
  },
  created() {
    const token = JSON.parse(this.$q.localStorage.get("token"));
    if (token) {
      this.$router.push("/menuPrincipal");
      //console.log(token)
    }
  }
};
</script>
