import { Route, Routes } from 'react-router-dom';
import { SearchProvider } from './contexts/SearchContext';
import { Box, Container, Flex } from '@chakra-ui/react';
import Navbar from './components/NavBar';
import SearchPage from './pages/SearchPage';
import HistoryPage from './pages/HistoryPage';
import FavoritesPage from './pages/FavoritesPage';
import Footer from './components/Footer';

function App() {
  return (
    <SearchProvider>
      <Flex direction="column" minH="100vh">
        <Navbar />
        <Box flex="1">
          <Container maxW="5xl" mt={5}>
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </Container>
        </Box>
        <Footer />
      </Flex>
    </SearchProvider>
  );
}

export default App;
