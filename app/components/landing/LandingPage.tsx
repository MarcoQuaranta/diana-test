import Image from "next/image";

interface LandingPageProps {
  hasFirstAccess: boolean;
  onStartFlow: () => void;
  onDirectAccess: () => void;
}

export default function LandingPage({ hasFirstAccess, onStartFlow, onDirectAccess }: LandingPageProps) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-8">
      {/* Titolo */}
      <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 text-center">
        Vuo&apos; essere a mija?
      </h1>

      {/* Globo che gira */}
      <div className="relative">
        {/* Glow effect separato - fuori dal 3D */}
        <div className="absolute inset-0 rounded-full bg-purple-500/40 blur-3xl scale-125 animate-pulse" />
        <div className="globe-container">
          <div className="globe relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-4 border-purple-500/30">
          {/* Contenitore foto con overflow hidden */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {/* Foto  */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900">
              {/* Foto principale */}
              <Image
                src="/images/galleria/1.webp"
                alt="La nostra foto"
                fill
                className="object-cover"
                priority
              />
              {/* Foto sovrapposta */}
              <Image
                src="/foto.jpg"
                alt=""
                fill
                className="object-cover opacity-20"
              />
            </div>
          </div>

          {/* Gradiente overlay per effetto sferico */}
          <div className="absolute inset-0 z-10 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/40 pointer-events-none" />

          {/* Riflesso luce */}
          <div className="absolute top-4 left-8 w-16 h-16 md:w-20 md:h-20 bg-white/30 rounded-full blur-xl z-20 pointer-events-none" />
        </div>
        </div>
      </div>

      {/* Messaggio */}
      <p className="text-lg md:text-xl text-purple-200/80 text-center max-w-md px-4">
        Sei il centro del mio universo Rosce&apos;
      </p>

      {/* Disclaimer */}
      <p className="text-sm text-purple-300/50 text-center max-w-sm px-4 mt-4">
        Cliccando sul pulsante sottostante accetti le politiche aziendali sul possesso delle Roscette e i Termini e Condizioni d&apos;Uso del mio cuore.
      </p>

      {/* Pulsante */}
      <button
        onClick={onStartFlow}
        className="mt-2 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-full text-white font-bold text-lg shadow-lg shadow-purple-500/50 hover:scale-105 hover:shadow-pink-500/50 transition-all duration-300 cursor-pointer"
      >
        Clicca qui per essere mia
      </button>

      {/* Pulsante accesso diretto - solo dopo primo accesso */}
      {hasFirstAccess && (
        <button
          onClick={onDirectAccess}
          className="mt-2 px-6 py-2 text-purple-400 hover:text-pink-400 transition-colors text-sm underline underline-offset-4 cursor-pointer"
        >
          Accedi a Ricciolino Prime
        </button>
      )}
    </div>
  );
}
