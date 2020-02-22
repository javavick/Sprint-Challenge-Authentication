module.exports = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res
      .status(400)
      .json({ message: "Missing required username or password field." });
  } else {
    next();
  }
};
