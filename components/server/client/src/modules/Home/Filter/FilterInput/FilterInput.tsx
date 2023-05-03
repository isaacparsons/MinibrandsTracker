import { useTheme, Collapse, Box, Stack, Theme } from '@mui/material';
import { ReactElement } from 'react';
import SelectAll from './SelectAll';

interface Props {
  open: boolean;
  selectAll: () => void;
  unSelectAll: () => void;
  allSelected: boolean;
  children: ReactElement[] | ReactElement;
}

const FilterInput = (props: Props) => {
  const { children, open, selectAll, unSelectAll, allSelected } = props;
  const theme = useTheme();

  return (
    <Collapse orientation="vertical" in={open}>
      <Box sx={styles.container(theme)}>
        <SelectAll
          selectAll={selectAll}
          unSelectAll={unSelectAll}
          allSelected={allSelected}
        />
        <Stack direction="row" flexWrap="wrap">
          {children}
        </Stack>
      </Box>
    </Collapse>
  );
};

const styles = {
  container: (theme: Theme) => {
    return {
      backgroundColor: theme.palette.primary.main,
      flex: 1,
      padding: 2,
      maxHeight: 350,
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column'
    };
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

export default FilterInput;
