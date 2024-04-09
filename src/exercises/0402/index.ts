import { answerPOST, getTask, getToken } from '../helpers/helpersAiDevs';
import { getDataType } from './helpers';

const TASK_NAME = 'tools';

export const solution = async () => {
  const token = await getToken(TASK_NAME);
  const taskData = await getTask(token);

  const answer = await getDataType(taskData.question);
  if (!answer) return console.log('something went wrong');
  const ojbAnswer = JSON.parse(answer);
  console.log({ ...ojbAnswer, desc: taskData.question });

  if (answer) answerPOST(token, { ...ojbAnswer, desc: taskData.question });
};
