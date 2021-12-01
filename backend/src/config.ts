/** Shared config for application; can be required many places. */

import * as dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const LICHESS_TOKEN = process.env.LICHESS_TOKEN;
const PORT: number = parseInt(<string>process.env.PORT, 10) || 80;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "chess_test"
    : process.env.DATABASE_URL || "chess";
}

export { SECRET_KEY, PORT, LICHESS_TOKEN, getDatabaseUri };
