import { ArrowBack, Person } from '@mui/icons-material';
import {
  Box,
  Container,
  IconButton,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { FRIENDS_PATH } from 'App';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FriendRequest } from '__generated__/graphql';
import extractFriend from 'common/utils/extractFriend';
import useMe from 'common/hooks/useMe';
import { useMemo, useState } from 'react';
import Collected from './components/Collected/Collected';
import Achievements from './components/Achievements/Achievements';

const Profile = () => {
  const { data } = useMe();
  const { state } = useLocation();
  const friendRequest: FriendRequest = state;
  const navigate = useNavigate();

  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const user = useMemo(() => {
    if (data) {
      return extractFriend(data, friendRequest);
    }
  }, [data, friendRequest]);

  const handleBackClick = () => {
    navigate(FRIENDS_PATH);
  };

  return (
    <Container maxWidth="md" sx={styles.container}>
      <Box sx={styles.topBar}>
        <IconButton onClick={handleBackClick} sx={styles.back}>
          <ArrowBack fontSize="large" />
        </IconButton>
      </Box>
      <Box sx={styles.basicInfoContainer}>
        <Person sx={styles.profileIcon} />
        <Typography
          variant="h6"
          sx={{ paddingLeft: 1, wordBreak: 'break-word' }}
        >
          {user?.username}
        </Typography>
      </Box>
      <Tabs
        sx={styles.tabsContainer}
        value={tab}
        onChange={handleTabChange}
        variant="fullWidth"
      >
        <Tab label={<Typography>Collected</Typography>} />
        <Tab label={<Typography>Achievements</Typography>} />
      </Tabs>
      {tab === 0
        ? user?.id && <Collected userId={user?.id} />
        : user?.id && <Achievements userId={user?.id} />}
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
    justifyContent: 'flex-start'
  },
  back: {},
  basicInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 3,
    paddingRight: 3
  },
  profileIcon: {
    fontSize: 60,
    padding: 2,
    color: 'white',
    backgroundColor: 'primary.main',
    borderRadius: 30
  },
  tabsContainer: {
    paddingBottom: 2
  }
};

export default Profile;
