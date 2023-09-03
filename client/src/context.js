import { createContext, useContext, useState } from "react";

export const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const initialState = {
  isAuth: false,
  showLogin: false,
  profile: { username: "" },
  afterLoginRedirect: false,
  logoutFn: () => {},
};

export const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState(initialState);

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
