import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export default hashPassword;
