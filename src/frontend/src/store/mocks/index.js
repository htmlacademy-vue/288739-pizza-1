import { cloneDeep } from "lodash";
import { mutations } from "@/store";
import modules from "@/modules";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";

export const generateMockStore = (moduleActions, moduleMutations) => {
  const modulesCopy = cloneDeep(modules);

  if (moduleMutations) {
    Object.entries(moduleMutations).forEach(([module, mutations]) => {
      modulesCopy[module] = { ...modulesCopy[module], mutations };
    });
  }

  if (moduleActions) {
    Object.entries(moduleActions).forEach(([module, actions]) => {
      modulesCopy[module] = { ...modulesCopy[module], actions };
    });
  }

  return new Vuex.Store({
    mutations,
    modules: modulesCopy,
    plugins: [VuexPlugins],
  });
};
