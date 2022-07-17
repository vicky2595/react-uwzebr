import React, { useState } from 'react';
import './Game.css';
import { Board } from '../Board/Board';
import { ResultModal } from '../ResultModal/ResultModal';
import { calculateWinner } from '../Utils/WinnerCalculator';

export const Game = () => {
  const [cellValues, setCellValues] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [numberOfTurnLeft, setNumberOfTurnLeft] = useState(9);
  const [winner, setWinner] = useState();
  const [winningCombination, setWinningCombination] = useState([]);
  const isCellEmpty = (cellIndex) => cellValues[cellIndex] === '';

  const restartGame = () => {
    setCellValues(['', '', '', '', '', '', '', '', '']);
    setXIsNext(true);
    setIsGameOver(false);
    setNumberOfTurnLeft(9);
    setWinner(undefined);
    setWinningCombination([]);
  };

  const onCellClicked = (cellIndex) => {
    if (isCellEmpty(cellIndex)) {
      const newCellValues = [...cellValues];
      newCellValues[cellIndex] = xIsNext ? 'X' : 'O';

      const newNumberOfTurnLeft = numberOfTurnLeft - 1;

      // calculate result
      const calcResult = calculateWinner(newCellValues,numberOfTurnLeft, cellIndex);

      setCellValues(newCellValues);
      setXIsNext(!xIsNext);
      setIsGameOver(calcResult.hasResult);
      setNumberOfTurnLeft(newNumberOfTurnLeft);
      setWinner(calcResult.winner);
      setWinningCombination(calcResult.winningCombination);
    }
  };

  return (
    <>
      <div id="game">
        <h1> X O GAME </h1>
        <Board
          cellValues={cellValues}
          winningCombination={winningCombination}
          cellClicked={onCellClicked}
        />
      </div>
      <ResultModal
        isGameOver={isGameOver}
        winner={winner}
        onNewGameClicked={restartGame}
      />
    </>
  );
};
