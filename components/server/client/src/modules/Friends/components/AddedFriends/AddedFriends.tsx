import { Box, IconButton } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Search from 'common/components/Search';
import { useState } from 'react';
import FriendsList from './FriendsList/FriendsList';
import { FriendRequest, User } from '__generated__/graphql';
import useFilterFriendsBySearch from 'modules/Friends/hooks/useFilterFriendsBySearch';
import { useNavigate } from 'react-router-dom';
import { ADD_FRIENDS_PATH } from 'App';

interface Props {
  me: User;
  friends: FriendRequest[];
}

const AddedFriends = (props: Props) => {
  const { friends, me } = props;
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const updateSearchText = (text: string) => {
    setSearchText(text);
  };

  const clearSearch = () => {
    setSearchText('');
  };

  const handleAddFriend = () => {
    navigate(ADD_FRIENDS_PATH);
  };

  const filteredFriends = useFilterFriendsBySearch(friends, searchText);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.topBar}>
        <Search
          value={searchText}
          onValueChange={updateSearchText}
          clearSearch={clearSearch}
        />
        <IconButton sx={styles.addFriendContainer} onClick={handleAddFriend}>
          <GroupAddIcon sx={{ color: 'common.white' }} fontSize="medium" />
        </IconButton>
      </Box>
      <FriendsList me={me} friends={filteredFriends} />
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    padding: 2
  },
  addFriendContainer: {
    backgroundColor: 'primary.main',
    margin: 1,
    marginLeft: 3
  }
};

export default AddedFriends;
