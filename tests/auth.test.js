const request = require("supertest");
const app = require("../src/app");
const db = require("../src/utils/db");

afterAll(async () => {
  db.close();
});

describe("Auth", () => {
  let token;
  describe("POST /api/auth/login", () => {
    it("Can't login cause email is required", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "",
        password: "password123",
      });

      expect(response.status).toBe(400);
      expect("Email is required").toEqual(response.body.errors.email);
    });

    it("Can't login cause email must be valid email", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "admin",
        password: "password123",
      });

      expect(response.status).toBe(400);
      expect("Enter a valid email address").toEqual(response.body.errors.email);
    });

    it("Can't login cause password is required", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "admin@mailinator.com",
        password: "",
      });

      expect(response.status).toBe(400);
      expect("Password is required").toEqual(response.body.errors.password);
    });

    it("Can't login cause unauthorized", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "admin123@mailinator.com",
        password: "password456",
      });

      expect(response.status).toBe(401);
      expect("Unauthorized").toEqual(response.body.error);
    });

    it("Success login", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "admin@mailinator.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect("Login successful").toEqual(response.body.message);
      expect(response.body).toHaveProperty("token");
      expect(response.body.token).toBeTruthy();

      token = response.body.token;
    });
  });

  describe("POST /api/auth/logout", () => {
    it("Can't logout cause token not valid", async () => {
      const response = await request(app)
        .post("/api/auth/logout")
        .set("Authorization", "Bearer InvalidToken");

      expect(response.status).toBe(403);
      expect("Token is not valid").toEqual(response.body.error);
    });

    it("Success logout", async () => {
      const response = await request(app)
        .post("/api/auth/logout")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect("Logged out successfully").toEqual(response.body.message);
    });

    it("Can't logout cause already logout", async () => {
      const response = await request(app)
        .post("/api/auth/logout")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(401);
      expect("Token has been invalidated").toEqual(response.body.error);
    });
  });
});
