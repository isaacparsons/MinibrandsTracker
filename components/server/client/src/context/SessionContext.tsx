import React, { createContext, useContext, useState } from 'react';

interface ISessionContext {
  authenticated: boolean;
  login: () => void;
  logout: () => void;
}

const SessionContext = createContext<ISessionContext>({
  authenticated: false,
  login: () => {},
  logout: () => {}
});

export type Props = {
  children: React.ReactNode;
};

export const useSessionContext = () => {
  return useContext(SessionContext);
};

const SessionProvider: React.FC<Props> = (props) => {
  const { children } = props;

  const [authenticated, setAuthenticated] = useState(false);

  const login = () => {
    setAuthenticated(true);
  };
  const logout = () => {
    setAuthenticated(false);
  };

  return (
    <SessionContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
