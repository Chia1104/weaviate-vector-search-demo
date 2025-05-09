import { Script } from "./src/scripts";
import weaviate, { type WeaviateClient } from "weaviate-client";

const client: WeaviateClient = await weaviate.connectToLocal({
  headers: {
    "X-OpenAI-Api-Key": process.env.OPENAI_API_KEY || "", // Replace with your inference API key
  },
});

await client.isReady();

const script = new Script(client);
script.demo(
  "美國的首都在哪?",
  // Initialize the collection and seed it with data
  false
);
