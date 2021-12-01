
CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  gameId TEXT ,
  username VARCHAR(25) NOT NULL,
  color TEXT NOT NULL,
  result TEXT 
);

CREATE TABLE moves (
  id SERIAL PRIMARY KEY,
  move_piece TEXT,
  gameId TEXT 
);
