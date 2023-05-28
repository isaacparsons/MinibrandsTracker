import { Box, CircularProgress, List } from '@mui/material';
import { Friends, User } from '__generated__/graphql';
import useCreateFriendRequest from 'graphql/hooks/mutations/useCreateFriendRequest';
import NoResultsCard from 'common/components/NoResultsCard';
import useMe from 'graphql/hooks/queries/useMe';
import useFriendsMap from 'common/hooks/useFriendsMap';
import SearchResultIcon from './SearchResultIcon';
import FriendCardBase from '../../FriendCard/FriendCardBase';

interface Props {
  users: User[];
  friends?: Friends;
}

const SearchResults = (props: Props) => {
  const { data } = useMe();
  const { users, friends } = props;

  const friendsMap = useFriendsMap(data, friends);

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
            const friendRequest = friendsMap.get(user.id);
            return (
              <FriendCardBase
                primaryText={user.username ?? ''}
                RightComponent={
                  loading ? (
                    <CircularProgress />
                  ) : (
                    <SearchResultIcon
                      user={user}
                      me={data}
                      friendRequest={friendRequest}
                      handleAddUserClick={handleAddUserClick}
                    />
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
