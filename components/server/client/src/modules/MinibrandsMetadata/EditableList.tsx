import {
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
  Typography
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';

export interface Item {
  value: string;
}

interface Props {
  data: Item[];
  editing: boolean;
  title: string;
  onAddItem: (item: Item) => void;
  onRemoveItem: (item: Item) => void;
}

const EditableList = (props: Props) => {
  const { data, title, editing, onAddItem, onRemoveItem } = props;
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.length > 0) onAddItem({ value: newItem.toLowerCase() });
    setNewItem('');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
      padding={2}
    >
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <List>
        {data.map((item) => (
          <ListItem
            style={{
              backgroundColor: 'white'
            }}
          >
            <ListItemText primary={item.value} />
            {editing && (
              <ListItemIcon
                sx={{ minWidth: 0 }}
                onClick={() => onRemoveItem(item)}
              >
                <CancelIcon color="error" />
              </ListItemIcon>
            )}
          </ListItem>
        ))}
      </List>
      {editing && (
        <Box
          sx={{
            display: 'flex',
            paddingLeft: 1,
            paddingRight: 1
          }}
        >
          <TextField
            style={{ flexGrow: 1 }}
            label={`Add a ${title.toLowerCase()}`}
            variant="standard"
            value={newItem}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNewItem(event.target.value);
            }}
          />
          <IconButton color="primary" onClick={handleAddItem}>
            <AddCircleIcon fontSize="medium" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default EditableList;
