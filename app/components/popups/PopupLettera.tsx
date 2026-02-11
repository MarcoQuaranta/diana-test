interface PopupLetteraProps {
  onClose: () => void;
}

export default function PopupLettera({ onClose }: PopupLetteraProps) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm popup-backdrop-enter p-4 popup-stable popup-container"
      onClick={onClose}
    >
      <div
        className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-pink-500/30 rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl shadow-pink-500/20 popup-enter popup-stable"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pulsante chiudi */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-400 hover:text-pink-400 transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Intestazione SOS */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
            <span className="text-4xl">🚨</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-red-400 text-center mb-2">
          SOS INVIATO
        </h2>
        <p className="text-purple-300/80 text-center mb-6">
          In attesa dei soccorsi, usa questo kit di emergenza
        </p>

        {/* Lettera */}
        <div className="bg-purple-900/30 rounded-xl p-6 border border-pink-500/20">
          <div className="flex justify-center mb-4">
            <span className="text-3xl">💌</span>
          </div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 text-center mb-4">
            Mia cara e patatosa Roscetta
          </h3>

          {/* Contenuto della lettera */}
          <div className="text-purple-200/90 space-y-4 leading-relaxed">
            <p>
              Potrei dirti tante cose romantiche, ma oltre ad essere scontate, sarebbero forse solo frutto di un narcisistico bisogno di disegnarti secondo la mia fantasia, e io di fantasia ne ho tanta.
            </p>
            <p>
              Jung diceva che l&apos;amore passa per tre fasi prima di diventare reale ed eterno. <br></br>La prima è quando proietti il tuo ego nell&apos;altra persona, disegnando la principessa o il principe azzurro che hai sempre desiderato. E la fantasia è narcisista, perché nella fantasia non c&apos;è incontro, perché parla molto di te e poco dell&apos;altro. Nella mia vita non provo più questa fase purtroppo, ho smesso di pensare che esista una persona perfetta, perché il concetto stesso di perfezione è paradossale, è soltanto idealizzazione.
            </p>
            <p>
              Poi arriva la disillusione, scopri i difetti e le differenze con l&apos;altra persona. Solo dopo aver superato quella fase puoi fare una scelta, quella di amare.
            </p>
            <p>
              Però Jung si scopava la sua paziente cornificando la moglie, quindi forse non è il riferimento perfetto per quanto riguarda l&apos;amore... Forse è proprio l&apos;essenza della seconda fase, capire che nessuno è perfetto quanto la tua idealizzazione, nemmeno i filosofi e gli psicologi.
            </p>
            <p>
              Non voglio evitarla, perché è impossibile, quindi insomma spero che quando le luci si spegneranno, riuscirai ad amarmi ancora. <br></br>Perché io lo farò.
            </p>
            <p>
              Ho sempre detto di voler vivere il presente senza cercare di controllare il futuro... Ma anche se può sembrarti incoerente è ciò che sto facendo, perché la mia non è una promessa futura ma un impegno che prendo oggi. La scelta di conoscerti veramente, e di viverti appieno.
            </p>
            <p>
              Non di sopportare il viaggio perché la destinazione ne vale la pena, ma di godermi tutto il viaggio, ogni paesaggio, ogni tramonto e ogni orizzonte mentre cammino con te, qualsiasi sia la cazzo di destinazione. <br></br>Perché ogni fottuta destinazione mi va bene se il viaggio lo faccio con te.
            </p>
            <p>
              Scusa, ma qualche parolaccia mi serviva a illudermi di rendere meglio il disagio che provo ad aprirmi e a parlare di &apos;ste cose, altrimenti sembro Fabio Volo che cerca di incularsi le ragazzine, io invece a &apos;sta roba proprio non sono abituato.
            </p>
            <p>
              Però mi sono abituato subito al tuo buongiorno, al tuo chiedermi &quot;sij o mij&quot; tutti i giorni, a tua madre che mi manda sempre i saluti e a tuo padre che mi porta la porchetta di Ariccia. In poco tempo siete diventati la mia quotidianità, ancora prima di realizzare che fosse tutto vero.
            </p>
            <p>
              E niente, volevo aprirmi con te senza frasi fatte a effetto nell&apos;angolino in rovesciata, perché le trovo vuote e perché per me un goal nel recupero in finale di coppa del mondo, vale meno che aver capito di giocare nella squadra giusta. <br></br> E la mia squadra sei tu.
            </p>
            <p>
              Ok, forse questa era una frase fatta a effetto... <br></br>Che c&apos;è, ti aspettavi coerenza da un bipolare schizoide?<br></br> Cogliona.
            </p>
            <p>
              Va beh quindi in soldoni, ce lo facciamo &apos;sto viaggio insieme o no? <br></br>Perché io ho già preso i biglietti.
            </p>
            <div className="text-right mt-6">
              <p className="text-pink-400/70 text-sm">
                Con amore, affetto e simpatia, buongiorno pescherEHM...<br></br>
                Volevo dire... con Amore e Affetto (da svariate sindromi),
              </p>
              <p className="text-pink-400 font-semibold text-lg mt-1">
                Il tuo Ricciolino
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
