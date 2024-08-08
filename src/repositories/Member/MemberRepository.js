const { Op } = require("sequelize");
const Member = require("../../models/Member");
const BaseRepository = require("../BaseRepository");

class MemberRepository extends BaseRepository {
  constructor() {
    // Initialize the BaseRepository with the Member model.
    super(Member);
  }

  /**
   * Retrieve all members based on the provided query parameters.
   *
   * @param {Object} query - The query parameters for retrieving members.
   * @param {string} query.search - The search term to filter members by code or name.
   * @param {string} query.sortBy - The field to sort by.
   * @param {string} query.sortDirection - The direction to sort (ASC or DESC).
   * @param {number} query.per_page - The number of records per page.
   * @param {number} query.page - The page number to retrieve.
   * @returns {Promise<Object>} The total count and list of members.
   */
  async getAll(query) {
    // Query parameters with default values.
    const {
      search = "",
      sortBy = "createdAt",
      sortDirection = "DESC",
      per_page = 10,
      page = 0,
    } = query;

    // Define valid sort fields and directions.
    const validSortFields = ["code", "name", "createdAt", "updatedAt"];
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
            { name: { [Op.like]: `%${search}%` } },
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

    // Return the total count and list of members.
    return {
      total: count,
      members: rows,
    };
  }

  /**
   * Retrieve the last created member.
   *
   * @returns {Promise<Object>} The last created member.
   */
  async findLast() {
    // Find the last created member by ordering by createdAt in descending order.
    return this.model.findOne({
      order: [["createdAt", "DESC"]],
    });
  }

  /**
   * Retrieve a member by their name.
   *
   * @param {string} name - The name of the member to retrieve.
   * @returns {Promise<Object>} The member with the specified name.
   */
  async findByName(name) {
    // Find a member by their name using a criteria object.
    return this.findOneByCriteria({ name });
  }
}

// Export modules.
module.exports = MemberRepository;
