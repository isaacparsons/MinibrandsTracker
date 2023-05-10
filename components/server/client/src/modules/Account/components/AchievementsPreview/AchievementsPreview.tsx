import { Box, CircularProgress, Typography } from '@mui/material';
import { CollectedMinibrand, MiniBrand } from '__generated__/graphql';
import useAchievements from 'common/hooks/useAchievements';
import AchievementCategory from './AchievementCategory';

interface Props {
  minibrands: MiniBrand[];
  collected: CollectedMinibrand[];
}

const AchievementsPreview = (props: Props) => {
  const { minibrands, collected } = props;

  const { data, loading } = useAchievements();
  return (
    <Box sx={styles.container}>
      {!loading && data?.type ? (
        <>
          <Typography variant="h5" marginBottom={1}>
            Achievements
          </Typography>
          <Box sx={styles.achievementsContainer}>
            <Box sx={styles.collectedContainer}>
              <Typography sx={{ mr: 1 }}>Total collected:</Typography>
              <Typography>{`${data?.totalCollected}/${minibrands.length}`}</Typography>
            </Box>
            <AchievementCategory
              name="By Type"
              achievementCategories={data?.type}
            />
            <AchievementCategory
              name="By Tag"
              achievementCategories={data?.tag}
            />
          </Box>
        </>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

const styles = {
  achievementsContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 3
  },
  collectedContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
};

export default AchievementsPreview;
