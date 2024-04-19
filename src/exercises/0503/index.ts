import express from 'express';

import { answerPOST, getTask, getToken } from '../helpers/helpersAiDevs';
import { getFromChat } from '../helpers/helpersOpenAi';
import { get } from '../helpers/restApi';

const router = express.Router();

const TASK_NAME = 'google';

export const solution = async (url: string) => {
  const token = await getToken(TASK_NAME);
  const taskData = await getTask(token);

  answerPOST(token, `${url}/aidev-ownapi/answer`);
};

const searchGoogle = async (query: string) => {
  const apiKey = process.env.SERPAPI_API_KEY;

  const resp = await get(
    `https://serpapi.com/search.json?engine=google&q=${query}&api_key=${apiKey}`
  );
  return resp.organic_results[0];
};

const getQuery = async (question: string) => {
  const answer = await getFromChat([
    {
      role: 'system',
      content: `zamień pytanie usera na hasło, które najlepiej wyszuka wyników w google.
      zwróć tylko i wyłacznie to hasło bez żadnych dodatkowych informacji i znaków
      `,
    },
    {
      content: question,
      role: 'user',
    },
  ]);

  return answer;
};

const getAnswerWithGoogleInfo = async (question: string, context: string = '') => {
  const answer = await getFromChat([
    {
      role: 'system',
      content: `
      context: ${context}
      korzystając z dostarczonego contexu odpowiedz na pytanie zadane przez usera.
     odpowiedż zawsze będzie linkiem do strony. Zwróc tylko i wyłacznie ten link bez żadnych dodatkowych informacji i komentarzy z twojej strony.
    
      `,
    },
    {
      content: question,
      role: 'user',
    },
  ]);

  return answer;
};

const getAnswer = async (question: string) => {
  const queryAnswer = await getQuery(question);
  if (!queryAnswer) return 'something went wrong';

  const googleAnswer = await searchGoogle(queryAnswer);

  const answer = await getAnswerWithGoogleInfo(question, JSON.stringify(googleAnswer));
  return answer;
};

router.post('/answer', async (req, res) => {
  const { question } = req.body;

  const answer = await getAnswer(question);
  if (!answer) {
    res.status(500).send({
      reply: 'Something went wrong',
    });
    return;
  }

  res.status(200).send({
    reply: answer,
  });
});

export default router;
