const request = require("supertest");

const server = require("./server.js");
const db = require("../data/dbConfig.js");

describe("server.js", () => {
  describe("index route", () => {
    it("should return an HTTP status code of 200 OK", async () => {
      const response = await request(server).get("/");
      expect(response.status).toEqual(200);
    });

    it("should return a JSON object fron the index route", async () => {
      const response = await request(server).get("/");
      expect(response.type).toEqual("text/html");
    });
  });

  describe("the testing db", () => {
    it("should be empty", async () => {
      const res = await request(server).get("/api/users/");
      console.log(res.body);
      expect(res.body.length).toEqual(0);
    });
  });
});
