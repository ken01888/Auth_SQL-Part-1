import * as express from "express";
import * as passport from "passport";
import { isNamedExportBindings } from "typescript";

import BlogsRouter from "./blogs";
const router = express.Router();

router.use((req, res, next) => {
  passport.authenticate("bearer", { session: false }, (err, user, info) => {
    if (user) req.user = user;
    return next();
  })(req, res, next);
});

router.use("/blogs", BlogsRouter);

export default router;
