import React, { createContext, useContext, useState, useCallback } from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackbarContentDetails {
  message: string;
  type: AlertColor;
}

interface ISnackBarContext {
  show(details: SnackbarContentDetails): void;
}

const SnackBarContext = createContext<ISnackBarContext>({
  show: () => {}
});

export type Props = {
  children: React.ReactNode;
};

export const useSnackBarContext = () => {
  return useContext(SnackBarContext);
};

const SnackBarProvider: React.FC<Props> = (props) => {
  const { children } = props;

  const [open, setOpen] = useState(false);

  const [details, setDetails] = useState<SnackbarContentDetails | null>(null);

  const show = useCallback(
    (details: SnackbarContentDetails) => {
      setDetails(details);
      setOpen(true);
    },
    [setDetails, setOpen]
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackBarContext.Provider value={{ show }}>
      {details?.type && details?.message ? (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={details.type}
            sx={{ width: '100%' }}
          >
            {details?.message}
          </Alert>
        </Snackbar>
      ) : null}
      {children}
    </SnackBarContext.Provider>
  );
};

export default SnackBarProvider;
