const authPermission = (permission) => {
  return (req, res, next) => {
    const userRole = req.user.userRole;
    if (permission.includes(userRole)) {
      next();
    } else {
      return res.status(401).json("NO PERMISSION");
    }
  };
};

module.exports = { authPermission };
