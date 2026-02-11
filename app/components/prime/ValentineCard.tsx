import Image from "next/image";
import { useState } from "react";

interface ValentineCardProps {
  valentineCountdown: { days: number; hours: number; minutes: number; seconds: number };
  onOpenSpecial: () => void;
}

export default function ValentineCard({ valentineCountdown, onOpenSpecial }: ValentineCardProps) {
  const [giftCode, setGiftCode] = useState([0, 0, 0, 0]);
  const [giftUnlocked, setGiftUnlocked] = useState(false);
  const [giftShaking, setGiftShaking] = useState(false);

  const updateGiftDigit = (index: number, direction: 'up' | 'down') => {
    const newCode = [...giftCode];
    if (direction === 'up') {
      newCode[index] = (newCode[index] + 1) % 10;
    } else {
      newCode[index] = (newCode[index] - 1 + 10) % 10;
    }
    setGiftCode(newCode);

    if (newCode[0] === 2 && newCode[1] === 6 && newCode[2] === 1 && newCode[3] === 2) {
      setGiftUnlocked(true);
      setTimeout(() => {
        onOpenSpecial();
      }, 500);
    }
  };

  return (
    <div className="relative w-full">
      {/* Container con immagine di sfondo */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-red-900/30">
        {/* Immagine di sfondo */}
        <Image
          src="/images/valentine-gift.jpg"
          alt="Pacco regalo San Valentino"
          width={450}
          height={225}
          className="w-full h-auto"
          priority
        />

        {/* Overlay scuro */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Contenuto sovrapposto */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          {/* Titolo */}
          <h2 className="text-xl md:text-2xl font-bold text-white text-center drop-shadow-lg">
            Speciale San Valentino
          </h2>

          {/* Coming soon */}
          <p className="text-sm text-white/90 text-center italic drop-shadow mt-1">
            Coming soon...
          </p>

          {/* Countdown elegante */}
          <div className="flex items-center justify-center gap-1 text-white font-light tracking-wide drop-shadow mt-2">
            <span className="text-base font-semibold">{valentineCountdown.days}</span>
            <span className="text-[10px] opacity-70">g</span>
            <span className="opacity-50 mx-1">·</span>
            <span className="text-base font-semibold">{String(valentineCountdown.hours).padStart(2, '0')}</span>
            <span className="text-[10px] opacity-70">h</span>
            <span className="opacity-50 mx-1">·</span>
            <span className="text-base font-semibold">{String(valentineCountdown.minutes).padStart(2, '0')}</span>
            <span className="text-[10px] opacity-70">m</span>
            <span className="opacity-50 mx-1">·</span>
            <span className="text-base font-semibold">{String(valentineCountdown.seconds).padStart(2, '0')}</span>
            <span className="text-[10px] opacity-70">s</span>
          </div>

          {/* Lucchetto a combinazione */}
          <div className={`flex flex-col items-center mt-3 ${giftShaking ? 'animate-shake' : ''}`}>
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/20">
              {/* Icona lucchetto */}
              <div className="text-lg mr-1">
                {giftUnlocked ? '🔓' : '🔒'}
              </div>

              {/* 3 rotelle */}
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="flex flex-col items-center">
                  <button
                    onClick={() => updateGiftDigit(index, 'up')}
                    disabled={giftUnlocked}
                    className="text-white/70 hover:text-white transition-colors disabled:opacity-30 cursor-pointer text-[10px] px-1.5 py-0.5"
                  >
                    ▲
                  </button>
                  <div className="w-6 h-7 bg-white/20 rounded flex items-center justify-center border border-white/40">
                    <span className={`text-base font-mono font-bold ${giftUnlocked ? 'text-green-400' : 'text-white'}`}>
                      {giftCode[index]}
                    </span>
                  </div>
                  <button
                    onClick={() => updateGiftDigit(index, 'down')}
                    disabled={giftUnlocked}
                    className="text-white/70 hover:text-white transition-colors disabled:opacity-30 cursor-pointer text-[10px] px-1.5 py-0.5"
                  >
                    ▼
                  </button>
                </div>
              ))}
            </div>

            {/* Messaggio stato */}
            <p className={`text-[10px] mt-1 drop-shadow ${giftUnlocked ? 'text-green-300 font-medium' : 'text-white/70'}`}>
              {giftUnlocked ? '✨ Sbloccato! Torna il 14 febbraio ✨' : 'Inserisci la combinazione'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
