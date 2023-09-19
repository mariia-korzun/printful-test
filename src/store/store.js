import Vue from "vue";
import Vuex from "vuex";
import { calculateFactor } from "./helpers";
import { ETALON_PLACEMENT_NAME, INITIAL_STATE } from "../constants";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: () => INITIAL_STATE,
  actions: {
    updateFactor({ commit, state }, layerName) {
      let newFactor = calculateFactor(
        state.placements.find(
          (placement) => placement.name === ETALON_PLACEMENT_NAME
        ),
        state.layers.find((layer) => layer.name === layerName)
      );

      commit("updateFactor", { layerName, newFactor });
    },
    updateAllFactors({ dispatch, state }) {
      state.layers.forEach((layer) => {
        dispatch("updateFactor", layer.name);
      });
    },
  },
  mutations: {
    updateLayer(state, { id, value }) {
      let newItem = { ...state.layers[id], ...value };
      state.layers = [
        ...state.layers.slice(0, id),
        newItem,
        ...state.layers.slice(id + 1),
      ];
    },
    updatePlacement(state, { id, value }) {
      let newItem = { ...state.placements[id], ...value };
      state.placements = [
        ...state.placements.slice(0, id),
        newItem,
        ...state.placements.slice(id + 1),
      ];
    },
    updateFactor(state, { layerName, newFactor }) {
      state.factors = { ...state.factors, [layerName]: newFactor };
    },
    toggleShowPlacement(state, value) {
      state.showPlacement = value;
    },
  },
});

export default store;
