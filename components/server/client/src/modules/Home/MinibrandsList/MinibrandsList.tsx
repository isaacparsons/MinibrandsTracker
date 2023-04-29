import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { MiniBrand } from '__generated__/graphql';
import MinibrandCard from './MinibrandCard/MinibrandCard';

interface Props {
  minibrands: MiniBrand[];
}

const MinibrandsList = (props: Props) => {
  const { minibrands } = props;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={5}>
        {minibrands.map((minibrand) => {
          return (
            <Grid marginBottom={2} xs={12} sm={6} md={4}>
              <MinibrandCard minibrand={minibrand} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MinibrandsList;
