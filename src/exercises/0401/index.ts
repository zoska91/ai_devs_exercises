import { answerPOST, getTask, getToken } from '../helpers/helpersAiDevs';
import { getAnswer, getDataType } from './helpers';

const TASK_NAME = 'knowledge';

export const solution = async () => {
  const token = await getToken(TASK_NAME);
  const taskData = await getTask(token);

  const dataType = await getDataType(taskData.question);
  console.log({ dataType });

  if (!dataType) return console.log('something went wrong');

  const db =
    dataType === 0
      ? taskData['database #1']
      : dataType === 1
      ? taskData['database #2']
      : 'knowledge of the model';

  const answer = await getAnswer(taskData.question, db);
  console.log({ answer });

  if (answer) answerPOST(token, answer);
};
