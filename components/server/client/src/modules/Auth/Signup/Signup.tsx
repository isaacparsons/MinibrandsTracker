import {
  TextField,
  Box,
  Button,
  Typography,
  Paper,
  useTheme,
  Theme
} from '@mui/material';

import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

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
  const theme = useTheme();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { password, confirmPassword, email } = data;
    if (password === confirmPassword) {
      try {
        await axios.post('http://localhost:4000/auth/signup', {
          email,
          password
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box sx={styles.container}>
      <Paper elevation={3} sx={styles.contentContainer(theme)}>
        <Box sx={styles.content}>
          <Typography variant="h5">Signup</Typography>
          <TextField
            // error={errors.password}
            style={styles.textInput}
            helperText={errors.email?.type === 'required'}
            id="email"
            label="Email"
            {...register('email', { required: true })}
          />

          <TextField
            // error={errors.password}
            style={styles.textInput}
            helperText={errors.password?.type === 'required'}
            id="password"
            type="password"
            label="Password"
            {...register('password', { required: true })}
          />
          <TextField
            // error={errors.password}
            style={styles.textInput}
            helperText={errors.password?.type === 'required'}
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            {...register('confirmPassword', { required: true })}
          />

          <Button
            sx={styles.btn}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Signup
          </Button>

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
    margin: 10,
    width: '100%'
  },
  btn: {
    width: '100%',
    marginTop: 2,
    marginBottom: 1
  }
};

export default Signup;
