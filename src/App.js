import React from "react";
import Routes from "../src/routes/Router";
import { withProvider } from "./context/AppContext";

function App() {
  return (
    <div>
      <Routes />
    </div>
  );
}

export default withProvider(App);
