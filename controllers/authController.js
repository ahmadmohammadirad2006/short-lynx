const AppError = require('../utils/appError');

exports.isAdmin = (req, res, next) => {
  if (req.headers.admintoken !== process.env.ADMIN_TOKEN)
    return next(
      new AppError("You don't have permission to perform this action", 403)
    );
  next();
};
