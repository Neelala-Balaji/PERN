import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const initialState = {
    isAuth: false,
    showLogin: false,
    profile: { name: "Balaji" },
    afterLoginRedirect: false,
    logoutFn: () => {},
  };
  const [globalState, setGlobalState] = useState(initialState);

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
