import { answerPOST, getTask, getToken } from '../helpers/helpersAiDevs';
import { getFromChatModeration } from '../helpers/helpersOpenAi';

const TASK_NAME = 'moderation';

export const solution = async () => {
  const token = await getToken(TASK_NAME);
  const taskData = await getTask(token);

  taskData.input.forEach(async (text: string) => {
    const isFlagged = await getFromChatModeration(text);
    console.log(1, isFlagged);

    return isFlagged ? 1 : 0;
  });

  const promises = taskData.input.map(async (text: string) => {
    const isFlagged = await getFromChatModeration(text);
    return isFlagged ? 1 : 0;
  });

  const answer = await Promise.all(promises);

  if (answer) await answerPOST(token, answer);
};
