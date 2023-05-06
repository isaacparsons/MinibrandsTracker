import { Chip, Stack } from '@mui/material';
import { MiniBrandTag } from '__generated__/graphql';

interface TagBackground {
  backgroundColor?: string;
  backgroundImage?: string;
}

const tagMap: Record<string, TagBackground> = {
  'mini mart exclusive': { backgroundColor: '#3DB330' },
  'mini convenience store exclusive': { backgroundColor: '#A586B7' },
  'mini food court exclusive': { backgroundColor: '#e70182' },
  'advent calendar exclusive': { backgroundColor: '#009fc6' },
  'collectors case exclusive': { backgroundColor: '#f10088' },
  rare: { backgroundColor: '#f0cd4b' },
  'super rare': {
    backgroundImage: 'url(' + require('../../assets/superRare.png') + ')'
  },
  'ultra rare': {
    backgroundImage: 'url(' + require('../../assets/ultraRare.png') + ')'
  },
  common: {
    backgroundColor: '#14b5d0'
  },
  metallic: {
    backgroundImage: 'url(' + require('../../assets/metallic.png') + ')'
  },
  'glow in the dark': {
    backgroundColor: '#9e91c1'
  },
  gold: {
    backgroundImage: 'url(' + require('../../assets/gold.png') + ')'
  }
};

interface Props {
  tags: MiniBrandTag[];
  maxHeight?: number;
}

const Tags = (props: Props) => {
  const { tags, maxHeight } = props;
  return (
    <Stack direction="row" sx={styles.container} maxHeight={maxHeight}>
      {tags.map((tag) => (
        <Chip
          sx={{
            backgroundColor: 'primary.main',
            boxShadow: 5,
            ...tagMap[tag.value],
            margin: 0.3,
            color: 'white',
            backgroundSize: 'cover'
          }}
          label={tag.value}
          key={tag.value}
        />
      ))}
    </Stack>
  );
};

const styles = {
  container: {
    padding: 1,
    flexWrap: 'wrap',
    overflow: 'auto'
  }
};
export default Tags;
