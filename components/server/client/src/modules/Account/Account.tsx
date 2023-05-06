import {
  TextField,
  Box,
  Typography,
  Paper,
  useTheme,
  Theme,
  Divider,
  CircularProgress,
  Container
} from '@mui/material';
import useMe from 'common/hooks/useMe';
import useGetEmail from './hooks/useGetEmail';

const Account = () => {
  const theme = useTheme();
  const { data, loading } = useMe();
  const email = useGetEmail(data);
  console.log(data);
  return (
    <Container maxWidth="xl">
      <Box sx={styles.container}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box sx={styles.content}>
            <TextField
              variant="outlined"
              sx={styles.textInput}
              id="email"
              label="Email"
              value={email}
              disabled={true}
            />

            <Box sx={styles.roleContainer}>
              <Typography>Role: </Typography>
              <Typography>{data?.role}</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    width: '100%'
  },
  textInput: {
    marginTop: 2,
    width: '100%'
  },
  roleContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: 1,

    justifyContent: 'space-between',
    alignItems: 'center'
  },
  content: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginTop: 2
  }
};

export default Account;
