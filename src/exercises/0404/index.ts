import express from 'express';
import { answerPOST, getTask, getToken } from '../helpers/helpersAiDevs';
import { getFromChat } from '../helpers/helpersOpenAi';

const router = express.Router();
const TASK_NAME = 'ownapi';

export const solution = async () => {
  const token = await getToken(TASK_NAME);
  const taskData = await getTask(token);

  // if (!answer) return console.log('somethign went wrong');
  // if (answer) answerPOST(token, answer);
};

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
  console.log(req);
  console.log(req.body);
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
