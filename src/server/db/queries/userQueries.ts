import { Query } from "../index";

export const findByEmail = async (email: string) =>
  Query(`SElECT * FROM users WHERE email = '${email}'`);

export const findById = async (id: number) =>
  Query(`SELECT * FROM users WHERE id = '${id} LIMIT 1' `);

export const insertUser = async (
  email: string,
  firstname: string,
  lastname: string,
  password: string
) =>
  Query(
    "INSERT INTO users (email,firstname,lastname,password) VALUES (?,?,?,?)",
    [email, firstname, lastname, password]
  );

export default {
  findByEmail,
  findById,
  insertUser,
};
