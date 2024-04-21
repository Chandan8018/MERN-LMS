import StudentBorrow from "../models/student.model.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  const newBorrow = new StudentBorrow({
    ...req.body,
  });
  try {
    const savedPost = await newBorrow.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};
