import { Box, CircularProgress } from '@mui/material';
import AchievementsPreview from 'modules/Account/components/AchievementsPreview/AchievementsPreview';
import useUserAchievements from 'graphql/hooks/queries/useUserAchievements';

interface Props {
  userId: number;
}

function Achievements(props: Props) {
  const { userId } = props;
  const { data: achievements, loading: loadingAchievements } =
    useUserAchievements({ userId });
  return (
    <Box sx={styles.container}>
      {!achievements || loadingAchievements ? (
        <CircularProgress />
      ) : (
        <AchievementsPreview achievements={achievements} />
      )}
    </Box>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 4
  }
};

export default Achievements;
