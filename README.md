# Article Finder

**Article Finder** é uma aplicação que permite realizar buscas de artigos acadêmicos em diversas plataformas, como arXiv, Google Scholar, IEEE, ACM Digital Library e PubMed. A aplicação também permite gerenciar o histórico de pesquisas e artigos favoritos.

## Funcionalidades

- **Pesquisa de artigos**: Realize buscas de artigos em várias plataformas acadêmicas.
- **Histórico de buscas**: Consulte o histórico de pesquisas realizadas.
- **Gerenciamento de favoritos**: Salve artigos para consulta futura.
- **Interface moderna**: Construída com **ReactJS** e **Chakra UI** para uma experiência visual agradável e responsiva.
- **Persistência local**: Utiliza o **localStorage** para armazenar histórico e favoritos.

## Tecnologias Utilizadas

- **ReactJS**: Biblioteca para construção da interface do usuário.
- **TypeScript**: Tipagem estática para maior segurança e eficiência.
- **Chakra UI**: Biblioteca de componentes para estilização responsiva e acessível.
- **arXiv API**: Para realizar as buscas de artigos.
- **localStorage**: Para persistência de dados de histórico e favoritos.

## Como Usar

1. Clone o repositório:
   ```bash
   git clone https://github.com/Grazziano/article-finder.git
   ```

2. Instale as dependências:
   ```bash
   cd article-finder
   npm install
   ```

3. Inicie a aplicação:
   ```bash
   npm start
   ```

4. Acesse a aplicação em `http://localhost:3000`.

## Estrutura do Projeto

```bash
.
├── src
│   ├── components   # Componentes reutilizáveis
│   ├── contexts     # Estados globais da aplicação
│   ├── interfaces   # Interfaces e tipagem
│   ├── pages        # Páginas da aplicação (Busca, Histórico, Favoritos)
│   ├── App.tsx      # Componente principal da aplicação
│   ├── main.tsx    # Ponto de entrada da aplicação
└── ...
```

## Melhorias Futuras

- Integração com mais plataformas acadêmicas (Ex: Scopus).
- Filtros avançados de busca (por data, autores, etc.).
- Exportação de artigos salvos para formatos como CSV ou PDF.

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir **issues** ou enviar **pull requests**.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
