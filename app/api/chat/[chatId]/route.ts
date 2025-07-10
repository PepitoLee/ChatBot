import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/database'
import Chat from '@/lib/models/Chat'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { chatId: string } }
) {
  try {
    await dbConnect()
    
    const userId = await getUserFromRequest(request)
    if (!userId) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const chat = await Chat.findOne({ _id: params.chatId, userId })
    if (!chat) {
      return NextResponse.json(
        { error: 'Chat no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      chatId: chat._id,
      title: chat.title,
      messages: chat.messages,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    })
  } catch (error) {
    console.error('Error al obtener chat:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { chatId: string } }
) {
  try {
    await dbConnect()
    
    const userId = await getUserFromRequest(request)
    if (!userId) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const chat = await Chat.findOneAndDelete({ _id: params.chatId, userId })
    if (!chat) {
      return NextResponse.json(
        { error: 'Chat no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Chat eliminado exitosamente' })
  } catch (error) {
    console.error('Error al eliminar chat:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}