import type { HunterConfig, StorageLevel } from '../types/game';

export const HUNTERS: HunterConfig[] = [
  {
    type: 1,
    name: 'Nayra',
    icon: '🌿',
    productionPerHour: 25,
    costPlata: 1000,
    costUsd: 1,
    attack: 55,
    defense: 30,
    hp: 120,
    requiredStorageLevel: 1,
  },
  {
    type: 2,
    name: 'Xiara',
    icon: '🔥',
    productionPerHour: 550,
    costPlata: 20000,
    costUsd: 2,
    attack: 75,
    defense: 50,
    hp: 150,
    requiredStorageLevel: 2,
  },
  {
    type: 3,
    name: 'Selene',
    icon: '🌙',
    productionPerHour: 3100,
    costPlata: 100000,
    costUsd: 10,
    attack: 120,
    defense: 70,
    hp: 180,
    requiredStorageLevel: 3,
  },
];

export const STORAGE_LEVELS = [
  { level: 1 as StorageLevel, capacity: 500, costPlata: 0, costUsd: 0 },
  { level: 2 as StorageLevel, capacity: 20000, costPlata: 20000, costUsd: 2 },
  { level: 3 as StorageLevel, capacity: 40000, costPlata: 50000, costUsd: 5 },
];

export function getHunter(type: HunterConfig['type']) {
  return HUNTERS.find((h) => h.type === type)!;
}

export function getStorage(level: StorageLevel) {
  return STORAGE_LEVELS.find((s) => s.level === level)!;
}
