import React from 'react';
import { SearchHistory } from '../interfaces/SearchHistory';
import GrayHearth from '../assets/images/icons/gray_hearth.svg';
import RedHearth from '../assets/images/icons/red_hearth.svg';

interface HistoryPageProps {
  history: SearchHistory[];
  toggleFavorite: (item: SearchHistory) => void;
  favorites: SearchHistory[];
}

const HistoryPage: React.FC<HistoryPageProps> = ({
  history,
  toggleFavorite,
  favorites,
}) => {
  return (
    <div>
      <h2>Histórico de Pesquisas</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            <span
              onClick={() => window.open(item.url, '_blank')}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              {item.query} - {item.platform}
            </span>
            <button
              className={`btn-favorite ${
                favorites.find((fav) => fav.query === item.query)
                  ? 'active'
                  : ''
              }`}
              onClick={() => toggleFavorite(item)}
            >
              <img
                src={
                  favorites.find((fav) => fav.query === item.query)
                    ? RedHearth
                    : GrayHearth
                }
                alt="Favoritar"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;
