import 'react-dropzone-uploader/dist/styles.css';
import Dropzone, { IFileWithMeta } from 'react-dropzone-uploader';
import { useDropzone } from 'react-dropzone';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';
import { Box } from '@mui/material';

interface Props {
  // handleSubmit: (files: IFileWithMeta[]) => void;
}

// interface FileUploadDetails {
//   file: IFileWithMeta;
//   name: String;
// }
const DragAndDropUploader = (props: Props) => {
  // const { handleSubmit } = props;
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file: File) => (
    <li key={file.name}>{file.name}</li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
    // <Dropzone
    //   PreviewComponent={(props) => <Preview {...props} />}
    //   SubmitButtonComponent={() => <div></div>}
    //   onSubmit={handleSubmit}
    //   accept="image/*,audio/*,video/*"
    // />
  );
  return null;
};

const Preview = ({ files }: { files: any[] }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Box>
      {files.map((file, index) => (
        <div key={file.file.name}>
          {Math.abs(activeStep - index) <= 2 ? (
            <Box
              component="img"
              sx={{
                height: 255,
                display: 'block',
                maxWidth: 400,
                overflow: 'hidden',
                width: '100%'
              }}
              src={file.meta.previewUrl}
              alt={file.file.name}
            />
          ) : null}
        </div>
      ))}
      <MobileStepper
        variant="dots"
        steps={files.length}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: 400, flexGrow: 1 }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === files.length - 1}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </Box>
    // <div>
    //   {files.map((file) => {
    //     console.log(file.meta);
    //     return (
    //       <img
    //         // className={imageClassName}
    //         style={{ height: 50, width: 50 }}
    //         src={file.meta.previewUrl}
    //         alt={'title'}
    //         // title={title}
    //       />
    //     );
    //   })}
    // </div>
  );
};
export default DragAndDropUploader;
