import { useState } from "react";
import { captchaData } from "@/app/lib/data";

interface PopupCaptchaProps {
  onComplete: () => void;
}

export default function PopupCaptcha({ onComplete }: PopupCaptchaProps) {
  const [currentCaptcha, setCurrentCaptcha] = useState(0);
  const [captchaError, setCaptchaError] = useState(false);
  const [selectedCaptchaItems, setSelectedCaptchaItems] = useState<number[]>([]);

  const handleCaptchaClick = (index: number) => {
    const correctIndices = captchaData[currentCaptcha].correctIndex;

    if (selectedCaptchaItems.includes(index)) return;

    if (correctIndices.includes(index)) {
      setCaptchaError(false);
      const newSelected = [...selectedCaptchaItems, index];
      setSelectedCaptchaItems(newSelected);

      const allCorrectSelected = correctIndices.every(i => newSelected.includes(i));

      if (allCorrectSelected) {
        setTimeout(() => {
          if (currentCaptcha < 1) {
            setCurrentCaptcha(currentCaptcha + 1);
            setSelectedCaptchaItems([]);
          } else {
            setCurrentCaptcha(0);
            setSelectedCaptchaItems([]);
            onComplete();
          }
        }, 500);
      }
    } else {
      setCaptchaError(true);
      setSelectedCaptchaItems([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm popup-backdrop-enter">
      <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-purple-500/30 rounded-2xl p-6 max-w-sm mx-4 shadow-2xl shadow-purple-500/20 popup-enter">
        {/* Header captcha */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
          <span className="text-purple-200 font-semibold">Verifica di sicurezza</span>
          <span className="text-purple-400 text-sm ml-auto">{currentCaptcha + 1}/3</span>
        </div>

        {/* Domanda */}
        <p className="text-white text-center mb-4 font-medium">
          {captchaData[currentCaptcha].question}
        </p>

        {/* Griglia 3x3 */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {captchaData[currentCaptcha].items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleCaptchaClick(index)}
              className={`aspect-square bg-[#2a2a4e] hover:bg-[#3a3a5e] border-2 rounded-lg flex items-center justify-center text-4xl transition-all duration-200 hover:scale-105 cursor-pointer overflow-hidden ${selectedCaptchaItems.includes(index) ? 'border-green-500 ring-2 ring-green-500/50' : 'border-purple-500/20'}`}
            >
              {captchaData[currentCaptcha].type === "images" ? (
                <img src={item} alt="" className="w-full h-full object-cover object-top" />
              ) : (
                item
              )}
            </button>
          ))}
        </div>

        {/* Contatore selezioni */}
        {selectedCaptchaItems.length > 0 && (
          <p className="text-green-400 text-center text-sm mb-2">
            {selectedCaptchaItems.length}/{captchaData[currentCaptcha].correctIndex.length}
          </p>
        )}

        {/* Messaggio errore */}
        {captchaError && (
          <p className="text-red-400 text-center text-sm mb-2">
            Risposta errata. Riprova!
          </p>
        )}

        {/* Footer */}
        <p className="text-purple-400/60 text-sm text-center">
          Dimostra di non essere un robot 🤖
        </p>
      </div>
    </div>
  );
}
