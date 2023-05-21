import { TextField } from '@mui/material';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function MinibrandNameInput(props: Props) {
  const { value, onChange } = props;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <TextField
      sx={styles.container}
      id={`name`}
      label="Name"
      variant="standard"
      value={value}
      onChange={handleOnChange}
    />
  );
}

const styles = {
  container: {
    marginTop: 1,
    marginBottom: 1
  }
};

export default MinibrandNameInput;
