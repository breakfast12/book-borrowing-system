const { Op } = require("sequelize");
const Book = require("../../models/Book");
const BaseRepository = require("../BaseRepository");

class BookRepository extends BaseRepository {
  constructor() {
    // Initialize the BaseRepository with the Book model.
    super(Book);
  }

  /**
   * Retrieve all books based on the provided query parameters.
   *
   * @param {Object} query - The query parameters for retrieving books.
   * @param {string} query.search - The search term to filter books by code, title, or author.
   * @param {string} query.sortBy - The field to sort by (default: 'createdAt').
   * @param {string} query.sortDirection - The direction to sort (ASC or DESC, default: 'DESC').
   * @param {number} query.per_page - The number of records per page (default: 10).
   * @param {number} query.page - The page number to retrieve (default: 1).
   * @returns {Promise<Object>} The total count and list of books.
   */
  async getAll(query) {
    // Query parameters with default values.
    const {
      search = "",
      sortBy = "createdAt",
      sortDirection = "DESC",
      per_page = 10,
      page = 1,
    } = query;

    // Define valid sort fields and directions.
    const validSortFields = [
      "code",
      "title",
      "author",
      "stock",
      "createdAt",
      "updatedAt",
    ];
    const validSortDirections = ["ASC", "DESC"];

    // Validate sortBy and sortDirection, set defaults if invalid.
    const finalSortBy = validSortFields.includes(sortBy) ? sortBy : "createdAt";
    const finalSortDirection = validSortDirections.includes(sortDirection)
      ? sortDirection
      : "DESC";

    // Define where conditions for search term.
    const whereConditions = search
      ? {
          [Op.or]: [
            { code: { [Op.like]: `%${search}%` } },
            { title: { [Op.like]: `%${search}%` } },
            { author: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    // Define sorting order.
    const order = [[finalSortBy, finalSortDirection]];

    // Define limit and offset for pagination.
    const limit = parseInt(per_page, 10);
    const offset = (parseInt(page, 10) - 1) * limit;

    // Find and count query.
    const { count, rows } = await this.model.findAndCountAll({
      where: whereConditions,
      order,
      limit,
      offset,
    });

    // Return the total count and list of books.
    return {
      total: count,
      books: rows,
    };
  }

  /**
   * Retrieves a book by its unique code.
   *
   * @param {string} code - The unique code of the book.
   * @returns {Promise<Object|null>} The book object if found, or null if not found.
   */
  async findByCode(code) {
    // Find a book by code
    return this.findOneByCriteria({ code });
  }
}

// Export modules.
module.exports = BookRepository;
