import { Box, Typography } from '@mui/material';

interface Props {
  title?: string;
}

function NoResultsCard(props: Props) {
  const { title } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center'
        // alignItems: 'center'
      }}
    >
      <Typography variant="h5">{title ?? 'No results'}</Typography>
    </Box>
  );
}

export default NoResultsCard;
