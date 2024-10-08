import { SearchPlatform } from './SearchPlatform';

export interface SearchHistory {
  query: string;
  platform: SearchPlatform;
  url: string; // Adiciona a URL ao histórico
}
