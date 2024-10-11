import { SearchPlatform } from './SearchPlatform';

export interface SearchHistory {
  id: string;
  query: string;
  platform: SearchPlatform;
  url: string; // Adiciona a URL ao histórico
}
