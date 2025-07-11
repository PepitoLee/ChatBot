import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/database'
import Chat, { IMessage } from '@/lib/models/Chat'
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
      // Mejora: Asegurar que title no sea vacío y limitarlo mejor
      const trimmedMessage = message.trim();
      const title = trimmedMessage.substring(0, 50) + (trimmedMessage.length > 50 ? '...' : '') || 'Nueva Conversación';
      chat = await Chat.create({
        userId,
        title,
        messages: [],
      })
    }

    // Agregar mensaje del usuario (con tipo explícito)
    const userMessage: IMessage = {
      role: 'user',
      content: message.trim(),
      timestamp: new Date(),
    }
    
    chat.messages.push(userMessage)

    // Preparar mensajes para DeepSeek
    // Cambio: Tipar msg explícitamente para resolver el error de 'any' implícito
    const messagesForAI = chat.messages.map((msg: IMessage) => ({
      role: msg.role,
      content: msg.content,
    }))

    // Obtener respuesta de DeepSeek
    const aiResponse = await sendMessageToDeepSeek(messagesForAI)

    // Mejora: Chequeo extra si aiResponse es válido
    if (!aiResponse || typeof aiResponse !== 'string') {
      throw new Error('Respuesta inválida de la IA');
    }

    // Agregar respuesta del AI (con tipo explícito)
    const aiMessage: IMessage = {
      role: 'assistant',
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
  } catch (error: any) {
    // Mejora: Log más detallado
    console.error('Error en chat POST:', error.message || error);
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

    // Mejora: Ordenar chats por updatedAt descendente
    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 })

    return NextResponse.json(chats)
  } catch (error: any) {
    console.error('Error en chat GET:', error.message || error);
    return NextResponse.json(
      { error: 'Error al obtener chats' },
      { status: 500 }
    )
  }
}