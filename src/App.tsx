import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import HistoryPage from './pages/HistoryPage';
import FavoritesPage from './pages/FavoritesPage';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import { Container, Flex, Box } from '@chakra-ui/react';
import { SearchProvider } from './contexts/SearchContext';

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
