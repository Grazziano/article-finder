import { useState, useEffect } from 'react';
import './App.css';

type SearchPlatform =
  | 'arXiv'
  | 'Google Scholar'
  | 'IEEE'
  | 'ACM Digital Library'
  | 'PubMed';

interface SearchHistory {
  query: string;
  platform: SearchPlatform;
}

function App() {
  const [query, setQuery] = useState<string>(''); // String de busca
  const [platform, setPlatform] = useState<SearchPlatform>('arXiv'); // Plataforma selecionada
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento
  const [history, setHistory] = useState<SearchHistory[]>([]); // Histórico de buscas

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
    PubMed: (query: string) =>
      `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(query)}`,
  };

  // Carrega o histórico do localStorage ao montar o componente
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

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

    // Atualiza o histórico de buscas
    setHistory((prevHistory) => {
      const updatedHistory = [
        { query, platform }, // Adiciona a nova pesquisa com plataforma
        ...prevHistory,
      ];
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory)); // Salva no localStorage
      return updatedHistory;
    });

    // Limpa a caixa de entrada
    setQuery('');
  };

  // Função para limpar o histórico
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('searchHistory'); // Remove o histórico do localStorage
  };

  // Função para redirecionar para a pesquisa do histórico
  const redirectFromHistory = (item: SearchHistory) => {
    const searchUrl = platformUrls[item.platform](item.query);
    window.open(searchUrl, '_blank');
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
        <option value="PubMed">PubMed</option>
      </select>

      <button onClick={searchArticles} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>

      {history.length > 0 && (
        <>
          <h2>Histórico de Pesquisas</h2>
          <ul>
            {history.map((item, index) => (
              <li
                key={index}
                onClick={() => redirectFromHistory(item)}
                style={{
                  cursor: 'pointer',
                  color: '#007bff',
                  textDecoration: 'underline',
                }}
              >
                {item.query} - {item.platform}
              </li>
            ))}
          </ul>

          <button className="clear-history" onClick={clearHistory}>
            Limpar Histórico
          </button>
        </>
      )}
    </div>
  );
}

export default App;
