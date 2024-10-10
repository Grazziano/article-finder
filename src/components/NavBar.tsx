import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Image,
  Text,
  Link as ChakraLink,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import PaperImg from '../assets/images/paper.png';
import ToggleThemeButton from './ToggleThemeButton';

const Links = ['Busca', 'Histórico', 'Favoritos'];

const NavLink = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  let link = '/';

  if (children === 'Histórico') {
    link = '/history';
  } else if (children === 'Favoritos') {
    link = '/favorites';
  } else {
    link = '/';
  }

  const isActive = location.pathname === link;

  return (
    <ChakraLink
      as={Link}
      to={link}
      px={2}
      py={1}
      rounded={'md'}
      bg={isActive ? 'teal.500' : 'transparent'}
      color={isActive ? 'white' : 'teal.500'}
      _hover={{
        textDecoration: 'none',
        bg: isActive ? 'teal.600' : 'gray.200',
      }}
    >
      {children}
    </ChakraLink>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bg = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('teal.600', 'teal.300');

  return (
    <Box bg={bg} px={4}>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        color={textColor}
      >
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>
            <Link to={'/'}>
              <Image
                boxSize="40px"
                objectFit="cover"
                src={PaperImg}
                alt="logo"
              />
            </Link>
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'} gap={2}>
          <Text>Busca de Artigos Acadêmicos</Text>
          <ToggleThemeButton />
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
