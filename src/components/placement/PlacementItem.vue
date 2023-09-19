<template>
  <div class="placement-item">
    <p class="placement-item-title">{{ placement.name }}</p>
    <canvas :ref="placement.name" width="400" height="400"></canvas>
    <div class="placement-input">
      <div>
        <label class="inputLabel" :for="placement.name + '-width'"
          >Width {{ width }}</label
        >
        <input
          :name="placement.name + '-width'"
          type="range"
          v-model="width"
          min="1"
          :max="maxWidth"
        />
      </div>
      <div class="placement-input">
        <label :for="placement.name + '-width'">Height {{ height }}</label>
        <input
          :name="placement.name + '-height'"
          type="range"
          v-model="height"
          min="1"
          :max="maxHeight"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import { fabric } from "fabric";
import { ETALON_PLACEMENT_NAME } from "../../constants";
import {
  getUpdatedLayer,
  getRelativeFrame,
  getFrameInCenterOfFrame,
} from "../../store/helpers";

export default {
  props: {
    placement: {
      type: Object,
      required: true,
      canvas: null,
    },
  },
  data() {
    return {
      designsRects: [],
      placementRect: null,
      placementFrame: null,
    };
  },
  mounted() {
    this.canvas = new fabric.StaticCanvas(this.$refs[this.placement.name]);
    this.openSVG(this.placement.image, this.canvas);

    this.setPlacement({
      width: this.placement.width,
      height: this.placement.height,
    });
  },
  watch: {
    factors(newFactors) {
      this.drawLayers(newFactors);
    },
    showPlacement() {
      this.drawPlacement();
      this.drawLayers(this.$store.state.factors);
    },
  },
  computed: {
    width: {
      cache: false,
      deep: true,
      get: function () {
        return this.$store.state.placements[this.placement.id].width;
      },
      set: function (value) {
        this.setPlacementField(value, "width");
      },
    },
    height: {
      cache: false,
      get: function () {
        return this.$store.state.placements[this.placement.id].height;
      },
      set: function (value) {
        this.setPlacementField(value, "height");
      },
    },
    ...mapState({
      showPlacement(state) {
        return state.showPlacement;
      },
      factors(state) {
        return state.factors;
      },
      layers(state) {
        return state.layers;
      },
      maxWidth(state) {
        return state.placements[this.placement.id].area.width;
      },
      maxHeight(state) {
        return state.placements[this.placement.id].area.height;
      },
    }),
    ...mapActions(["updateAllFactors"]),
  },

  methods: {
    ...mapMutations(["updatePlacement"]),
    setPlacementField(value, key) {
      let intValue = parseInt(value);
      this.$store.commit("updatePlacement", {
        id: this.placement.id,
        value: { [key]: intValue },
      });

      this.setPlacement({ width: this.width, height: this.height });

      if (this.placement.name === ETALON_PLACEMENT_NAME) {
        this.$store.dispatch("updateAllFactors");
      } else {
        this.drawLayers(this.$store.state.factors);
      }
    },
    openSVG(path, canvas) {
      fabric.loadSVGFromURL(path, function (objects) {
        objects.forEach(function (svg) {
          svg.set({
            left: 0,
            top: 0,
          });
          svg.scaleToWidth(400);
          svg.scaleToHeight(400);
          canvas.viewportCenterObject(svg);
          canvas.add(svg).renderAll();
        });
      });
    },
    setPlacement(size) {
      this.placementFrame = getFrameInCenterOfFrame(this.placement.area, size);

      this.drawPlacement();
    },
    drawRect(frame, canvas, color) {
      const rect = new fabric.Rect({
        ...frame,
        fill: color,
      });
      canvas.add(rect);
      return rect;
    },
    drawLayers(factors) {
      const layers = this.layers.map((layer) => {
        return getUpdatedLayer(this.placementFrame, layer, factors[layer.name]);
      });
      this.designsRects.forEach((designsRect) =>
        this.canvas.remove(designsRect)
      );

      this.designsRects = layers.map((layer) => {
        let frame = getRelativeFrame(this.placementFrame, layer);

        return this.drawRect(frame, this.canvas, layer.fill);
      });
    },
    drawPlacement() {
      if (this.placementRect) {
        this.canvas.remove(this.placementRect);
      }
      if (!this.$store.state.showPlacement) {
        return;
      }
      this.placementRect = this.drawRect(
        this.placementFrame,
        this.canvas,
        "green"
      );
    },
  },
};
</script>

<style scoped>
.placement-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.placement-item-title {
  font-size: 16px;
  font-weight: bold;
}
.placement-input {
  margin-top: 20px;
}
.inputLabel {
  width: 100px;
}
</style>
