import { getFromChatVision } from '../helpers/helpersOpenAi';

export const getColor = async (imgUrl: string) => {
  const messages = [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'Jeśli widzisz na zdjęciu gnoma odpowiedź na pytabnie jaki jest kolor jego czapki. (podaj tylko i wyłacznie nazwę koloru bez dodatkowych słów/pełnego zdania) Jeśli nie ma gnoma zwróć "ERROR"',
        },
        {
          type: 'image_url',
          image_url: {
            url: imgUrl,
          },
        },
      ],
    },
  ];

  // @ts-ignore
  const resp = await getFromChatVision(messages);
  return resp;
};
