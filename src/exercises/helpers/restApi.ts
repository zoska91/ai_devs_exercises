export const get = async (url: string) => {
  const data = await fetch(url);
  const jsonData = await data.json();

  return jsonData;
};

export const post = async (url: string, body: any) => {
  const token = await fetch(url, {
    method: 'POST',
    body,
  });
  const jsonToken = await token.json();

  return jsonToken;
};
