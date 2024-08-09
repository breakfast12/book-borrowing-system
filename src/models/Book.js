const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

/**
 * Defines the Book model.
 *
 * @typedef {Object} Book
 * @property {string} code - The unique code identifying the book. Must be unique and non-null.
 * @property {string} title - The title of the book. Cannot be null.
 * @property {string} author - The author of the book. Cannot be null.
 * @property {number} stock - The number of copies available in stock. Cannot be null, defaults to 0.
 * @property {Date} createdAt - The date and time when the book record was created. Automatically generated.
 * @property {Date} updatedAt - The date and time when the book record was last updated. Automatically generated.
 * @property {Date|null} deletedAt - The date and time when the book record was deleted. Null if not deleted. Automatically managed by Sequelize's paranoid option.
 *
 * @type {Model}
 */
const Book = sequelize.define(
  "Book",
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    paranoid: true,
    timestamps: true,
  },
);

module.exports = Book;
