import { useState, useEffect } from 'react';

// ─── Fireflies / particle background ─────────────────────────────────────────
const JungleParticles = () => {
  const flies = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    dur: Math.random() * 5 + 3,
    delay: Math.random() * 6,
  }));
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    dur: Math.random() * 3 + 1,
    delay: Math.random() * 4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep jungle nebula blobs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 20% 30%, rgba(26,107,26,0.4) 0%, transparent 70%)' }} />
      <div className="absolute top-0 right-0 w-2/3 h-2/3 opacity-20"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 80% 20%, rgba(201,162,39,0.2) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-1/3 w-2/3 h-2/3 opacity-25"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 90%, rgba(22,163,74,0.3) 0%, transparent 70%)' }} />

      {/* Stars/sparkles */}
      {stars.map((s) => (
        <div key={`s${s.id}`} className="absolute rounded-full bg-green-300"
          style={{
            width: s.size, height: s.size,
            left: `${s.x}%`, top: `${s.y}%`,
            opacity: 0.4,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }} />
      ))}
      {/* Fireflies */}
      {flies.map((f) => (
        <div key={`f${f.id}`} className="firefly"
          style={{
            width: f.size, height: f.size,
            left: `${f.x}%`, top: `${f.y}%`,
            '--dur': `${f.dur}s`, '--delay': `${f.delay}s`,
          } as React.CSSProperties} />
      ))}
    </div>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label: 'Inicio', id: 'hero' },
    { label: 'Personajes', id: 'characters' },
    { label: 'Cómo Jugar', id: 'howtoplay' },
    { label: 'Recursos', id: 'recursos' },
    { label: 'Arena PvP', id: 'pvp' },
    { label: 'Roadmap', id: 'roadmap' },
  ];

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-jungle' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => go('hero')} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full flex items-center justify-center animate-glow-green"
              style={{ background: 'linear-gradient(135deg, #0f5e0f, #1a8f1a)' }}>
              <span className="text-base">🐍</span>
            </div>
            <div className="text-left">
              <div className="font-cinzel font-black text-sm leading-none text-gold">BATALLA</div>
              <div className="font-cinzel font-black text-sm leading-none text-green-400">ASTRAL</div>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-5">
            {links.map((l) => (
              <button key={l.id} onClick={() => go(l.id)}
                className="font-rajdhani text-sm font-semibold text-green-200 hover:text-yellow-300 transition-colors tracking-wide uppercase">
                {l.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex gap-2">
            <button className="btn-telegram px-4 py-2 rounded-lg font-cinzel text-xs font-bold text-white tracking-wide">
              📱 Telegram
            </button>
            <button className="btn-gold px-4 py-2 rounded-lg font-cinzel text-xs font-bold text-gray-900 tracking-wide">
              ⚔️ JUGAR
            </button>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-green-300 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden nav-jungle border-t border-yellow-900/40 py-4 px-4 flex flex-col gap-2">
          {links.map((l) => (
            <button key={l.id} onClick={() => go(l.id)}
              className="text-left text-green-200 hover:text-yellow-300 font-semibold py-2 border-b border-green-900/30 tracking-wide">
              {l.label}
            </button>
          ))}
          <button className="btn-telegram mt-3 py-3 rounded-lg font-cinzel text-sm font-bold text-white">📱 Entrar con Telegram</button>
          <button className="btn-gold mt-2 py-3 rounded-lg font-cinzel text-sm font-bold text-gray-900">⚔️ JUGAR AHORA</button>
        </div>
      )}
    </nav>
  );
};

