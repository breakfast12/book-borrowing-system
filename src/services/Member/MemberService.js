const MemberRepository = require("../../repositories/Member/MemberRepository");
const generateCode = require("../../utils/GenerateCode");
const { memberCollection } = require("../../resources/MemberCollection");

class MemberService {
  constructor() {
    // Initialize the member repository instance.
    this.memberRepository = new MemberRepository();
  }

  /**
   * Retrieves a list of members based on query parameters.
   *
   * @param {Object} req - The request object containing query parameters.
   * @returns {Promise<Object>} The response object with member list and metadata.
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

    // Fetch members and total count.
    const { total, members } = await this.memberRepository.getAll({
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

    // Return the response object with member list and metadata.
    return {
      message: "Successfully Show List Member",
      data: memberCollection(members),
      meta: {
        totalItems: total,
        itemCount: members.length,
        itemsPerPage: per_page,
        totalPages,
        currentPage: page,
      },
      links,
    };
  }

  /**
   * Creates a new member with a generated code.
   *
   * @param {Object} data - The data for the new member.
   * @returns {Promise<Object>} The created member object.
   */
  async storeService(data) {
    // Get the last created member to generate a new code.
    const lastMember = await this.memberRepository.findLast();
    const lastCode = lastMember ? lastMember.code : "M000";
    const number = parseInt(lastCode.substring(1)) + 1;
    const code = generateCode("M", number);

    // Create a new member with the generated code.
    return this.memberRepository.create({ ...data, code });
  }

  /**
   * Retrieves a specific member by ID.
   *
   * @param {number} id - The ID of the member to retrieve.
   * @returns {Promise<Object>} The member object.
   */
  async detailService(id) {
    // Fetch the member by ID from the repository.
    return this.memberRepository.findById(id);
  }

  /**
   * Updates a specific member by ID.
   *
   * @param {number} id - The ID of the member to update.
   * @param {Object} data - The data to update the member with.
   * @returns {Promise<Object>} The updated member object.
   */
  async updateService(id, data) {
    // Update the member with the provided data.
    return this.memberRepository.update(id, data);
  }

  /**
   * Deletes a specific member by ID.
   *
   * @param {number} id - The ID of the member to delete.
   * @returns {Promise<void>} Indicates the member was deleted.
   */
  async deleteService(id) {
    // Delete the member by ID from the repository.
    return this.memberRepository.delete(id);
  }
}

// Export module
module.exports = MemberService;
