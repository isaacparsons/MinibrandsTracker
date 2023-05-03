import React, { createContext, useContext, useState } from 'react';

interface IAdminModeContext {
  toggleAdminMode: () => void;
  adminMode: boolean;
}

const AdminModeContext = createContext<IAdminModeContext>({
  toggleAdminMode: () => {},
  adminMode: false
});

export type Props = {
  children: React.ReactNode;
};

export const useAdminModeContext = () => {
  return useContext(AdminModeContext);
};

const AdminModeProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [adminMode, setAdminMode] = useState(false);

  const toggleAdminMode = () => {
    setAdminMode((prevAdminMode) => {
      return !prevAdminMode;
    });
  };

  return (
    <AdminModeContext.Provider value={{ adminMode, toggleAdminMode }}>
      {children}
    </AdminModeContext.Provider>
  );
};

export default AdminModeProvider;
