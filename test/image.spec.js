import mongoose from "mongoose";
import imageTest from "./utils/image-test";
import supertest from "supertest";
import { app } from "../src/application/app";
import userTest from "./utils/user-test";

describe("Image API", () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("POST /api/users/:userId/image", () => {
    beforeEach(async () => {
      await userTest.create();
    });
    afterEach(async () => {
      await imageTest.deleteAll();
      await userTest.deleteAll();
    });

    it("should create post image", async () => {
      const user = await userTest.get();

      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const image = process.cwd() + "/test/file/profile.png";

      const result = await supertest(app)
        .post(`/api/users/${user.id}/image`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`)
        .attach("image", image)
        .field("title", "imute")
        .field("description", "ini sangat menarik");

      console.log(result.body);

      expect(result.status).toBe(201);
      expect(result.body.data).toBeDefined();
    });

    it("should reject if file not send", async () => {
      const user = await userTest.get();

      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const result = await supertest(app)
        .post(`/api/users/${user.id}/image`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`)
        .field("title", "")
        .field("description", "ini sangat menarik");

      console.log(result.body);

      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
    });

    it("should reject if data invalid", async () => {
      const user = await userTest.get();

      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const image = process.cwd() + "/test/file/profile.png";

      const result = await supertest(app)
        .post(`/api/users/${user.id}/image`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`)
        .attach("image", image)
        .field("title", "")
        .field("description", "ini sangat menarik");

      console.log(result.body);

      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
    });

    it("should reject if value path :userId not equal id in jwt", async () => {
      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const image = process.cwd() + "/test/file/profile.png";

      const result = await supertest(app)
        .post(`/api/users/salah/image`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`)
        .attach("image", image)
        .field("title", "imute")
        .field("description", "ini sangat menarik");

      console.log(result.body);

      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
    });
  });

  describe("GET /api/users/:userId/image", () => {
    beforeEach(async () => {
      await userTest.create();
      await imageTest.create();
    });
    afterEach(async () => {
      await imageTest.deleteAll();
      await userTest.deleteAll();
    });

    it("should get image with userId", async () => {
      const user = await userTest.get();

      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const result = await supertest(app)
        .get(`/api/users/${user.id}/image`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`);

      console.log(result.body);

      expect(result.status).toBe(200);
      expect(result.body.data).toBeDefined();
    });

    it("should reject if token invalid", async () => {
      const user = await userTest.get();

      const result = await supertest(app)
        .get(`/api/users/${user.id}/image`)
        .set("AUTHORIZATION", `Bearer awkawkdok.aokwdoka.akdokawo`);

      console.log(result.body);

      expect(result.status).toBe(401);
      expect(result.body.errors).toBeDefined();
    });
  });

  describe("GET /api/users/:userId/image/:imageId", () => {
    beforeEach(async () => {
      await userTest.create();
      await imageTest.create();
    });
    afterEach(async () => {
      await imageTest.deleteAll();
      await userTest.deleteAll();
    });

    it("should get detail image", async () => {
      const user = await userTest.get();
      const image = await imageTest.get();

      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const result = await supertest(app)
        .get(`/api/users/${user.id}/image/${image.id}`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`);

      console.log(result.body);
      expect(result.status).toBe(200), expect(result.body.data).toBeDefined();
    });

    it("should reject if image not found", async () => {
      const user = await userTest.get();

      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const result = await supertest(app)
        .get(`/api/users/${user.id}/image/salah`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`);

      console.log(result.body);
      expect(result.status).toBe(404), expect(result.body.errors).toBeDefined();
    });
  });
});
