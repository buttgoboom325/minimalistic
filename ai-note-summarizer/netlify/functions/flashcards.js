import OpenAI from 'openai';
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function handler(event) {
  const { text } = JSON.parse(event.body);
  const prompt = `Turn the following notes into Q&A flashcards:\n${text}`;
  const response = await client.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ flashcards: response.choices[0].message.content }),
  };
}
