import { useSnackBarContext } from '../../context/SnackBarContext';
import { useEffect } from 'react';

interface Props {
  data: any;
  error: any;
  successMsg: string;
  errorMsg: string;
}

const useMutationAlert = (props: Props) => {
  const { data, error, successMsg, errorMsg } = props;
  const { show } = useSnackBarContext();

  useEffect(() => {
    if (data) show({ message: successMsg, type: 'success' });
  }, [data, successMsg, show]);

  useEffect(() => {
    if (error) show({ message: errorMsg, type: 'error' });
  }, [error, errorMsg, show]);
};

export default useMutationAlert;
