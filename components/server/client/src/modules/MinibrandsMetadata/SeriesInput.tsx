import { TextField, Box, List, ListItem, ListItemText } from '@mui/material';
import { MiniBrandSeries } from '../../__generated__/graphql';

interface Props {
  types: Partial<MiniBrandSeries>[];
}

function SeriesInput(props: Props) {
  const { types } = props;
  return (
    <Box flex={1}>
      <TextField id="outlined-basic" label="Add a series" variant="outlined" />
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

export default SeriesInput;
