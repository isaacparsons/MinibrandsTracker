import { TextField, Box, List, ListItem, ListItemText } from '@mui/material';
import { MiniBrandTag } from '../../__generated__/graphql';

interface Props {
  types: Partial<MiniBrandTag>[];
}

function TagsInput(props: Props) {
  const { types } = props;
  return (
    <Box flex={1}>
      <TextField id="outlined-basic" label="Add a tag" variant="outlined" />
      <List>
        {types.map((type) => (
          <ListItem>
            <ListItemText primary={type.value} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default TagsInput;
