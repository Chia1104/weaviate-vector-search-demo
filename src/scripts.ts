import { dataType, type WeaviateClient } from "weaviate-client";
import { vectorizer } from "weaviate-client";

export class Script {
  constructor(private client: WeaviateClient) {}

  private async createCollection() {
    await this.client.collections.create({
      name: "Documents",
      vectorizers: vectorizer.text2VecOpenAI(),
      properties: [
        { name: "title", dataType: dataType.TEXT },
        { name: "content", dataType: dataType.TEXT },
      ],
    });
  }
  async getDocuments() {
    return this.client.collections.get("Documents");
  }

  private generateData() {
    return [
      {
        title: "Taiwan",
        content: "The capital of Taiwan is Taipei.",
      },
      {
        title: "Japan",
        content: "The capital of Japan is Tokyo.",
      },
      {
        title: "United States",
        content: "The capital of the United States is Washington, D.C.",
      },
    ];
  }

  public async seedCollection() {
    const collection = await this.getDocuments();
    const data = this.generateData();
    await collection.data.insertMany(data);
    console.log(`Inserted ${data.length} documents`);
  }

  private async init() {
    await this.createCollection();
    await this.seedCollection();
    console.log("Collection initialized");
  }

  public async search(query: string) {
    const collection = await this.getDocuments();
    const results = await collection.query.nearText(query, {
      limit: 3,
      returnMetadata: ["distance"],
    });
    console.log(results.objects.map((obj) => obj.properties));
    return results;
  }

  public async demo(query: string, init = false) {
    if (init) {
      await this.init();
    }
    await this.search(query);
  }

  public async deleteCollection() {
    await this.client.collections.delete("Documents");
    console.log("Collection deleted");
  }

  public async listCollections() {
    return this.client.collections.listAll();
  }
}
