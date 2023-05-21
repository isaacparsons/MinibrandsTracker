import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  useTheme
} from '@mui/material';
import { MiniBrandTag } from '__generated__/graphql';
import { useMemo } from 'react';

interface Props {
  tags: MiniBrandTag[];
  tagIds: number[];
  onTagChange: (tagIds: number[]) => void;
}

const TagsInput = (props: Props) => {
  const { tags, onTagChange, tagIds } = props;

  const theme = useTheme();

  const tagsMap = useMemo(() => {
    const map = new Map();
    tags.forEach((tag) => {
      map.set(tag.id, tag.value);
    });
    return map;
  }, [tags]);

  const handleTagChange = (event: SelectChangeEvent<number[]>) => {
    if (typeof event.target.value !== 'string') {
      onTagChange(event.target.value);
    }
  };

  return (
    <FormControl sx={{ m: 1 }}>
      <InputLabel id="tags-chip-label">Tags</InputLabel>
      <Select
        labelId="tags-chip-label"
        id="multiple-tags"
        multiple
        value={tagIds}
        onChange={handleTagChange}
        input={<OutlinedInput id="select-multiple-tags" label="Tags" />}
        renderValue={(selected) => {
          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => {
                const tag = tagsMap.get(value);
                return <Chip key={tag} label={tag} />;
              })}
            </Box>
          );
        }}
        // MenuProps={MenuProps}
      >
        {tags.map((tag) => (
          <MenuItem
            key={tag.value}
            value={tag.id}
            style={{
              fontWeight: tags.find((item) => item.value === tag.value)
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium
            }}
          >
            {tag.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TagsInput;
