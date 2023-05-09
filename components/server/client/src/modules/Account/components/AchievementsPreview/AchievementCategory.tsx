import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AchievementCategory as IAchievementCategory } from '__generated__/graphql';
import AchievementItem from './AchievementItem';

interface Props {
  name: string;
  achievementCategories: IAchievementCategory[];
}

const AchievementCategory = (props: Props) => {
  const { name, achievementCategories } = props;
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box sx={styles.container}>
      <Typography sx={{ mb: 1 }} variant="h6">
        {name}
      </Typography>
      {achievementCategories.map((achievementCategory) => {
        return (
          <Accordion
            sx={{ backgroundColor: 'neutral.main' }}
            expanded={expanded === achievementCategory.type.value}
            onChange={handleChange(achievementCategory.type.value)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id={achievementCategory.type.value}
            >
              <AchievementItem achievementCategory={achievementCategory} />
            </AccordionSummary>
            <AccordionDetails>
              {achievementCategory.subCategories?.map((subCategory) => {
                return <AchievementItem achievementCategory={subCategory} />;
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

const styles = {
  container: {
    marginTop: 2
  }
};

export default AchievementCategory;
