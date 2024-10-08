import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// Definição dos tipos de dados para os artigos
interface Article {
  title: string;
  summary: string;
  link: string;
  published: string;
}

function App() {
  const [query, setQuery] = useState<string>(''); // Estado para armazenar a string de busca
  const [articles, setArticles] = useState<Article[]>([]); // Estado para armazenar os artigos
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento

  // Função para buscar artigos
  const buscarArtigos = async () => {
    setLoading(true);
    try {
      const response = await axios.get<string>(
        'http://export.arxiv.org/api/query',
        {
          params: {
            search_query: `all:${query}`,
            start: 0,
            max_results: 5,
            sortBy: 'relevance',
            sortOrder: 'descending',
          },
        }
      );

      const xmlData = response.data;
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlData, 'text/xml');

      // Extrair informações dos artigos
      const entries = xml.getElementsByTagName('entry');
      const articlesList: Article[] = [];
      for (let i = 0; i < entries.length; i++) {
        const title =
          entries[i].getElementsByTagName('title')[0].textContent ||
          'Sem título';
        const summary =
          entries[i].getElementsByTagName('summary')[0].textContent ||
          'Sem resumo';
        const link = entries[i].getElementsByTagName('id')[0].textContent || '';
        const published =
          entries[i].getElementsByTagName('published')[0].textContent || '';

        articlesList.push({ title, summary, link, published });
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

      <div className="article-list">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <article key={index}>
              <div className="article-header">
                <h3>{article.title}</h3>
                <span className="article-date">
                  {new Date(article.published).toLocaleDateString()}
                </span>
              </div>
              <p>{article.summary}</p>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                Leia mais
              </a>
            </article>
          ))
        ) : (
          <p>Nenhum artigo encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default App;
