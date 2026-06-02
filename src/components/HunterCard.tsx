import { Hunter } from "../types";

interface HunterCardProps {
  hunter: Hunter;
  isSelected: boolean;
  onBuy: (hunter: Hunter) => void;
}

export const HunterCard = ({ hunter, isSelected, onBuy }: HunterCardProps) => {
  return (
    <div
      className={`p-6 rounded-xl border-2 transition-all ${
        isSelected
          ? "border-gold-400 bg-green-900/50"
          : "border-green-700 hover:border-gold-400"
      }`}
    >
      <h3 className="text-xl font-bold text-gold-400 font-cinzel mb-2">
        {hunter.name}
      </h3>
      <p className="text-4xl mb-3">{hunter.icon}</p>
      <p className="text-green-300 mb-2">
        Genera: <strong className="text-white">{hunter.rate}</strong> artículos/hora
      </p>
      <p className="text-green-300 mb-2">
        Costo: <strong className="text-white">{hunter.cost.toLocaleString()}</strong> plata
      </p>
      <p className="text-green-300 mb-4">
        Stats: ⚔️{hunter.stats.attack} 🛡️{hunter.stats.defense} ❤️{hunter.stats.health}
      </p>
      <button
        className={`w-full py-2 rounded-lg font-semibold transition ${
          isSelected
            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
            : "bg-gold-500 hover:bg-gold-600 text-black"
        }`}
        onClick={() => onBuy(hunter)}
        disabled={isSelected}
      >
        {isSelected ? "Seleccionada" : "Comprar"}
      </button>
    </div>
  );
};
