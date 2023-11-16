import OpenAI from "openai";

async function handleSubmit(openai, message) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${message}` }],
      temperature: 0,
      max_tokens: 1024,
      stream: true,
    });

    const data = [];
    for await (const chunk of response) {
      data.push(chunk.choices[0].delta.content);
    }
    // const data = {
    //   response: response.choices[0].message.content,
    // };
    return {response: data.join("")};
  } catch (error) {
    console.log("openAPI调用错误", error);
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const apiKey = config.private.openaiApiKey;
  const openai = new OpenAI({
    apiKey: apiKey,
  });

  const query = getQuery(event);
  console.log("query:", query);
  const data = await handleSubmit(openai, query.message);
  console.log("data:", data);
  return data;
});
