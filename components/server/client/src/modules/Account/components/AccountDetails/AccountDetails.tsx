import { TextField, Box, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { User } from '__generated__/graphql';
import useGetEmail from 'modules/Account/hooks/useGetEmail';

interface Props {
  me: User;
}

const AccountDetails = (props: Props) => {
  const { me } = props;
  const email = useGetEmail(me);
  return (
    <Box sx={styles.container}>
      <Typography variant="h5" marginBottom={1}>
        Account Details
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <TextField
            variant="outlined"
            sx={styles.textInput}
            id="email"
            label="Email"
            value={email}
            disabled={true}
          />
        </Grid>
        <Grid xs={12}>
          <Box sx={styles.roleContainer}>
            <Typography>Role: </Typography>
            <Typography>{me.role}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
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

export default AccountDetails;
