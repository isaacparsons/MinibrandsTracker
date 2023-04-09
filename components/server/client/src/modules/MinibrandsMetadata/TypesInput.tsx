import { TextField, Box, List, ListItem, ListItemText } from '@mui/material';
import { MiniBrandType } from '__generated__/graphql';

interface Props {
  types: Partial<MiniBrandType>[];
}

function TypesInput(props: Props) {
  const { types } = props;
  return (
    <Box flex={1}>
      <TextField id="outlined-basic" label="Add a type" variant="outlined" />
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

export default TypesInput;
