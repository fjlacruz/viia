<template>
  <div class="q-pa-md q-gutter-md">
    <div class="row">
      <div class="col-12 col-md-10 q-pa-xs justify-right">
        <q-input v-model="buscar" name="buscar" id="buscar" label="Buscar" filled type="search" dense="dense">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="col-12 col-md-1 q-pa-xs justify-right">
        <q-icon name="mail_outline" style="font-size: 2.6rem;" />
        <q-tooltip>Email</q-tooltip>
      </div>
       <div class="col-12 col-md-1 q-pa-xs justify-left">
        <q-icon name="cast" style="font-size: 2.5rem;" />
        <q-tooltip>Redes Sociales</q-tooltip>
      </div>
      <div class="col-12 col-md-12 q-pa-xs">
        <q-badge outline color="primary" label="Menu Principal" />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-4 q-pa-xs">
        <q-btn outline color="primary" :to="'/items/modulo/'+1">
          <q-icon left size="12em" name="map" />
          <div>Modulo 1</div>
        </q-btn>
      </div>
      <div class="col-12 col-md-4 q-pa-xs">
        <q-btn outline color="primary"  :to="'/items/modulo/'+2">
          <q-icon left size="12em" name="map" />
          <div>Modulo 2</div>
        </q-btn>
      </div>
      <div class="col-12 col-md-4 q-pa-xs">
        <q-btn outline color="primary" :to="'/items/modulo/'+3">
          <q-icon left size="12em" name="map" />
          <div>Modulo 3</div>
        </q-btn>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-4 q-pa-xs">
        <q-btn outline color="primary" :to="'/items/modulo/'+4">
          <q-icon left size="12em" name="map" />
          <div>Modulo 4</div>
        </q-btn>
      </div>
      <div class="col-12 col-md-4 q-pa-xs">
        <q-btn outline color="primary" :to="'/items/modulo/'+5">
          <q-icon left size="12em" name="map" />
          <div>Modulo 5</div>
        </q-btn>
      </div>
      <div class="col-12 col-md-4 q-pa-xs">
        <q-btn outline color="primary" :to="'/items/modulo/'+6">
          <q-icon left size="12em" name="map" />
          <div>Modulo 6</div>
        </q-btn>
      </div>
    </div>
  </div>
</template>
