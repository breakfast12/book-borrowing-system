const BookRepository = require("../../repositories/Book/BookRepository");
const { bookCollection } = require("../../resources/BookCollection");

class BookService {
  constructor() {
    // Initialize the book repository instance.
    this.bookRepository = new BookRepository();
  }

  /**
   * Retrieves a list of books based on query parameters.
   *
   * @param {Object} req - The request object containing query parameters.
   * @returns {Promise<Object>} The response object with book list and metadata.
   */
  async listService(req) {
    // Get query parameters from request.
    const queryParams = req.query;
    const per_page = parseInt(queryParams.per_page, 10) || 10;
    const page = parseInt(queryParams.page, 10) || 1;
    const search = queryParams.search || "";
    const sortBy = queryParams.sortBy || "createdAt";
    const sortDirection = queryParams.sortDirection || "DESC";

    // Allowed query parameters for validation.
    const allowedParams = [
      "per_page",
      "page",
      "search",
      "sortBy",
      "sortDirection",
    ];

    // Validate query parameters.
    Object.keys(queryParams).forEach((param) => {
      if (!allowedParams.includes(param)) {
        throw new Error(`Invalid query parameter: ${param}`);
      }
    });

    // Construct the base URL for pagination links.
    const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl.split("?").shift()}`;

    // Fetch books and total count.
    const { total, books } = await this.bookRepository.getAll({
      search,
      sortBy,
      sortDirection,
      per_page,
      page,
    });

    // Calculate pagination metadata.
    const totalPages = Math.ceil(total / per_page);
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    // Construct pagination links.
    const links = {
      first: `${baseUrl}?per_page=${per_page}&page=1`,
      previous: prevPage
        ? `${baseUrl}?per_page=${per_page}&page=${prevPage}`
        : null,
      next: nextPage
        ? `${baseUrl}?per_page=${per_page}&page=${nextPage}`
        : null,
      last: `${baseUrl}?per_page=${per_page}&page=${totalPages}`,
    };

    // Return the response object with book list and metadata.
    return {
      message: "Successfully Show List Book",
      data: bookCollection(books),
      meta: {
        totalItems: total,
        itemCount: books.length,
        itemsPerPage: per_page,
        totalPages,
        currentPage: page,
      },
      links,
    };
  }

  /**
   * Creates a new book record.
   *
   * @param {Object} data - The data for the new book.
   * @returns {Promise<Object>} The created book object.
   */
  async storeService(data) {
    return this.bookRepository.create(data);
  }

  /**
   * Retrieves a specific book by its ID.
   *
   * @param {number} id - The ID of the book to retrieve.
   * @returns {Promise<Object>} The book object.
   */
  async detailService(id) {
    return this.bookRepository.findById(id);
  }

  /**
   * Updates a specific book by its ID.
   *
   * @param {number} id - The ID of the book to update.
   * @param {Object} data - The data to update the book with.
   * @returns {Promise<Object>} The updated book object.
   */
  async updateService(id, data) {
    return this.bookRepository.update(id, data);
  }

  /**
   * Deletes a specific book by its ID.
   *
   * @param {number} id - The ID of the book to delete.
   * @returns {Promise<void>} Indicates the book was deleted.
   */
  async deleteService(id) {
    return this.bookRepository.delete(id);
  }
}

// Export module
module.exports = BookService;
