export type HunterType = 1 | 2 | 3;
export type StorageLevel = 1 | 2 | 3;

export interface HunterConfig {
  type: HunterType;
  name: string;
  icon: string;
  productionPerHour: number;
  costPlata: number;
  costUsd: number;
  attack: number;
  defense: number;
  hp: number;
  requiredStorageLevel: StorageLevel;
}

export interface OwnedHunter {
  uid: string;
  type: HunterType;
  purchasedAt: number;
}

export interface GameState {
  plata: number;
  storageLevel: StorageLevel;
  storedArticles: number;
  totalArticlesClaimed: number;
  hunters: OwnedHunter[];
  lastTick: number;
}
