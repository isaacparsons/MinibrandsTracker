import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';
import { Box, Paper, Typography } from '@mui/material';
import { MiniBrand } from '../UploadDialog';
import FileList from './FileList';

interface Props {
  miniBrands: MiniBrand[];
  setMiniBrands: React.Dispatch<React.SetStateAction<MiniBrand[]>>;
  rootProps: DropzoneRootProps;
  inputProps: DropzoneInputProps;
}

const FileInput = (props: Props) => {
  const { miniBrands, setMiniBrands, rootProps, inputProps } = props;
  return (
    <Box>
      <Paper {...rootProps}>
        <input {...inputProps} />
        <Typography>
          Drag 'n' drop some files here, or click to select files
        </Typography>
      </Paper>
      <FileList miniBrands={miniBrands} setMiniBrands={setMiniBrands} />
    </Box>
  );
};

export default FileInput;
