import * as passport from "passport";
import * as LocalStrategy from "passport-local";

import { ComparePassword } from "../utils/security/password";
import DB from "../db";

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(
  new LocalStrategy.Strategy(
    {
      usernameField: "email",
      session: false,
    },
    async (email, password, done) => {
      try {
        let [user]: any = await DB.Users.findByEmail(email);
        if (user && ComparePassword(password, user.password)) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        done(e);
      }
    }
  )
);
