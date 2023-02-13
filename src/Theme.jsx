import React, { createContext, useReducer, useContext } from "react"
import reducer from "./reducer"
import { TOGGLE_THEME } from "./actions";

const initialState = {
  theme: "light",
};

const ThemeContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleTheme = () => {
    dispatch({ type: TOGGLE_THEME });
  };

  return (
    <ThemeContext.Provider value={{ ...state, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(ThemeContext);
};

export { AppProvider, initialState, useAppContext };