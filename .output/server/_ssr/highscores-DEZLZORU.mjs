import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./index.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:https";
import "node:http2";
import "../_libs/react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tiny-warning.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
async function verifyHash(score, nickname, hash) {
  const salt = process.env.GAME_SALT || "asciitron-super-secret-salt-123!";
  const msgBuffer = new TextEncoder().encode(score + nickname + salt);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const expectedHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return expectedHash === hash;
}
const getHighscores_createServerFn_handler = createServerRpc({
  id: "940c838dc6cf882bc59c7bbb13a1fcb400f0b0c2a0f25444a03cb742303ef2e7",
  name: "getHighscores",
  filename: "src/server/highscores.ts"
}, (opts) => getHighscores.__executeServer(opts));
const getHighscores = createServerFn({
  method: "GET"
}).inputValidator((data) => data).handler(getHighscores_createServerFn_handler, async ({
  data
}) => {
  try {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) {
      return {
        error: "Upstash credentials missing"
      };
    }
    const currentScore = data.currentScore;
    const pipelineBody = [["ZREVRANGE", "highscores", "0", "4", "WITHSCORES"]];
    if (currentScore !== void 0 && currentScore !== null && !isNaN(currentScore)) {
      pipelineBody.push(["ZCOUNT", "highscores", `(${currentScore}`, "+inf"]);
    }
    const response = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pipelineBody)
    });
    const responseData = await response.json();
    if (responseData.error || responseData[0] && responseData[0].error) {
      return {
        error: responseData.error || responseData[0].error
      };
    }
    const scores = [];
    const top5Result = responseData[0].result || [];
    for (let i = 0; i < top5Result.length; i += 2) {
      scores.push({
        nickname: top5Result[i],
        score: parseInt(top5Result[i + 1])
      });
    }
    let playerRank = null;
    if (responseData.length > 1 && responseData[1] && responseData[1].result !== void 0) {
      playerRank = responseData[1].result + 1;
    }
    return {
      scores,
      playerRank
    };
  } catch (error) {
    console.error("Error fetching highscores:", error);
    return {
      error: "Internal Server Error"
    };
  }
});
const saveHighscore_createServerFn_handler = createServerRpc({
  id: "1afda741c3bccd54602eece2bec99e527e28efd152a6613dfa703c2502ec76dd",
  name: "saveHighscore",
  filename: "src/server/highscores.ts"
}, (opts) => saveHighscore.__executeServer(opts));
const saveHighscore = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(saveHighscore_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      score,
      nickname,
      hash
    } = data;
    if (typeof score !== "number" || !nickname || !hash) {
      return {
        error: "Invalid payload"
      };
    }
    const isValid = await verifyHash(score, nickname, hash);
    if (!isValid) {
      return {
        error: "Cheat detected: Invalid hash"
      };
    }
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) {
      return {
        error: "Upstash credentials missing"
      };
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(["ZADD", "highscores", "GT", score.toString(), nickname])
    });
    const responseData = await response.json();
    if (responseData.error) {
      return {
        error: responseData.error
      };
    }
    return {
      success: true
    };
  } catch (error) {
    console.error("Error saving highscore:", error);
    return {
      error: "Internal Server Error"
    };
  }
});
export {
  getHighscores_createServerFn_handler,
  saveHighscore_createServerFn_handler
};
