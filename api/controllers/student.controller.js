import StudentBorrow from "../models/student.model.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not allowed to book issue to students  }")
    );
  }

  const newBorrow = new StudentBorrow({
    ...req.body,
    userId: req.user.id,
    postId: req.post.postId,
    regdNumber: req.user.regdNumber,
  });
};
