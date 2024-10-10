import React, { useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  Button,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const FavoritesPage: React.FC = () => {
  const { favorites, clearFavorites } = useContext(SearchContext)!;

  const bg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('teal.600', 'teal.300');
  const boxColor = useColorModeValue('white', 'gray.600');
  const hoverBg = useColorModeValue('gray.100', 'gray.800');

  return (
    <Box p={8} bg={bg} rounded="md" shadow="md" maxW="xl" mx="auto">
      <Heading as="h2" size="lg" mb={6} textAlign="center" color={textColor}>
        Favoritos
      </Heading>

      {favorites.length === 0 ? (
        <Text textAlign="center" color="gray.500" fontSize="lg">
          Nenhum favorito adicionado ainda.
        </Text>
      ) : (
        <>
          <Button
            colorScheme="red"
            variant="outline"
            onClick={clearFavorites}
            mb={4}
            width="auto"
          >
            Limpar Favoritos
          </Button>

          <List spacing={4}>
            {favorites.map((item, index) => (
              <ListItem
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg={boxColor}
                p={4}
                rounded="md"
                shadow="sm"
                _hover={{ shadow: 'md', bg: hoverBg }}
              >
                <Flex>
                  <Text
                    as="span"
                    onClick={() => window.open(item.url, '_blank')}
                    cursor="pointer"
                    textDecoration="underline"
                    color={textColor}
                    fontWeight="medium"
                  >
                    {item.query} - {item.platform}
                  </Text>
                  <ExternalLinkIcon mx="2px" />
                </Flex>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};

export default FavoritesPage;
