import { Box, IconButton, useTheme, Theme } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

import Search from '../../../../../common/components/Search';
import { useState } from 'react';

interface Props {
  toggleFilter: () => void;
  onSearchPress: (value: string) => void;
}

const FilterBar = (props: Props) => {
  const { toggleFilter, onSearchPress } = props;
  const theme = useTheme();

  const [searchText, setSearchText] = useState('');

  const updateSearchText = (value: string) => {
    setSearchText(value);
  };

  const clearSearch = () => {
    updateSearchText('');
  };

  return (
    <Box sx={styles.topBar}>
      <Search
        value={searchText}
        onValueChange={updateSearchText}
        clearSearch={clearSearch}
        onSearchPress={onSearchPress}
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
