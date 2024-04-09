import { getFromChat } from '../helpers/helpersOpenAi';

export const getDataType = async (question: string) => {
  const resp = await getFromChat([
    {
      role: 'system',
      content: `you have to return:
      - "0" - if question regarding exchange rate, 
      - "1" - if question regarding current population,
      - "2" - if question regarding something else.
      `,
    },
    {
      role: 'user',
      content: question,
    },
  ]);

  return resp ? +resp : null;
};

export const getAnswer = async (question: string, db: string) => {
  console.log({ db });
  const resp = await getFromChat([
    {
      role: 'system',
      content: `answer the question using ${db}
      `,
    },
    {
      role: 'user',
      content: question,
    },
  ]);

  return resp;
};
