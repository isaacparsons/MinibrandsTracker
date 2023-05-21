import {
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { User } from '__generated__/graphql';
import FriendCardBase from '../FriendCard/FriendCardBase';
import useCreateFriendRequest from 'modules/Friends/hooks/useCreateFriendRequest';
import NoResultsCard from 'common/components/NoResultsCard';

interface Props {
  users: User[];
}

const SearchResults = (props: Props) => {
  const { users } = props;

  const onCreatedFriendRequest = () => {};
  const { createFriendRequest, loading } = useCreateFriendRequest(
    onCreatedFriendRequest
  );

  const handleAddUserClick = (user: User) => {
    createFriendRequest({
      userId: user.id
    });
  };

  return (
    <Box sx={styles.container}>
      {users.length === 0 ? (
        <NoResultsCard />
      ) : (
        <List sx={styles.list}>
          {users.map((user) => {
            return (
              <FriendCardBase
                primaryText={user.username ?? ''}
                RightComponent={
                  loading ? (
                    <CircularProgress />
                  ) : (
                    <IconButton
                      edge="end"
                      onClick={() => handleAddUserClick(user)}
                    >
                      <AddCircleIcon fontSize="large" />
                    </IconButton>
                  )
                }
              />
            );
          })}
        </List>
      )}
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    padding: 1
  },
  list: {
    width: '100%'
  }
};

export default SearchResults;
