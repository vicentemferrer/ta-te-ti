import { useEffect, useState } from "react"
import { Board } from "./components/Board.jsx"
import { Turns } from './components/Turns.jsx'
import { WinnerModal } from "./components/WinnerModal.jsx"
import { TURNS } from './constants.js'
import { updateBoard } from "./logic/board.js"
import { saveGameToStorage, resetGameStorage } from "./logic/storage.js"

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const handleUpdate = index => {
    const updateObj = {
      index,
      board,
      turn,
      winner,
      setBoard,
      setTurn,
      setWinner
    }
    updateBoard(updateObj)
  }

  useEffect(() => {
    saveGameToStorage({ newBoard: board, newTurn: turn })
  }, [turn, board])

  return (
    <main className="board">
      <Turns turn={turn} />
      <Board board={board} updateBoard={handleUpdate} />
      <button onClick={resetGame}><i className="fa-solid fa-rotate-left"></i></button>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
