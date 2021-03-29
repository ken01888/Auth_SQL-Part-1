import * as passport from "passport";
import * as BearerStrategy from "passport-http-bearer";
import db from "../db";

import { IPayload, ValidToken } from "../utils/security/token";

passport.use(
  new BearerStrategy.Strategy(async (token, done) => {
    try {
      let payload = await ValidToken(token);
      let [user] = await db.Users.findById(payload[0].userid);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error);
    }
  })
);

interface IPayLoad {
  id: number;
  userid: number;
  token: string;
  expires: any;
  _create: any;
}
