import React, { createContext, useState, useEffect, ReactNode } from "react";
import { SearchPlatform } from "../interfaces/SearchPlatform";
import { SearchHistory } from "../interfaces/SearchHistory";

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
  const [query, setQuery] = useState<string>("");
  const [platform, setPlatform] = useState<SearchPlatform>("arXiv");
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<SearchHistory[]>([]);
  const [favorites, setFavorites] = useState<SearchHistory[]>([]);

  // URLs de busca para cada plataforma
  const platformUrls = {
    arXiv: (query: string) =>
      `https://arxiv.org/search/?query=${encodeURIComponent(
        query
      )}&searchtype=all`,
    "Google Scholar": (query: string) =>
      `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`,
    IEEE: (query: string) =>
      `https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=${encodeURIComponent(
        query
      )}`,
    "ACM Digital Library": (query: string) =>
      `https://dl.acm.org/action/doSearch?AllField=${encodeURIComponent(
        query
      )}`,
    PubMed: (query: string) =>
      `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(query)}`,
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  const searchArticles = () => {
    if (!query) {
      alert("Por favor, insira um termo de busca.");
      return;
    }

    setLoading(true);
    const searchUrl = platformUrls[platform](query);
    window.open(searchUrl, "_blank");
    setLoading(false);

    setHistory((prevHistory) => {
      const newEntry = { query, platform, url: searchUrl };
      const updatedHistory = [newEntry, ...prevHistory];
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      return updatedHistory;
    });

    setQuery("");
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("searchHistory");
  };

  const toggleFavorite = (item: SearchHistory) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.find((fav) => fav.query === item.query);
      let updatedFavorites;

      if (isFavorite) {
        updatedFavorites = prevFavorites.filter(
          (fav) => fav.query !== item.query
        );
      } else {
        updatedFavorites = [...prevFavorites, item];
      }

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  const removeHistoryItem = (itemToRemove: SearchHistory) => {
    setHistory((prevHistory) => {
      const updatedHistory = prevHistory.filter(
        (item) => item.query !== itemToRemove.query
      );
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
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
