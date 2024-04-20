import mongoose from "mongoose";

const studentBorrowSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    bookname: {
      type: String,
    },
    ISBNNumber: {
      type: String,
    },
    authorname: {
      type: String,
    },
    quantity: {
      type: String,
      default: "1",
    },
    daysborrow: {
      type: String,
    },
    studentName: {
      type: String,
    },
    status: {
      type: String,
    },
    regdNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const StudentBorrow = mongoose.model("Student", studentBorrowSchema);

export default StudentBorrow;
