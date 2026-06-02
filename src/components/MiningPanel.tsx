import { calculatePassiveIncome } from "../utils";
import { PlayerState, Hunter } from "../types";

interface MiningPanelProps {
  player: PlayerState;
  hunter: Hunter | null;
}

export const MiningPanel = ({ player, hunter }: MiningPanelProps) => {
  const now = Date.now();
  const pending = hunter ? calculatePassiveIncome(hunter, player.lastClaim, now) : 0;

  return (
    <div className="p-6 rounded-xl border border-green-700 bg-green-900/30">
      <h3 className="text-xl font-bold text-gold-400 font-cinzel mb-4">
        🌿 Minería Pasiva
      </h3>

      {hunter ? (
        <>
          <p className="text-green-300 mb-2">
            Cazadora activa: <strong className="text-white">{hunter.name}</strong>
          </p>
          <p className="text-green-300 mb-2">
            Generando: <strong className="text-white">{hunter.rate}</strong> artículos/hora
          </p>
          <p className="text-green-300 mb-4">
            Recursos acumulados: <strong className="text-white">{pending.toLocaleString()}</strong>
          </p>
          <button
            className="w-full py-2 rounded-lg bg-gold-500 hover:bg-gold-600 text-black font-semibold transition"
            onClick={() => {
              // Simulamos el video anti-bots
              alert("Reproduciendo video de 15 segundos... (simulado)");
              setTimeout(() => {
                alert("¡Video completado! Recursos reclamados.");
              }, 15000);
            }}
          >
            {player.hasWatchedAd ? "Reclamar ahora" : "Ver video (15s) para reclamar"}
          </button>
        </>
      ) : (
        <p className="text-green-300">
          Selecciona una cazadora para empezar a minar.
        </p>
      )}
    </div>
  );
};
