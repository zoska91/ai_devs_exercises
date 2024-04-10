import { get, post } from './restApi';

const BASE_API_URL = 'https://tasks.aidevs.pl';

export const getToken = async (taskName: string) => {
  const body = JSON.stringify({
    apikey: process.env.AI_DEVS_API_KEY,
  });

  const jsonToken = await post(`${BASE_API_URL}/token/${taskName}`, body);
  console.log('==== TOKEN ZADANIA ====');
  console.log({ jsonToken });
  console.log('================================================================');

  return jsonToken.token;
};

export const getTask = async (token: string) => {
  const data = await fetch(`${BASE_API_URL}/task/${token}`);
  const jsonData = await get(`${BASE_API_URL}/task/${token}`);
  console.log('==== TRESC ZADANIA ====');
  console.log({ jsonData });
  console.log('================================================================');

  return jsonData;
};

export const answerPOST = async (token: string, answer: string | number[]) => {
  const resp = await fetch(`${BASE_API_URL}/answer/${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      answer,
    }),
  });
  const jsonResp = await resp.json();

  console.log('==== WYNIK ZADANIA ====');
  console.log({ jsonResp });
  console.log('==============================================================');
};
