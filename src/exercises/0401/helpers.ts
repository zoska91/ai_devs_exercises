import { getFromChat } from '../helpers/helpersOpenAi';

export const getDataType = async (question: string) => {
  const resp = await getFromChat([
    {
      role: 'system',
      content: `you have to return:
      - "0" - if question regarding exchange rate, 
      - "1" - if question regarding current population,
      - "2" - if question regarding something else.

      e.g.: 
      question: "podaj populację Francji"
      your answer: "1"

      question: "podaj kurs złotówki"
      your answer: "0"

      question: "jaki kolor ma mak"
      your answer: "2"
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
  const resp = await getFromChat([
    {
      role: 'system',
      content: `answer the question using this data: ${JSON.stringify(db)}
      `,
    },
    {
      role: 'user',
      content: question,
    },
  ]);

  return resp;
};
