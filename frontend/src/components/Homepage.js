import React, { useState, useEffect } from "react";
import Board from "./Board";
import initialiseChessBoard from "../helpers/board-initialiser.js";
import { useAuth0 } from "@auth0/auth0-react";
import ChessApi from "../api";
import CellDeterminator from "../helpers/cell-determinator";
import "../styles/Homepage.css";
import isMoveValid from "../helpers/isMoveValid";
import changeCellColor from "../helpers/changeCellColor";

function Homepage() {
  const { user } = useAuth0();
  const [game, setGame] = useState(initialiseChessBoard());
  const [currGameId, setCurrGameId] = useState(null);
  const [player, setPlayer] = useState({
    user: 1,
    winner: null,
  });
  const [moves, setMoves] = useState({
    currGameMoves: [],
    lastCompMove: "",
    lastMoveCell: null,
    isCellSelected: -1,
    resLength: 1,
  });

  useEffect(function () {
    async function getCurrentGame() {
      try {
        let GameId = await ChessApi.startGame(user.nickname);
        setCurrGameId(GameId);
      } catch (err) {
        setCurrGameId(null);
      }
    }
    getCurrentGame();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ChessApi.getResponse(currGameId);
        if (res.length && res.length > moves.resLength) {
          const newCompMove = res[res.length - 1].move_piece;
          const lastCurrMove =
            moves.currGameMoves[moves.currGameMoves.length - 1];
          const moveBeforeNewCompMove = res[res.length - 2].move_piece;

          if (newCompMove === "end" && lastCurrMove === moveBeforeNewCompMove) {
            setPlayer((w) => ({ ...w, winner: 1 }));
          } else if (
            newCompMove === "end" &&
            lastCurrMove !== moveBeforeNewCompMove
          ) {
            setMoves((m) => ({
              ...m,
              resLength: res.length,
              lastCompMove: moveBeforeNewCompMove,
            }));
            setPlayer((w) => ({ ...w, winner: 2 }));
          } else {
            setMoves((m) => ({
              ...m,
              resLength: res.length,
              lastCompMove: newCompMove,
            }));
          }
        }
      } catch (error) {
        setCurrGameId(null);
      }
    };
    const id = setInterval(() => {
      fetchData();
    }, 8000);

    fetchData();
    return () => clearInterval(id);
  }, [currGameId, player.user]);

  useEffect(
    function () {
      if (player.user === 2 && moves.lastCompMove) {
        setMoves((m) => ({ ...m, currGameMoves: [...moves.lastCompMove] }));
        if (moves.lastCompMove !== "end") {
          let from = moves.lastCompMove.slice(0, 2);
          let to = moves.lastCompMove.slice(-2);

          if (from === "e8" && to === "h8") {
            castling(6, 7, 5);
          } else if (from === "e8" && to === "a8") {
            castling(2, 0, 3);
          } else {
            game[CellDeterminator(to)].piece =
              game[CellDeterminator(from)].piece;
            game[CellDeterminator(to)].piece.style = changeCellColor(
              CellDeterminator(to),
              "rgb(220, 253, 220)",
              game
            );
            game[CellDeterminator(from)].piece = null;
            game[moves.lastMoveCell].piece.style = changeCellColor(
              moves.lastMoveCell,
              "",
              game
            );
            setMoves((m) => ({ ...m, lastMoveCell: CellDeterminator(to) }));
            setPlayer((u) => ({ ...u, user: 1 }));
            setGame(game);
          }
        }
      }
    },
    [moves.lastCompMove]
  );

  function castling(kingTo, rookFrom, rookTo) {
    game[moves.lastMoveCell].piece.style = changeCellColor(
      moves.lastMoveCell,
      "",
      game
    );
    game[kingTo].piece = game[4].piece;
    game[4].piece = null;
    game[rookTo].piece = game[rookFrom].piece;
    game[rookFrom].piece = null;
    game[kingTo].piece.style = changeCellColor(
      kingTo,
      "rgb(220, 253, 220)",
      game
    );

    setMoves((m) => ({ ...m, lastMoveCell: kingTo }));
    setPlayer((u) => ({ ...u, user: 1 }));
    setGame(game);
  }

  async function handleClick(i) {
    // if player clicked and nothing was picked before
    if (moves.isCellSelected === -1) {
      // check if opponent piece selected
      if (!game[i].piece || game[i].piece.player !== player.user) {
        return null;
      }
      // picked your own piece
      else {
        game[i].piece.style = changeCellColor(i, "rgb(220, 253, 220)", game);
        setMoves((m) => ({ ...m, isCellSelected: i }));
        setGame(game);
      }

      // when piece picked check if valid
    } else if (moves.isCellSelected > -1) {
      game[moves.isCellSelected].piece.style = changeCellColor(
        moves.isCellSelected,
        "",
        game
      );

      // if user clicked cell with his piece
      if (game[i].piece && game[i].piece.player === player.user) {
        setMoves((m) => ({ ...m, isCellSelected: -1 }));
      } else {
        const isDestEnemyOccupied = game[i].piece ? true : false;
        const isMovePossible = game[moves.isCellSelected].piece.isMovePossible(
          moves.isCellSelected,
          i,
          isDestEnemyOccupied
        );
        const srcToDestPath = game[moves.isCellSelected].piece.getSrcToDestPath(
          moves.isCellSelected,
          i
        );
        const isMoveLegal = isMoveValid(srcToDestPath, game);

        if (isMovePossible && isMoveLegal) {
          if (moves.lastMoveCell) {
            game[moves.lastMoveCell].piece.style = changeCellColor(
              moves.lastMoveCell,
              "",
              game
            );
          }
          let notation = game[moves.isCellSelected].notation + game[i].notation;

          if (
            game[moves.isCellSelected].piece.name === "K" &&
            notation === "e1g1"
          ) {
            game[61].piece = game[63].piece;
            game[63].piece = null;
          } else if (
            game[moves.isCellSelected].piece.name === "K" &&
            notation === "e1c1"
          ) {
            game[59].piece = game[56].piece;
            game[56].piece = null;
          }

          game[i].piece = game[moves.isCellSelected].piece;

          game[i].piece.style = changeCellColor(i, "rgb(220, 253, 220)", game);
          setMoves((m) => ({ ...m, lastMoveCell: i }));
          game[moves.isCellSelected].piece = null;

          // if castling move rook

          makePlayerMoves(currGameId, notation);
          setMoves((m) => ({
            ...m,
            currGameMoves: [...notation],
            isCellSelected: -1,
          }));
          setPlayer((u) => ({ ...u, user: 2 }));
          setGame(game);
        } else {
          setMoves((m) => ({ ...m, isCellSelected: -1 }));
        }
      }
    }
  }

  async function makePlayerMoves(id, not) {
    try {
      let res = await ChessApi.makeMove(id, not);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleResign(evt) {
    try {
      let response = await ChessApi.resign(currGameId);
      if (response.ok) {
        startNewGame();
      }
    } catch (err) {
      setCurrGameId(null);
    }
  }

  async function handleNewGame(evt) {
    startNewGame();
    setPlayer((u) => ({ ...u, winner: null }));
  }

  async function startNewGame() {
    try {
      setGame(initialiseChessBoard());
      let newGameId = await ChessApi.startGame(user.nickname);
      setCurrGameId(newGameId);
      setPlayer((u) => ({ ...u, user: 1, winner: null }));
      setMoves((m) => ({
        ...m,
        resLength: 1,
        isCellSelected: -1,
        lastCompMove: "",
        lastMoveCell: null,
        currGameMoves: [],
      }));
    } catch (err) {
      setCurrGameId(null);
    }
  }

  return (
    <div>
      <div className="game">
        {player.winner === 2 ? (
          <div className="game-player winner">computer won!</div>
        ) : (
          <div className="game-player">computer</div>
        )}

        <div>
          <Board squares={game} onClick={(i) => handleClick(i)} />
        </div>
        {player.winner === 1 ? (
          <div className="game-player winner">{user.nickname} won!</div>
        ) : (
          <div className="game-player">{user.nickname}</div>
        )}
        {player.winner === null ? (
          <button className="btn" onClick={handleResign}>
            New Game
          </button>
        ) : (
          <button className="btn" onClick={handleNewGame}>
            New Game
          </button>
        )}
        <div className="icons-attribution">
          <small>
            {" "}
            Chess Icons (extracted) By en:User:Cburnett [
            <a href="http://www.gnu.org/copyleft/fdl.html">GFDL</a>,{" "}
            <a href="http://creativecommons.org/licenses/by-sa/3.0/">
              CC-BY-SA-3.0
            </a>
            , <a href="http://opensource.org/licenses/bsd-license.php">BSD</a>{" "}
            or <a href="http://www.gnu.org/licenses/gpl.html">GPL</a>],{" "}
            <a href="https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces">
              via Wikimedia Commons
            </a>{" "}
          </small>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
