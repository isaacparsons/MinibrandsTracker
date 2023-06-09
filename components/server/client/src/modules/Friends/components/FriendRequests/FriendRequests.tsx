import { Box, List } from '@mui/material';
import { FriendRequest } from '__generated__/graphql';
import FriendRequestCard from '../FriendCard/FriendRequestCard';
import NoResultsCard from 'common/components/NoResultsCard';

interface Props {
  requests: FriendRequest[];
}

const FriendRequests = (props: Props) => {
  const { requests } = props;
  return (
    <Box sx={styles.container}>
      {requests.length === 0 ? (
        <NoResultsCard title="no friend requests" />
      ) : (
        <List sx={styles.list}>
          {requests.map((request) => (
            <FriendRequestCard request={request} />
          ))}
        </List>
      )}
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: 1
  },
  list: {
    width: '100%',
    backgroundColor: 'common.white'
  }
};

export default FriendRequests;
