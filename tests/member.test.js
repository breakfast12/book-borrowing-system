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

describe("Member", () => {
  let memberId;

  describe("GET /api/member/", () => {
    it("Invalid parameter", async () => {
      const response = await request(app)
        .get("/api/member")
        .set("Authorization", `Bearer ${token}`)
        .query({ abc: "abc" });

      expect(response.status).toBe(500);
      expect("Invalid query parameter: abc").toEqual(response.body.error);
    });

    it("Get all member", async () => {
      const response = await request(app)
        .get("/api/member")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect("Successfully Show List Member").toEqual(response.body.message);
    });

    it("Search by name", async () => {
      const response = await request(app)
        .get("/api/member")
        .set("Authorization", `Bearer ${token}`)
        .query({ search: "lor" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Member").toEqual(response.body.message);
      expect("Barbara Taylor").toEqual(response.body.data[0].name);
    });

    it("Search by code", async () => {
      const response = await request(app)
        .get("/api/member")
        .set("Authorization", `Bearer ${token}`)
        .query({ search: "003" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Member").toEqual(response.body.message);
      expect("M003").toEqual(response.body.data[0].code);
    });

    it("Sort by code asc", async () => {
      const response = await request(app)
        .get("/api/member")
        .set("Authorization", `Bearer ${token}`)
        .query({ sortBy: "code", sortDirection: "ASC" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Member").toEqual(response.body.message);
      expect(isSorted(response.body.data, "code", "ASC")).toBe(true);
    });

    it("Sort by code desc", async () => {
      const response = await request(app)
        .get("/api/member")
        .set("Authorization", `Bearer ${token}`)
        .query({ sortBy: "code", sortDirection: "DESC" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Member").toEqual(response.body.message);
      expect(isSorted(response.body.data, "code", "DESC")).toBe(true);
    });

    it("Sort by name asc", async () => {
      const response = await request(app)
        .get("/api/member")
        .set("Authorization", `Bearer ${token}`)
        .query({ sortBy: "name", sortDirection: "ASC" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Member").toEqual(response.body.message);
      expect(isSorted(response.body.data, "name", "ASC")).toBe(true);
    });

    it("Sort by name desc", async () => {
      const response = await request(app)
        .get("/api/member")
        .set("Authorization", `Bearer ${token}`)
        .query({ sortBy: "name", sortDirection: "DESC" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Member").toEqual(response.body.message);
      expect(isSorted(response.body.data, "name", "DESC")).toBe(true);
    });

    it("Sort by createdAt asc", async () => {
      const response = await request(app)
        .get("/api/member")
        .set("Authorization", `Bearer ${token}`)
        .query({ sortBy: "createdAt", sortDirection: "ASC" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Member").toEqual(response.body.message);
      expect(isSorted(response.body.data, "createdAt", "ASC")).toBe(true);
    });

    it("Sort by createdAt desc", async () => {
      const response = await request(app)
        .get("/api/member")
        .set("Authorization", `Bearer ${token}`)
        .query({ sortBy: "createdAt", sortDirection: "DESC" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Member").toEqual(response.body.message);
      expect(isSorted(response.body.data, "createdAt", "DESC")).toBe(true);
    });

    it("Sort by updatedAt asc", async () => {
      const response = await request(app)
        .get("/api/member")
        .set("Authorization", `Bearer ${token}`)
        .query({ sortBy: "updatedAt", sortDirection: "ASC" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Member").toEqual(response.body.message);
      expect(isSorted(response.body.data, "updatedAt", "ASC")).toBe(true);
    });

    it("Sort by updatedAt desc", async () => {
      const response = await request(app)
        .get("/api/member")
        .set("Authorization", `Bearer ${token}`)
        .query({ sortBy: "updatedAt", sortDirection: "DESC" });

      expect(response.status).toBe(200);
      expect("Successfully Show List Member").toEqual(response.body.message);
      expect(isSorted(response.body.data, "updatedAt", "DESC")).toBe(true);
    });
  });

  describe("POST /api/member", () => {
    it("Can't store cause name is required", async () => {
      const response = await request(app)
        .post("/api/member")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "",
        });

      expect(response.status).toBe(400);
      expect("Name is required").toEqual(response.body.errors.name);
    });

    it("Can't store cause name must be unique", async () => {
      const response = await request(app)
        .post("/api/member")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Jane Smith",
        });

      expect(response.status).toBe(400);
      expect("Name must be unique").toEqual(response.body.errors.name);
    });

    it("Success Store", async () => {
      const response = await request(app)
        .post("/api/member")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Taguhi Kallisto",
        });

      expect(response.status).toBe(201);
      expect("Successfully Store Member").toEqual(response.body.message);
      memberId = response.body.member.id;
    });
  });

  describe("GET /api/member/:id", () => {
    it("Can't show detail cause member not found", async () => {
      const response = await request(app)
        .get("/api/member/99")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect("Member not found").toEqual(response.body.errors.id);
    });

    it("Success show detail", async () => {
      const response = await request(app)
        .get(`/api/member/${memberId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect("Successfully Show Detail Member").toEqual(response.body.message);
      expect(memberId).toEqual(response.body.member.id);
    });
  });

  describe("PUT /api/member/:id", () => {
    it("Can't update cause member not found", async () => {
      const response = await request(app)
        .put("/api/member/99")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Youri Wolf",
        });

      expect(response.status).toBe(400);
      expect("Member not found").toEqual(response.body.errors.id);
    });

    it("Can't update cause name is required", async () => {
      const response = await request(app)
        .put(`/api/member/${memberId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "",
        });

      expect(response.status).toBe(400);
      expect("Name is required").toEqual(response.body.errors.name);
    });

    it("Can't update cause name must be unique", async () => {
      const response = await request(app)
        .put(`/api/member/${memberId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Jane Smith",
        });

      expect(response.status).toBe(400);
      expect("Name must be unique").toEqual(response.body.errors.name);
    });

    it("Success update", async () => {
      const response = await request(app)
        .put(`/api/member/${memberId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Youri Wolf",
        });

      expect(response.status).toBe(200);
      expect("Successfully Update Member").toEqual(response.body.message);
    });
  });

  describe("DELETE /api/member/:id", () => {
    it("Can't delete cause member not found", async () => {
      const response = await request(app)
        .delete("/api/member/99")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect("Member not found").toEqual(response.body.errors.id);
    });

    it("Success delete", async () => {
      const response = await request(app)
        .delete(`/api/member/${memberId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect("Successfully Delete Member").toEqual(response.body.message);
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
        .get("/api/member")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(401);
      expect("Token has been invalidated").toEqual(response.body.error);
    });

    it("Can't access store", async () => {
      const response = await request(app)
        .post("/api/member")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Regula Lis",
        });

      expect(response.status).toBe(401);
      expect("Token has been invalidated").toEqual(response.body.error);
    });

    it("Can't access detail", async () => {
      const response = await request(app)
        .get(`/api/member/${memberId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(401);
      expect("Token has been invalidated").toEqual(response.body.error);
    });

    it("Can't access update", async () => {
      const response = await request(app)
        .put(`/api/member/${memberId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Regula Lis",
        });

      expect(response.status).toBe(401);
      expect("Token has been invalidated").toEqual(response.body.error);
    });

    it("Can't access delete", async () => {
      const response = await request(app)
        .delete(`/api/member/${memberId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(401);
      expect("Token has been invalidated").toEqual(response.body.error);
    });
  });
});
