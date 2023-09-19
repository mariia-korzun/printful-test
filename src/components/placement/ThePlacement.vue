<template>
  <div class="placement">
    <div class="show-placement">
      <input
        type="checkbox"
        name="show-placement-checkbox"
        v-model="showPlacement"
      />
      <label for="show-placement-checkbox">Show Placement</label>
    </div>
    <div class="placement-items">
      <PlacementItem
        v-for="placement in placements"
        :key="placement.name"
        :placement="placement"
      />
    </div>
  </div>
</template>

<script>
import PlacementItem from "./PlacementItem.vue";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  components: {
    PlacementItem,
  },
  mounted() {
    this.$store.dispatch("updateAllFactors");
  },
  computed: {
    showPlacement: {
      get: function () {
        return this.$store.state.showPlacement;
      },
      set: function (value) {
        this.$store.commit("toggleShowPlacement", value);
      },
    },
    ...mapState({
      placements: (state) => state.placements,
    }),
  },

  methods: {
    ...mapActions(["updateAllFactors"]),
    ...mapMutations(["toggleShowPlacement"]),
  },
};
</script>

<style scoped>
.placement {
  display: flex;
  flex-direction: column;
}
.show-placement {
  margin: 20px 0;
  text-align: center;
}
.placement-items {
  display: grid;
  gap: 50px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
</style>
