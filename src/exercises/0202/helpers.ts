import { getFromChat } from '../helpers/helpersOpenAi';

export const getName = (question: string) => {
  const respGPT = getFromChat([
    {
      role: 'system',
      content: 'wyciągnij z pytania imię i je zwróć. Jedynie imię bez zbędnych słów',
    },
    {
      role: 'user',
      content: question,
    },
  ]);

  return respGPT;
};

export const getAnswer = (question: string, content: string) => {
  const respGPT = getFromChat([
    {
      role: 'system',
      content,
    },
    {
      role: 'user',
      content: question,
    },
  ]);

  return respGPT;
};
