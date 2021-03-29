import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { CleanPlugin } from "webpack";
import config from "../../config";
import DB from "../../db";

/* Create Token will insert userid into token able, update our payload with the row's id,
    generate a uniquere property using crypto, generate a unique property using crypto,
    jwt sign the token using a secret key, update that row with our newly signed token,
    return that token
 */

export const CreateToken = async (payload: IPayload) => {
  let tokenid: any = await DB.AccessTokens.insertToken(payload.userid);
  payload.accesstokenid = tokenid.insertId;
  payload.unique = crypto.randomBytes(32).toString("hex");
  let token = await jwt.sign(payload, config.auth.secret);
  await DB.AccessTokens.updateToken(payload.accesstokenid, token);
  return token;
};

/* jwt decode the token to get a payload,
    find that payload in our tokens table to verify it
    return the payload, otherwise throw a error
 */

export const ValidToken = async (token: string) => {
  let payload: IPayload = <IPayload>jwt.decode(token); // decode into type <IPayload>
  let accesstokenid = await DB.AccessTokens.locateByToken(
    payload.accesstokenid,
    token
  );
  if (!accesstokenid) {
    throw new Error("Invalid Token!");
  } else {
    return accesstokenid;
  }
};

export interface IPayload {
  [key: string]: any;
  userid: number;
  unique?: string;
}
