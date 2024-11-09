import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { SearchPlatform } from '../interfaces/SearchPlatform';
import { SearchHistory } from '../interfaces/SearchHistory';
import { v4 as uuidv4 } from 'uuid';

interface SearchContextProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  platform: SearchPlatform;
  setPlatform: React.Dispatch<React.SetStateAction<SearchPlatform>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  history: SearchHistory[];
  setHistory: React.Dispatch<React.SetStateAction<SearchHistory[]>>;
  favorites: SearchHistory[];
  setFavorites: React.Dispatch<React.SetStateAction<SearchHistory[]>>;
  searchArticles: () => void;
  clearHistory: () => void;
  toggleFavorite: (item: SearchHistory) => void;
  clearFavorites: () => void;
  removeHistoryItem: (itemToRemove: SearchHistory) => void;
}

export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined
);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<string>('');
  const [platform, setPlatform] = useState<SearchPlatform>(
    'ACM Digital Library'
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<SearchHistory[]>([]);
  const [favorites, setFavorites] = useState<SearchHistory[]>([]);

  // URLs de busca para cada plataforma
  const platformUrls = {
    'ACM Digital Library': (query: string) =>
      `https://dl.acm.org/action/doSearch?AllField=${encodeURIComponent(
        query
      )}`,
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
    PubMed: (query: string) =>
      `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(query)}`,
    ScienceDirect: (query: string) =>
      `https://www.sciencedirect.com/search?qs=${encodeURIComponent(query)}`,
    Scopus: (query: string) =>
      `https://www.scopus.com/term/analyzer.uri?sid=your_sid_here&origin=resultslist&src=s&field1=ts&terms1=${encodeURIComponent(
        query
      )}`,
    'Web of Science': (query: string) =>
      `https://www.webofscience.com/wos/woscc/basic-search?WOS&search_mode=GeneralSearch&SID=your_sid_here&value(input1)=${encodeURIComponent(
        query
      )}`,
    'Wiley Online Library': (query: string) =>
      `https://onlinelibrary.wiley.com/action/doSearch?AllField=${encodeURIComponent(
        query
      )}`,
    'Taylor and Francis Online': (query: string) =>
      `https://www.tandfonline.com/action/doSearch?AllField=${encodeURIComponent(
        query
      )}`,
    'Springer Nature Link': (query: string) =>
      `https://link.springer.com/search?query=${encodeURIComponent(query)}`,
    'sci-hub': (query: string) =>
      `https://sci-hub.se/${encodeURIComponent(query)}`,
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  const searchArticles = () => {
    if (!query) {
      alert('Por favor, insira um termo de busca.');
      return;
    }

    setLoading(true);
    const searchUrl = platformUrls[platform](query);
    window.open(searchUrl, '_blank');
    setLoading(false);

    setHistory((prevHistory) => {
      const newEntry = { id: uuidv4(), query, platform, url: searchUrl };
      const updatedHistory = [newEntry, ...prevHistory];
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });

    setQuery('');
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const toggleFavorite = (item: SearchHistory) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.find((fav) => fav.id === item.id);
      let updatedFavorites;

      if (isFavorite) {
        updatedFavorites = prevFavorites.filter((fav) => fav.id !== item.id);
      } else {
        updatedFavorites = [...prevFavorites, item];
      }

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  const removeHistoryItem = (itemToRemove: SearchHistory) => {
    setHistory((prevHistory) => {
      const updatedHistory = prevHistory.filter(
        (item) => item.id !== itemToRemove.id
      );
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        platform,
        setPlatform,
        loading,
        setLoading,
        history,
        setHistory,
        favorites,
        setFavorites,
        searchArticles,
        clearHistory,
        toggleFavorite,
        clearFavorites,
        removeHistoryItem,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
