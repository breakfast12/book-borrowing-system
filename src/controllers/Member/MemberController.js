const MemberService = require("../../services/Member/MemberService");
const MemberResponse = require("../../resources/MemberResponse");
const MemberDetailResponse = require("../../resources/MemberDetailResponse");

class MemberController {
  constructor() {
    // Initialize the member service instance.
    this.memberService = new MemberService();
  }

  /**
   * Retrieve a list of members.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<Object>} The response object with the list of members.
   */
  async index(req, res) {
    try {
      // Call the listService method to get members.
      const members = await this.memberService.listService(req);

      // Return the list of members.
      return res.status(200).json(members);
    } catch (error) {
      // Handle any errors and return a 500 status.
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Store a new member.
   * @param {Object} req - The request object containing member data.
   * @param {Object} res - The response object.
   * @returns {Promise<Object>} The response object with the created member data.
   */
  async store(req, res) {
    try {
      // Call the storeService method to create a new member.
      const member = await this.memberService.storeService(req.body);

      // Return the created member data.
      return res.status(201).json(MemberResponse(member));
    } catch (error) {
      // Handle any errors and return a 500 status.
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Retrieve a specific member by ID.
   * @param {Object} req - The request object containing member ID.
   * @param {Object} res - The response object.
   * @returns {Promise<Object>} The response object with the member data.
   */
  async show(req, res) {
    try {
      // Call the detailService method to get a member by ID.
      const member = await this.memberService.detailService(req.params.id);

      // Return the member data.
      return res.status(200).json(MemberDetailResponse(member));
    } catch (error) {
      // Handle any errors and return a 500 status.
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Update a specific member by ID.
   * @param {Object} req - The request object containing member ID and data to update.
   * @param {Object} res - The response object.
   * @returns {Promise<Object>} The response object with a success message.
   */
  async update(req, res) {
    try {
      // Call the updateService method to update a member by ID.
      await this.memberService.updateService(req.params.id, req.body);

      // Return a success message.
      return res.status(200).json({ message: "Successfully Update Member" });
    } catch (error) {
      // Handle any errors and return a 500 status.
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Delete a specific member by ID.
   * @param {Object} req - The request object containing member ID.
   * @param {Object} res - The response object.
   * @returns {Promise<Object>} The response object with a success message.
   */
  async destroy(req, res) {
    try {
      // Call the deleteService method to delete a member by ID.
      await this.memberService.deleteService(req.params.id);

      // Return a success message.
      return res.status(200).json({ message: "Successfully Delete Member" });
    } catch (error) {
      // Handle any errors and return a 500 status.
      res.status(500).json({ error: error.message });
    }
  }
}

// Export modules.
module.exports = new MemberController();
