import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRef } from 'react';

interface Props {
  value: string;
  onValueChange: (value: string) => void;
  clearSearch: () => void;
  onSearchPress?: (value: string) => void;
}

const Search = (props: Props) => {
  const { value, onValueChange, clearSearch, onSearchPress } = props;
  const searchInput = useRef<HTMLElement | null>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchInput.current) {
      handleSearch();
      searchInput.current.blur();
    }
  };

  const handleSearch = () => {
    if (onSearchPress) onSearchPress(value);
  };

  return (
    <Paper
      component="form"
      sx={{ p: 1, display: 'flex', alignItems: 'center', flexGrow: 1 }}
    >
      <InputBase
        value={value}
        inputRef={searchInput}
        onKeyDown={handleKeyPress}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onValueChange(event.target.value);
        }}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
      />
      {value.length > 0 ? (
        <IconButton onClick={clearSearch}>
          <CancelIcon />
        </IconButton>
      ) : null}
      <IconButton onClick={() => handleSearch()}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Search;
