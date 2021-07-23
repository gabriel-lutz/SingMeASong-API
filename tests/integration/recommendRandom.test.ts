import "../../src/setup.ts";
import supertest from "supertest";
import app from "../../src/app";

import { clearDatabase, closeConnection } from "./utils/database";
import { insertRandomSongs } from "./factories/recommendationFactory";

const agent = supertest(app)

describe("GET /recommendations/random", () => {
  

  it("should answer with a random song if there are any song in database ", async () => {
    await insertRandomSongs(20, 30)
    const response = await agent.get("/recommendations/random")
    expect(response.body).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            youtubeLink: expect.any(String),
            score: expect.any(Number)
        })
    )
  });

  it("should answer with status code 404 if there is not any song in database ", async () => {
    await clearDatabase()
    const response = await agent.get("/recommendations/random")
    expect(response.statusCode).toBe(404)
  });

});

afterAll(closeConnection)