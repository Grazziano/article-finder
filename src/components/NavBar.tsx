import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  // Button,
  useDisclosure,
  Stack,
  Image,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import PaperImg from '../assets/images/paper.png';

const Links = ['Busca', 'Histórico', 'Favoritos'];

const NavLink = ({ children }: { children: React.ReactNode }) => {
  let link = '/';

  if (children === 'Histórico') {
    link = '/history';
  } else if (children === 'Favoritos') {
    link = '/favorites';
  } else {
    link = '/';
  }

  return (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: 'gray.200',
      }}
      href={link}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={'gray.100'} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>
            <Image boxSize="40px" objectFit="cover" src={PaperImg} alt="logo" />
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          {/* <Button variant={'solid'} colorScheme={'teal'} size={'sm'} mr={4}>
            Ação
          </Button> */}
          <Text>Busca de Artigos Acadêmicos</Text>
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
