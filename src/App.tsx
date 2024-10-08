import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SearchPlatform } from './interfaces/SearchPlatform';
import { SearchHistory } from './interfaces/SearchHistory';
import SearchPage from './pages/SearchPage';
import HistoryPage from './pages/HistoryPage';
import FavoritesPage from './pages/FavoritesPage';
import './App.css';

function App() {
  const [query, setQuery] = useState<string>('');
  const [platform, setPlatform] = useState<SearchPlatform>('arXiv');
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<SearchHistory[]>([]);
  const [favorites, setFavorites] = useState<SearchHistory[]>([]);

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
  // const clearHistory = () => {
  //   setHistory([]);
  //   localStorage.removeItem('searchHistory'); // Remove o histórico do localStorage
  // };

  // Função para redirecionar para a pesquisa do histórico
  // const redirectFromHistory = (item: SearchHistory) => {
  //   window.open(item.url, '_blank');
  // };

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
  // const clearFavorites = () => {
  //   setFavorites([]);
  //   localStorage.removeItem('favorites'); // Remove os favoritos do localStorage
  // };

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/history">Histórico</Link>
          <Link to="/favorites">Favoritos</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <SearchPage
                query={query}
                setQuery={setQuery}
                platform={platform}
                setPlatform={setPlatform}
                searchArticles={searchArticles}
                loading={loading}
              />
            }
          />
          <Route
            path="/history"
            element={
              <HistoryPage
                history={history}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
              />
            }
          />
          <Route
            path="/favorites"
            element={<FavoritesPage favorites={favorites} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
