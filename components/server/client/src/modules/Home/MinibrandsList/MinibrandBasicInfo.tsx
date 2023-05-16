import { Box, Typography } from '@mui/material';
import { MiniBrand } from '__generated__/graphql';
import Tags from 'common/components/Tags';

interface Props {
  minibrand: MiniBrand;
}

const MinibrandBasicInfo = (props: Props) => {
  const { minibrand } = props;

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title} variant="h5" color={'white'}>
        {minibrand.name}
      </Typography>
      <Typography
        variant="body1"
        color={'white'}
      >{`${minibrand.type?.value}, series ${minibrand.series?.value}`}</Typography>
      <Tags tags={minibrand.tags ?? []} maxHeight={65} />
    </Box>
  );
};

const styles = {
  title: {
    paddingBottom: 0.5
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 1,
    backgroundColor: 'primary.main'
    // height: '100%'
  }
};

export default MinibrandBasicInfo;
