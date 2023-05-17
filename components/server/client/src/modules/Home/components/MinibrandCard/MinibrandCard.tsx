import { Paper, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { MiniBrand } from '__generated__/graphql';
import MinibrandBasicInfo from '../MinibrandBasicInfo';

interface Props {
  minibrand: MiniBrand;
  onCardClick?: (minibrand: MiniBrand) => void;
  isCollected: boolean;
}

const MinibrandCard = (props: Props) => {
  const { minibrand, onCardClick, isCollected } = props;

  const handleCardClick = () => {
    if (onCardClick) onCardClick(minibrand);
  };

  return (
    <Paper key={`${minibrand.name}-card`} elevation={3} sx={styles.container}>
      {isCollected ? <CheckCircleIcon sx={styles.collectedIcon} /> : null}
      <Box
        component="div"
        onClick={handleCardClick}
        sx={styles.contentContainer}
      >
        <Box component="img" sx={styles.img} src={minibrand.imgUrl ?? ''} />
        <MinibrandBasicInfo minibrand={minibrand} />
      </Box>
    </Paper>
  );
};

const styles = {
  container: {
    height: '100%',
    width: '100%',
    overflow: 'visible',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  img: {
    display: 'flex',
    padding: 1,
    objectFit: 'contain',
    width: '100%',
    height: 150
    // height: '70%'
  },
  collectedIcon: {
    position: 'absolute',
    color: 'green',
    top: -15,
    left: -15,
    fontSize: 40,
    backgroundColor: 'white',
    borderRadius: 20
  }
};

export default MinibrandCard;
