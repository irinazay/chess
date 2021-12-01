import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://localhost";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class ChessApi {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    // const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      // let message = err.response.data.error.message;
      // throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Apply to a job */

  static async makeMove(id, move) {
    let res = await this.request(`game/${id}/move/${move}`, {}, "post");
    return res;
  }

  static async startGame(username) {
    let res = await this.request(`game/${username}`, {}, "post");
    return res.currGameId.gameid;
  }

  static async getResponse(id) {
    let resp = await this.request(`game/response/${id}`);
    return resp.lm;
  }

  static async resign(id) {
    let resp = await this.request(`game/resign/${id}`);
    return resp.result;
  }
}

export default ChessApi;
