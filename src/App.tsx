import React, { useState } from 'react';
import './App.css';

type SearchPlatform =
  | 'arXiv'
  | 'Google Scholar'
  | 'IEEE'
  | 'ACM Digital Library';

function App() {
  const [query, setQuery] = useState<string>(''); // String de busca
  const [platform, setPlatform] = useState<SearchPlatform>('arXiv'); // Plataforma selecionada
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento

  // URLs de busca para cada plataforma
  const platformUrls = {
    arXiv: (query: string) =>
      `https://arxiv.org/search/?query=${encodeURIComponent(
        query
      )}&searchtype=all`,
    'Google Scholar': (query: string) =>
      `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`,
    IEEE: (query: string) =>
      `https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=${encodeURIComponent(
        query
      )}`,
    'ACM Digital Library': (query: string) =>
      `https://dl.acm.org/action/doSearch?AllField=${encodeURIComponent(
        query
      )}`,
  };

  // Função para redirecionar para a plataforma selecionada
  const searchArticles = () => {
    if (!query) {
      alert('Por favor, insira um termo de busca.');
      return;
    }

    setLoading(true);
    const searchUrl = platformUrls[platform](query);
    window.open(searchUrl, '_blank'); // Abre os resultados de busca em uma nova aba
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Busca de Artigos Acadêmicos</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Digite o termo de busca..."
      />

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value as SearchPlatform)}
        className="platform-select"
      >
        <option value="arXiv">arXiv</option>
        <option value="Google Scholar">Google Scholar</option>
        <option value="IEEE">IEEE Xplore</option>
        <option value="ACM Digital Library">ACM Digital Library</option>
      </select>

      <button onClick={searchArticles} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
    </div>
  );
}

export default App;
