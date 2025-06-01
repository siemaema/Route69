const checkRole = (role) => {
  return (req, res, next) => {
    const user = req.session?.user;
    if (!user) {
      return res.status(401).json({ message: "Nieautoryzowany" });
    }
    if (user.role !== role) {
      return res.status(403).json({ message: "Brak uprawnień" });
    }
    next();
  };
};

module.exports = checkRole;
