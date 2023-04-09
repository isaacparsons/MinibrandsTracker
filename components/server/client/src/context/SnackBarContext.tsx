import React, { createContext, useContext, useState, useCallback } from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ISnackBarContext {
  show(message: string, type: AlertColor): void;
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
  const [message, setMessage] = useState('');
  const [type, setType] = useState<AlertColor>('info');

  const show = useCallback(
    (message: string, type: AlertColor) => {
      setType(type);
      setMessage(message);
      setOpen(true);
    },
    [setMessage, setOpen]
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackBarContext.Provider value={{ show }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackBarContext.Provider>
  );
};

export default SnackBarProvider;
