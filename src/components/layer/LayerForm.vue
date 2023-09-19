<template>
  <div class="layer-form">
    <div class="layer-input">
      <label :for="'layer-fill-' + layer.id">Color</label>
      <input :name="'layer-fill-' + layer.id" type="color" v-model="fill" />
    </div>
    <div class="layer-input">
      <label :for="'layer-width-' + layer.id">Width {{ width }}</label>
      <input
        :name="'layer-width-' + layer.id"
        type="range"
        v-model="width"
        min="1"
        :max="maxWidth"
      />
    </div>
    <div class="layer-input">
      <label :for="'layer-left-' + layer.id">Height {{ height }}</label>
      <input
        :name="'layer-height-' + layer.id"
        type="range"
        v-model="height"
        min="1"
        :max="maxHeight"
      />
    </div>
    <div class="layer-input">
      <label :for="'layer-top-' + layer.id">Left {{ left }}</label>
      <input
        :name="'layer-left-' + layer.id"
        type="range"
        v-model="left"
        min="0"
        :max="maxWidth"
      />
    </div>
    <div class="layer-input">
      <label :for="'layer-height-' + layer.id">Top {{ top }}</label>
      <input
        :name="'layer-top-' + layer.id"
        type="range"
        v-model="top"
        min="0"
        :max="maxHeight"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { ETALON_PLACEMENT_NAME } from "../../constants.js";

export default {
  props: {
    layer: {
      type: Object,
      required: true,
    },
  },
  computed: {
    fill: {
      get: function () {
        return this.$store.state.layers[this.layer.id].fill;
      },
      set: function (value) {
        this.setLayerField(value, "fill");
      },
    },
    width: {
      get: function () {
        return this.$store.state.layers[this.layer.id].width;
      },
      set: function (value) {
        this.setLayerField(value, "width");
      },
    },
    height: {
      get: function () {
        return this.$store.state.layers[this.layer.id].height;
      },
      set: function (value) {
        this.setLayerField(value, "height");
      },
    },
    top: {
      get: function () {
        return this.$store.state.layers[this.layer.id].top;
      },
      set: function (value) {
        this.setLayerField(value, "top");
      },
    },
    left: {
      get: function () {
        return this.$store.state.layers[this.layer.id].left;
      },
      set: function (value) {
        this.setLayerField(value, "left");
      },
    },
    maxWidth() {
      return this.getMaxFieldValue("width");
    },
    maxHeight() {
      return this.getMaxFieldValue("height");
    },
  },

  methods: {
    ...mapMutations(["updateLayer"]),
    ...mapActions(["updateFactor"]),
    setLayerField(value, key) {
      const intValue = parseInt(value);
      const newValue = isNaN(intValue) ? value : intValue;

      this.$store.commit("updateLayer", {
        id: this.layer.id,
        value: { [key]: newValue },
      });

      this.$store.dispatch("updateFactor", this.layer.name);
    },
    getMaxFieldValue(key) {
      return this.$store.state.placements.find(
        (placement) => placement.name === ETALON_PLACEMENT_NAME
      ).area[key];
    },
  },
};
</script>

<style scoped>
.layer-form {
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>
