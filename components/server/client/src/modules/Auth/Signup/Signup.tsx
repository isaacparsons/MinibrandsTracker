import {
  TextField,
  Box,
  Typography,
  Paper,
  useTheme,
  Theme,
  IconButton
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm, SubmitHandler } from 'react-hook-form';
import Api from 'api';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from 'App';
import { useSessionContext } from 'context/SessionContext';
import { useState } from 'react';
import { AxiosError, isAxiosError } from 'axios';
import { useSnackBarContext } from 'context/SnackBarContext';

const api = new Api();

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const session = useSessionContext();
  const snackbar = useSnackBarContext();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { password, confirmPassword, email } = data;
    setLoading(true);
    if (password === confirmPassword) {
      try {
        await api.authLocalSignup(email, password);
        session.login();
        navigate('/home');
      } catch (e) {
        const error = e as AxiosError;
        console.log(error);
        const response = error?.response?.data as any;
        if (response?.error) {
          snackbar.show({
            message: response.error,
            type: 'error'
          });
        }
      }
    }
    setLoading(false);
  };

  const onBackClick = () => {
    navigate(LOGIN_PATH);
  };

  return (
    <Box sx={styles.container}>
      <Paper elevation={3} sx={styles.contentContainer(theme)}>
        <Box sx={styles.content}>
          <Box sx={styles.header}>
            <IconButton onClick={onBackClick} sx={{ mr: 10 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5">Signup</Typography>
          </Box>

          <TextField
            // error={errors.password}
            sx={styles.textInput}
            helperText={errors.email?.type === 'required'}
            id="email"
            label="Email"
            {...register('email', { required: true })}
          />

          <TextField
            // error={errors.password}
            sx={styles.textInput}
            helperText={errors.password?.type === 'required'}
            id="password"
            type="password"
            label="Password"
            {...register('password', { required: true })}
          />
          <TextField
            // error={errors.password}
            sx={styles.textInput}
            helperText={errors.password?.type === 'required'}
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            {...register('confirmPassword', { required: true })}
          />

          <LoadingButton
            loading={loading}
            sx={styles.btn}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Signup
          </LoadingButton>

          {/* {error ? <Typography color="red">{error.message} </Typography> : null} */}
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
  header: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    width: '100%'
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
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    margin: 2,
    alignItems: 'center',
    flexGrow: 1
  },
  textInput: {
    margin: 2,
    width: '100%'
  },
  btn: {
    width: '100%',
    marginTop: 2,
    marginBottom: 1
  }
};

export default Signup;
