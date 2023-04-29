import { Box, Chip, Stack, Paper } from '@mui/material';
import { MiniBrandTag } from '__generated__/graphql';

interface TagBackground {
  color?: string;
  img?: string;
}

const tagMap: Record<string, TagBackground> = {
  'mini mart exclusive': { color: '#3DB330' },
  'mini convenience store exclusive': { color: '#A586B7' },
  'mini food court exclusive': { color: '#e70182' },
  'advent calendar exclusive': { color: '#009fc6' },
  'collectors case exclusive': { color: '#f10088' },
  rare: { color: '#f0cd4b' },
  'super rare': {
    img: 'url(' + require('../../assets/superRare.png') + ')'
  },
  'ultra rare': {
    img: 'url(' + require('../../assets/ultraRare.png') + ')'
  },
  common: {
    color: '#14b5d0'
  },
  metallic: {
    img: 'url(' + require('../../assets/metallic.png') + ')'
  },
  'glow in the dark': {
    color: '#9e91c1'
  }
};

interface Props {
  tags: MiniBrandTag[];
}

const Tags = (props: Props) => {
  const { tags } = props;

  //overflow: 'auto'
  return (
    <Stack direction="row" sx={{ padding: 1, flexWrap: 'wrap' }}>
      {tags.map((tag) => (
        <Chip
          sx={{
            margin: 0.3,
            backgroundColor: tagMap[tag.value]?.color,
            color: tagMap[tag.value] ? 'white' : 'black',
            backgroundImage: tagMap[tag.value]?.img,
            backgroundSize: 'cover'
          }}
          label={tag.value}
          //   src={i}
        />
      ))}
    </Stack>
  );
};
export default Tags;
