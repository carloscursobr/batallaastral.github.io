export const Navbar = () => {
  return (
    <nav className="bg-green-900/80 backdrop-blur-sm p-4 rounded-xl mb-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gold-400 font-cinzel">
          Batalla Astral
        </h1>
        <div className="text-white">
          <span className="text-gold-400">💎 </span>
          <span className="font-semibold">Plata: </span>
          <span className="font-bold">0</span> {/* Aquí iría el balance */}
        </div>
      </div>
    </nav>
  );
};
