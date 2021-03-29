import * as mysql from "mysql";
import config from "../config/";

import Blogs from "./queries/blogQueries";
import Users from "./queries/userQueries";
import AccessTokens from "./queries/tokenQueries";

export const Pool = mysql.createPool(config.mysql);

export const Query = (query: string, values?: Array<string | number>) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Pool.query(query, values, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

export default {
  Blogs,
  Users,
  AccessTokens,
};
