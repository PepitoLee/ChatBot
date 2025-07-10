import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/database'
import Chat from '@/lib/models/Chat'
import { getUserFromRequest } from '@/lib/auth'
import { sendMessageToDeepSeek } from '@/lib/openrouter'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const userId = await getUserFromRequest(request)
    if (!userId) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { message, chatId } = await request.json()

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'El mensaje es requerido' },
        { status: 400 }
      )
    }

    let chat
    
    if (chatId) {
      // Buscar chat existente
      chat = await Chat.findOne({ _id: chatId, userId })
      if (!chat) {
        return NextResponse.json(
          { error: 'Chat no encontrado' },
          { status: 404 }
        )
      }
    } else {
      // Crear nuevo chat
      chat = await Chat.create({
        userId,
        title: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
        messages: [],
      })
    }

    // Agregar mensaje del usuario
    const userMessage = {
      role: 'user' as const,
      content: message.trim(),
      timestamp: new Date(),
    }
    
    chat.messages.push(userMessage)

    // Preparar mensajes para DeepSeek
    const messagesForAI = chat.messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    }))

    // Obtener respuesta de DeepSeek
    const aiResponse = await sendMessageToDeepSeek(messagesForAI)

    // Agregar respuesta del AI
    const aiMessage = {
      role: 'assistant' as const,
      content: aiResponse,
      timestamp: new Date(),
    }
    
    chat.messages.push(aiMessage)
    await chat.save()

    return NextResponse.json({
      chatId: chat._id,
      messages: chat.messages,
      title: chat.title,
    })
  } catch (error) {
    console.error('Error en chat:', error)
    return NextResponse.json(
      { error: 'Error al procesar el mensaje' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const userId = await getUserFromRequest(request)
    if (!userId) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const chats = await Chat.find({ userId })
      .select('title createdAt updatedAt')
      .sort({ updatedAt: -1 })
      .limit(20)

    return NextResponse.json({ chats })
  } catch (error) {
    console.error('Error al obtener chats:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}