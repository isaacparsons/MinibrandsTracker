import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Chip,
  OutlinedInput,
  Button,
  MobileStepper
} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material';
import { useState, useMemo } from 'react';

import { MiniBrandTag } from '../../../__generated__/graphql';
import { MiniBrand } from '../UploadDialog';

interface Props {
  miniBrands: MiniBrand[];
  tags: MiniBrandTag[];
  setMiniBrands: React.Dispatch<React.SetStateAction<MiniBrand[]>>;
  handleSubmit: () => void;
}

const Previews = (props: Props) => {
  const theme = useTheme();
  const { miniBrands, tags, setMiniBrands, handleSubmit } = props;

  const tagsMap = useMemo(() => {
    const map = new Map();
    tags.forEach((tag) => {
      map.set(tag.id, tag.value);
    });
    return map;
  }, [tags]);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNameChange = (event: any) => {
    setMiniBrands((oldMiniBrands: MiniBrand[]) => {
      const newMiniBrands = [...oldMiniBrands];
      newMiniBrands[activeStep].name = event.target.value;
      return newMiniBrands;
    });
  };

  const handleTagChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value }
    } = event;
    if (typeof value !== 'string') {
      setMiniBrands((oldMiniBrands: MiniBrand[]) => {
        const newMiniBrands = [...oldMiniBrands];
        newMiniBrands[activeStep].tagIds = value;
        return newMiniBrands;
      });
    }
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
              <TextField
                style={nameContainer}
                id={`name`}
                label="Name"
                variant="standard"
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
              <FormControl sx={{ m: 1 }}>
                <InputLabel id="tags-chip-label">Tags</InputLabel>
                <Select
                  labelId="tags-chip-label"
                  id="multiple-tags"
                  multiple
                  value={miniBrands[activeStep].tagIds}
                  onChange={handleTagChange}
                  input={
                    <OutlinedInput id="select-multiple-tags" label="Tags" />
                  }
                  renderValue={(selected) => {
                    return (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => {
                          const tag = tagsMap.get(value);
                          return <Chip key={tag} label={tag} />;
                        })}
                      </Box>
                    );
                  }}
                  // MenuProps={MenuProps}
                >
                  {tags.map((tag) => (
                    <MenuItem
                      key={tag.value}
                      value={tag.id}
                      style={{
                        fontWeight: tags.find(
                          (item) => item.value === tag.value
                        )
                          ? theme.typography.fontWeightRegular
                          : theme.typography.fontWeightMedium
                      }}
                    >
                      {tag.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

const nameContainer = {
  marginTop: 10,
  marginBottom: 10
};

export default Previews;
