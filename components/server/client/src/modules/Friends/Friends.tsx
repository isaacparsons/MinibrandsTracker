import {
  Container,
  Tabs,
  Tab,
  Typography,
  Badge,
  CircularProgress
} from '@mui/material';
import { useState } from 'react';
import AddedFriends from './components/AddedFriends/AddedFriends';
import FriendRequests from './components/FriendRequests/FriendRequests';
import useFriends from '../../graphql/hooks/queries/useFriends';
import useMe from 'graphql/hooks/queries/useMe';

const Friends = () => {
  const { data, loading } = useFriends();
  const { data: me, loading: loadingMe } = useMe();
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth="md" sx={styles.container}>
      <Tabs
        sx={styles.tabsContainer}
        value={tab}
        onChange={handleTabChange}
        variant="fullWidth"
      >
        <Tab label={<Typography>Friends</Typography>} />
        <Tab
          label={
            <Badge badgeContent={data?.requests.length} color="primary">
              <Typography>Requests</Typography>
            </Badge>
          }
        />
      </Tabs>
      {loading || loadingMe || !me ? (
        <CircularProgress />
      ) : tab === 0 ? (
        <AddedFriends me={me} friends={data?.friends ?? []} />
      ) : (
        <FriendRequests requests={data?.requests ?? []} />
      )}
    </Container>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingTop: 1
  },
  tabsContainer: {
    paddingBottom: 2
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

export default Friends;
