import { answerPOST, getTask, getToken } from '../helpers/helpersAiDevs';
import { getColor } from './helpers';

const TASK_NAME = 'gnome';

export const solution = async () => {
  const token = await getToken(TASK_NAME);
  const taskData = await getTask(token);

  const answer = await getColor(taskData.url);

  if (answer) answerPOST(token, answer);
};
