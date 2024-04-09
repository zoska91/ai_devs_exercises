import { answerPOST, getTask, getToken } from '../helpers/helpersAiDevs';
import { get } from '../helpers/restApi';
import { getAnswer, getDataType } from './helpers';

const TASK_NAME = 'knowledge';

export const solution = async () => {
  const token = await getToken(TASK_NAME);
  const taskData = await getTask(token);

  const dataType = await getDataType(taskData.question);

  if (dataType === null) return console.log('something went wrong');

  const currencyData = await get('http://api.nbp.pl/api/exchangerates/tables/A/');
  const populationData = await get('https://restcountries.com/v3.1/all');
  const simplifiedPopulationData = await populationData.map((el: any) => ({
    name: el.name.common,
    population: el.population,
  }));

  const db =
    dataType === 0
      ? currencyData
      : dataType === 1
      ? simplifiedPopulationData
      : 'knowledge of the model';

  const answer = await getAnswer(taskData.question, JSON.stringify(db));

  if (answer) answerPOST(token, answer);
};
