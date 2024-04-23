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

export const getstudentborrowbooks = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "desc" ? -1 : 1;
    const borrowBooks = await StudentBorrow.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalBooksBorrow = await StudentBorrow.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthBorrowBooks = await StudentBorrow.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res
      .status(200)
      .json({ borrowBooks, totalBooksBorrow, lastMonthBorrowBooks });
  } catch (error) {
    next(error);
  }
};

export const getstudentwithborrowbooks = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not allowed to get all borrow books ")
    );
  }
  try {
    const borrowBooks = await StudentBorrow.find({
      regdNumber: req.params.regdNumber,
    });
    if (!borrowBooks) {
      return next(errorHandler(404, "Borrow Books not found"));
    }
    res.status(200).json(borrowBooks);
  } catch (error) {
    next(error);
  }
};
