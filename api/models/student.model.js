import mongoose from "mongoose";

const studentBorrowSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
    },
    studentImage: {
      type: String,
    },
    regdNumber: {
      type: String,
    },
    bookId: {
      type: String,
      required: true,
    },
    bookname: {
      type: String,
    },
    bookImage: {
      type: String,
    },
    ISBN: {
      type: String,
    },
    authorname: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const StudentBorrow = mongoose.model("Student", studentBorrowSchema);

export default StudentBorrow;
