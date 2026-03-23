const LibraryBook = require("../models/library_book_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await LibraryBook.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch library_book: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await LibraryBook.findById(id);
    if (!item) throw new Error("LibraryBook not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch library_book: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new LibraryBook(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create library_book: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await LibraryBook.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("LibraryBook not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update library_book: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await LibraryBook.findByIdAndDelete(id);
    if (!item) throw new Error("LibraryBook not found");
    return { message: "LibraryBook deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete library_book: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllLibraryBooks = exports.getAll;
exports.getLibraryBookById = exports.getById;
exports.createLibraryBook = exports.create;
exports.updateLibraryBook = exports.update;
exports.deleteLibraryBook = exports.delete;

// Get books by subject ID
exports.getBySubjectId = async (subjectId) => {
  try {
    const items = await LibraryBook.find({ subjectId, isActive: true });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch books by subject: " + error.message);
  }
};

// Like a book
exports.likeBook = async (bookId, userId, userType = 'student') => {
  try {
    const book = await LibraryBook.findById(bookId);
    if (!book) throw new Error("Book not found");
    
    // Check if already liked
    const alreadyLiked = book.likes.some(like => like.userId.toString() === userId);
    
    if (alreadyLiked) {
      // Unlike
      book.likes = book.likes.filter(like => like.userId.toString() !== userId);
      book.likeCount = Math.max(0, book.likeCount - 1);
    } else {
      // Like
      book.likes.push({ userId, userType, likedAt: new Date() });
      book.likeCount = (book.likeCount || 0) + 1;
    }
    
    await book.save();
    return { liked: !alreadyLiked, likeCount: book.likeCount };
  } catch (error) {
    throw new Error("Failed to like book: " + error.message);
  }
};

// Update service to use correct model name
