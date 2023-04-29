import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';

import { MiniBrandType } from '../../__generated__/graphql';

interface Props {
  typeId?: number;
  handleTypesChange: (event: SelectChangeEvent<number>) => void;
  types: MiniBrandType[];
}

const TypesInput = (props: Props) => {
  const { typeId, handleTypesChange, types } = props;
  return (
    <FormControl fullWidth style={container}>
      <InputLabel id="types-select-input">Type</InputLabel>
      <Select
        labelId="types-select-input"
        id="types-select"
        value={typeId}
        label="Type"
        onChange={handleTypesChange}
      >
        {types.map((type) => (
          <MenuItem value={type.id}>{type.value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const container = {
  marginTop: 10,
  marginBottom: 10
};

export default TypesInput;
