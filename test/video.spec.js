import mongoose from "mongoose";
import supertest from "supertest";
import { app } from "../src/application/app";
import userTest from "./utils/user-test";
import videoTest from "./utils/video-test";

describe("Image API", () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("POST /api/users/:userId/video", () => {
    beforeEach(async () => {
      await userTest.create();
    });
    afterEach(async () => {
      await videoTest.deleteAll();
      await userTest.deleteAll();
    });

    it("should reject if token invalid", async () => {
      const user = await userTest.get();

      const video = process.cwd() + "/test/file/video-testing.mp4";

      const result = await supertest(app)
        .post(`/api/users/${user.id}/video`)
        .set("AUTHORIZATION", `Bearer kwoadko.dawid.oakdoa`)
        .attach("video", video)
        .field("title", "video imute")
        .field("description", "ini sangat menarik");

      console.log(result.body);

      expect(result.status).toBe(401);
      expect(result.body.errors).toBeDefined();
    });

    it("should create post video", async () => {
      const user = await userTest.get();

      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const video = process.cwd() + "/test/file/video-testing.mp4";

      const result = await supertest(app)
        .post(`/api/users/${user.id}/video`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`)
        .attach("video", video)
        .field("title", "video imute")
        .field("description", "ini sangat menarik");

      console.log(result.body);

      expect(result.status).toBe(201);
      expect(result.body).toBeDefined();
    });

    it("should reject if file not send", async () => {
      const user = await userTest.get();

      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const result = await supertest(app)
        .post(`/api/users/${user.id}/video`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`)
        .field("title", "video imute")
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

      const video = process.cwd() + "/test/file/video-testing.mp4";

      const result = await supertest(app)
        .post(`/api/users/${user.id}/video`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`)
        .attach("video", video)
        .field("title", "")
        .field("description", "ini sangat menarik");

      console.log(result.body);

      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
    });
  });

  describe("GET /api/users/:userId/video", () => {
    beforeEach(async () => {
      await userTest.create();
      await videoTest.create();
    });
    afterEach(async () => {
      await videoTest.deleteAll();
      await userTest.deleteAll();
    });

    it("should get list video by userid", async () => {
      const user = await userTest.get();

      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const result = await supertest(app)
        .get(`/api/users/${user.id}/video`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`);

      console.log(result.body);

      expect(result.status).toBe(200);
      expect(result.body.data).toBeDefined();
    });

    it("should get list not found video by userid", async () => {
      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const result = await supertest(app)
        .get(`/api/users/gakada/video`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`);

      console.log(result.body);

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(0);
    });
  });

  describe("GET /api/users/:userId/video/:videoId", () => {
    beforeEach(async () => {
      await userTest.create();
      await videoTest.create();
    });
    afterEach(async () => {
      await videoTest.deleteAll();
      await userTest.deleteAll();
    });

    it("should get detail video with userId and videoId", async () => {
      const user = await userTest.get();
      const video = await videoTest.get();

      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const result = await supertest(app)
        .get(`/api/users/${user.id}/video/${video.id}`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`);

      console.log(result.body);

      expect(result.status).toBe(200);
      expect(result.body.data).toBeDefined();
    });

    it("should reject if videoId invalid", async () => {
      const user = await userTest.get();
      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const result = await supertest(app)
        .get(`/api/users/${user.id}/video/salah`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`);

      console.log(result.body);

      expect(result.status).toBe(404);
      expect(result.body.errors).toBeDefined();
    });

    it("should reject if userId invalid", async () => {
      const video = await videoTest.get();
      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const result = await supertest(app)
        .get(`/api/users/salah/video/${video.id}`)
        .set("AUTHORIZATION", `Bearer ${token.body.data.token}`);

      console.log(result.body);

      expect(result.status).toBe(404);
      expect(result.body.errors).toBeDefined();
    });
  });
});
