interface TimerInsiemeProps {
  timeTogether: { days: number; hours: number; minutes: number; seconds: number };
}

export default function TimerInsieme({ timeTogether }: TimerInsiemeProps) {
  return (
    <div className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80 border border-pink-500/30 rounded-2xl p-6 backdrop-blur-sm w-full max-w-lg">
      <p className="text-purple-200 text-center text-lg mb-3">Mi sopporti da ben</p>
      <div className="grid grid-cols-4 gap-2 md:gap-4 w-full">
        <div className="flex flex-col items-center bg-purple-900/50 rounded-xl py-3">
          <span className="text-2xl md:text-4xl font-bold text-pink-400">{timeTogether.days}</span>
          <span className="text-xs text-purple-300">giorni</span>
        </div>
        <div className="flex flex-col items-center bg-purple-900/50 rounded-xl py-3">
          <span className="text-2xl md:text-4xl font-bold text-pink-400">{timeTogether.hours}</span>
          <span className="text-xs text-purple-300">ore</span>
        </div>
        <div className="flex flex-col items-center bg-purple-900/50 rounded-xl py-3">
          <span className="text-2xl md:text-4xl font-bold text-pink-400">{timeTogether.minutes}</span>
          <span className="text-xs text-purple-300">minuti</span>
        </div>
        <div className="flex flex-col items-center bg-purple-900/50 rounded-xl py-3">
          <span className="text-2xl md:text-4xl font-bold text-pink-400">{timeTogether.seconds}</span>
          <span className="text-xs text-purple-300">secondi</span>
        </div>
      </div>
    </div>
  );
}
