<template>
  <div class="q-pa-md">
    <input type="hidden" name="modulo" id="modulo" required :value="modulo" />
    <div class="q-pa-xs"></div>
    <div class="row justify-center">
      <div class="col-12 col-md-6 q-pa-xs">
        <q-card class="my-card">
          <q-card-section class="text-h6">
            <div class="row">
              <div class="col-12 col-md-4 q-pa-xs justify-left">Modulo: {{ modulo }}</div>
              <div class="col-12 col-md-5 q-pa-xs">&nbsp;</div>
            </div>
          </q-card-section>
          <form id="listado" autocomplete="off" @submit.prevent="editar">
            <q-separator inset />
            <q-card-section>
              <div class="col-12 col-xs-12 q-pa-xs">
                <table class="q-table">
                  <thead>
                    <tr>
                      <th class="text-left">Item</th>
                      <th class="text-left">Cantidad</th>
                      <th class="text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody v-for="item in listar" :key="item.id">
                    <tr>
                      <td class="text-left">{{ item.descripcion}}</td>
                      <td class="text-left">{{ item.cantidad}}</td>
                      <td class="text-left">
                        <q-btn
                          round
                          color="primary"
                          icon="edit"
                          size="xs"
                          :to="'/editarItem/'+item.id_item"
                          href="#"
                        />&nbsp;
                        <q-btn
                          round
                          color="warning"
                          icon="search"
                          size="xs"
                          :to="'/editarItem/'+item.id_item"
                          href="#"
                        />&nbsp;
                        <q-btn
                          round
                          color="red"
                          icon="highlight_off"
                          size="xs"
                          href="#"
                          @click="eliminar(item.id_item)"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <q-separator inset />&nbsp;
              </div>
            </q-card-section>
          </form>
        </q-card>
      </div>
      <div class="col-12 col-md-6 q-pa-xs">
      <vue-chart type="bar" :data="chartData"></vue-chart>
      </div>
    </div>

  </div>
</template>



<script>
import sesion from "../mixins/sesion.js";
import axios from "axios";
import VueChart from "vue-chart-js";

export default {
  name: "items",
  components: {
    VueChart
  },

  data() {
    return {
      listar: [],
      modulo: "",
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Cantidad",
            backgroundColor: '#9FC2F9',
            data: []
          },
        ]
      }
    };
  },
  created() {
    this.getmodulo();
    const token = JSON.parse(this.$q.localStorage.getItem("token"));
  },

  methods: {
    getmodulo() {
      this.showLoading();
      const modulo = this.$route.params.modulo;
      axios
        .get(
          "https://idsistemas15.com/proyectos/api_viia/items/getItems?modulo=" +
            modulo
        )
        .then(res => {
          this.listar = res.data.response;
          this.modulo = res.data.response[0].modulo;
          this.chartData.labels = res.data.response.map(
            item => item.descripcion
          );
          this.chartData.datasets[0].data = res.data.response.map(
            item => item.cantidad
          );
          //console.log(this.chartData.datasets.data);
          this.hideLoading();
        });
    },
    eliminar(id_item) {
      axios
        .post(
          "https://idsistemas15.com/proyectos/api_viia/items/eliminarItem/?id_item=" +
            id_item
        )
        .then(res => {
          this.$q.notify({
            message: "Dato Eliminado",
            color: "teal-6",
            icon: "warning",
            position: "bottom-right"
          });
          this.$router.push("/menuPrincipal");
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

  mixins: [sesion]
};
</script>
