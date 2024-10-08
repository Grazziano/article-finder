import React from 'react';

interface SearchPageProps {
  query: string;
  setQuery: (value: string) => void;
  platform: string;
  setPlatform: (value: string) => void;
  searchArticles: () => void;
  loading: boolean;
}

const SearchPage: React.FC<SearchPageProps> = ({
  query,
  setQuery,
  platform,
  setPlatform,
  searchArticles,
  loading,
}) => {
  return (
    <div>
      <h1>Busca de Artigos Acadêmicos</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Digite o termo de busca..."
      />
      <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
        <option value="arXiv">arXiv</option>
        <option value="Google Scholar">Google Scholar</option>
        <option value="IEEE">IEEE Xplore</option>
        <option value="ACM Digital Library">ACM Digital Library</option>
        <option value="PubMed">PubMed</option>
      </select>
      <button onClick={searchArticles} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
    </div>
  );
};

export default SearchPage;
