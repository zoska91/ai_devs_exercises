import { answerPOST, getTask, getToken } from '../helpers/helpersAiDevs';

const TASK_NAME = 'liar';

export const solution = async () => {
  const token = await getToken(TASK_NAME);
  const taskData = await getTask(token);

  const formData = new FormData();
  formData.append('question', 'What is capital of Poland?');
  let answer = '';

  const data = await fetch(`https://tasks.aidevs.pl/task/${token}`, {
    method: 'POST',
    body: formData,
  });
  const jsonData = await data.json();

  if (jsonData.answer.includes('Warsaw')) answer = 'YES';
  else answer = 'NO';

  if (answer) answerPOST(token, answer);
};
