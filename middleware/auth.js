// Backend/middleware/auth.js

const isAuthenticated = (req, res, next) => {
  if (req.session?.user) {
    return next();
  }
  return res.status(401).json({ message: "Nieautoryzowany" });
};

module.exports = isAuthenticated;
