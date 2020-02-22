const db = require("../dbConfig.js");
const bcrypt = require("bcryptjs");

// GET user by filter
const findBy = (filter) => {
  return db("users")
    .where(filter)
    .first();
};

// POST new user
const add = async (user) => {
  user.password = await bcrypt.hash(user.password, 13);

  const [id] = await db("users").insert(user);

  return findBy({ id });
};

module.exports = { add, findBy };
