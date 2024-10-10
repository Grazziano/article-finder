import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// Configuração de tema inicial (padrão light mode)
const config: ThemeConfig = {
  initialColorMode: 'light', // ou "dark"
  useSystemColorMode: false, // para usar a preferência do sistema
};

// Definindo um novo tema personalizado
const theme = extendTheme({
  config,
  colors: {
    // Personalize as cores
    brand: {
      50: '#e4f0f9',
      100: '#c3d4e6',
      200: '#9fb8d3',
      300: '#7b9cc0',
      400: '#5780ad',
      500: '#3e6694', // Cor primária
      600: '#2f5074',
      700: '#203953',
      800: '#122233',
      900: '#040a14',
    },
  },
  fonts: {
    heading: `'Poppins', sans-serif`, // Personalize as fontes para headings
    body: `'Roboto', sans-serif`, // Personalize as fontes para o corpo
  },
  styles: {
    global: {
      // Estilos globais
      body: {
        bg: 'gray.50', // Cor de fundo padrão do body no modo claro
        color: 'gray.800', // Cor do texto padrão
      },
    },
  },
  components: {
    Button: {
      // Personalização dos botões
      baseStyle: {
        fontWeight: 'bold', // Todos os botões terão texto em negrito
      },
      sizes: {
        lg: {
          h: '56px',
          fontSize: 'lg',
          px: '32px',
        },
      },
      variants: {
        solid: {
          bg: 'brand.500', // Usar cor personalizada
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
      },
    },
  },
});

export default theme;
