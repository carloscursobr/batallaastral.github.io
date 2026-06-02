import { STORAGE_LEVELS } from "../utils";
import { PlayerState } from "../types";

interface StoragePanelProps {
  player: PlayerState;
  onUpgrade: (level: number) => void;
}

export const StoragePanel = ({ player, onUpgrade }: StoragePanelProps) => {
  const currentLevel = STORAGE_LEVELS.find((l) => l.level === player.storageLevel);

  return (
    <div className="p-6 rounded-xl border border-green-700 bg-green-900/30">
      <h3 className="text-xl font-bold text-gold-400 font-cinzel mb-4">
        📦 Almacenamiento
      </h3>
      <p className="text-green-300 mb-2">
        Nivel: <strong className="text-white">{player.storageLevel}</strong> (Máx:{" "}
        <strong className="text-white">{player.maxCapacity.toLocaleString()}</strong> artículos)
      </p>
      <p className="text-green-300 mb-4">
        Capacidad actual: <strong className="text-white">{player.balance.toLocaleString()}</strong> /{" "}
        <strong className="text-white">{player.maxCapacity.toLocaleString()}</strong>
      </p>

      <div className="space-y-3">
        {STORAGE_LEVELS
          .filter((level) => level.level > player.storageLevel)
          .map((level) => (
            <button
              key={level.level}
              className="w-full py-2 rounded-lg bg-gold-500 hover:bg-gold-600 text-black font-semibold transition"
              onClick={() => onUpgrade(level.level)}
            >
              Mejorar a nivel {level.level} ({level.cost.toLocaleString()} plata)
            </button>
          ))}
      </div>
    </div>
  );
};
