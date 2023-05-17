import { MiniBrand } from '__generated__/graphql';
import React, { createContext, useContext, useState, useCallback } from 'react';

interface ISelectedMinibrandContext {
  setSelectedMinibrand: (minibrand: MiniBrand) => void;
  selectedMinibrand: MiniBrand | null;
  handleClose: () => void;
}

const SelectedMinibrandContext = createContext<ISelectedMinibrandContext>({
  setSelectedMinibrand: () => {},
  selectedMinibrand: null,
  handleClose: () => {}
});

export type Props = {
  children: React.ReactNode;
};

export const useSelectedMinibrandContext = () => {
  return useContext(SelectedMinibrandContext);
};

const SelectedMinibrandProvider: React.FC<Props> = (props) => {
  const { children } = props;

  const [selectedMinibrand, setSelectedMinibrand] = useState<null | MiniBrand>(
    null
  );

  const handleClose = () => {
    setSelectedMinibrand(null);
  };

  return (
    <SelectedMinibrandContext.Provider
      value={{ selectedMinibrand, setSelectedMinibrand, handleClose }}
    >
      {children}
      {/* {openMinibrand && (
        <Mini
          collectedMinibrand={collectedMinibrandsMap[openMinibrand.id]}
          minibrand={openMinibrand}
          open={Boolean(openMinibrand)}
          handleClose={handleDialogClose}
        />
      )} */}
    </SelectedMinibrandContext.Provider>
  );
};

export default SelectedMinibrandProvider;
