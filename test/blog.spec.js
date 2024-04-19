import supertest from "supertest";
import { app } from "../src/application/app";
import blogTest from "./utils/blog-test";
import userTest from "./utils/user-test";
import mongoose from "mongoose";

describe("Blog API", () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("POST /api/users/:userId/blog/", () => {
    beforeEach(async () => {
      await userTest.create();
    });
    afterEach(async () => {
      await blogTest.deleteAll();
      await userTest.deleteAll();
    });

    it("should create blog", async () => {
      const user = await userTest.get();

      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const result = await supertest(app)
        .post(`/api/users/${user.id}/blog`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`)
        .send({
          title: "blog test",
          text: "text test",
        });

      console.log(result.body);

      expect(result.status).toBe(201);
      expect(result.body).toBeDefined();
    });

    it("should reject if data invalid", async () => {
      const user = await userTest.get();

      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const result = await supertest(app)
        .post(`/api/users/${user.id}/blog`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`)
        .send({
          title: "",
          text: "",
        });

      console.log(result.body);

      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
    });
  });

  describe("GET /api/users/:userId/blog", () => {
    beforeEach(async () => {
      await userTest.create();
      await blogTest.create();
    });
    afterEach(async () => {
      await blogTest.deleteAll();
      await userTest.deleteAll();
    });

    it("should get list blog with userId", async () => {
      const user = await userTest.get();

      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const result = await supertest(app)
        .get(`/api/users/${user.id}/blog`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`);

      console.log(result.body);

      expect(result.status).toBe(200);
      expect(result.body.data).toBeDefined();
    });

    it("should get list not found with userId", async () => {
      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const result = await supertest(app)
        .get(`/api/users/salah/blog`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`);

      console.log(result.body);

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(0);
    });
  });

  describe("GET /api/users/:userId/blog/:blogId", () => {
    beforeEach(async () => {
      await userTest.create();
      await blogTest.create();
    });
    afterEach(async () => {
      await blogTest.deleteAll();
      await userTest.deleteAll();
    });

    it("should get detail blog with userId and blogId", async () => {
      const user = await userTest.get();
      const blog = await blogTest.get();

      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const result = await supertest(app)
        .get(`/api/users/${user.id}/blog/${blog.id}`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`);

      console.log(result.body);

      expect(result.status).toBe(200);
      expect(result.body.data).toBeDefined();
    });

    it("should reject if blogId invalid", async () => {
      const user = await userTest.get();

      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const result = await supertest(app)
        .get(`/api/users/${user.id}/blog/salah`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`);

      console.log(result.body);

      expect(result.status).toBe(404);
      expect(result.body.errors).toBeDefined();
    });

    it("should reject if userId invalid", async () => {
      const blog = await blogTest.get();

      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const result = await supertest(app)
        .get(`/api/users/salah/blog/${blog.id}`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`);

      console.log(result.body);

      expect(result.status).toBe(404);
      expect(result.body.errors).toBeDefined();
    });
  });
});
