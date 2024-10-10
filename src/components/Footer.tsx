import {
  Box,
  Text,
  Link,
  Stack,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const bg = useColorModeValue('teal.600', 'teal.700');
  const textColor = useColorModeValue('white', 'white');

  return (
    <Box as="footer" bg={bg} color={textColor} py={4} mt={10} bottom={0}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        px={8}
      >
        <Text>&copy; {new Date().getFullYear()} GBFagundes</Text>

        <Stack direction="row" spacing={6}>
          <Link href="https://github.com/Grazziano" isExternal>
            <IconButton
              aria-label="GitHub"
              icon={<FaGithub />}
              variant="ghost"
              colorScheme="whiteAlpha"
              _hover={{ bg: 'teal.400' }}
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/grazziano-fagundes/"
            isExternal
          >
            <IconButton
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              variant="ghost"
              colorScheme="whiteAlpha"
              _hover={{ bg: 'teal.400' }}
            />
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
