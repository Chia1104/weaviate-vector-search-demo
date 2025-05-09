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
  "What is the capital of Taiwan?",
  // Initialize the collection and seed it with data
  false
);
