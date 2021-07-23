import "../../src/setup.ts";
import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database";
import { clearDatabase, closeConnection } from "./utils/database";
import { insertSong } from "./factories/recommendationFactory";

const agent = supertest(app)


describe("POST /recommendations", () => {
  beforeEach(clearDatabase)

  it("should answer with status code 200 for a new and valid song", async () => {
    const body = {
      name: "Test",
      youtubeLink: "https://youtu.be/rPleicjySdI"
    }
    
    const response = await agent.post("/recommendations").send(body);
    expect(response.status).toBe(201);
  });

  it("should answer with status code 400 for invalid body format (invalid link, or name)", async () => {
    const body = {
      name: "",
      youtubeLink: "https://glugle.com/rPleicjySdI"
    }
    
    const response = await agent.post("/recommendations").send(body);
    expect(response.status).toBe(400);
  });

  it("should answer with status code 409 for duplicated song in database", async () => {
    const body = {
      name: "Test",
      youtubeLink: "https://youtu.be/rPleicjySdI"
    }

    await insertSong()
    
    const response = await agent.post("/recommendations").send(body);
    expect(response.status).toBe(409);
  });
});
afterAll(closeConnection)