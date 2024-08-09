"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const initialDate = new Date();

    const books = [
      {
        code: "TLM-02",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        stock: 10,
        createdAt: new Date(initialDate),
        updatedAt: new Date(initialDate),
      },
      {
        code: "GO-50",
        title: "1984",
        author: "George Orwell",
        stock: 15,
        createdAt: new Date(initialDate.getTime() + 5 * 60 * 1000),
        updatedAt: new Date(initialDate.getTime() + 5 * 60 * 1000),
      },
      {
        code: "PP-87",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        stock: 8,
        createdAt: new Date(initialDate.getTime() + 10 * 60 * 1000),
        updatedAt: new Date(initialDate.getTime() + 10 * 60 * 1000),
      },
      {
        code: "TGG-32",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        stock: 12,
        createdAt: new Date(initialDate.getTime() + 15 * 60 * 1000),
        updatedAt: new Date(initialDate.getTime() + 15 * 60 * 1000),
      },
      {
        code: "MD-23",
        title: "Moby-Dick",
        author: "Herman Melville",
        stock: 7,
        createdAt: new Date(initialDate.getTime() + 20 * 60 * 1000),
        updatedAt: new Date(initialDate.getTime() + 20 * 60 * 1000),
      },
      {
        code: "WAP-79",
        title: "War and Peace",
        author: "Leo Tolstoy",
        stock: 5,
        createdAt: new Date(initialDate.getTime() + 25 * 60 * 1000),
        updatedAt: new Date(initialDate.getTime() + 25 * 60 * 1000),
      },
      {
        code: "TCTR-67",
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        stock: 14,
        createdAt: new Date(initialDate.getTime() + 30 * 60 * 1000),
        updatedAt: new Date(initialDate.getTime() + 30 * 60 * 1000),
      },
      {
        code: "TLTR-19",
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        stock: 18,
        createdAt: new Date(initialDate.getTime() + 35 * 60 * 1000),
        updatedAt: new Date(initialDate.getTime() + 35 * 60 * 1000),
      },
      {
        code: "JE-45",
        title: "Jane Eyre",
        author: "Charlotte Brontë",
        stock: 9,
        createdAt: new Date(initialDate.getTime() + 40 * 60 * 1000),
        updatedAt: new Date(initialDate.getTime() + 40 * 60 * 1000),
      },
      {
        code: "BNW-09",
        title: "Brave New World",
        author: "Aldous Huxley",
        stock: 13,
        createdAt: new Date(initialDate.getTime() + 45 * 60 * 1000),
        updatedAt: new Date(initialDate.getTime() + 45 * 60 * 1000),
      },
    ];

    await queryInterface.bulkInsert("books", books, {});
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("books", null, {});
  },
};
