'use client'

import { IMessage } from '@/lib/models/Chat'

interface ChatMessageProps {
  message: IMessage
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`chat-message ${isUser ? 'chat-message-user' : 'chat-message-bot'}`}>
        <div className="flex items-start space-x-2">
          {!isUser && (
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              AI
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm whitespace-pre-wrap break-words">
              {message.content}
            </p>
            <span className={`text-xs mt-1 block ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
              {new Date(message.timestamp).toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          {isUser && (
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              TU
            </div>
          )}
        </div>
      </div>
    </div>
  )
}