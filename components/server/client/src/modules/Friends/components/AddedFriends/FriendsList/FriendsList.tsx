import { Box, List } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { FriendRequest, User } from '__generated__/graphql';
import FriendCardBase from '../../FriendCard/FriendCardBase';
import { useNavigate } from 'react-router-dom';
import { PROFILE_PATH } from 'App';
import extractFriend from 'common/utils/extractFriend';
import NoResultsCard from 'common/components/NoResultsCard';

interface Props {
  me: User;
  friends: FriendRequest[];
}

const FriendsList = (props: Props) => {
  const { friends, me } = props;

  const navigate = useNavigate();

  const handleCardClick = (friendRequest: FriendRequest) => {
    const friend = extractFriend(me, friendRequest);
    navigate(`${PROFILE_PATH}/${friend?.id}`, { state: friendRequest });
  };

  return (
    <Box sx={styles.container}>
      {friends.length === 0 ? (
        <NoResultsCard />
      ) : (
        <List sx={styles.list}>
          {friends.map((friend) => {
            const user = extractFriend(me, friend);
            if (!user) {
              return null;
            }
            return (
              <FriendCardBase
                key={`friend-${friend.id}`}
                primaryText={user.username ?? ''}
                RightComponent={<ChevronRightIcon />}
                onCardClick={() => handleCardClick(friend)}
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

export default FriendsList;
