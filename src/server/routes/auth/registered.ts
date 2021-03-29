import * as express from "express";
import DB from "../../db";
import userQueries from "../../db/queries/userQueries";

import { HashPassword } from "../../utils/security/password";
import { CreateToken } from "../../utils/security/token";

const router = express.Router();

router.post("/", async (req, res, next) => {
  let user = req.body;

  try {
    user.password = HashPassword(req.body.password);
    let result = await DB.Users.insertUser(
      user.email,
      user.firstname,
      user.lastname,
      user.password
    );
    let token = await CreateToken({ userid: result.insertId });
    res.json({
      token,
      role: "guest",
      userid: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
