const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface ChatResponse {
  id: string
  object: string
  created: number
  model: string
  choices: {
    index: number
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export async function sendMessageToDeepSeek(messages: ChatMessage[]): Promise<string> {
  try {
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXTAUTH_URL || 'http://localhost:3000',
        'X-Title': 'ChatBot App',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1:free',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Error de OpenRouter:', errorData)
      throw new Error(`Error de API: ${response.status} - ${errorData}`)
    }

    const data: ChatResponse = await response.json()
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No se recibió respuesta del modelo')
    }

    return data.choices[0].message.content
  } catch (error) {
    console.error('Error al comunicarse con DeepSeek:', error)
    throw new Error('Error al procesar tu mensaje. Por favor, inténtalo de nuevo.')
  }
}