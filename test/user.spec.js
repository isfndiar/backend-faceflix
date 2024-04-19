import supertest from "supertest";
import { app } from "../src/application/app";
import mongoose from "mongoose";
import userTest from "./utils/user-test";
import { connectDatabase } from "../src/application/database";

describe("Users API", () => {
  
  afterAll(async () => {
    await mongoose.disconnect();
  });
  describe("POST /api/users/register", () => {
    afterEach(async () => {
      await userTest.deleteAll();
    });


    it("should create user", async () => {
      const result = await supertest(app).post("/api/users/register").send({
        email: "test@gmail.com",
        password: "testing",
      });

      console.log(result.body);

      expect(result.status).toBe(201);
      expect(result.body.data).toBe("OK");
    });

    it("should reject if data invalid", async () => {
      const result = await supertest(app).post("/api/users/register").send({
        email: "",
        password: "",
      });

      console.log(result.body);
      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
    });

    it("should user already exist", async () => {
      await supertest(app).post("/api/users/register").send({
        email: "test@gmail.com",
        password: "testing",
      });
      const result = await supertest(app).post("/api/users/register").send({
        email: "test@gmail.com",
        password: "testing",
      });

      console.log(result.body);

      expect(result.status).toBe(400);
      expect(result.body.errors).toBe("user already exist");
    });
  });

  describe('POST /api/users/login', () => {
    beforeEach(async () => {
      await userTest.create()
    })
    afterEach(async () => {
      await userTest.deleteAll();
    });


    it('should login user', async () => {
      const result = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      console.log(result.body);

      expect(result.status).toBe(200);
      expect((result.body.data.user)).toBeDefined()
      expect(result.body.data.token).toBeDefined()
    });

    it('should reject if password wrong', async () => {
      const result = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing1",
      });

      console.log(result.body);

      expect(result.status).toBe(400);
      expect((result.body.errors)).toBe('username or password is wrong')
    });

    it('should reject if email wrong', async () => {
      const result = await supertest(app).post("/api/users/login").send({
        email: "test1@gmail.com",
        password: "testing",
      });

      console.log(result.body);

      expect(result.status).toBe(400);
      expect((result.body.errors)).toBe('username or password is wrong')
    });

    it('should reject if data invalid', async () => {
      const result = await supertest(app).post("/api/users/login").send({
        email: "",
        password: "",
      });

      console.log(result.body);

      expect(result.status).toBe(400);
      expect((result.body.errors)).toBeDefined()
    });
  });

  describe('GET /api/users/current', () => {
    beforeEach(async () => {
      await userTest.create()
    })
    afterEach(async () => {
      await userTest.deleteAll();
    });

    it('should reject if token invalid', async () => {
      const result = await supertest(app).get('/api/users/current')
        .set('AUTHORIZATION', `Bearer kawdokoawdo.adokaowd.aodowakd`);

      expect(result.status).toBe(401);
      expect(result.body.errors).toBe('Unauthorized')
    });

    it('should get current user', async () => {
      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const result = await supertest(app).get('/api/users/current')
        .set('AUTHORIZATION', `Bearer ${token.body.data.token}`);

        console.log(result.body);

      expect(result.status).toBe(200);
      expect(result.body.data).toBeDefined()
    });
    

  });

  describe('PATCH /api/users/current/profile', () => {
    beforeEach(async () => {
      await userTest.create()
    })
    afterEach(async () => {
      await userTest.deleteAll();
    });

    it('should reject if token invalid', async () => {

      const result = await supertest(app).patch('/api/users/current/profile')
        .set('AUTHORIZATION', `Bearer akwokawo.akwkaowa.oawkdwa`)
        .field('name', 'super')

      console.log(result.body);

      expect(result.status).toBe(401);
      expect(result.body.errors).toBe('Unauthorized');
    });

    it('should update user', async () => {

      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const filePath = './test/file/profile.png'

      await supertest(app).patch('/api/users/current/profile')
        .set('AUTHORIZATION', `Bearer ${token.body.data.token}`)
        .attach('profileImage', filePath)
        .attach('backgroundImage', filePath)
        .field('name', 'super test')

      const result = await supertest(app).patch('/api/users/current/profile')
        .set('AUTHORIZATION', `Bearer ${token.body.data.token}`)
        .attach('profileImage', filePath)
        .attach('backgroundImage', filePath)
        .field('name', 'super test')

      console.log(result.body);

      expect(result.status).toBe(200)
      expect(result.body.data).toBe("OK")
    });

    it('should reject if data invalid', async () => {

      const token = await supertest(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "testing",
      });

      const result = await supertest(app).patch('/api/users/current/profile')
        .set('AUTHORIZATION', `Bearer ${token.body.data.token}`)
        .field('name', 'sup')

      console.log(result.body);
      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
    });

  })
  
});
