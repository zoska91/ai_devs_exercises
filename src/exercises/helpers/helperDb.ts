import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { v4 as uuidv4 } from 'uuid';
import { QdrantClient } from '@qdrant/js-client-rest';

export const setDataToDbFromJson = async <T extends object>(collectionName: string, data: T[]) => {
  const qdrant = new QdrantClient({ url: process.env.QDRANT_URL });
  const embeddings = new OpenAIEmbeddings({ maxConcurrency: 5 });

  const result = await qdrant.getCollections();
  const indexed = result.collections.find((collection) => collection.name === collectionName);

  // Create collection if not exists

  if (!indexed) {
    await qdrant.createCollection(collectionName, {
      vectors: { size: 1536, distance: 'Cosine', on_disk: true },
    });
  }

  const collectionInfo = await qdrant.getCollection(collectionName);

  console.log('POINT COUNT', collectionInfo.points_count);
  // Index documents if not indexed
  if (!collectionInfo.points_count) {
    // Add metadata
    let documents = data.map((document) => {
      return {
        ...document,
        metadata: {
          source: collectionName,
          content: document,
          uuid: uuidv4(),
        },
      };
    });

    let index = 0;

    // Generate embeddings
    const points = [];
    for (const document of documents) {
      const documentJSON = JSON.stringify(document);
      index = index + 1;
      console.log(index, documentJSON);

      const [embedding] = await embeddings.embedDocuments([documentJSON]);
      points.push({
        id: document.metadata.uuid,
        payload: document.metadata,
        vector: embedding,
      });
    }

    // Index
    await qdrant.upsert(collectionName, {
      wait: true,
      batch: {
        ids: points.map((point) => point.id),
        vectors: points.map((point) => point.vector),
        payloads: points.map((point) => point.payload),
      },
    });
  }

  return true;
};

export const searchInDb = async (collectionName: string, query: string) => {
  const qdrant = new QdrantClient({ url: process.env.QDRANT_URL });
  const embeddings = new OpenAIEmbeddings({ maxConcurrency: 5 });
  const queryEmbedding = await embeddings.embedQuery(query);

  const search = await qdrant.search(collectionName, {
    vector: queryEmbedding,
    limit: 2,
    filter: {
      must: [
        {
          key: 'source',
          match: {
            value: collectionName,
          },
        },
      ],
    },
  });

  return search;
};

export const deleteCollection = async (collectionName: string) => {
  const qdrant = new QdrantClient({ url: process.env.QDRANT_URL });

  await qdrant.deleteCollection(collectionName);
};
