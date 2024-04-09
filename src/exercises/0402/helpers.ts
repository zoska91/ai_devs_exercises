import { getFromChat } from '../helpers/helpersOpenAi';

export const getDataType = async (sentence: string) => {
  const resp = await getFromChat([
    {
      role: 'system',
      content: `
      please use this pattern: 
      {
        "tool": "ToDo",
        "date": "YYYY-MM-DD"
      }

      as type return: 
      - "ToDo" - if sentence contain information about date, like: day name, date, time
      - "Calendar" - other cases

      today is: ${new Date()}
      If you decided that your answer is "Calendar" then add to response information date. 
     
      // examples:
      sentence: "Mam zapisać się na AI Devs 3.0"
      your answer: {
        "tool": "ToDo"
      } ,

      sentence: "W poniedziałek są urodziny Zenona"
      your answer: {
        "tool": "Calendar", 
        "date": "2024-04-15"
      }
      `,
    },
    {
      role: 'user',
      content: sentence,
    },
  ]);

  return resp;
};

// If you decided that your answer is "Calendar" then add to response information which decided about date in english

// examples:
// sentence: "Mam zapisać się na AI Devs 3.0"
// your answer: {tool: 'ToDo'} ,

// sentence: "W poniedziałek są urodziny Zenona"
// your answer: {tool: 'Calendar', date: "Monday"}
