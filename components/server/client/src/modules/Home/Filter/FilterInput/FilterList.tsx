import { FilterMap } from '../../hooks/useFilterMap';
import {
  Box,
  List,
  ListItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography
} from '@mui/material';
import SelectAll from './SelectAll';

interface Props {
  type: string;
  filterMap: FilterMap;
  updateFilterMap: (property: string, value: boolean) => void;
  selectAll: () => void;
  unSelectAll: () => void;
  allSelected: boolean;
}

const FilterList = (props: Props) => {
  const {
    filterMap,
    updateFilterMap,
    type,
    selectAll,
    unSelectAll,
    allSelected
  } = props;

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    property: string
  ) => {
    updateFilterMap(property, event.target.checked);
  };

  return (
    <Box sx={styles.container}>
      <Typography>{type}</Typography>
      <List>
        <ListItem>
          <SelectAll
            selectAll={selectAll}
            unSelectAll={unSelectAll}
            allSelected={allSelected}
          />
        </ListItem>
        <ListItem>
          <FormGroup>
            {Object.keys(filterMap).map((property) => {
              return (
                <FormControlLabel
                  key={`checkbox-${property}`}
                  sx={styles.checkboxLabel}
                  control={
                    <Checkbox
                      checked={filterMap[property]}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleCheckboxChange(event, property)
                      }
                      sx={styles.checkbox}
                    />
                  }
                  label={property}
                />
              );
            })}
          </FormGroup>
        </ListItem>
      </List>
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    marginRight: 1,
    paddingRight: 1,
    minWidth: 150
  },
  checkboxLabel: {
    color: 'white'
  },
  checkbox: {
    color: 'white',
    '&.Mui-checked': {
      color: 'white'
    }
  }
};

export default FilterList;
