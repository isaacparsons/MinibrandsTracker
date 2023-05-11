import { TextField, Box, Typography, Button, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useForm, SubmitHandler } from 'react-hook-form';
import Api from 'api';
import { useSnackBarContext } from 'context/SnackBarContext';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from 'App';

const api = new Api();

interface FormValues {
  password: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const { show } = useSnackBarContext();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');
    if (!token) {
      show({ type: 'error', message: 'Invalid link' });
      return;
    }
    if (data.password !== data.confirmPassword) {
      show({ type: 'error', message: 'Passwords do not match' });
      return;
    }
    try {
      await api.changePassword(token, data.password);
      show({ type: 'success', message: 'Password updated' });
      navigate(LOGIN_PATH);
    } catch (error) {
      show({ type: 'error', message: 'Unable to change password' });
      console.log(error);
    }
  };
  return (
    <Container maxWidth="xs">
      <Box sx={styles.container}>
        <Typography variant="h6" marginBottom={1}>
          Enter email
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <TextField
              type="password"
              variant="outlined"
              sx={styles.textInput}
              id="password"
              label="Password"
              {...register('password', { required: true })}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              type="password"
              variant="outlined"
              sx={styles.textInput}
              id="confirmPassword"
              label="Confirm Password"
              {...register('confirmPassword', { required: true })}
            />
          </Grid>
          <Grid xs={12}>
            <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

const styles = {
  container: {
    marginTop: 2
  },
  textInput: {
    width: '100%'
  },
  roleContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
};

export default ChangePassword;
