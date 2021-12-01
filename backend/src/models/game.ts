import db from "../db";

// const {
//   NotFoundError,
//   BadRequestError,
//   UnauthorizedError,
// } = require("../expressError");

class Game {
  /** Add game.
   *
   * Returns { gameId}
   *
   * Throws BadRequestError on duplicates.
   **/

  static async addGame(gameId: string, username: string, color: string) {
    const duplicateCheck = await db.query(
      `SELECT gameId
           FROM games
           WHERE gameId = $1`,
      [gameId]
    );

    if (duplicateCheck.rows[0]) {
      console.log("dublicate");
      //   throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const result = await db.query(
      `INSERT INTO games
        (gameId,
        username,
         color)
        VALUES ($1, $2, $3)
        RETURNING gameId`,
      [gameId, username, color]
    );

    const game = result.rows[0];
    return game;
  }

  static async addMoves(gameId: string, move_piece: string) {

    const result = await db.query(
      `INSERT INTO moves
      (gameId,
      move_piece)
      VALUES ($1, $2)
      RETURNING gameId`,
      [gameId, move_piece]
    );
    const game = result.rows[0];
    return game;
  }

  static async getMoves(gameId: string) {
    const result = await db.query(
      `SELECT move_piece
      FROM moves
      WHERE gameid = $1`,
      [gameId]
    );

    const move = result.rows;


    return move;
  }
}

export default Game;
