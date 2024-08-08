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

    const members = [
      {
        code: "M001",
        name: "John Doe",
        createdAt: new Date(initialDate),
        updatedAt: new Date(initialDate),
      },
      {
        code: "M002",
        name: "Jane Smith",
        createdAt: new Date(initialDate.getTime() + 5 * 60 * 1000),
        updatedAt: new Date(initialDate.getTime() + 5 * 60 * 1000),
      },
      {
        code: "M003",
        name: "Michael Johnson",
        createdAt: new Date(initialDate.getTime() + 10 * 60 * 1000),
        updatedAt: new Date(initialDate.getTime() + 10 * 60 * 1000),
      },
      {
        code: "M004",
        name: "Emily Brown",
        createdAt: new Date(initialDate.getTime() + 15 * 60 * 1000),
        updatedAt: new Date(initialDate.getTime() + 15 * 60 * 1000),
      },
      {
        code: "M005",
        name: "David Wilson",
        createdAt: new Date(initialDate.getTime() + 20 * 60 * 1000),
        updatedAt: new Date(initialDate.getTime() + 20 * 60 * 1000),
      },
      {
        code: "M006",
        name: "Sarah Davis",
        createdAt: new Date(initialDate.getTime() + 25 * 60 * 1000),
        updatedAt: new Date(initialDate.getTime() + 25 * 60 * 1000),
      },
      {
        code: "M007",
        name: "James Miller",
        createdAt: new Date(initialDate.getTime() + 30 * 60 * 1000),
        updatedAt: new Date(initialDate.getTime() + 30 * 60 * 1000),
      },
      {
        code: "M008",
        name: "Linda Martinez",
        createdAt: new Date(initialDate.getTime() + 35 * 60 * 1000),
        updatedAt: new Date(initialDate.getTime() + 35 * 60 * 1000),
      },
      {
        code: "M009",
        name: "William Anderson",
        createdAt: new Date(initialDate.getTime() + 40 * 60 * 1000),
        updatedAt: new Date(initialDate.getTime() + 40 * 60 * 1000),
      },
      {
        code: "M010",
        name: "Barbara Taylor",
        createdAt: new Date(initialDate.getTime() + 45 * 60 * 1000),
        updatedAt: new Date(initialDate.getTime() + 45 * 60 * 1000),
      },
    ];

    await queryInterface.bulkInsert("members", members, {});
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("members", null, {});
  },
};
