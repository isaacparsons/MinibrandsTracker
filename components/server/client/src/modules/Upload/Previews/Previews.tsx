import { Box, Button, MobileStepper } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';

import { MiniBrandTag } from '../../../__generated__/graphql';
import { MiniBrand } from '../UploadDialog';
import MinibrandNameInput from 'common/components/MinibrandNameInput';
import TagsInput from './TagsInput';

interface Props {
  miniBrands: MiniBrand[];
  tags: MiniBrandTag[];
  setMiniBrands: React.Dispatch<React.SetStateAction<MiniBrand[]>>;
  handleSubmit: () => void;
}

const Previews = (props: Props) => {
  const { miniBrands, tags, setMiniBrands, handleSubmit } = props;

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNameChange = (name: string) => {
    setMiniBrands((oldMiniBrands: MiniBrand[]) => {
      const newMiniBrands = [...oldMiniBrands];
      newMiniBrands[activeStep].name = name;
      return newMiniBrands;
    });
  };

  const handleTagChange = (tagIds: number[]) => {
    setMiniBrands((oldMiniBrands: MiniBrand[]) => {
      const newMiniBrands = [...oldMiniBrands];
      newMiniBrands[activeStep].tagIds = tagIds;
      return newMiniBrands;
    });
  };

  return (
    <Box>
      {miniBrands.length > 0 && (
        <Box
          key={activeStep}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {activeStep === miniBrands.length ? (
            <Button onClick={handleSubmit}>Submit</Button>
          ) : (
            <>
              <MinibrandNameInput
                value={miniBrands[activeStep].name}
                onChange={handleNameChange}
              />
              <Box
                component="img"
                sx={{
                  height: 300,
                  objectFit: 'contain',
                  width: '100%'
                }}
                src={miniBrands[activeStep].preview}
                alt={miniBrands[activeStep].name}
              />
              <TagsInput
                tags={tags}
                tagIds={miniBrands[activeStep].tagIds}
                onTagChange={handleTagChange}
              />
            </>
          )}
        </Box>
      )}

      {miniBrands.length > 0 && (
        <MobileStepper
          variant="dots"
          steps={miniBrands.length + 1}
          position="static"
          activeStep={activeStep}
          sx={{ flexGrow: 1 }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === miniBrands.length}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      )}
    </Box>
  );
};

export default Previews;
