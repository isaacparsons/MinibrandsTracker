import {
  TextField,
  Box,
  Typography,
  Paper,
  useTheme,
  Theme,
  Divider
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import LoginWithGoogle from './LoginWithGoogle';
import { useEffect, useState } from 'react';
import { useSessionContext } from 'context/SessionContext';
import Api from 'api';
import { HOME_PATH } from 'App';
import { useSnackBarContext } from 'context/SnackBarContext';
import { AxiosError } from 'axios';

const api = new Api();

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const session = useSessionContext();
  const snackbar = useSnackBarContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (session.authenticated) {
      navigate(HOME_PATH);
    }
  }, [session.authenticated, navigate]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { password, email } = data;
    try {
      setLoading(true);
      await api.authLocal(email, password);
      session.login();
      navigate('/home');
    } catch (e) {
      console.log(e);
      const error = e as AxiosError;
      const response = error?.response?.data as Error;
      snackbar.show({
        message: response.message,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = () => {
    setLoading(true);
    api.authGoogle();
    setLoading(false);
  };

  return (
    <Box sx={styles.container}>
      <Paper elevation={3} sx={styles.contentContainer(theme)}>
        <Box sx={styles.content}>
          <Typography variant="h5">Login</Typography>
          <TextField
            sx={styles.textInput}
            // error={errors.password}
            helperText={errors.email?.type === 'required'}
            id="email"
            label="Email"
            {...register('email', { required: true })}
          />

          <TextField
            sx={styles.textInput}
            // error={errors.password}
            helperText={errors.password?.type === 'required'}
            id="password"
            type="password"
            label="Password"
            {...register('password', { required: true })}
          />
          <LoadingButton
            loading={loading}
            sx={styles.btn}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </LoadingButton>
          <Link to="/signup">
            <Typography>Signup</Typography>
          </Link>
          <Link to="/forgot_password">
            <Typography>Forgot password</Typography>
          </Link>
          <Box sx={styles.dividerContainer}>
            <Divider sx={styles.divider} />
            <Typography>Or</Typography>
            <Divider sx={styles.divider} />
          </Box>
          <LoginWithGoogle loading={loading} onClick={handleLoginWithGoogle} />
        </Box>
      </Paper>
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: (theme: Theme) => {
    return {
      [theme.breakpoints.up('sm')]: {
        width: 350
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      },
      padding: 2,
      margin: 2
    };
  },
  textInput: {
    marginTop: 2,
    width: '100%'
  },
  btn: {
    width: '100%',
    marginTop: 2,
    marginBottom: 1
  },
  dividerContainer: {
    width: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 2,
    paddingTop: 2
  },
  divider: {
    marginLeft: 1,
    marginRight: 1,
    display: 'flex',
    flex: 1
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    margin: 2,
    alignItems: 'center',
    flexGrow: 1
    // width: '100%'
  }
};

export default Login;
