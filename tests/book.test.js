const request = require("supertest");
const app = require("../src/app");
const db = require("../src/utils/db");

let token;

beforeAll(async () => {
  const response = await request(app).post("/api/auth/login").send({
    email: "admin@mailinator.com",
    password: "password123",
  });

  token = response.body.token;
});

afterAll(async () => {
  db.close();
});

function isSorted(array, key, direction = "ASC") {
  for (let index = 1; index < array.length; index++) {
    if (direction === "ASC" && array[index - 1][key] > array[index][key]) {
      return false;
    }

    if (direction === "DESC" && array[index - 1][key] < array[index][key]) {
      return false;
    }
  }

  return true;
}

describe("Book", () => {
  let bookId;

  describe("GET /api/book/", () => {
    it("Invalid parameter", async () => {
      const response = await request(app)
        .get("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .query({ abc: "abc" });

      expect(response.status).toBe(500);
      expect("Invalid query parameter: abc").toEqual(response.body.error);
    });

    it("Get all book", async () => {
      const response = await request(app)
        .get("/api/book")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect("Successfully Show List Book").toEqual(response.body.message);
    });

    it("Search by code", async () => {
      const response = await request(app)
        .get("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .query({ search: "md" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Book").toEqual(response.body.message);
      expect("MD-23").toEqual(response.body.data[0].code);
    });

    it("Search by title", async () => {
      const response = await request(app)
        .get("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .query({ search: "war" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Book").toEqual(response.body.message);
      expect("War and Peace").toEqual(response.body.data[0].title);
    });

    it("Search by author", async () => {
      const response = await request(app)
        .get("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .query({ search: "orwell" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Book").toEqual(response.body.message);
      expect("George Orwell").toEqual(response.body.data[0].author);
    });

    it("Sort by code asc", async () => {
      const response = await request(app)
        .get("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .query({ sortBy: "code", sortDirection: "ASC" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Book").toEqual(response.body.message);
      expect(isSorted(response.body.data, "code", "ASC")).toBe(true);
    });

    it("Sort by code desc", async () => {
      const response = await request(app)
        .get("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .query({ sortBy: "code", sortDirection: "DESC" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Book").toEqual(response.body.message);
      expect(isSorted(response.body.data, "code", "DESC")).toBe(true);
    });

    it("Sort by title asc", async () => {
      const response = await request(app)
        .get("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .query({ sortBy: "title", sortDirection: "ASC" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Book").toEqual(response.body.message);
      expect(isSorted(response.body.data, "title", "ASC")).toBe(true);
    });

    it("Sort by title desc", async () => {
      const response = await request(app)
        .get("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .query({ sortBy: "title", sortDirection: "DESC" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Book").toEqual(response.body.message);
      expect(isSorted(response.body.data, "title", "DESC")).toBe(true);
    });

    it("Sort by author asc", async () => {
      const response = await request(app)
        .get("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .query({ sortBy: "author", sortDirection: "ASC" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Book").toEqual(response.body.message);
      expect(isSorted(response.body.data, "author", "ASC")).toBe(true);
    });

    it("Sort by author desc", async () => {
      const response = await request(app)
        .get("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .query({ sortBy: "author", sortDirection: "DESC" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Book").toEqual(response.body.message);
      expect(isSorted(response.body.data, "author", "DESC")).toBe(true);
    });

    it("Sort by stock asc", async () => {
      const response = await request(app)
        .get("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .query({ sortBy: "stock", sortDirection: "ASC" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Book").toEqual(response.body.message);
      expect(isSorted(response.body.data, "stock", "ASC")).toBe(true);
    });

    it("Sort by stock desc", async () => {
      const response = await request(app)
        .get("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .query({ sortBy: "stock", sortDirection: "DESC" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Book").toEqual(response.body.message);
      expect(isSorted(response.body.data, "stock", "DESC")).toBe(true);
    });

    it("Sort by createdAt asc", async () => {
      const response = await request(app)
        .get("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .query({ sortBy: "createdAt", sortDirection: "ASC" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Book").toEqual(response.body.message);
      expect(isSorted(response.body.data, "createdAt", "ASC")).toBe(true);
    });

    it("Sort by createdAt desc", async () => {
      const response = await request(app)
        .get("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .query({ sortBy: "createdAt", sortDirection: "DESC" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Book").toEqual(response.body.message);
      expect(isSorted(response.body.data, "createdAt", "DESC")).toBe(true);
    });

    it("Sort by updatedAt asc", async () => {
      const response = await request(app)
        .get("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .query({ sortBy: "updatedAt", sortDirection: "ASC" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Book").toEqual(response.body.message);
      expect(isSorted(response.body.data, "updatedAt", "ASC")).toBe(true);
    });

    it("Sort by updatedAt desc", async () => {
      const response = await request(app)
        .get("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .query({ sortBy: "updatedAt", sortDirection: "DESC" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Book").toEqual(response.body.message);
      expect(isSorted(response.body.data, "updatedAt", "DESC")).toBe(true);
    });
  });

  describe("POST /api/book", () => {
    it("Can't store cause code is required", async () => {
      const response = await request(app)
        .post("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .send({
          code: "",
          title: "Harry Potter",
          author: "J.K Rowling",
          stock: 1,
        });

      expect(response.status).toBe(400);
      expect("Code is required").toEqual(response.body.errors.code);
    });

    it("Can't store cause code must be unique", async () => {
      const response = await request(app)
        .post("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .send({
          code: "TLM-02",
          title: "Harry Potter",
          author: "J.K Rowling",
          stock: 1,
        });

      expect(response.status).toBe(400);
      expect("Book code must be unique").toEqual(response.body.errors.code);
    });

    it("Can't store cause title is required", async () => {
      const response = await request(app)
        .post("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .send({
          code: "TW-11",
          title: "",
          author: "Stephenie Meyer",
          stock: 1,
        });

      expect(response.status).toBe(400);
      expect("Title is required").toEqual(response.body.errors.title);
    });

    it("Can't store cause author is required", async () => {
      const response = await request(app)
        .post("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .send({
          code: "TW-11",
          title: "Twilight",
          author: "",
          stock: 1,
        });

      expect(response.status).toBe(400);
      expect("Author is required").toEqual(response.body.errors.author);
    });

    it("Can't store cause stock is required", async () => {
      const response = await request(app)
        .post("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .send({
          code: "TW-11",
          title: "Twilight",
          author: "Stephenie Meyer",
          stock: "",
        });

      expect(response.status).toBe(400);
      expect("Stock is required").toEqual(response.body.errors.stock);
    });

    it("Can't store cause stock must be an integer", async () => {
      const response = await request(app)
        .post("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .send({
          code: "TW-11",
          title: "Twilight",
          author: "Stephenie Meyer",
          stock: "abc",
        });

      expect(response.status).toBe(400);
      expect("Stock must be an integer").toEqual(response.body.errors.stock);
    });

    it("Can't store cause stock must be at least 1", async () => {
      const response = await request(app)
        .post("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .send({
          code: "TW-11",
          title: "Twilight",
          author: "Stephenie Meyer",
          stock: 0,
        });

      expect(response.status).toBe(400);
      expect("Stock must be at least 1").toEqual(response.body.errors.stock);
    });

    it("Success Store", async () => {
      const response = await request(app)
        .post("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .send({
          code: "TW-11",
          title: "Twilight",
          author: "Stephenie Meyer",
          stock: 8,
        });

      expect(response.status).toBe(201);
      expect("Successfully Store Book").toEqual(response.body.message);
      bookId = response.body.book.id;
    });
  });

  describe("GET /api/book/:id", () => {
    it("Can't show detail cause book not found", async () => {
      const response = await request(app)
        .get("/api/book/99")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect("Book not found").toEqual(response.body.errors.id);
    });

    it("Success show detail", async () => {
      const response = await request(app)
        .get(`/api/book/${bookId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect("Successfully Show Detail Book").toEqual(response.body.message);
      expect(bookId).toEqual(response.body.book.id);
    });
  });

  describe("PUT /api/book/:id", () => {
    it("Can't update cause book not found", async () => {
      const response = await request(app)
        .put("/api/book/99")
        .set("Authorization", `Bearer ${token}`)
        .send({
          code: "HOB-83",
          title: "The Hobbit, or There and Back Again",
          author: "J.R.R. Tolkien",
          stock: 7,
        });

      expect(response.status).toBe(400);
      expect("Book not found").toEqual(response.body.errors.id);
    });

    it("Can't update cause code is required", async () => {
      const response = await request(app)
        .put(`/api/book/${bookId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          code: "",
          title: "The Hobbit, or There and Back Again",
          author: "J.R.R. Tolkien",
          stock: 7,
        });

      expect(response.status).toBe(400);
      expect("Code is required").toEqual(response.body.errors.code);
    });

    it("Can't update cause code must be unique", async () => {
      const response = await request(app)
        .put(`/api/book/${bookId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          code: "GO-50",
          title: "The Hobbit, or There and Back Again",
          author: "J.R.R. Tolkien",
          stock: 7,
        });

      expect(response.status).toBe(400);
      expect("Book code must be unique").toEqual(response.body.errors.code);
    });

    it("Can't update cause title is required", async () => {
      const response = await request(app)
        .put(`/api/book/${bookId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          code: "HOB-83",
          title: "",
          author: "J.R.R. Tolkien",
          stock: 7,
        });

      expect(response.status).toBe(400);
      expect("Title is required").toEqual(response.body.errors.title);
    });

    it("Can't update cause author is required", async () => {
      const response = await request(app)
        .put(`/api/book/${bookId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          code: "HOB-83",
          title: "The Hobbit, or There and Back Again",
          author: "",
          stock: 7,
        });

      expect(response.status).toBe(400);
      expect("Author is required").toEqual(response.body.errors.author);
    });

    it("Can't update cause stock is required", async () => {
      const response = await request(app)
        .put(`/api/book/${bookId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          code: "HOB-83",
          title: "The Hobbit, or There and Back Again",
          author: "J.R.R. Tolkien",
          stock: "",
        });

      expect(response.status).toBe(400);
      expect("Stock is required").toEqual(response.body.errors.stock);
    });

    it("Can't update cause stock must be an integer", async () => {
      const response = await request(app)
        .put(`/api/book/${bookId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          code: "HOB-83",
          title: "The Hobbit, or There and Back Again",
          author: "J.R.R. Tolkien",
          stock: "abc",
        });

      expect(response.status).toBe(400);
      expect("Stock must be an integer").toEqual(response.body.errors.stock);
    });

    it("Can't update cause stock must be at least 1", async () => {
      const response = await request(app)
        .put(`/api/book/${bookId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          code: "HOB-83",
          title: "The Hobbit, or There and Back Again",
          author: "J.R.R. Tolkien",
          stock: 0,
        });

      expect(response.status).toBe(400);
      expect("Stock must be at least 1").toEqual(response.body.errors.stock);
    });

    it("Success update", async () => {
      const response = await request(app)
        .put(`/api/book/${bookId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          code: "HOB-83",
          title: "The Hobbit, or There and Back Again",
          author: "J.R.R. Tolkien",
          stock: 7,
        });

      expect(response.status).toBe(200);
      expect("Successfully Update Book").toEqual(response.body.message);
    });
  });

  describe("DELETE /api/book/:id", () => {
    it("Can't delete cause book not found", async () => {
      const response = await request(app)
        .delete("/api/book/99")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect("Book not found").toEqual(response.body.errors.id);
    });

    it("Success delete", async () => {
      const response = await request(app)
        .delete(`/api/book/${bookId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect("Successfully Delete Book").toEqual(response.body.message);
    });
  });

  describe("Access API after logout", () => {
    beforeAll(async () => {
      await request(app)
        .post("/api/auth/logout")
        .set("Authorization", `Bearer ${token}`);
    });

    it("Can't access index", async () => {
      const response = await request(app)
        .get("/api/book")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(401);
      expect("Token has been invalidated").toEqual(response.body.error);
    });

    it("Can't access store", async () => {
      const response = await request(app)
        .post("/api/book")
        .set("Authorization", `Bearer ${token}`)
        .send({
          code: "NRN-7",
          title: "The Lion, the Witch and the Wardrobe",
          author: "C.S. Lewis",
          stock: 1,
        });

      expect(response.status).toBe(401);
      expect("Token has been invalidated").toEqual(response.body.error);
    });

    it("Can't access detail", async () => {
      const response = await request(app)
        .get(`/api/book/${bookId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(401);
      expect("Token has been invalidated").toEqual(response.body.error);
    });

    it("Can't access update", async () => {
      const response = await request(app)
        .put(`/api/book/${bookId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          code: "NRN-7",
          title: "The Lion, the Witch and the Wardrobe",
          author: "C.S. Lewis",
          stock: 1,
        });

      expect(response.status).toBe(401);
      expect("Token has been invalidated").toEqual(response.body.error);
    });

    it("Can't access delete", async () => {
      const response = await request(app)
        .delete(`/api/book/${bookId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(401);
      expect("Token has been invalidated").toEqual(response.body.error);
    });
  });
});
