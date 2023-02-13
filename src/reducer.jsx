import { TOGGLE_THEME } from "./actions";

import { initialState } from "./Theme";

const reducer = (state, action) => {
  if (action.type === TOGGLE_THEME) {
    return {
      ...state,
      theme: state.theme === "light" ? "dark" : "light",
    };
  }
};

export default reducer;