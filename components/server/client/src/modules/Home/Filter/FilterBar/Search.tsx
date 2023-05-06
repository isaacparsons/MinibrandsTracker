import { InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  value: string;
  onValueChange: (value: string) => void;
}

const Search = (props: Props) => {
  const { value, onValueChange } = props;
  return (
    <Paper
      component="form"
      sx={{ p: 1, display: 'flex', alignItems: 'center', flexGrow: 1 }}
    >
      <InputBase
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onValueChange(event.target.value);
        }}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search mini brands' }}
      />
      <SearchIcon />
    </Paper>
  );
};

export default Search;
