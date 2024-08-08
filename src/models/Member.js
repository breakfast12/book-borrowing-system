const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

/**
 * Defines the Member model.
 *
 * @typedef {Object} Member
 * @property {string} code - The unique code identifying the member. Must be unique and non-null.
 * @property {string} name - The name of the member. Cannot be null.
 * @property {Date} createdAt - The date and time when the member record was created.
 * @property {Date} updatedAt - The date and time when the member record was last updated.
 * @property {Date|null} deletedAt - The date and time when the member record was deleted. Null if not deleted.
 *
 * @type {Model}
 */
const Member = sequelize.define(
  "Member",
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    timestamps: true,
  },
);

module.exports = Member;
