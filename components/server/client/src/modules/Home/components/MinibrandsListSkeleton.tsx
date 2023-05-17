import { Box, Paper, Skeleton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

interface Props {}

const MinibrandsListSkeleton = (props: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={5}>
        {Array(6)
          .fill(0)
          .map((_, ind) => {
            return (
              <Grid key={`${ind}-skeleton`} xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ padding: 3 }}>
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    sx={{}}
                    height={200}
                  />
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    sx={{ marginTop: 1 }}
                    height={20}
                  />
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    sx={{ marginTop: 1 }}
                    height={20}
                  />
                  <Box display="flex" flexDirection="row" flexWrap="wrap">
                    {Array(Math.ceil(Math.random() * 8))
                      .fill(0)
                      .map((_) => {
                        return <TagSkeleton />;
                      })}
                  </Box>
                </Paper>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

const TagSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{ marginTop: 1, borderRadius: 5, marginRight: 1 }}
      height={30}
      width={80}
    />
  );
};

export default MinibrandsListSkeleton;
