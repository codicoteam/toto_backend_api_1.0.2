const Library_book = require("../models/library_book_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Library_book.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch library_book: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Library_book.findById(id);
    if (!item) throw new Error("Library_book not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch library_book: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Library_book(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create library_book: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Library_book.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Library_book not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update library_book: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Library_book.findByIdAndDelete(id);
    if (!item) throw new Error("Library_book not found");
    return { message: "Library_book deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete library_book: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllLibrary_books = exports.getAll;
exports.getLibrary_bookById = exports.getById;
exports.createLibrary_book = exports.create;
exports.updateLibrary_book = exports.update;
exports.deleteLibrary_book = exports.delete;
