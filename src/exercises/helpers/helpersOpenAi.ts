import OpenAI from 'openai';
import fs from 'fs';
import { ChatCompletionMessageParam } from 'openai/resources';

const openai = new OpenAI();

export const getFromChat = async (messages: ChatCompletionMessageParam[]) => {
  const chatResp = await openai.chat.completions.create({
    messages: messages,
    model: 'gpt-3.5-turbo',
    // model: 'gpt-4',
  });

  console.log(chatResp);
  console.log(chatResp.choices[0]);
  return chatResp.choices[0].message.content;
};

export const getFromChatModeration = async (text: string) => {
  const moderation = await openai.moderations.create({ input: text });

  console.log(moderation);
  return moderation.results[0].flagged;
};

export const getFromChatWhisper = async (file: fs.PathLike) => {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(file),
    model: 'whisper-1',
  });

  console.log(transcription.text);
  return transcription.text;
};

export const getFromChatVision = async (messages: ChatCompletionMessageParam[]) => {
  const chatResp = await openai.chat.completions.create({
    messages: messages,
    model: 'gpt-4-turbo',
  });

  console.log(chatResp);
  console.log(chatResp.choices[0]);
  return chatResp.choices[0].message.content;
};

export const getFromChatEmbeddings = async (messages: string) => {
  const chatResp = await openai.embeddings.create({
    input: messages,
    model: 'text-embedding-ada-002',
  });

  console.log(chatResp);
  console.log(chatResp.data[0]?.embedding.length);
  return chatResp.data[0]?.embedding;
};
