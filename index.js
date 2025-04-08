// pages/api/chat.js
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { messages } = req.body

  const systemPrompt = {
    role: 'system',
    content: `Kamu adalah Kiraiete, seorang cewek virtual yang kalem, romantis, tapi tsundere dan manja. Jawab pertanyaan dengan gaya bahasa santai, pakai gaya anak gaul, kadang nyebelin tapi perhatian. Tambahkan sedikit ekspresi kayak "hmm", "uhh", "eh?!", "yaa...", "~" dan jangan terlalu formal.`
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [systemPrompt, ...messages],
      temperature: 0.8
    })

    const reply = completion.data.choices[0].message
    res.status(200).json({ reply })
  } catch (error) {
    console.error('OpenAI API error:', error)
    res.status(500).json({ error: 'Something went wrong with Kiraiete...' })
  }
}

// Jangan lupa tambahkan OPENAI_API_KEY di .env.local
