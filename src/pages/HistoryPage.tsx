import React from 'react';
import { SearchHistory } from '../interfaces/SearchHistory';
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
} from '@chakra-ui/react';
import { ExternalLinkIcon, DeleteIcon } from '@chakra-ui/icons';

interface HistoryPageProps {
  history: SearchHistory[];
  toggleFavorite: (item: SearchHistory) => void;
  favorites: SearchHistory[];
  clearHistory: () => void; // Função para limpar todo o histórico
  removeHistoryItem: (item: SearchHistory) => void; // Função para remover individualmente
  isFullWidth: boolean;
}

const HistoryPage: React.FC<HistoryPageProps> = ({
  history,
  toggleFavorite,
  favorites,
  clearHistory,
  removeHistoryItem,
  isFullWidth,
}) => {
  return (
    <Box p={8} bg="gray.50" rounded="md" shadow="md" maxW="xl" mx="auto">
      <Heading as="h2" size="lg" mb={6} textAlign="center" color="teal.600">
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
            width={isFullWidth ? '100%' : 'auto'}
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
                  bg="white"
                  p={4}
                  rounded="md"
                  shadow="sm"
                  _hover={{ shadow: 'md', bg: 'gray.100' }}
                >
                  <Flex alignItems="center">
                    <Text
                      as="span"
                      onClick={() => window.open(item.url, '_blank')}
                      cursor="pointer"
                      textDecoration="underline"
                      color="teal.500"
                      fontWeight="medium"
                    >
                      {item.query} - {item.platform}
                    </Text>
                    <ExternalLinkIcon mx="2px" />
                  </Flex>

                  <Flex>
                    {/* Botão de favoritar/desfavoritar */}
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

                    {/* Botão de remover individualmente */}
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
