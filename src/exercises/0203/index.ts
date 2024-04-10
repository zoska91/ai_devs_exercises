import { answerPOST, getTask, getToken } from '../helpers/helpersAiDevs';
import { getFromChatEmbeddings } from '../helpers/helpersOpenAi';

const TASK_NAME = 'embedding';
const WORD = 'Hawaiian pizza';

export const solution = async () => {
  const token = await getToken(TASK_NAME);
  const taskData = await getTask(token);

  const answer = await getFromChatEmbeddings(WORD);
  if (!answer) return console.log('something went wrong');
  if (answer) answerPOST(token, answer);
};
