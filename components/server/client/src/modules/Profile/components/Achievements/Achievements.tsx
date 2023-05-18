import { Box, CircularProgress } from '@mui/material';
import AchievementsPreview from 'modules/Account/components/AchievementsPreview/AchievementsPreview';
import useMiniBrands from 'modules/Home/hooks/useMiniBrands';
import useUserAchievements from 'modules/Profile/hooks/useUserAchievements';

interface Props {
  userId: number;
}

function Achievements(props: Props) {
  const { userId } = props;
  const { data: achievements, loading: loadingAchievements } =
    useUserAchievements({ userId });
  const { data: minibrands, loading: loadingMinibrands } = useMiniBrands();
  return (
    <Box sx={styles.container}>
      {!minibrands ||
      !achievements ||
      loadingMinibrands ||
      loadingAchievements ? (
        <CircularProgress />
      ) : (
        <AchievementsPreview
          minibrands={minibrands}
          achievements={achievements}
        />
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
