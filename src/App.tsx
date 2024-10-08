import { useState, useEffect } from 'react';
import GrayHearth from './assets/images/icons/gray_hearth.svg';
import RedHearth from './assets/images/icons/red_hearth.svg';
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
  url: string; // Adiciona a URL ao histórico
}

function App() {
  const [query, setQuery] = useState<string>(''); // String de busca
  const [platform, setPlatform] = useState<SearchPlatform>('arXiv'); // Plataforma selecionada
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento
  const [history, setHistory] = useState<SearchHistory[]>([]); // Histórico de buscas
  const [favorites, setFavorites] = useState<SearchHistory[]>([]); // Artigos favoritos

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

    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
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
      const newEntry = { query, platform, url: searchUrl }; // Adiciona a nova pesquisa com plataforma e URL
      const updatedHistory = [newEntry, ...prevHistory];
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
    window.open(item.url, '_blank');
  };

  // Função para alternar o estado do favorito
  const toggleFavorite = (item: SearchHistory) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.find((fav) => fav.query === item.query);
      let updatedFavorites;

      if (isFavorite) {
        // Se já é favorito, remove-o
        updatedFavorites = prevFavorites.filter(
          (fav) => fav.query !== item.query
        );
      } else {
        // Caso contrário, adiciona aos favoritos
        updatedFavorites = [...prevFavorites, item];
      }

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Salva os favoritos no localStorage
      return updatedFavorites;
    });
  };

  // Função para limpar os favoritos
  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites'); // Remove os favoritos do localStorage
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
              <li key={index}>
                <span
                  onClick={() => redirectFromHistory(item)}
                  style={{
                    cursor: 'pointer',
                    color: '#007bff',
                    textDecoration: 'underline',
                  }}
                >
                  {item.query} - {item.platform}
                </span>
                {/* <button
                  className="btn-favorite"
                  onClick={() => toggleFavorite(item)}
                >
                  <img
                    src={
                      favorites.find((fav) => fav.query === item.query)
                        ? RedHearth
                        : GrayHearth
                    }
                    alt=""
                  />
                </button> */}
                {favorites.find((fav) => fav.query === item.query) ? (
                  <button
                    className={`btn-favorite active`}
                    onClick={() => toggleFavorite(item)}
                  >
                    <img src={RedHearth} alt="" />
                  </button>
                ) : (
                  <button
                    className="btn-favorite"
                    onClick={() => toggleFavorite(item)}
                  >
                    <img src={GrayHearth} alt="" />
                  </button>
                )}
              </li>
            ))}
          </ul>

          <button className="clear-history" onClick={clearHistory}>
            Limpar Histórico
          </button>
        </>
      )}

      {favorites.length > 0 && (
        <>
          <h2>Favoritos</h2>
          <ul>
            {favorites.map((item, index) => (
              <li key={index}>
                <span
                  onClick={() => window.open(item.url, '_blank')}
                  style={{
                    cursor: 'pointer',
                    color: '#007bff',
                    textDecoration: 'underline',
                  }}
                >
                  {item.query} - {item.platform}
                </span>
              </li>
            ))}
          </ul>
          <button className="clear-favorites" onClick={clearFavorites}>
            Limpar Favoritos
          </button>
        </>
      )}
    </div>
  );
}

export default App;
