module.exports = (req, res, next) => {
  if (!req.session || !req.session.user) {
    res.status(401).json({ you: "shall not pass!" });
  } else {
    next();
  }
};
