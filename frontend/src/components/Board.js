import React from "react";
import "../styles/index.css";
import Cell from "./Cell.js";
import { v4 as uuidv4 } from "uuid";

export default function Board({ squares, onClick }) {
  function renderSquare(i, squareShade) {
    return (
      <Cell
        key={uuidv4()}
        style={squares[i].piece ? squares[i].piece.style : null}
        shade={squareShade}
        onClick={() => onClick(i)}
      />
    );
  }
  const board = [];
  for (let i = 0; i < 8; i++) {
    const squareRows = [];
    for (let j = 0; j < 8; j++) {
      const squareShade =
        (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
          ? "light-square"
          : "dark-square";
      squareRows.push(renderSquare(i * 8 + j, squareShade));
    }
    board.push(
      <div key={uuidv4()} className="board-row">
        {squareRows}
      </div>
    );
  }

  return <div>{board}</div>;
}

function isEven(num) {
  return num % 2 === 0;
}
