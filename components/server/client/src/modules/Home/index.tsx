import { Box, CircularProgress, Container } from '@mui/material';
import useMinibrandsMetadata from '../../graphql/hooks/queries/useMinibrandsMetadata';
import { useState } from 'react';
import SelectedMinibrandProvider from 'context/SelectedMinibrandContext';
import useFilterMinibrands from './hooks/useFilterMinibrands';
import Filter from './components/Filter/Filter';
import Minibrands from './Minibrands';

function Home() {
  const { data: minibrandsMetadata, loading: loadingMinibrandsMetadata } =
    useMinibrandsMetadata();

  const [searchText, setSearchText] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleFilter = () => {
    setFilterOpen((prevFilterOpenVal) => {
      return !prevFilterOpenVal;
    });
  };

  const { apiFilter, filters } = useFilterMinibrands(
    searchText,
    minibrandsMetadata
  );

  const onSearchPress = (value: string) => {
    setSearchText(value);
  };

  if (loadingMinibrandsMetadata || !minibrandsMetadata) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <SelectedMinibrandProvider>
      <Container sx={styles.container}>
        <Filter
          filters={filters}
          onSearchPress={onSearchPress}
          filterOpen={filterOpen}
          toggleFilter={toggleFilter}
        />
        <Minibrands filter={apiFilter} />
      </Container>
    </SelectedMinibrandProvider>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 5
  },
  loadingContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default Home;
