import { Box, CircularProgress, Container, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FRIENDS_PATH } from 'App';
import SearchResults from './SearchResults/SearchResults';
import useSearchUsers from 'graphql/hooks/queries/useSearchUsers';
import useFriends from 'graphql/hooks/queries/useFriends';
import InfinityScroll from 'common/components/InfinityScroll';
import SearchBar from './SearchBar';

const AddFriend = () => {
  const navigate = useNavigate();
  const { searchUsers, cursor, data, loading, fetchMore } = useSearchUsers();
  const { data: friends, loading: loadingFriends } = useFriends();
  // const { data: me, loading: loadingMe } = useMe();
  const [searchQuery, setSearchQuery] = useState('');

  const [prevCursor, setPrevCursor] = useState<number | null | undefined>();

  const handleBackClick = () => {
    navigate(FRIENDS_PATH);
  };

  const handleSearchPress = (value: string) => {
    setSearchQuery(value);
    setPrevCursor(undefined);
    searchUsers({ query: value, cursor: null });
  };

  // const filteredUsers = useFilterByNotFriended(me, friends?.friends, data);

  const fetchNextPage = () => {
    fetchMore({ variables: { query: searchQuery, cursor: cursor } });
    setPrevCursor(cursor);
  };

  const hasMore = useMemo(() => {
    return prevCursor !== cursor;
  }, [prevCursor, cursor]);

  return (
    <Container maxWidth="md" sx={styles.container}>
      <Box sx={styles.topBar}>
        <IconButton onClick={handleBackClick} sx={styles.back}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <SearchBar handleSearchPress={handleSearchPress} />
      </Box>
      {loading || loadingFriends ? (
        <CircularProgress />
      ) : (
        <InfinityScroll
          hasMore={hasMore}
          fetchMore={fetchNextPage}
          dataLength={data?.length ?? 0}
        >
          <SearchResults users={data ?? []} friends={friends} />
        </InfinityScroll>
      )}
    </Container>
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
  back: {
    mr: 2
  }
};

export default AddFriend;
