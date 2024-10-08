import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

interface IArticle {
  title: string | null;
  summary: string | null;
  link: string | null;
}

function App() {
  const [query, setQuery] = useState<string>(''); // Estado para armazenar a string de busca
  const [articles, setArticles] = useState<IArticle[]>([]); // Estado para armazenar os artigos
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento

  // Função para buscar artigos
  const buscarArtigos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://export.arxiv.org/api/query', {
        params: {
          search_query: `all:${query}`,
          start: 0,
          max_results: 5,
          sortBy: 'relevance',
          sortOrder: 'descending',
        },
      });

      const xmlData = response.data;
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlData, 'text/xml');

      // Extrair informações dos artigos
      const entries = xml.getElementsByTagName('entry');
      const articlesList = [];
      for (let i = 0; i < entries.length; i++) {
        const title = entries[i].getElementsByTagName('title')[0].textContent;
        const summary =
          entries[i].getElementsByTagName('summary')[0].textContent;
        const link = entries[i].getElementsByTagName('id')[0].textContent;

        articlesList.push({ title, summary, link });
      }

      setArticles(articlesList);
    } catch (error) {
      console.error('Erro ao buscar artigos:', error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Busca de Artigos - arXiv</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Digite o termo de busca..."
      />

      <button onClick={buscarArtigos} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>

      <div>
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} style={{ margin: '20px 0' }}>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                Leia mais
              </a>
            </div>
          ))
        ) : (
          <p>Nenhum artigo encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default App;
