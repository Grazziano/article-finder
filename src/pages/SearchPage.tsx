import { useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';
import {
  Button,
  Textarea,
  Select,
  Wrap,
  WrapItem,
  Heading,
  Box,
  FormControl,
  FormLabel,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchPlatform } from '../interfaces/SearchPlatform';

function SearchPage() {
  const handlePlatformChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPlatform(event.target.value as SearchPlatform);
  };

  const { query, setQuery, platform, setPlatform, searchArticles, loading } =
    useContext(SearchContext)!;

  const bg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('teal.600', 'teal.300');

  return (
    <Box bg={bg} p={8} rounded="md" shadow="md" maxW="xl" mx="auto">
      <Heading as="h1" size="xl" mb={6} textAlign="center" color={textColor}>
        Busca de Artigos Acadêmicos
      </Heading>

      <FormControl mb={4}>
        <FormLabel fontSize="lg" color={textColor}>
          Termo de Busca
        </FormLabel>
        <Textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o termo de busca..."
          size="lg"
          focusBorderColor="teal.400"
          bg={bg}
          shadow="sm"
          rows={4}
        />
      </FormControl>

      <FormControl mb={6}>
        <FormLabel fontSize="lg" color={textColor}>
          Plataforma de Pesquisa
        </FormLabel>
        <Select
          placeholder="Selecione a plataforma"
          value={platform}
          onChange={handlePlatformChange}
          size="lg"
          focusBorderColor="teal.400"
          bg={bg}
          shadow="sm"
        >
          <option value="ACM Digital Library">ACM Digital Library</option>
          <option value="arXiv">arXiv</option>
          <option value="Google Scholar">Google Scholar</option>
          <option value="IEEE">IEEE Xplore</option>
          <option value="PubMed">PubMed</option>
          <option value="ScienceDirect">ScienceDirect</option>
          <option value="Scopus">Scopus</option>
          <option value="Web of Science">Web of Science</option>
        </Select>
      </FormControl>

      <Wrap spacing={4} justify="center">
        <WrapItem>
          <Button
            colorScheme="teal"
            size="lg"
            onClick={searchArticles}
            isLoading={loading}
            loadingText="Buscando..."
          >
            Buscar
          </Button>
        </WrapItem>
      </Wrap>
    </Box>
  );
}

export default SearchPage;
