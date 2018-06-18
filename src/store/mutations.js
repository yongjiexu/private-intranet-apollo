export default {
  SET_TABCONTENTS(state, payload) {
    state.tabContents.push(payload);
  },
  DELETE_TABCONTENTS_ELM(state, payload) {
    debugger
    state.tabContents.forEach((tabContent, index) => {
      if (tabContent.name === payload) {
        state.tabContents.splice(index, 1);
      }
    });
  },
  SET_CURRENT_ACTIVE_TAB_NAME(state, payload) {
    state.currentActiveTabName = payload;
  },
  SET_TAB_INDEX(state, payload) {
    state.tabIndex[payload]++;
  }
};
