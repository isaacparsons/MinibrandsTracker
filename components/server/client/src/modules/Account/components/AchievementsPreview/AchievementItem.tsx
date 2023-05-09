import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { AchievementCategory } from '__generated__/graphql';
import AchievementProgessBar from './AchievementProgessBar';

const iconMap: Record<string, string> = {
  foodie: require('../../../../assets/foodie-series-1-icon.png'),
  original: require('../../../../assets/original-series-4-icon.png'),
  gold: require('../../../../assets/gold-icon.png'),
  common: require('../../../../assets/common-icon.png'),
  'frozen moment': require('../../../../assets/frozen-moments-icon.png'),
  'glow in the dark': require('../../../../assets/glow-in-the-dark-icon.png'),
  metallic: require('../../../../assets/metallic-icon.png')
};

interface Props {
  achievementCategory: AchievementCategory;
}

const AchievementItem = (props: Props) => {
  const { achievementCategory } = props;
  return (
    <Box sx={{ flexGrow: 1, mr: 2 }}>
      <Grid container spacing={2} sx={styles.container}>
        <Grid xs={4} sm={2}>
          {iconMap[achievementCategory.type.value] ? (
            <Box
              component="img"
              sx={styles.img}
              src={iconMap[achievementCategory.type.value]}
            />
          ) : (
            <Typography sx={styles.titleText}>
              {achievementCategory.type.value}
            </Typography>
          )}
        </Grid>
        <Grid xs={6} sm={8}>
          <AchievementProgessBar
            percentage={Math.floor(
              (achievementCategory.collectedCount /
                achievementCategory.totalCount) *
                100
            )}
          />
        </Grid>
        <Grid xs={2}>
          <Typography sx={styles.collectedText}>
            {`${achievementCategory.collectedCount}/${achievementCategory.totalCount}`}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
const styles = {
  titleText: {
    color: 'white'
  },
  container: {
    alignItems: 'center'
  },
  collectedText: {
    color: 'white'
  },
  img: {
    objectFit: 'contain',
    maxHeight: 70,
    maxWidth: 100,
    width: '100%'
  }
};

export default AchievementItem;
