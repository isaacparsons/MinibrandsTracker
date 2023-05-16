import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { ReactNode } from 'react';

interface Props {
  primaryText: string;
  RightComponent?: ReactNode;
  onCardClick?: () => void;
}

const FriendCardBase = (props: Props) => {
  const { primaryText, RightComponent, onCardClick } = props;
  return (
    <ListItem
      secondaryAction={RightComponent}
      sx={styles.container}
      divider={true}
      onClick={onCardClick}
    >
      <ListItemAvatar>
        <Avatar>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={primaryText} sx={{ wordBreak: 'break-word' }} />
    </ListItem>
  );
};

const styles = {
  container: {
    backgroundColor: 'common.white'
  }
};

export default FriendCardBase;
