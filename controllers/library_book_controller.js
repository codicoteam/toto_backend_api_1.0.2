const bookService = require("../services/library_book_service");

// Basic CRUD
exports.getAll = async (req, res) => {
  try {
    const data = await bookService.getAll();
    res.status(200).json({ success: true, message: "Books retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await bookService.getById(req.params.id);
    res.status(200).json({ success: true, message: "Book retrieved", data });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await bookService.create(req.body);
    res.status(201).json({ success: true, message: "Book created", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await bookService.update(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Book updated", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await bookService.delete(req.params.id);
    res.status(200).json({ success: true, message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Additional methods
exports.getAllBooks = exports.getAll;
exports.getBookById = exports.getById;
exports.createBook = exports.create;
exports.updateBook = exports.update;
exports.deleteBook = exports.delete;

exports.getBooksBySubjectId = async (req, res) => {
  try {
    const data = await bookService.getBySubjectId(req.params.subjectId);
    res.status(200).json({ success: true, message: "Books retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.likeBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { studentId } = req.body;
    const data = await bookService.likeBook(bookId, studentId);
    res.status(200).json({ success: true, message: "Book liked", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
