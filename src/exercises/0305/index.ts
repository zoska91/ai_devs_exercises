import { deleteCollection, searchInDb, setDataToDbFromJson } from '../helpers/helperDb.ts';
import { answerPOST, getTask, getToken } from '../helpers/helpersAiDevs';
import { getFromChat } from '../helpers/helpersOpenAi.ts';
import peopleData from './people.ts';

const TASK_NAME = 'people';
const COLLECTION_NAME = 'ai_people';

interface IPeople {
  name: string;
  favoriteColor: string;
  generalInfo: string;
}

export const solution = async () => {
  const token = await getToken(TASK_NAME);
  const taskData = await getTask(token);

  const mappedData = peopleData.map((people) => ({
    name: `${people.imie}, ${people.nazwisko}`,
    favoriteColor: people.ulubiony_kolor,
    generalInfo: people.o_mnie,
  }));

  // await deleteCollection(COLLECTION_NAME);

  const isCreateDbSuccess = await setDataToDbFromJson<IPeople>(COLLECTION_NAME, mappedData);

  if (isCreateDbSuccess) {
    const answerFromDb = await searchInDb(COLLECTION_NAME, taskData.question);

    const content = answerFromDb?.[0]?.payload?.content as IPeople;

    console.log({ content });
    if (!content) {
      console.log('no answer in db');
      return;
    }

    const infoAboutPerson = `Nazywam się: ${content.name}. Mój ulubiony kolor to: ${content.favoriteColor}. ${content.generalInfo}`;
    console.log({ infoAboutPerson });

    const answer = await getFromChat([
      {
        role: 'system',
        content: `Informacje o osobie, o której dotyczy pytanie masz poniżej. Odpowiedź na podstawie poniżeszego kontentu
          ${infoAboutPerson}
        `,
      },
      {
        role: 'user',
        content: taskData.question,
      },
    ]);

    if (answer) answerPOST(token, answer);
  }
};
