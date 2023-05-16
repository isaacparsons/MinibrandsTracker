import { Box, Typography } from '@mui/material';
import { Achievements, MiniBrand } from '__generated__/graphql';
import AchievementCategory from './AchievementCategory';

interface Props {
  minibrands: MiniBrand[];
  achievements: Achievements;
}

const AchievementsPreview = (props: Props) => {
  const { minibrands, achievements } = props;

  return (
    <Box sx={styles.container}>
      <Typography variant="h5" marginBottom={1}>
        Achievements
      </Typography>
      <Box sx={styles.achievementsContainer}>
        <Box sx={styles.collectedContainer}>
          <Typography sx={{ mr: 1 }}>Total collected:</Typography>
          <Typography>{`${achievements?.totalCollected}/${minibrands.length}`}</Typography>
        </Box>
        <AchievementCategory
          name="By Type"
          achievementCategories={achievements?.type}
        />
        <AchievementCategory
          name="By Tag"
          achievementCategories={achievements?.tag}
        />
      </Box>
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
