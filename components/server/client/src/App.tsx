import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Sidenav from 'common/components/Sidenav';
import MinibrandsMetadataScreen from './modules/MinibrandsMetadata/index';
import { Box } from '@mui/material';
import Home from './modules/Home/index';

export const MINIBRANDS_METADATA_PATH = '/minibrandsMetadata';
export const HOME_PATH = '/home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Box
          display={'flex'}
          flex={1}
          flexDirection={'row'}
          sx={{ backgroundColor: 'neutral.main' }}
        >
          <Sidenav />
          <Routes>
            <Route path={HOME_PATH} element={<Home />} />
            <Route
              path={MINIBRANDS_METADATA_PATH}
              element={<MinibrandsMetadataScreen />}
            />
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;
