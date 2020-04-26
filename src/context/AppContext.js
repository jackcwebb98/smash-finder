import React, { useState, createContext } from "react";

export const AppContext = createContext({});

const Provider = props => {
  const [state, setState] = useState([]);
  const [open, setOpen] = useState(false);

  return (
    <AppContext.Provider value={{ state, setState, open, setOpen }}>
      {props.children}
    </AppContext.Provider>
  );
};

export function withProvider(Component) {
  return function WrapperComponent(props) {
    return (
      <Provider>
        <Component {...props} />
      </Provider>
    );
  };
}
