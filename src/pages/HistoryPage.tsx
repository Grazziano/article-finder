import React, { useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';
import GrayHearth from '../assets/images/icons/gray_hearth.svg';
import RedHearth from '../assets/images/icons/red_hearth.svg';
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  IconButton,
  Image,
  Button,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { ExternalLinkIcon, DeleteIcon } from '@chakra-ui/icons';

const HistoryPage: React.FC = () => {
  const {
    history,
    toggleFavorite,
    favorites,
    clearHistory,
    removeHistoryItem,
  } = useContext(SearchContext)!;

  const bg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('teal.600', 'teal.300');
  const boxColor = useColorModeValue('white', 'gray.600');
  const hoverBg = useColorModeValue('gray.100', 'gray.800');

  return (
    <Box p={8} bg={bg} rounded="md" shadow="md" maxW="xl" mx="auto">
      <Heading as="h2" size="lg" mb={6} textAlign="center" color={textColor}>
        Histórico de Pesquisas
      </Heading>

      {history.length === 0 ? (
        <Text textAlign="center" color="gray.500" fontSize="lg">
          Nenhuma pesquisa recente encontrada.
        </Text>
      ) : (
        <>
          <Button
            colorScheme="red"
            variant="outline"
            onClick={clearHistory}
            mb={4}
            width="auto"
          >
            Limpar Histórico
          </Button>

          <List spacing={4}>
            {history.map((item, index) => {
              const isFavorite = favorites.find(
                (fav) => fav.query === item.query
              );
              return (
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
                  <Flex alignItems="center">
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

                  <Flex>
                    <IconButton
                      aria-label="Favoritar"
                      icon={
                        <Image
                          src={isFavorite ? RedHearth : GrayHearth}
                          alt={
                            isFavorite
                              ? 'Remover dos favoritos'
                              : 'Adicionar aos favoritos'
                          }
                          boxSize="20px"
                        />
                      }
                      onClick={() => toggleFavorite(item)}
                      variant="ghost"
                      _hover={{ bg: 'transparent' }}
                      mr={2}
                    />

                    <IconButton
                      aria-label="Remover"
                      icon={<DeleteIcon />}
                      onClick={() => removeHistoryItem(item)}
                      colorScheme="red"
                      variant="ghost"
                    />
                  </Flex>
                </ListItem>
              );
            })}
          </List>
        </>
      )}
    </Box>
  );
};

export default HistoryPage;
