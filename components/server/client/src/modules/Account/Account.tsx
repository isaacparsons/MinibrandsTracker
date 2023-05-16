import { Box, CircularProgress, Container } from '@mui/material';
import useMe from 'common/hooks/useMe';
import AchievementsPreview from './components/AchievementsPreview/AchievementsPreview';
import AccountDetails from './components/AccountDetails/AccountDetails';
import useMiniBrands from 'modules/Home/hooks/useMiniBrands';
import useAchievements from 'common/hooks/useAchievements';

const Account = () => {
  const { data, loading } = useMe();
  const { data: me, loading: loadingMe } = useMe();
  const { data: minibrands, loading: loadingMinibrands } = useMiniBrands();
  const { data: achievements, loading: loadingAchievements } =
    useAchievements();
  return (
    <Container maxWidth="md" style={styles.container}>
      <Box sx={styles.contentContainer}>
        {loading ||
        loadingMe ||
        loadingMinibrands ||
        loadingAchievements ||
        !achievements ||
        !minibrands ||
        !me?.collected ? (
          <CircularProgress />
        ) : (
          <Box sx={styles.contentContainer}>
            <AccountDetails me={me} />
            <AchievementsPreview
              minibrands={minibrands}
              achievements={achievements}
            />
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
