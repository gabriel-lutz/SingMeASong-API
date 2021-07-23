import "../../src/setup.ts";
import supertest from "supertest";
import app from "../../src/app";

import { clearDatabase, closeConnection } from "./utils/database";
import { insertRandomSongs } from "./factories/recommendationFactory";

const agent = supertest(app)

describe("GET /recommendations/top/:amount", () => {
  

  it("should answer with an array of 5 items if prompted amount = 5", async () => {
    await insertRandomSongs(20, 30)
    const response = await agent.get("/recommendations/top/5")
    expect(response.body).toHaveLength(5)
  });

  it("should answer with an array of 10 items if prompted any amount that is not a number", async () => {
    const response = await agent.get("/recommendations/top/banana")
    expect(response.body).toHaveLength(10)
  });

  it("should answer with an array of 10 items if prompted amount = 0", async () => {
    const response = await agent.get("/recommendations/top/0")
    expect(response.body).toHaveLength(10)
  });

  it("should answer with an array of 10 items if prompted a negative amount", async () => {
    const response = await agent.get("/recommendations/top/-5")
    expect(response.body).toHaveLength(10)
  });

  it("should answer with status code 404 if there is not any song in database ", async () => {
    clearDatabase()
    const response = await agent.get("/recommendations/top/10")
    expect(response.statusCode).toBe(404)
  });

});

afterAll(closeConnection)