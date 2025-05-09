import weaviate from "weaviate-client";

export const client = await weaviate.connectToWeaviateCloud("WEAVIATE_INSTANCE_URL", {
  // Replace WEAVIATE_INSTANCE_URL with your instance URL
  authCredentials: new weaviate.ApiKey("WEAVIATE_INSTANCE_API_KEY"),
  headers: {
    "X-OpenAI-Api-Key": process.env.OPENAI_API_KEY || "", // Replace with your inference API key
  },
});
