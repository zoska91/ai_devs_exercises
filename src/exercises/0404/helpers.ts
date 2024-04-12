import fs from 'fs';
import * as path from 'path';
import { getFromChat } from '../helpers/helpersOpenAi';

const jsonFilePath = path.resolve(__dirname, `data.json`);

export const saveJson = (data: string) => {
  fs.writeFile(jsonFilePath, JSON.stringify(data), (err) => {
    if (err) {
      console.error('Błąd podczas zapisu do pliku:', err);
      return '';
    }
    console.log('Dane zostały zapisane do pliku.');
  });
};

export const getJson = async (): Promise<string> => {
  try {
    const dataJson = await new Promise<string>((resolve, reject) => {
      fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
          console.error('Błąd podczas odczytu pliku:', err);
          reject(err);
          return;
        }
        console.log('Zawartość pliku JSON:', data);
        resolve(data);
      });
    });

    return dataJson;
  } catch (error) {
    console.error('Błąd:', error);
    return '';
  }
};

export const getChatAnswer = async (question: string, context: string) => {
  const answer = getFromChat([
    {
      role: 'system',
      content: `
      return json where type and answer depends on message from user:
      {
        type: 0,
        answer: "I got it"
      }

      - if message from user is information then type = 0 and answer it's random information that you understand: e.g. "Ok, get it", "Ok, thx for information" etc.
      example of json:
      {
        type: 0,
        answer: "Sure"
      }

      - if message from user is question then type = 1 and answer is an answer on it. 
      IMPORTANT: If you have information in context below then get answer from context. If now get from your general knowledge. 

      example of json: 
      {
        type: 1, 
        answer: "You are living in Berlin"
      }

      context: ${context}
      `,
    },
    {
      role: 'user',
      content: question,
    },
  ]);

  return answer;
};
