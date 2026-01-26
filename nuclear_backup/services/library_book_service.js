const library_bookModel = require("../models/library_book_model.js");

// Create new book
const createBook = async (bookData) => {
  try {
    const newBook = new Book(bookData);
    await newBook.save();
    return newBook;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all books
const getAllBooks = async (filters = {}) => {
  try {
    const query = { deleted: false };
    
    if (filters.teacherId) query.teacherId = filters.teacherId;
    if (filters.subject) query.subject = filters.subject;
    if (filters.level) query.level = filters.level;
    if (filters.isFree !== undefined) query.isFree = filters.isFree;
    if (filters.file_type) query.file_type = filters.file_type;
    
    const books = await Book.find(query)
      .populate("subject")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications")
      .sort({ createdAt: -1 });
    
    return books;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get book by ID
const getBookById = async (id) => {
  try {
    const book = await Book.findById(id)
      .populate("subject")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications");

    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update book by ID
const updateBook = async (id, updateData) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    )
      .populate("subject")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications");

    if (!updatedBook) {
      throw new Error("Book not found");
    }
    return updatedBook;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete book by ID (soft delete)
const deleteBook = async (id) => {
  try {
    const deletedBook = await Book.findByIdAndUpdate(
      id,
      { deleted: true, deletedAt: Date.now() },
      { new: true }
    );

    if (!deletedBook) {
      throw new Error("Book not found");
    }
    return deletedBook;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get books by teacher ID
const getBooksByTeacherId = async (teacherId) => {
  try {
    const books = await Book.find({ 
      teacherId, 
      deleted: false 
    })
      .populate("subject")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications")
      .sort({ createdAt: -1 });

    return books;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Like a book
const likeBook = async (bookId, studentId) => {
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }

    // Check if already liked
    const alreadyLiked = book.likes.some(like => 
      like.student.toString() === studentId
    );

    if (alreadyLiked) {
      throw new Error("Book already liked");
    }

    book.likes.push({
      student: studentId,
      likedAt: Date.now()
    });
    book.likesCount = book.likes.length;

    await book.save();
    return book;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Unlike a book
const unlikeBook = async (bookId, studentId) => {
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }

    const likeIndex = book.likes.findIndex(like => 
      like.student.toString() === studentId
    );

    if (likeIndex === -1) {
      throw new Error("Book not liked");
    }

    book.likes.splice(likeIndex, 1);
    book.likesCount = book.likes.length;

    await book.save();
    return book;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get popular books
const getPopularBooks = async (limit = 10) => {
  try {
    const books = await Book.find({ deleted: false })
      .sort({ likesCount: -1, downloadCount: -1 })
      .limit(limit)
      .populate("subject")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications");

    return books;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Search books
const searchBooks = async (filters = {}) => {
  try {
    const query = { deleted: false };

    if (filters.query) {
      query.$or = [
        { title: { $regex: filters.query, $options: 'i' } },
        { description: { $regex: filters.query, $options: 'i' } }
      ];
    }

    if (filters.subject) query.subject = filters.subject;
    if (filters.level) query.level = filters.level;
    if (filters.file_type) query.file_type = filters.file_type;

    const books = await Book.find(query)
      .populate("subject")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications")
      .sort({ createdAt: -1 });

    return books;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Increment download count
const incrementDownloadCount = async (bookId) => {
  try {
    const book = await Book.findByIdAndUpdate(
      bookId,
      { $inc: { downloadCount: 1 } },
      { new: true }
    )
      .populate("subject")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications");

    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  getBooksByTeacherId,
  likeBook,
  unlikeBook,
  getPopularBooks,
  searchBooks,
  incrementDownloadCount
};
