import { Box, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { MiniBrand } from '../UploadDialog';

interface Props {
  miniBrands: MiniBrand[];
  setMiniBrands: React.Dispatch<React.SetStateAction<MiniBrand[]>>;
}

const FileList = (props: Props) => {
  const { miniBrands, setMiniBrands } = props;

  const handleRemoveFile = (file: File) => {
    setMiniBrands((prevMiniBrands) => {
      return prevMiniBrands.filter((item) => item.file.name !== file.name);
    });
  };
  return (
    <Box>
      <List>
        {miniBrands.map((miniBrand) => (
          <ListItem
            style={{
              backgroundColor: 'white'
            }}
          >
            <ListItemText primary={miniBrand.file.name} />
            <ListItemIcon
              sx={{ minWidth: 0 }}
              onClick={() => handleRemoveFile(miniBrand.file)}
            >
              <CancelIcon color="error" />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FileList;
