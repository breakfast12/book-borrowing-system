const BookService = require("../../services/Book/BookService");
const BookResponse = require("../../resources/BookResponse");
const BookDetailResponse = require("../../resources/BookDetailResponse");

class BookController {
  constructor() {
    // Initialize the BookService instance
    this.bookService = new BookService();
  }

  /**
   * Retrieve a list of books.
   * @param {Object} req - The request object containing query parameters.
   * @param {Object} res - The response object.
   * @returns {Promise<Object>} The response object with the list of books.
   */
  async index(req, res) {
    try {
      // Call the listService method to get books.
      const books = await this.bookService.listService(req);

      // Return the list of books.
      return res.status(200).json(books);
    } catch (error) {
      // Handle any errors and return a 500 status.
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Store a new book.
   * @param {Object} req - The request object containing book data.
   * @param {Object} res - The response object.
   * @returns {Promise<Object>} The response object with the created book data.
   */
  async store(req, res) {
    try {
      // Call the storeService method to create a new book.
      const book = await this.bookService.storeService(req.body);

      // Return the created book data.
      return res.status(201).json(BookResponse(book));
    } catch (error) {
      // Handle any errors and return a 500 status.
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Retrieve a specific book by ID.
   * @param {Object} req - The request object containing book ID.
   * @param {Object} res - The response object.
   * @returns {Promise<Object>} The response object with the book data.
   */
  async show(req, res) {
    try {
      // Call the detailService method to get a book by ID.
      const book = await this.bookService.detailService(req.params.id);

      // Return the book data.
      return res.status(200).json(BookDetailResponse(book));
    } catch (error) {
      // Handle any errors and return a 500 status.
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Update a specific book by ID.
   * @param {Object} req - The request object containing book ID and data to update.
   * @param {Object} res - The response object.
   * @returns {Promise<Object>} The response object with a success message.
   */
  async update(req, res) {
    try {
      // Call the updateService method to update a book by ID.
      await this.bookService.updateService(req.params.id, req.body);

      // Return a success message.
      return res.status(200).json({ message: "Successfully Update Book" });
    } catch (error) {
      // Handle any errors and return a 500 status.
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Delete a specific book by ID.
   * @param {Object} req - The request object containing book ID.
   * @param {Object} res - The response object.
   * @returns {Promise<Object>} The response object with a success message.
   */
  async destroy(req, res) {
    try {
      // Call the deleteService method to delete a book by ID.
      await this.bookService.deleteService(req.params.id);

      // Return a success message.
      return res.status(200).json({ message: "Successfully Delete Book" });
    } catch (error) {
      // Handle any errors and return a 500 status.
      res.status(500).json({ error: error.message });
    }
  }
}

// Export modules.
module.exports = new BookController();
