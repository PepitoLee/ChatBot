'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    checkAuthAndRedirect()
  }, [])

  const checkAuthAndRedirect = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        // Usuario autenticado, redirigir al chat
        router.push('/chat')
      } else {
        // Usuario no autenticado, redirigir al login
        router.push('/login')
      }
    } catch (error) {
      // Error de conexión, redirigir al login
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ChatBot App
        </h1>
        <p className="text-gray-600 mb-8">
          Tu asistente inteligente con DeepSeek R1
        </p>
        <LoadingSpinner size="lg" text="Verificando autenticación..." />
      </div>
    </div>
  )
}