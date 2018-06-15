export default {
  SET_TABCONTENTS(state, payload) {
    state.tabContents.push(payload);
  },
  SET_CURRENT_ACTIVE_TAB_NAME(state, payload) {
    state.currentActiveTabName = payload;
  }
};
