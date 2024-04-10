import { answerPOST, getTask, getToken } from '../helpers/helpersAiDevs';
import { getFromChatWhisper } from '../helpers/helpersOpenAi';
import path from 'path';

const TASK_NAME = 'whisper';
const FILE_URL = './mateusz.mp3';

export const solution = async () => {
  const token = await getToken(TASK_NAME);
  await getTask(token);

  const jsonFilePath = path.resolve(__dirname, FILE_URL);

  const answer = await getFromChatWhisper(jsonFilePath);

  if (!answer) return console.log('somethign went wrong');
  if (answer) answerPOST(token, answer);
};
