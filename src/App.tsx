import { useEffect, useMemo, useState } from 'react';
import { getHunter, getStorage, HUNTERS, STORAGE_LEVELS } from './data/gameConfig';
import type { GameState, HunterType, StorageLevel } from './types/game';

const STORAGE_KEY = 'batalla-astral-state-v1';

const defaultState: GameState = {
  plata: 30000,
  storageLevel: 1,
  storedArticles: 0,
  totalArticlesClaimed: 0,
  hunters: [],
  lastTick: Date.now(),
};

function loadState(): GameState {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultState;

  try {
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

export default function App() {
  const [game, setGame] = useState<GameState>(loadState);
  const [claimOpen, setClaimOpen] = useState(false);
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
  }, [game]);

  // Minería pasiva
  useEffect(() => {
    const id = setInterval(() => {
      setGame((prev) => {
        const now = Date.now();
        const storage = getStorage(prev.storageLevel);
        const totalRate = prev.hunters.reduce(
          (sum, hunter) => sum + getHunter(hunter.type).productionPerHour,
          0,
        );

        // Si no hay cazadoras o el almacén está lleno, no acumula más
        if (totalRate <= 0 || prev.storedArticles >= storage.capacity) {
          return { ...prev, lastTick: now };
        }

        const elapsedHours = (now - prev.lastTick) / 3600000;
        if (elapsedHours <= 0) return prev;

        const gain = totalRate * elapsedHours;
        const nextStored = Math.min(storage.capacity, prev.storedArticles + gain);

        return {
          ...prev,
          storedArticles: nextStored,
          lastTick: now,
        };
      });
    }, 1000);

    return () => clearInterval(id);
  }, []);

  // Countdown del video antibots
  useEffect(() => {
    if (!claimOpen) return;

    setCountdown(15);
    const timer = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [claimOpen]);

  const storage = getStorage(game.storageLevel);
  const fillPercent = Math.min(100, (game.storedArticles / storage.capacity) * 100);

  const totalRate = useMemo(() => {
    return game.hunters.reduce(
      (sum, hunter) => sum + getHunter(hunter.type).productionPerHour,
      0,
    );
  }, [game.hunters]);

  const buyHunter = (type: HunterType) => {
    const hunter = getHunter(type);

    setGame((prev) => {
      const alreadyOwned = prev.hunters.some((h) => h.type === type);
      if (alreadyOwned) return prev;

      if (prev.storageLevel < hunter.requiredStorageLevel) return prev;
      if (prev.plata < hunter.costPlata) return prev;

      return {
        ...prev,
        plata: prev.plata - hunter.costPlata,
        hunters: [
          ...prev.hunters,
          {
            uid: `${type}-${Date.now()}`,
            type,
            purchasedAt: Date.now(),
          },
        ],
      };
    });
  };

  const upgradeStorage = () => {
    setGame((prev) => {
      if (prev.storageLevel >= 3) return prev;

      const nextLevel = (prev.storageLevel + 1) as StorageLevel;
      const nextStorage = getStorage(nextLevel);

      if (prev.plata < nextStorage.costPlata) return prev;

      return {
        ...prev,
        plata: prev.plata - nextStorage.costPlata,
        storageLevel: nextLevel,
        storedArticles: Math.min(prev.storedArticles, nextStorage.capacity),
      };
    });
  };

  const openClaim = () => {
    if (game.storedArticles <= 0) return;
    setClaimOpen(true);
  };

  const confirmClaim = () => {
    // En producción esto debe ejecutarse SOLO cuando el SDK del anuncio
    // confirme que el video recompensado fue visto completo.
    if (countdown > 0) return;

    setGame((prev) => ({
      ...prev,
      totalArticlesClaimed: prev.totalArticlesClaimed + Math.floor(prev.storedArticles),
      storedArticles: 0,
      lastTick: Date.now(),
    }));

    setClaimOpen(false);
  };

  const ownedTypes = game.hunters.map((h) => h.type);

  return (
    <div className="min-h-screen px-4 py-6 text-[#f6ebc8] md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <header className="rounded-3xl border border-yellow-700/30 bg-black/30 p-6 shadow-2xl backdrop-blur">
          <h1 className="font-cinzel text-3xl font-bold text-yellow-300 md:text-5xl">
            Batalla Astral
          </h1>
          <p className="mt-2 text-sm text-[#d8cfb0] md:text-base">
            Selva mística • almacén de recursos • cazadoras legendarias
          </p>
        </header>

        {/* Stats */}
        <section className="grid gap-4 md:grid-cols-4">
          <StatCard label="Plata" value={game.plata} sub="moneda interna" />
          <StatCard label="Almacén" value={`Nivel ${game.storageLevel}`} sub={`${storage.capacity} capacidad`} />
          <StatCard label="Recolectado" value={Math.floor(game.storedArticles)} sub={`${fillPercent.toFixed(0)}% lleno`} />
          <StatCard label="Producción/h" value={totalRate} sub="artículos por hora" />
        </section>

        {/* Almacén */}
        <section className="rounded-3xl border border-green-700/40 bg-black/30 p-5 backdrop-blur">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-cinzel text-2xl text-yellow-300">Almacén de Recursos</h2>
              <p className="text-sm text-[#cfc6a7]">
                Cuando se llena, la recolección se detiene hasta reclamar.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={openClaim}
                className="rounded-xl bg-yellow-500 px-4 py-2 font-semibold text-black transition hover:bg-yellow-400 disabled:opacity-50"
                disabled={game.storedArticles <= 0}
              >
                Reclamar con video 15s
              </button>

              <button
                onClick={upgradeStorage}
                className="rounded-xl bg-emerald-600 px-4 py-2 font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-50"
                disabled={game.storageLevel >= 3}
              >
                Mejorar almacén
              </button>
            </div>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-[#12301f]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-yellow-600 to-yellow-300 transition-all"
              style={{ width: `${fillPercent}%` }}
            />
          </div>

          <div className="mt-3 text-sm text-[#d9cfb1]">
            Capacidad actual: <b>{storage.capacity}</b> artículos
          </div>
        </section>

        {/* Mercado */}
        <section className="rounded-3xl border border-yellow-700/30 bg-black/30 p-5 backdrop-blur">
          <h2 className="mb-4 font-cinzel text-2xl text-yellow-300">Mercado de Cazadoras</h2>

          <div className="grid gap-4 md:grid-cols-3">
            {HUNTERS.map((hunter) => {
              const owned = ownedTypes.includes(hunter.type);
              const locked = game.storageLevel < hunter.requiredStorageLevel;

              return (
                <article
                  key={hunter.type}
                  className="rounded-2xl border border-green-700/40 bg-[#102014] p-4 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-yellow-500 bg-black text-3xl">
                      {hunter.icon}
                    </div>
                    <div>
                      <h3 className="font-cinzel text-xl text-yellow-300">{hunter.name}</h3>
                      <p className="text-sm text-[#cfc6a7]">Requiere almacén nivel {hunter.requiredStorageLevel}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1 text-sm text-[#e7dec2]">
                    <div>⚔️ Ataque: {hunter.attack}</div>
                    <div>🛡️ Defensa: {hunter.defense}</div>
                    <div>❤️ Vida: {hunter.hp}</div>
                    <div>⛏️ Producción: {hunter.productionPerHour} artículos/h</div>
                    <div>💰 Precio: {hunter.costPlata} plata</div>
                  </div>

                  <button
                    onClick={() => buyHunter(hunter.type)}
                    className="mt-4 w-full rounded-xl bg-yellow-500 px-4 py-2 font-semibold text-black transition hover:bg-yellow-400 disabled:opacity-50"
                    disabled={owned || locked || game.plata < hunter.costPlata}
                  >
                    {owned
                      ? 'Comprada'
                      : locked
                        ? 'Bloqueada'
                        : `Comprar`}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {/* Cazadoras activas */}
        <section className="rounded-3xl border border-green-700/40 bg-black/30 p-5 backdrop-blur">
          <h2 className="mb-4 font-cinzel text-2xl text-yellow-300">Mis Cazadoras</h2>

          {game.hunters.length === 0 ? (
            <p className="text-sm text-[#cfc6a7]">
              Aún no tienes cazadoras. Compra una para empezar a minar.
            </p>
          ) : (
            <div className="grid gap-3">
              {game.hunters.map((owned) => {
                const h = getHunter(owned.type);
                return (
                  <div
                    key={owned.uid}
                    className="flex flex-col gap-2 rounded-2xl border border-yellow-700/20 bg-[#122216] p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <div className="font-cinzel text-lg text-yellow-300">
                        {h.icon} {h.name}
                      </div>
                      <div className="text-sm text-[#cfc6a7]">
                        {h.productionPerHour} artículos/h • ATQ {h.attack} • DEF {h.defense} • HP {h.hp}
                      </div>
                    </div>
                    <div className="text-sm text-[#d9cfb1]">
                      Producción activa: <b>{h.productionPerHour}</b>/h
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Modal de video */}
      {claimOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-3xl border border-yellow-700/40 bg-[#08130d] p-6 shadow-2xl">
            <h3 className="font-cinzel text-2xl text-yellow-300">Video antibots</h3>
            <p className="mt-2 text-sm text-[#cfc6a7]">
              Mira el video de 15 segundos para poder reclamar.
            </p>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#16301f]">
              <div
                className="h-full bg-gradient-to-r from-yellow-600 to-yellow-300 transition-all"
                style={{ width: `${((15 - countdown) / 15) * 100}%` }}
              />
            </div>

            <div className="mt-4 text-center text-3xl font-bold text-yellow-300">
              {countdown > 0 ? `${countdown}s` : 'Listo'}
            </div>

            <button
              onClick={confirmClaim}
              disabled={countdown > 0}
              className="mt-6 w-full rounded-xl bg-yellow-500 px-4 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:opacity-50"
            >
              Reclamar ahora
            </button>

            <button
              onClick={() => setClaimOpen(false)}
              className="mt-3 w-full rounded-xl border border-[#2d5a3f] px-4 py-3 font-semibold text-[#f6ebc8]"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: number | string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-yellow-700/20 bg-black/30 p-4 backdrop-blur">
      <div className="text-xs uppercase tracking-widest text-[#b8ab83]">{label}</div>
      <div className="mt-2 font-cinzel text-2xl text-yellow-300">{value}</div>
      <div className="text-sm text-[#cfc6a7]">{sub}</div>
    </div>
  );
}
