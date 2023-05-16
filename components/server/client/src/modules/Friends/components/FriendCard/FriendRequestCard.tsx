import { Box, IconButton, CircularProgress } from '@mui/material';
import FriendCardBase from './FriendCardBase';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import useUpdateFriendRequest from 'modules/Friends/hooks/useUpdateFriendRequest';
import { FriendRequest, FriendRequestStatus } from '__generated__/graphql';

interface Props {
  request: FriendRequest;
}

export default function FriendRequestCard(props: Props) {
  const { request } = props;
  const { updateFriendRequest, loading } = useUpdateFriendRequest();

  const handleOnAccepted = () => {
    updateFriendRequest({
      senderId: request.senderId,
      status: FriendRequestStatus.Accepted
    });
  };

  const handleOnDeclined = () => {
    updateFriendRequest({
      senderId: request.senderId,
      status: FriendRequestStatus.Declined
    });
  };

  return (
    <FriendCardBase
      primaryText={request.sender?.username ?? ''}
      RightComponent={
        loading ? (
          <CircularProgress />
        ) : (
          <Box sx={styles.actionContainer}>
            <IconButton onClick={handleOnAccepted}>
              <CheckCircleIcon color="success" fontSize="large" />
            </IconButton>
            <IconButton onClick={handleOnDeclined}>
              <CancelIcon color="error" fontSize="large" />
            </IconButton>
          </Box>
        )
      }
    />
  );
}

const styles = {
  actionContainer: {
    display: 'flex',
    flexDirection: 'row'
  }
};
