import * as bcrypt from "bcrypt";

// Generates salted Hash
export const HashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

// Compares password in our database to hash and salted password / compare 2 passwords
export const ComparePassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};
