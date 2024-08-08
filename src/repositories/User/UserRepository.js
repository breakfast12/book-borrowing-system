const User = require("../../models/User");
const BaseRepository = require("../BaseRepository");

class UserRepository extends BaseRepository {
  constructor() {
    // Initialize the BaseRepository with the User model.
    super(User);
  }

  /**
   * Finds a user by email.
   *
   * @param {string} email - The email address of the user to find.
   * @returns {Promise<User|null>} The user found or null if no user is found.
   */
  async findByEmail(email) {
    // Find a user by email criteria.
    return this.findOneByCriteria({ email });
  }
}

// Export module
module.exports = UserRepository;
