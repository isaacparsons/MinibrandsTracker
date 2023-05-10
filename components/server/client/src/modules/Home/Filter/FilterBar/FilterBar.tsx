import { Box, IconButton, useTheme, Theme } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

import Search from './Search';

interface Props {
  searchText: string;
  updateSearchText: (text: string) => void;
  toggleFilter: () => void;
  clearSearch: () => void;
}

const FilterBar = (props: Props) => {
  const { searchText, updateSearchText, toggleFilter, clearSearch } = props;
  const theme = useTheme();

  return (
    <Box sx={styles.topBar}>
      <Search
        value={searchText}
        onValueChange={updateSearchText}
        clearSearch={clearSearch}
      />
      <IconButton onClick={toggleFilter}>
        <TuneIcon fontSize="large" sx={styles.icon(theme)} />
      </IconButton>
    </Box>
  );
};

export default FilterBar;

const styles = {
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: (theme: Theme) => {
    return {
      paddingLeft: 2,
      color: theme.palette.grey[700]
    };
  }
};
