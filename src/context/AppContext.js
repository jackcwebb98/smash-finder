import React, { useState, createContext, useContext } from 'react';

const Context = createContext({});

const Provider = props => {
  const [state, setState] = useState([]);
  return (
    <Context.Provider value={[state, setState]}>
      {props.children}
    </Context.Provider>
  );
};

export const useStore = () => useContext(Context);

export function withProvider(Component) {
  return function WrapperComponent(props) {
    return (
      <Provider>
        <Component {...props} />
      </Provider>
    );
  };
}
