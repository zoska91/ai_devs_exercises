import OpenAI from 'openai';
import fs from 'fs';
import { ChatCompletionMessageParam } from 'openai/resources';

const openai = new OpenAI();

export const getFromChat = async (messages: Array<ChatCompletionMessageParam>) => {
  const chatResp = await openai.chat.completions.create({
    messages: messages,
    // model: 'gpt-3.5-turbo',
    model: 'gpt-4',
  });

  console.log(chatResp);
  console.log(chatResp.choices[0]);
  return chatResp.choices[0].message.content;
};

export const getFromChatWhisper = async (file: fs.PathLike) => {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(file),
    model: 'whisper-1',
  });

  console.log(transcription.text);
  return transcription.text;
};
