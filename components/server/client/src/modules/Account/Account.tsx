import { Box, CircularProgress, Container } from '@mui/material';
import useMe from 'graphql/hooks/queries/useMe';
import AchievementsPreview from './components/AchievementsPreview/AchievementsPreview';
import AccountDetails from './components/AccountDetails/AccountDetails';
import useAchievements from 'graphql/hooks/queries/useAchievements';

const Account = () => {
  const { data, loading } = useMe();
  const { data: me, loading: loadingMe } = useMe();
  const { data: achievements, loading: loadingAchievements } =
    useAchievements();
  return (
    <Container maxWidth="md" style={styles.container}>
      <Box sx={styles.contentContainer}>
        {loading ||
        loadingMe ||
        loadingAchievements ||
        !achievements ||
        !me?.collected ? (
          <CircularProgress />
        ) : (
          <Box sx={styles.contentContainer}>
            <AccountDetails me={me} />
            <AchievementsPreview achievements={achievements} />
          </Box>
        )}
      </Box>
    </Container>
  );
};

const styles = {
  container: {
    paddingTop: 10,
    display: 'flex',
    flex: 1
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 1
  }
};

export default Account;
