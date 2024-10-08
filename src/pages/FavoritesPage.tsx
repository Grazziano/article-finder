import React from 'react';
import { SearchHistory } from '../interfaces/SearchHistory';

interface FavoritesPageProps {
  favorites: SearchHistory[];
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ favorites }) => {
  return (
    <div>
      <h2>Favoritos</h2>
      <ul>
        {favorites.map((item, index) => (
          <li key={index}>
            <span
              onClick={() => window.open(item.url, '_blank')}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              {item.query} - {item.platform}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
