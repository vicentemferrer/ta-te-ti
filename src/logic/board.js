import confetti from 'canvas-confetti';
import { TURNS, WINNER_HITS } from '../constants.js';

const checkWinner = (boardToCheck) => {
	for (const [a, b, c] of WINNER_HITS) {
		if (
			boardToCheck[a] &&
			boardToCheck[a] === boardToCheck[b] &&
			boardToCheck[a] === boardToCheck[c]
		) {
			return boardToCheck[a];
		}
	}
	return null;
};

const checkEndGame = (boardToCheck) => {
	return boardToCheck.every((square) => square !== null);
};

export const updateBoard = ({ index, board, turn, winner, setBoard, setTurn, setWinner }) => {
	if (board[index] || winner) return;

	const newBoard = [...board];
	newBoard[index] = turn;
	setBoard(newBoard);

	const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
	setTurn(newTurn);

	const newWinner = checkWinner(newBoard);
	if (newWinner) {
		setWinner(newWinner);
		confetti();
	} else if (checkEndGame(newBoard)) {
		setWinner(false);
	}
};
