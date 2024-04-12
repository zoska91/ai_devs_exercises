// !!!!!!!
// not working on this branch. Only on "api"

import express from 'express';
import { answerPOST, getTask, getToken } from '../helpers/helpersAiDevs';
import { getFromChat } from '../helpers/helpersOpenAi';

const router = express.Router();
const TASK_NAME = 'ownapi';

export const solution = async () => {
  const token = await getToken(TASK_NAME);
  const taskData = await getTask(token);

  answerPOST(token, 'https://0efc-83-168-79-198.ngrok-free.app/aidev-ownapi/answer');
};

solution();

const getAnswer = async (question: string) => {
  const answer = getFromChat([
    {
      role: 'user',
      content: question,
    },
  ]);

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
