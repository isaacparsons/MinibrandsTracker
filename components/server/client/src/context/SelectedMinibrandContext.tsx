import { CollectedMinibrand, MiniBrand } from '__generated__/graphql';
import useIsAdmin from 'common/hooks/useIsAdmin';
import MinibrandDialog from 'modules/Home/components/MinibrandDialog/MinibrandDialog';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { useAdminModeContext } from './AdminModeContext';

interface MinibrandWithCollected {
  minibrand: MiniBrand;
  collected?: CollectedMinibrand;
}

interface ISelectedMinibrandContext {
  handleSelectMinibrand: (
    minibrand: MiniBrand,
    collected?: CollectedMinibrand
  ) => void;
  selectedMinibrand: MinibrandWithCollected | null;
  handleClose: () => void;
}

const SelectedMinibrandContext = createContext<ISelectedMinibrandContext>({
  handleSelectMinibrand: () => {},
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

  const isAdmin = useIsAdmin();
  const { adminMode } = useAdminModeContext();

  const [selectedMinibrand, setSelectedMinibrand] =
    useState<null | MinibrandWithCollected>(null);

  const canEdit = useMemo(() => isAdmin && adminMode, [isAdmin, adminMode]);

  const handleClose = () => {
    setSelectedMinibrand(null);
  };

  const handleSelectMinibrand = (
    minibrand: MiniBrand,
    collected?: CollectedMinibrand
  ) => {
    setSelectedMinibrand({ minibrand, collected });
  };

  return (
    <SelectedMinibrandContext.Provider
      value={{ selectedMinibrand, handleSelectMinibrand, handleClose }}
    >
      {children}
      {selectedMinibrand && (
        <MinibrandDialog
          canEdit={canEdit}
          collectedMinibrand={selectedMinibrand.collected}
          minibrand={selectedMinibrand?.minibrand}
          open={Boolean(selectedMinibrand)}
          handleClose={handleClose}
        />
      )}
    </SelectedMinibrandContext.Provider>
  );
};

export default SelectedMinibrandProvider;
