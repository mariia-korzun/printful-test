<template>
  <div class="layer-configuration">
    <h1>Layers configuration</h1>
    <div class="layers">
      <LayerForm v-for="layer in layers" :key="layer.id" :layer="layer" />
    </div>
  </div>
</template>

<script>
import LayerForm from "./LayerForm.vue";
import { mapState } from "vuex";

export default {
  components: {
    LayerForm,
  },
  computed: mapState({
    layers: (state) => state.layers,
  }),
};
</script>

<style scoped>
.layer-configuration {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
