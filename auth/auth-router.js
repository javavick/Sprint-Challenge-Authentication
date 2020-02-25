const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../database/helpers/auth-helpers.js");
const validate = require("./validate-middleware.js");

// POST "/api/auth/register"
router.post("/register", validate, (req, res) => {
  Users.add(req.body)
    .then((user) => {
      const payload = { id: user.id, username: user.username };
      req.session.user = user;
      res.status(201).json(payload);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST "/api/auth/login"
router.post("/login", validate, (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then((user) => {
      const validatedPassword = bcrypt.compareSync(password, user.password);

      if (user && validatedPassword) {
        req.session.user = user;

        res.json({ message: `${user.username} has logged in successfully!` });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
