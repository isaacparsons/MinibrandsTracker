import { TextField, Box, Typography, Button, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useForm, SubmitHandler } from 'react-hook-form';
import Api from 'api';
import { useSnackBarContext } from 'context/SnackBarContext';

const api = new Api();

interface FormValues {
  email: string;
}

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>();

  const { show } = useSnackBarContext();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await api.resetPassword(data.email);
      show({
        message: 'an email has been sent to reset your password',
        type: 'success'
      });
    } catch (error) {
      console.log(error);
      show({ message: 'unable to send email to this address', type: 'error' });
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
              variant="outlined"
              sx={styles.textInput}
              id="email"
              label="Email"
              {...register('email', { required: true })}
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

export default ForgotPassword;
