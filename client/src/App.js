import React from "react";
import { GlobalProvider } from "./context";
import Home from "./pages/home";

const App = () => {
  return (
    <GlobalProvider>
      <Home />
    </GlobalProvider>
  );
};

export default App;
