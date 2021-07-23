import "../../src/setup.ts";
import supertest from "supertest";
import app from "../../src/app";
import { clearDatabase, closeConnection } from "./utils/database";
import { insertSong } from "./factories/recommendationFactory";

const agent = supertest(app)

describe("POST /recommendations/:id/upvote", () => {
  beforeEach(clearDatabase)

  it("should answer with status code 200 for a valid song Id", async () => {
    insertSong()
    const response = await agent.post("/recommendations/1/upvote");
    expect(response.status).toBe(200);
  });

  it("should answer with status code 406 for song Id that does not exists", async () => {
    const response = await agent.post("/recommendations/9999/upvote");
    expect(response.status).toBe(406);
  });

  it("should answer with status code 400 for a negative song Id", async () => {
    const response = await agent.post("/recommendations/-1/upvote");
    expect(response.status).toBe(400);
  });

  it("should answer with status code 400 for a song Id that is not a number", async () => {
    const response = await agent.post("/recommendations/banana/upvote");
    expect(response.status).toBe(400);
  });
});

afterAll(closeConnection)