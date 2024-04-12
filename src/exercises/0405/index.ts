// !!!!!!!
// not working on this branch. Only on "api"

import express from 'express';
import { answerPOST, getTask, getToken } from '../helpers/helpersAiDevs';
import { getChatAnswer, getJson, saveJson } from './helpers';

const router = express.Router();
const TASK_NAME = 'ownapipro';

export const solution = async () => {
  const token = await getToken(TASK_NAME);
  const taskData = await getTask(token);

  answerPOST(token, 'https://0efc-83-168-79-198.ngrok-free.app/aidev-ownapi/answer');
};

solution();

enum QuestionType {
  info,
  question,
}

const getAnswer = async (question: string) => {
  const jsonData = (await getJson()) || '';

  const chatAnswer = await getChatAnswer(question, jsonData);

  if (!chatAnswer) return 'something went wrong';
  const chatAnswerObj: { type: QuestionType; answer: string } = JSON.parse(chatAnswer);

  if (chatAnswerObj.type === QuestionType.info) {
    const jsonDataToSave: string[] = JSON.parse(jsonData);

    saveJson(JSON.stringify([jsonDataToSave, question]));
  }

  return chatAnswerObj.answer;
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
