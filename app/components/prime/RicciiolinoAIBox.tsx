interface RicciiolinoAIBoxProps {
  onGeneraComplimento: () => void;
  onApriMoneta: () => void;
}

export default function RicciiolinoAIBox({ onGeneraComplimento, onApriMoneta }: RicciiolinoAIBoxProps) {
  return (
    <div className="w-full bg-gradient-to-br from-[#1a1a2e]/90 to-[#16213e]/90 border border-cyan-500/30 rounded-2xl p-4 mt-4 backdrop-blur-sm flex-shrink-0">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-2xl">🤖</span>
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400">
          Ricciolino AI
        </h2>
      </div>
      <p className="text-purple-300/70 text-center text-sm mb-4">
        La versione artificialmente intelligente del tuo Ricciolino
      </p>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onGeneraComplimento}
          className="px-2 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-cyan-600 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/30 cursor-pointer"
        >
          Genera Complimento Napoletano
        </button>
        <button
          onClick={onApriMoneta}
          className="px-2 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-lg hover:shadow-yellow-500/30 cursor-pointer"
        >
          Moneta delle Decisioni
        </button>
      </div>
    </div>
  );
}
