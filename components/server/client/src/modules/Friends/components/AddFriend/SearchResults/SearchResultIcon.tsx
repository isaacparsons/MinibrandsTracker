import { IconButton, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckIcon from '@mui/icons-material/Check';
import {
  FriendRequest,
  FriendRequestStatus,
  User
} from '__generated__/graphql';

interface Props {
  friendRequest: FriendRequest | undefined;
  user: User;
  me: User | undefined;
  handleAddUserClick: (user: User) => void;
}

const SearchResultIcon = (props: Props) => {
  const { friendRequest, user, me, handleAddUserClick } = props;

  if (!friendRequest && user.id !== me?.id) {
    return (
      <IconButton edge="end" onClick={() => handleAddUserClick(user)}>
        <AddCircleIcon fontSize="large" />
      </IconButton>
    );
  }

  if (friendRequest?.status === FriendRequestStatus.Accepted) {
    return (
      <IconButton edge="end">
        <CheckIcon fontSize="large" />
      </IconButton>
    );
  }
  if (friendRequest?.status === FriendRequestStatus.Pending) {
    return <Typography>Pending</Typography>;
  }

  return null;
};

export default SearchResultIcon;
