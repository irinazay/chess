import Bishop from "../pieces/bishop.js";
import King from "../pieces/king.js";
import Knight from "../pieces/knight.js";
import Pawn from "../pieces/pawn.js";
import Queen from "../pieces/queen.js";
import Rook from "../pieces/rook.js";

export default function initialiseChessBoard() {
  const squares = Array(64).fill(null);

  // black pieces
  squares[0] = { notation: "a8", piece: new Rook(2) };
  squares[1] = { notation: "b8", piece: new Knight(2) };
  squares[2] = { notation: "c8", piece: new Bishop(2) };
  squares[3] = { notation: "d8", piece: new Queen(2) };
  squares[4] = { notation: "e8", piece: new King(2) };
  squares[5] = { notation: "f8", piece: new Bishop(2) };
  squares[6] = { notation: "g8", piece: new Knight(2) };
  squares[7] = { notation: "h8", piece: new Rook(2) };

  squares[8] = { notation: "a7", piece: new Pawn(2) };
  squares[9] = { notation: "b7", piece: new Pawn(2) };
  squares[10] = { notation: "c7", piece: new Pawn(2) };
  squares[11] = { notation: "d7", piece: new Pawn(2) };
  squares[12] = { notation: "e7", piece: new Pawn(2) };
  squares[13] = { notation: "f7", piece: new Pawn(2) };
  squares[14] = { notation: "g7", piece: new Pawn(2) };
  squares[15] = { notation: "h7", piece: new Pawn(2) };

  // empty cells

  squares[16] = { notation: "a6", piece: null };
  squares[17] = { notation: "b6", piece: null };
  squares[18] = { notation: "c6", piece: null };
  squares[19] = { notation: "d6", piece: null };
  squares[20] = { notation: "e6", piece: null };
  squares[21] = { notation: "f6", piece: null };
  squares[22] = { notation: "g6", piece: null };
  squares[23] = { notation: "h6", piece: null };
  squares[24] = { notation: "a5", piece: null };
  squares[25] = { notation: "b5", piece: null };
  squares[26] = { notation: "c5", piece: null };
  squares[27] = { notation: "d5", piece: null };
  squares[28] = { notation: "e5", piece: null };
  squares[29] = { notation: "f5", piece: null };
  squares[30] = { notation: "g5", piece: null };
  squares[31] = { notation: "h5", piece: null };
  squares[32] = { notation: "a4", piece: null };
  squares[33] = { notation: "b4", piece: null };
  squares[34] = { notation: "c4", piece: null };
  squares[35] = { notation: "d4", piece: null };
  squares[36] = { notation: "e4", piece: null };
  squares[37] = { notation: "f4", piece: null };
  squares[38] = { notation: "g4", piece: null };
  squares[39] = { notation: "h4", piece: null };
  squares[40] = { notation: "a3", piece: null };
  squares[41] = { notation: "b3", piece: null };
  squares[42] = { notation: "c3", piece: null };
  squares[43] = { notation: "d3", piece: null };
  squares[44] = { notation: "e3", piece: null };
  squares[45] = { notation: "f3", piece: null };
  squares[46] = { notation: "g3", piece: null };
  squares[47] = { notation: "h3", piece: null };

  // white pieces

  squares[48] = { notation: "a2", piece: new Pawn(1) };
  squares[49] = { notation: "b2", piece: new Pawn(1) };
  squares[50] = { notation: "c2", piece: new Pawn(1) };
  squares[51] = { notation: "d2", piece: new Pawn(1) };
  squares[52] = { notation: "e2", piece: new Pawn(1) };
  squares[53] = { notation: "f2", piece: new Pawn(1) };
  squares[54] = { notation: "g2", piece: new Pawn(1) };
  squares[55] = { notation: "h2", piece: new Pawn(1) };
  squares[56] = { notation: "a1", piece: new Rook(1) };
  squares[57] = { notation: "b1", piece: new Knight(1) };
  squares[58] = { notation: "c1", piece: new Bishop(1) };
  squares[59] = { notation: "d1", piece: new Queen(1) };
  squares[60] = { notation: "e1", piece: new King(1) };
  squares[61] = { notation: "f1", piece: new Bishop(1) };
  squares[62] = { notation: "g1", piece: new Knight(1) };
  squares[63] = { notation: "h1", piece: new Rook(1) };

  return squares;
}
