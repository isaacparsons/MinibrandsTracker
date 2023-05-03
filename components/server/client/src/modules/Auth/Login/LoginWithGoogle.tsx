import { Typography, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import GoogleIcon from '@mui/icons-material/Google';

interface Props {
  onClick: () => void;
  loading: boolean;
}

const LoginWithGoogle = (props: Props) => {
  const { onClick, loading } = props;
  return (
    <LoadingButton
      variant="contained"
      sx={styles.container}
      onClick={onClick}
      loading={loading}
    >
      <Typography>Login with google</Typography>
      <GoogleIcon sx={styles.icon} />
    </LoadingButton>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 1
  },
  icon: {
    paddingLeft: 1
  }
};

export default LoginWithGoogle;
