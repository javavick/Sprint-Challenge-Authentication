const db = require("./database/dbConfig.js");
const supertest = require("supertest");
const server = require("./index.js");

const checkStatusAndType = (res, status) => {
  expect(res.status).toBe(status);
  expect(res.type).toBe("application/json");
};

beforeEach(async () => {
  await db.seed.run();
});

// REGISTER "/api/auth/register"
test("SUCCESSFUL REGISTRATION (/api/auth/register)", async () => {
  const res = await supertest(server)
    .post("/api/auth/register")
    .send({ username: "Geralt", password: "bestrongenoughtobegentle" });

  checkStatusAndType(res, 201);
  expect(res.body.id).toBe(4);
  expect(res.body.username).toBe("Geralt");
});

test("REGISTRATION VALIDATION FAIL (/api/auth/register)", async () => {
  const res = await supertest(server)
    .post("/api/auth/register")
    .send({ username: "Murderbot" });

  checkStatusAndType(res, 400);
  expect(res.body.message).toBe("Missing required username or password field.");
});

// LOGIN "/api/auth/login"
test("SUCCESSFUL LOGIN (/api/auth/login)", async () => {
  const res = await supertest(server)
    .post("/api/auth/login")
    .send({
      username: "Optimus",
      password: "bestrongenoughtobegentle"
    });

  checkStatusAndType(res, 200);
  expect(res.body.message).toBe("Optimus has logged in successfully!");
});

test("PASSWORD VALIDATION FAIL (/api/auth/login)", async () => {
  const res = await supertest(server)
    .post("/api/auth/login")
    .send({
      username: "Optimus",
      password: "bestrongenoughtobekind"
    });

  checkStatusAndType(res, 401);
  expect(res.body.message).toBe("You shall not pass!");
});

// GET "/api/jokes"
test("FAILED GET #1 (/api/jokes)", async () => {
  const res = await supertest(server).get("/api/jokes");

  checkStatusAndType(res, 401);
});

test("FAILED GET #2 (/api/jokes)", async () => {
  const res = await supertest(server).get("/api/jokes");

  expect(res.body.you).toBe("shall not pass!");
});
