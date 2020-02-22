const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return knex("users")
    .truncate()
    .then(async function() {
      return knex("users").insert([
        {
          id: 1,
          username: "Jeffrey",
          password:
            "$2a$13$JFylNbnCV6f8qI18YDLFu.zfOJb9GRIEcBexvLwVKoMunuJEroLBq"
        },
        {
          id: 2,
          username: "Optimus",
          password:
            "$2a$13$yACYPA0cF6kY8C8askY8N.cde33z6Et4bfK947JcC1j2hZTUG//PO"
        },
        {
          id: 3,
          username: "GrandaddyGundam",
          password:
            "$2a$13$k7gmjTlY68Crny2aVrdYY.6SYHsJLqcflXLsUB/YBanL1JUaake2C"
        }
      ]);
    });
};
