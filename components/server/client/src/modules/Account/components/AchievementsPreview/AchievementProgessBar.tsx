import { styled } from '@mui/material/styles';
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.light
  }
}));

interface Props {
  percentage: number;
}

const AchievementProgessBar = (props: Props) => {
  const { percentage } = props;
  return <BorderLinearProgress variant="determinate" value={percentage} />;
};

export default AchievementProgessBar;
