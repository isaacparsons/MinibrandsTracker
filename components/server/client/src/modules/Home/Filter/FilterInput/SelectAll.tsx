import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';

interface Props {
  selectAll: () => void;
  unSelectAll: () => void;
  allSelected: boolean;
}

const SelectAll = (props: Props) => {
  const { selectAll, unSelectAll, allSelected } = props;

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      selectAll();
    } else {
      unSelectAll();
    }
  };

  return (
    <FormGroup>
      <FormControlLabel
        sx={styles.checkboxLabel}
        control={
          <Checkbox
            checked={allSelected}
            onChange={handleSelectAllChange}
            sx={styles.checkbox}
          />
        }
        label={'Select all'}
      />
    </FormGroup>
  );
};

const styles = {
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

export default SelectAll;
