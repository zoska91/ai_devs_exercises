import { answerPOST, getTask, getToken } from '../helpers/helpersAiDevs';
import { getFromChat } from '../helpers/helpersOpenAi';
import { getAnswer, getName } from './helpers';

const TASK_NAME = 'inprompt';

export const solution = async () => {
  const token = await getToken(TASK_NAME);
  const taskData = await getTask(token);

  const name = await getName(taskData.question);

  if (!name) return console.log('something went wrong');
  const peopleInfo = taskData.input.filter((p: string) => p.includes(name));

  const answer = await getAnswer(taskData.question, peopleInfo[0]);

  if (answer) answerPOST(token, answer);
};
