import React, { useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';
import GrayHearth from '../assets/images/icons/gray_hearth.svg';
import RedHearth from '../assets/images/icons/red_hearth.svg';
import {
  Badge,
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
  useToast,
} from '@chakra-ui/react';
import { ExternalLinkIcon, DeleteIcon, CopyIcon } from '@chakra-ui/icons';

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
  const toast = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copiado!',
      description: 'Texto copiado para a área de transferência.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

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
              const isFavorite = favorites.find((fav) => fav.id === item.id);
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
                  flexDirection="column"
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
                      {item.query}
                    </Text>
                    <ExternalLinkIcon mx="2px" />
                  </Flex>

                  <Flex alignItems="center" gap="2">
                    <Badge
                      variant="outline"
                      colorScheme="green"
                      fontSize="0.8em"
                    >
                      {item.platform}
                    </Badge>

                    <IconButton
                      aria-label="Copiar texto"
                      icon={<CopyIcon />}
                      onClick={() => handleCopy(`${item.query}`)}
                      variant="ghost"
                      mr={2}
                    />

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
