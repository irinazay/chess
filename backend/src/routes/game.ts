import axios from "axios";
import express from "express";
// const {BadRequestError} = require("../expressError.js");
import { LICHESS_TOKEN } from "../config";
import Game from "../models/game";
import https from "https";

const router = express.Router({ mergeParams: true });
const lichessBaseUrl = "https://lichess.org/api";

// ROUTES

router.post("/:username", async function (req, res) {

  const username: string = req.params.username;

  let data = {
    level: 8,
    "clock.limit": [],
    "clock.increment": [],
    days: 1,
    color: "white",
  };

  let bodyData = `level=${data.level}&clock.limit=${data["clock.limit"]}&clock.increment=${data["clock.increment"]}&clock.limit=${data.days}&color=${data.color}`;

  try {
    const response = await axios.post(
      `${lichessBaseUrl}/challenge/ai`,
      bodyData,
      {
        headers: {
          Authorization: "Bearer " + LICHESS_TOKEN,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    let gameId: string = response.data.id;
    let currGameId = await Game.addGame(gameId, username, data.color);

    return res.json({ currGameId });
  } catch (error) {
    console.log(error);
  }
});

// *********
// Make move
// *********

router.post("/:id/move/:move", async function (req, res) {
  const currGameId: string = req.params.id;
  const currMove: string = req.params.move;

  // Start Game stream

  https
    .get(
      `${lichessBaseUrl}/stream/game/${currGameId}`,
      {
        headers: {
          Accept: "application/x-ndjson",
          Authorization: "Bearer " + LICHESS_TOKEN,
        },
      },
      (res) => {
    
        const { statusCode } = res;
        let error;

        if (statusCode !== 200) {
          error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
        } else {
          console.log({ statusCode });
        }
        if (error) {
          console.error(error.message);
          res.resume();
          return
          // return res.json({ result: 429 });
        }
        res.on("data", (chunk) => {
          chunk = Buffer.from(chunk).toString("utf-8");

          try {
            let chunkJson = JSON.parse(chunk);
           
            if (chunkJson.lm) {
              console.log(chunkJson.lm);
              const lastMove: string = chunkJson.lm;
            
              Game.addMoves(currGameId, lastMove);
            }
          } catch (_ex) {}
        });
        res.on("end", () => {

          Game.addMoves(currGameId, "end");
          console.log("====================== END ");
        });
      }
    )
    .on("error", (e) => {

      console.error(`Got error: ${e.message}`);

    });

  // Make move
  try {
    const resp = await axios.post(
      `${lichessBaseUrl}/board/game/${currGameId}/move/${currMove}`,
      null,
      {
        headers: { Authorization: "Bearer " + LICHESS_TOKEN },
      }
    );

    let result = resp.data;

    return res.json({ result });
  } catch (error) {
    console.log(error);
  }
});

router.get("/response/:id", async function (req, res) {
  const currGameId: string = req.params.id;
  const lm: any = await Game.getMoves(currGameId);

  return res.json({ lm });
});

router.get("/resign/:id", async function (req, res) {
  const gameId: string = req.params.id;

  try {
    const resp = await axios.post(
      `${lichessBaseUrl}/board/game/${gameId}/resign`,
      null,
      {
        headers: { Authorization: "Bearer " + LICHESS_TOKEN },
      }
    );
    let result = resp.data;
  
    return res.json({ result });
  } catch (error) {
    console.log(error);
  }
});

export default router;
