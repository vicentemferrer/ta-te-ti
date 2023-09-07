/* eslint-disable react/prop-types */
import { Square } from "./Square.jsx"

export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null

  const winnerText = winner === false ? '¡Otra vez!' : '¡TA TE TI!'

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
        <header className="win">
          {winner && <Square>{winner}</Square>}
        </header>
        <footer>
          <button onClick={resetGame}><i className="fa-solid fa-rotate-left"></i></button>
        </footer>
      </div>
    </section>
  )
}