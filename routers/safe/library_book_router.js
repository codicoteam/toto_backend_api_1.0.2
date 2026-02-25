const express = require("express");
const router = express.Router();
const library_bookController = require("../controllers/library_book_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (library_bookController.loginLibrary_book) router.post("/login", library_bookController.loginLibrary_book);
if (library_bookController.registerLibrary_book) router.post("/register", library_bookController.registerLibrary_book);

// Protected endpoints (if they exist)
if (library_bookController.getAllLibrary_books) router.get("/", authenticateToken, library_bookController.getAllLibrary_books);
if (library_bookController.getLibrary_bookById) router.get("/:id", authenticateToken, library_bookController.getLibrary_bookById);
if (library_bookController.createLibrary_book) router.post("/", authenticateToken, library_bookController.createLibrary_book);
if (library_bookController.updateLibrary_book) router.put("/:id", authenticateToken, library_bookController.updateLibrary_book);
if (library_bookController.deleteLibrary_book) router.delete("/:id", authenticateToken, library_bookController.deleteLibrary_book);

// Fallback for standard methods
if (!library_bookController.getAllLibrary_books && library_bookController.getAll) router.get("/", authenticateToken, library_bookController.getAll);
if (!library_bookController.getLibrary_bookById && library_bookController.getById) router.get("/:id", authenticateToken, library_bookController.getById);
if (!library_bookController.createLibrary_book && library_bookController.create) router.post("/", authenticateToken, library_bookController.create);
if (!library_bookController.updateLibrary_book && library_bookController.update) router.put("/:id", authenticateToken, library_bookController.update);
if (!library_bookController.deleteLibrary_book && library_bookController.delete) router.delete("/:id", authenticateToken, library_bookController.delete);

module.exports = router;