// ─── Hero Section ─────────────────────────────────────────────────────────────
const HeroSection = () => {
  const [players, setPlayers] = useState(0);
  useEffect(() => {
    let v = 0;
    const t = setInterval(() => {
      v += 600;
      if (v >= 47382) { setPlayers(47382); clearInterval(t); }
      else setPlayers(v);
    }, 25);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* BG image */}
      <div className="absolute inset-0 z-0">
        <img src="/images/hero-bg.jpg" alt="Batalla Astral" className="w-full h-full object-cover object-center" />
        <div className="hero-overlay absolute inset-0" />
        {/* Extra green tint at bottom */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 100%, rgba(5,14,5,1) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 section-badge mb-8 animate-slide-up">
          <span className="w-2 h-2 bg-green-400 rounded-full" style={{ animation: 'twinkle 1.5s ease-in-out infinite' }} />
          <span className="text-yellow-300 text-xs font-semibold tracking-widest uppercase font-cinzel">
            🐍 Temporada 1 — El Despertar de la Serpiente
          </span>
        </div>

        {/* Game title */}
        <div className="mb-2">
          <h1 className="font-cinzel font-black leading-none" style={{ fontSize: 'clamp(3rem,10vw,7rem)' }}>
            <span className="text-gold">BATALLA</span>
          </h1>
          <h1 className="font-cinzel font-black leading-none" style={{ fontSize: 'clamp(3rem,10vw,7rem)' }}>
            <span className="text-green-glow">ASTRAL</span>
          </h1>
        </div>

        <p className="text-green-200 text-base sm:text-xl font-rajdhani font-light mb-2 tracking-widest italic">
          "La selva recuerda cada vínculo"
        </p>
        <p className="text-yellow-200 text-sm sm:text-base mb-10 font-rajdhani">
          Las guardianas de la selva te esperan… ¿Estás listo para reclamar tu destino?
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-5 mb-12">
          {[
            { icon: '👾', v: players.toLocaleString(), label: 'Guerreros Activos' },
            { icon: '🪙', v: '2.4M', label: 'AstraCoins Repartidos' },
            { icon: '🏆', v: '$50 USD', label: 'Premio #1 Ranking' },
          ].map((s) => (
            <div key={s.label} className="card-jungle rounded-xl px-6 py-4 text-center min-w-[140px]">
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="font-cinzel font-black text-xl text-gold">{s.v}</div>
              <div className="text-green-300 text-xs mt-1 tracking-wider uppercase font-rajdhani">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <button className="btn-telegram px-8 py-4 rounded-xl font-cinzel text-sm font-bold text-white tracking-wider shadow-2xl">
            📱 ENTRAR CON TELEGRAM
          </button>
          <button className="btn-gold px-8 py-4 rounded-xl font-cinzel text-sm font-black text-gray-900 tracking-wider shadow-2xl">
            🎮 CREAR EXPEDICIÓN
          </button>
        </div>

        {/* Scroll hint */}
        <div className="mt-14 flex flex-col items-center gap-2 opacity-40">
          <span className="text-green-400 text-xs tracking-widest uppercase font-cinzel">Descender</span>
          <div className="w-px h-10 bg-gradient-to-b from-green-500 to-transparent animate-pulse" />
          <span className="text-lg" style={{ animation: 'float 2s ease-in-out infinite' }}>🐍</span>
        </div>
      </div>
    </section>
  );
};

// ─── Characters Section ───────────────────────────────────────────────────────
const characters = [
  {
    id: 'nayra',
    name: 'NAYRA',
    subtitle: 'Dulce y Curiosa',
    class: 'Cazadora',
    img: '/images/nayra.png',
    personality: 'Con una sonrisa que oculta siglos de sabiduría selvática. Nayra domina las serpientes del bosque con suave firmeza y un espíritu lleno de curiosidad.',
    element: '🌿 Naturaleza',
    elementColor: '#16a34a',
    stats: { ataque: 65, defensa: 55, velocidad: 80, recoleccion: 90 },
    resources: ['Carne Estelar', 'Hierba Cuántica'],
    bonus: '+30% Velocidad de caza',
    rarity: 'Rara',
    rarityColor: '#4ade80',
    accentColor: '#16a34a',
    glowColor: 'rgba(74,222,128,0.6)',
  },
  {
    id: 'xiara',
    name: 'XIARA',
    subtitle: 'Atrevida y Coqueta',
    class: 'Cazadora-Guerrera',
    img: '/images/xiara.png',
    personality: 'Xiara camina entre mundos. Mitad mujer, mitad serpiente, toda poder. Su lengua es tan afilada como su colmillo y su coquetería tan letal como su veneno.',
    element: '🔥 Fuego & Veneno',
    elementColor: '#f59e0b',
    stats: { ataque: 90, defensa: 60, velocidad: 70, recoleccion: 75 },
    resources: ['Carne Estelar', 'Piedra Galáctica'],
    bonus: '+40% Daño en combate',
    rarity: 'Épica',
    rarityColor: '#f59e0b',
    accentColor: '#d97706',
    glowColor: 'rgba(245,158,11,0.6)',
  },
  {
    id: 'selene',
    name: 'SELENE',
    subtitle: 'Misteriosa y Tranquila',
    class: 'Exploradora Mística',
    img: '/images/selene.png',
    personality: 'La guardiana más antigua de la selva. Su mirada verde esmeralda lo ve todo. Selene mueve la naturaleza con solo pensar, y la selva obedece.',
    element: '🌙 Luna & Arcano',
    elementColor: '#a855f7',
    stats: { ataque: 50, defensa: 85, velocidad: 60, recoleccion: 95 },
    resources: ['Hierba Cuántica', 'Piedra Galáctica'],
    bonus: '+50% Recolección de recursos',
    rarity: 'Legendaria',
    rarityColor: '#a855f7',
    accentColor: '#7c3aed',
    glowColor: 'rgba(168,85,247,0.6)',
  },
];

const CharactersSection = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="characters" className="relative py-24 px-4">
      <div className="divider-gold mb-20" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-badge mb-4 mx-auto">
            <span className="text-yellow-400 text-xs font-cinzel tracking-widest uppercase">Guardianas de la Selva</span>
          </div>
          <h2 className="font-cinzel font-black text-4xl sm:text-6xl mb-3">
            <span className="text-white">ELIGE TU </span><span className="text-green-glow">CAZADORA</span>
          </h2>
          <p className="text-green-200 text-lg max-w-2xl mx-auto font-rajdhani">
            Cada guerrera tiene su propia historia, habilidades únicas y un vínculo especial con la serpiente sagrada.
          </p>
        </div>

        {/* Character Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {characters.map((ch) => (
            <div key={ch.id}
              className={`card-character rounded-2xl overflow-hidden cursor-pointer ${selected === ch.id ? 'selected' : ''}`}
              style={{ borderColor: selected === ch.id ? ch.accentColor : undefined }}
              onClick={() => setSelected(selected === ch.id ? null : ch.id)}>

              {/* Rarity badge */}
              <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <span className="text-xs font-cinzel font-bold px-3 py-1 rounded-full border"
                  style={{ color: ch.rarityColor, borderColor: ch.rarityColor, background: `${ch.rarityColor}15` }}>
                  ◆ {ch.rarity}
                </span>
                <span className="text-xs text-green-400 font-rajdhani">{ch.class}</span>
              </div>

              {/* Character image */}
              <div className="relative mx-4 rounded-xl overflow-hidden"
                style={{ background: `linear-gradient(180deg, ${ch.accentColor}22, rgba(5,14,5,0.8))` }}>
                <img src={ch.img} alt={ch.name}
                  className="w-full object-cover"
                  style={{
                    height: '320px',
                    objectPosition: 'top',
                    filter: `drop-shadow(0 0 20px ${ch.glowColor})`,
                    animation: 'float 3.5s ease-in-out infinite',
                  }} />
                {/* Overlay gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-16"
                  style={{ background: 'linear-gradient(0deg, rgba(5,14,5,1), transparent)' }} />
              </div>

              {/* Character info */}
              <div className="px-5 pb-5 pt-3">
                <h3 className="font-cinzel font-black text-3xl text-gold leading-none">{ch.name}</h3>
                <p className="text-green-300 text-sm font-rajdhani italic mb-3">{ch.subtitle}</p>

                <p className="text-green-100 text-sm font-rajdhani leading-relaxed mb-4 opacity-80">
                  {ch.personality}
                </p>

                {/* Element */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-rajdhani font-semibold" style={{ color: ch.elementColor }}>{ch.element}</span>
                </div>

                {/* Stats */}
                <div className="space-y-2 mb-4">
                  {Object.entries(ch.stats).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-3">
                      <span className="text-xs text-green-400 w-20 capitalize font-rajdhani">{k}</span>
                      <div className="flex-1 stat-bar-track">
                        <div className="stat-bar-fill transition-all duration-700"
                          style={{ width: `${v}%`, background: `linear-gradient(90deg, ${ch.accentColor}, ${ch.rarityColor})` }} />
                      </div>
                      <span className="text-xs text-yellow-300 w-6 text-right font-cinzel">{v}</span>
                    </div>
                  ))}
                </div>

                {/* Bonus */}
                <div className="card-jungle rounded-lg px-3 py-2 mb-4">
                  <span className="text-xs text-yellow-300 font-cinzel">⚡ {ch.bonus}</span>
                </div>

                {/* Resources */}
                <div className="flex flex-wrap gap-2">
                  {ch.resources.map((r) => (
                    <span key={r} className="text-xs bg-green-900/30 text-green-300 border border-green-700/40 px-2 py-1 rounded font-rajdhani">
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Select button */}
              <div className="px-5 pb-5">
                <button
                  className={`w-full py-3 rounded-xl font-cinzel text-sm font-bold tracking-wider transition-all ${
                    selected === ch.id ? 'btn-gold text-gray-900' : 'btn-jungle text-white'
                  }`}>
                  {selected === ch.id ? '✓ SELECCIONADA' : '⚔️ ELEGIR CAZADORA'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Selected character expanded */}
        {selected && (() => {
          const ch = characters.find((c) => c.id === selected)!;
          return (
            <div className="card-jungle rounded-2xl p-6 border-2 animate-slide-up"
              style={{ borderColor: ch.accentColor }}>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <img src={ch.img} alt={ch.name}
                  className="w-28 h-28 object-cover object-top rounded-xl"
                  style={{ filter: `drop-shadow(0 0 15px ${ch.glowColor})` }} />
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-green-400 text-xs font-cinzel uppercase tracking-widest mb-1">Cazadora Seleccionada</p>
                  <h3 className="font-cinzel font-black text-3xl text-gold">{ch.name}</h3>
                  <p className="text-green-200 text-sm italic font-rajdhani mb-3">{ch.subtitle}</p>
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                    <button className="btn-gold px-6 py-3 rounded-xl font-cinzel text-sm font-black text-gray-900">
                      🎮 CREAR EXPEDICIÓN
                    </button>
                    <button className="btn-jungle px-6 py-3 rounded-xl font-cinzel text-sm font-bold text-white">
                      📖 Ver Historia Completa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};

// ─── How To Play ──────────────────────────────────────────────────────────────
const HowToPlaySection = () => {
  const steps = [
    { icon: '📱', n: '01', title: 'Conéctate', desc: 'Abre el bot en Telegram e inicia tu aventura. Sin descargas adicionales.' },
    { icon: '🐍', n: '02', title: 'Elige tu Cazadora', desc: 'Selecciona entre Nayra, Xiara, Selene u otras guerreras de la selva.' },
    { icon: '🌿', n: '03', title: 'Recolecta Pasivo', desc: 'Tu cazadora trabaja sola: caza, explora y recolecta mientras tú descansas.' },
    { icon: '🪙', n: '04', title: 'Gana AstraCoin', desc: 'Cada 100 recursos recolectados se convierten en 1 AstraCoin automáticamente.' },
    { icon: '⚔️', n: '05', title: 'Arena PvP', desc: 'Usa tus monedas para mejorar y luchar en el ranking semanal por $50 USD.' },
    { icon: '🏆', n: '06', title: 'Cobra tu Premio', desc: 'Mantente en los primeros lugares y recibe dinero real directo a tu billetera.' },
  ];

  return (
    <section id="howtoplay" className="relative py-24 px-4">
      <div className="divider-gold mb-20" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-badge mb-4 mx-auto">
            <span className="text-yellow-400 text-xs font-cinzel tracking-widest uppercase">Tu Camino al Poder</span>
          </div>
          <h2 className="font-cinzel font-black text-4xl sm:text-5xl mb-3">
            <span className="text-white">CÓMO </span><span className="text-gold">JUGAR</span>
          </h2>
          <p className="text-green-200 text-lg max-w-2xl mx-auto font-rajdhani">
            De novato a leyenda de la selva en 6 pasos simples.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={s.n} className="card-jungle rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-4 right-4 font-cinzel font-black text-5xl text-green-900 opacity-30 group-hover:opacity-50 transition-opacity">
                {s.n}
              </div>
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-cinzel font-bold text-xl text-gold mb-2">{s.title}</h3>
              <p className="text-green-200 text-sm font-rajdhani leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 text-yellow-500 text-xl hidden lg:block">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Resources Section ────────────────────────────────────────────────────────
const ResourcesSection = () => {
  const resources = [
    { emoji: '🍖', name: 'Carne Estelar', desc: 'Las cazadoras cazan bestias místicas en zonas profundas de la selva. Alta demanda en el mercado.', rate: '+12/hr', color: '#ef4444', who: 'Cazadoras' },
    { emoji: '🪨', name: 'Piedra Galáctica', desc: 'Extraída de ruinas antiguas y afloramientos rocosos escondidos entre los árboles milenarios.', rate: '+8/hr', color: '#8b5cf6', who: 'Exploradoras' },
    { emoji: '🌿', name: 'Hierba Cuántica', desc: 'Plantas mágicas que crecen bajo la luna. Potencian habilidades y son esenciales para pociones.', rate: '+5/hr', color: '#16a34a', who: 'Ambas' },
  ];

  return (
    <section id="recursos" className="relative py-24 px-4">
      <div className="divider-gold mb-20" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-badge mb-4 mx-auto">
            <span className="text-yellow-400 text-xs font-cinzel tracking-widest uppercase">Economía del Juego</span>
          </div>
          <h2 className="font-cinzel font-black text-4xl sm:text-5xl mb-3">
            <span className="text-white">RECURSOS & </span><span className="text-green-glow">ASTRACOIN</span>
          </h2>
        </div>

        {/* Formula hero */}
        <div className="card-jungle rounded-2xl p-6 sm:p-8 mb-12 text-center border animate-pulse-border max-w-3xl mx-auto">
          <p className="text-yellow-400 text-xs font-cinzel tracking-widest uppercase mb-4">⚡ Fórmula de Conversión</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-2xl sm:text-3xl font-cinzel font-black">
            <span className="text-white">100</span>
            <span className="text-green-400">Recursos</span>
            <span className="text-yellow-400 text-4xl">→</span>
            <img src="/images/astracoin.png" alt="AstraCoin"
              className="w-12 h-12 rounded-full animate-spin-slow"
              style={{ filter: 'drop-shadow(0 0 10px rgba(201,162,39,0.8))' }} />
            <span className="text-gold">1 AstraCoin</span>
          </div>
          <p className="text-green-300 text-sm mt-4 font-rajdhani">
            Aplica para los 3 recursos: Carne Estelar, Piedra Galáctica, Hierba Cuántica
          </p>
        </div>

        {/* Resource cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((r) => (
            <div key={r.name} className="card-jungle rounded-2xl p-6 hover:scale-105 transition-all duration-300">
              <div className="text-6xl mb-4 animate-float">{r.emoji}</div>
              <h3 className="font-cinzel font-bold text-xl text-gold mb-2">{r.name}</h3>
              <p className="text-green-200 text-sm font-rajdhani leading-relaxed mb-4">{r.desc}</p>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs text-green-400 uppercase font-rajdhani tracking-wider">Tasa base</div>
                  <div className="font-cinzel font-black text-2xl" style={{ color: r.color }}>{r.rate}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-green-400 uppercase font-rajdhani tracking-wider">Recolecta</div>
                  <div className="font-cinzel font-bold text-sm text-yellow-300">{r.who}</div>
                </div>
              </div>
              <div className="stat-bar-track">
                <div className="progress-jungle h-full rounded-full"
                  style={{ width: r.rate === '+12/hr' ? '75%' : r.rate === '+8/hr' ? '50%' : '35%',
                    background: `linear-gradient(90deg, ${r.color}88, ${r.color})` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── PvP Arena ────────────────────────────────────────────────────────────────
const PvPSection = () => {
  const ranking = [
    { pos: 1, name: 'SerpentLord_X', score: 98420, reward: '$50 USD', badge: '👑', delta: '+3', ch: 'Xiara' },
    { pos: 2, name: 'JungleQueen', score: 87310, reward: 'Top 3%', badge: '🥈', delta: '-1', ch: 'Selene' },
    { pos: 3, name: 'NayraFang', score: 75990, reward: 'Top 3%', badge: '🥉', delta: '+5', ch: 'Nayra' },
    { pos: 4, name: 'VenomStrike', score: 62140, reward: 'Top 10%', badge: '🌟', delta: '+2', ch: 'Xiara' },
    { pos: 5, name: 'SeleneWrath', score: 54780, reward: 'Top 10%', badge: '⭐', delta: '-2', ch: 'Selene' },
  ];

  return (
    <section id="pvp" className="relative py-24 px-4">
      <div className="divider-gold mb-20" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-badge mb-4 mx-auto">
            <span className="text-yellow-400 text-xs font-cinzel tracking-widest uppercase">Combate entre Jugadores</span>
          </div>
          <h2 className="font-cinzel font-black text-4xl sm:text-5xl mb-3">
            <span className="text-white">ARENA </span><span className="text-gold">PvP</span>
          </h2>
          <p className="text-green-200 text-lg max-w-2xl mx-auto font-rajdhani">
            Enfrenta a otros operadores. Tus cazadoras lucharán por el dominio de la selva.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Arena visual + prize pool */}
          <div>
            {/* Arena visual (CSS art) */}
            <div className="rounded-2xl overflow-hidden mb-6 relative" style={{ height: 280,
              background: 'linear-gradient(135deg, rgba(5,30,5,0.9), rgba(5,14,5,1))',
              border: '2px solid rgba(201,162,39,0.4)' }}>
              {/* Background glow circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.15) 0%, transparent 70%)',
                    boxShadow: '0 0 60px rgba(74,222,128,0.2)' }} />
              </div>
              {/* Arena ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full"
                  style={{ border: '2px solid rgba(201,162,39,0.4)', boxShadow: '0 0 30px rgba(201,162,39,0.2)' }} />
              </div>
              {/* Characters in arena */}
              <div className="absolute inset-0 flex items-center justify-around px-12">
                <div className="text-center">
                  <img src="/images/nayra.png" alt="" className="w-16 h-20 object-cover object-top rounded-lg animate-float"
                    style={{ filter: 'drop-shadow(0 0 15px rgba(74,222,128,0.8))' }} />
                  <span className="text-xs text-green-400 font-cinzel block mt-1">Nayra</span>
                </div>
                <div className="text-center">
                  <div className="font-cinzel font-black text-3xl text-gold animate-pulse">⚔️</div>
                  <div className="text-yellow-300 text-xs font-cinzel mt-1">VS</div>
                </div>
                <div className="text-center">
                  <img src="/images/xiara.png" alt="" className="w-16 h-20 object-cover object-top rounded-lg animate-float2"
                    style={{ filter: 'drop-shadow(0 0 15px rgba(245,158,11,0.8))' }} />
                  <span className="text-xs text-yellow-400 font-cinzel block mt-1">Xiara</span>
                </div>
              </div>
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 text-center pb-4">
                <span className="text-xs text-green-400 font-cinzel tracking-widest uppercase">● Torneo Semanal Activo</span>
              </div>
            </div>

            {/* Prize pool */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="card-jungle rounded-xl p-5 text-center border"
                style={{ borderColor: 'rgba(201,162,39,0.5)' }}>
                <div className="text-4xl mb-2">🏆</div>
                <div className="font-cinzel font-black text-3xl text-gold">$50</div>
                <div className="text-yellow-300 text-xs font-rajdhani uppercase tracking-wider mt-1">Premio Lugar #1</div>
              </div>
              <div className="card-jungle rounded-xl p-5 text-center border"
                style={{ borderColor: 'rgba(74,222,128,0.4)' }}>
                <div className="text-4xl mb-2">📺</div>
                <div className="font-cinzel font-black text-3xl text-green-400">10%</div>
                <div className="text-green-300 text-xs font-rajdhani uppercase tracking-wider mt-1">Pool Publicidad</div>
              </div>
            </div>

            <div className="card-jungle rounded-xl p-4 border" style={{ borderColor: 'rgba(74,222,128,0.25)' }}>
              <p className="text-green-200 text-sm font-rajdhani leading-relaxed">
                💡 <strong className="text-yellow-300">¿Cómo funciona el premio?</strong><br />
                El <strong className="text-green-400">$50 USD</strong> va al operador #1 del ranking semanal. Además, el <strong className="text-green-400">10% de todos los ingresos por anuncios</strong> (videos vistos por usuarios) se distribuye entre los mejores del ranking.
              </p>
            </div>
          </div>

          {/* Right: Ranking table */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-cinzel font-bold text-xl text-gold">🏅 Ranking Semanal</h3>
              <span className="text-xs text-green-400 border border-green-700/50 bg-green-900/20 px-3 py-1 rounded-full font-rajdhani font-semibold">
                ● EN VIVO
              </span>
            </div>

            <div className="space-y-3">
              {ranking.map((r) => (
                <div key={r.pos}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 border transition-all hover:scale-[1.01] ${
                    r.pos === 1
                      ? 'border-yellow-500/60 bg-yellow-900/10'
                      : 'card-jungle border-green-900/40'
                  }`}>
                  {/* Rank */}
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full font-cinzel font-black text-base flex-shrink-0 ${
                    r.pos === 1 ? 'rank-1' : r.pos === 2 ? 'rank-2' : r.pos === 3 ? 'rank-3' : 'bg-green-900/50 text-green-400'
                  }`}>
                    {r.pos <= 3 ? r.badge : `#${r.pos}`}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-cinzel font-bold text-sm text-white truncate">{r.name}</div>
                    <div className="flex gap-2 items-center">
                      <span className="text-green-400 text-xs font-rajdhani">{r.score.toLocaleString()} pts</span>
                      <span className="text-green-600 text-xs">·</span>
                      <span className="text-yellow-500 text-xs font-rajdhani">{r.ch}</span>
                    </div>
                  </div>
                  {/* Reward + delta */}
                  <div className="text-right flex-shrink-0">
                    <div className={`text-xs font-cinzel font-bold ${r.pos === 1 ? 'text-gold' : 'text-green-300'}`}>{r.reward}</div>
                    <div className={`text-xs font-rajdhani font-bold ${r.delta.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {r.delta}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full btn-jungle mt-6 py-4 rounded-xl font-cinzel font-bold text-sm tracking-wider text-white">
              ⚔️ ENTRAR A LA ARENA PvP
            </button>
            <p className="text-green-500 text-xs text-center mt-2 font-rajdhani">
              Siguiente temporada en: 4d 12h 33m
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Roadmap ──────────────────────────────────────────────────────────────────
const RoadmapSection = () => {
  const phases = [
    {
      n: '01', phase: 'Fase 1', title: 'El Despertar',
      status: 'Activo ✓', sc: 'text-green-400 border-green-600 bg-green-900/20',
      items: ['Bot Telegram activo', 'Recolección pasiva', 'Personajes: Nayra, Xiara, Selene', 'AstraCoin básico'],
    },
    {
      n: '02', phase: 'Fase 2', title: 'Arena de Sangre',
      status: 'En Desarrollo', sc: 'text-yellow-400 border-yellow-600 bg-yellow-900/20',
      items: ['Sistema PvP completo', 'Ranking semanal', 'Premio $50 USD', 'Pool publicidad 10%'],
    },
    {
      n: '03', phase: 'Fase 3', title: 'La Expansión',
      status: 'Próximamente', sc: 'text-purple-400 border-purple-600 bg-purple-900/20',
      items: ['Nuevas cazadoras', 'NFTs coleccionables', 'Marketplace P2P', 'Clanes y gremios'],
    },
    {
      n: '04', phase: 'Fase 4', title: 'Dominio Total',
      status: 'Futuro', sc: 'text-blue-400 border-blue-600 bg-blue-900/20',
      items: ['Exploración mundo 3D', 'Cross-chain TON', 'DAO governance', 'Listing exchanges'],
    },
  ];

  return (
    <section id="roadmap" className="relative py-24 px-4 pb-32">
      <div className="divider-gold mb-20" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-badge mb-4 mx-auto">
            <span className="text-yellow-400 text-xs font-cinzel tracking-widest uppercase">Plan de Expansión</span>
          </div>
          <h2 className="font-cinzel font-black text-4xl sm:text-5xl mb-3">
            <span className="text-white">ROADMAP </span><span className="text-green-glow">ASTRAL</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((p) => (
            <div key={p.n} className={`card-jungle rounded-2xl p-6 ${p.n === '01' ? 'border border-green-600/50' : ''}`}>
              <div className="font-cinzel font-black text-4xl text-green-900 opacity-30 mb-2">{p.n}</div>
              <span className={`text-xs font-rajdhani font-bold border px-2 py-1 rounded-full ${p.sc}`}>{p.status}</span>
              <h3 className="font-cinzel font-bold text-base text-gold mt-3 mb-1">{p.phase}</h3>
              <p className="text-green-300 text-sm font-rajdhani font-semibold mb-4">{p.title}</p>
              <ul className="space-y-2">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-green-200 font-rajdhani">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${p.n === '01' ? 'bg-green-400' : 'bg-green-800'}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="relative">
    {/* CTA Banner */}
    <div className="relative overflow-hidden py-20 px-4"
      style={{ background: 'linear-gradient(135deg, rgba(5,30,5,0.95), rgba(5,14,5,1))' }}>
      <div className="absolute inset-0"
        style={{ backgroundImage: 'url(/images/hero-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }} />
      {/* Green ambient */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(22,163,74,0.15) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="flex justify-center gap-4 mb-6">
          <img src="/images/nayra.png" alt="Nayra"
            className="w-16 h-20 object-cover object-top rounded-xl animate-float"
            style={{ filter: 'drop-shadow(0 0 10px rgba(74,222,128,0.6))' }} />
          <img src="/images/xiara.png" alt="Xiara"
            className="w-16 h-20 object-cover object-top rounded-xl animate-float2"
            style={{ filter: 'drop-shadow(0 0 10px rgba(245,158,11,0.6))', animationDelay: '1s' }} />
          <img src="/images/selene.png" alt="Selene"
            className="w-16 h-20 object-cover object-top rounded-xl animate-float"
            style={{ filter: 'drop-shadow(0 0 10px rgba(168,85,247,0.6))', animationDelay: '0.5s' }} />
        </div>

        <h2 className="font-cinzel font-black text-3xl sm:text-5xl text-white mb-3">
          ¿LISTO PARA LA <span className="text-gold">BATALLA?</span>
        </h2>
        <p className="text-green-200 text-lg mb-8 max-w-2xl mx-auto font-rajdhani italic">
          "Las guardianas te esperan en la selva. Tu destino está escrito en las escamas de la serpiente sagrada."
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="btn-telegram px-10 py-4 rounded-xl font-cinzel text-sm font-bold text-white tracking-wider shadow-2xl">
            📱 ENTRAR CON TELEGRAM
          </button>
          <button className="btn-gold px-10 py-4 rounded-xl font-cinzel text-sm font-black text-gray-900 tracking-wider shadow-2xl">
            🎮 CREAR EXPEDICIÓN AHORA
          </button>
        </div>
      </div>
    </div>

    {/* Footer bar */}
    <div className="border-t py-8 px-4" style={{ background: 'rgba(3,8,3,0.95)', borderColor: 'rgba(201,162,39,0.2)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center animate-glow-green"
            style={{ background: 'linear-gradient(135deg, #0f5e0f, #1a8f1a)' }}>
            <span>🐍</span>
          </div>
          <div>
            <span className="font-cinzel font-black text-gold text-sm">BATALLA ASTRAL</span>
            <span className="text-green-700 text-xs block">GameFi · Temporada 1</span>
          </div>
        </div>
        <p className="text-green-800 text-xs text-center font-rajdhani">
          © 2025 Batalla Astral · Todos los derechos reservados · Powered by Telegram Mini Apps
        </p>
        <div className="flex gap-5 text-green-600 text-sm font-rajdhani">
          {['Telegram', 'Twitter / X', 'Discord', 'Whitepaper'].map((l) => (
            <span key={l} className="hover:text-yellow-400 cursor-pointer transition-colors">{l}</span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="relative min-h-screen"
      style={{ background: 'linear-gradient(180deg, #050e05 0%, #071a07 40%, #050e05 100%)' }}>
      <JungleParticles />
      <Navbar />
      <main>
        <HeroSection />
        <CharactersSection />
        <HowToPlaySection />
        <ResourcesSection />
        <PvPSection />
        <RoadmapSection />
      </main>
      <Footer />
    </div>
  );
}
