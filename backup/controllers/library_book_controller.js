const library_bookService = require("../services/library_book_service.js");

// Create new book
exports.createBook = async (req, res) => {
  try {
    if (req.user && req.user.type === 'teacher') {
      req.body.teacherId = req.user.id;
    }
    
    const newBook = await libraryBookService.createBook(req.body);
    
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create book",
      error: error.message,
    });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const filters = {};
    if (req.query.teacherId) filters.teacherId = req.query.teacherId;
    if (req.query.subject) filters.subject = req.query.subject;
    if (req.query.level) filters.level = req.query.level;
    if (req.query.isFree !== undefined) filters.isFree = req.query.isFree === 'true';
    if (req.query.file_type) filters.file_type = req.query.file_type;
    
    const books = await libraryBookService.getAllBooks(filters);
    
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
      count: books.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error: error.message,
    });
  }
};

// Get book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await libraryBookService.getBookById(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Book not found",
      error: error.message,
    });
  }
};

// Update book by ID
exports.updateBook = async (req, res) => {
  try {
    if (req.user.type === 'teacher') {
      const book = await libraryBookService.getBookById(req.params.id);
      if (book.teacherId && book.teacherId.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "You can only update your own books",
        });
      }
    }
    
    const updatedBook = await libraryBookService.updateBook(req.params.id, req.body);
    
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update book",
      error: error.message,
    });
  }
};

// Delete book by ID
exports.deleteBook = async (req, res) => {
  try {
    if (req.user.type === 'teacher') {
      const book = await libraryBookService.getBookById(req.params.id);
      if (book.teacherId && book.teacherId.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "You can only delete your own books",
        });
      }
    }
    
    await libraryBookService.deleteBook(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error: error.message,
    });
  }
};

// Like a book
exports.likeBook = async (req, res) => {
  try {
    if (req.user.type !== 'student') {
      return res.status(403).json({
        success: false,
        message: "Only students can like books",
      });
    }
    
    const book = await libraryBookService.likeBook(req.params.id, req.user.id);
    
    res.status(200).json({
      success: true,
      message: "Book liked successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to like book",
      error: error.message,
    });
  }
};

// Unlike a book
exports.unlikeBook = async (req, res) => {
  try {
    if (req.user.type !== 'student') {
      return res.status(403).json({
        success: false,
        message: "Only students can unlike books",
      });
    }
    
    const book = await libraryBookService.unlikeBook(req.params.id, req.user.id);
    
    res.status(200).json({
      success: true,
      message: "Book unliked successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to unlike book",
      error: error.message,
    });
  }
};

// Get books by teacher ID
exports.getBooksByTeacherId = async (req, res) => {
  try {
    const books = await libraryBookService.getBooksByTeacherId(req.params.teacherId);
    
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
      count: books.length,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "No books found for this teacher",
      error: error.message,
    });
  }
};

// Get popular books
exports.getPopularBooks = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const books = await libraryBookService.getPopularBooks(limit);
    
    res.status(200).json({
      success: true,
      message: "Popular books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve popular books",
      error: error.message,
    });
  }
};

// Search books
exports.searchBooks = async (req, res) => {
  try {
    const { query, subject, level, file_type } = req.query;
    const books = await libraryBookService.searchBooks({ query, subject, level, file_type });
    
    res.status(200).json({
      success: true,
      message: "Books search results",
      data: books,
      count: books.length,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to search books",
      error: error.message,
    });
  }
};

// Increment download count
exports.incrementDownloadCount = async (req, res) => {
  try {
    const book = await libraryBookService.incrementDownloadCount(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Download count updated",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update download count",
      error: error.message,
    });
  }
};

// Add missing functions for router compatibility
exports.getAll = exports.getAllBooks;
exports.getById = exports.getBookById;
exports.create = exports.createBook;
exports.update = exports.updateBook;
exports.delete = exports.deleteBook;
