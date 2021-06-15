import React, { createContext, useContext, useReducer } from "react";

// prepares the datalayer
export const StateContext = createContext();

//Wrap our app and provide the Data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//pull information from data layer
export const UseStateValue = () => useContext(StateContext);

export default StateProvider;
