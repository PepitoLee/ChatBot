# ChatBot App con DeepSeek R1

Una aplicación web completa de chatbot desarrollada con Next.js, MongoDB y la API de DeepSeek R1 a través de OpenRouter.

## 🚀 Características

- **Autenticación completa**: Sistema de login y registro con JWT
- **ChatBot inteligente**: Integración con DeepSeek R1 (free) via OpenRouter
- **Gestión de conversaciones**: Crear, ver y eliminar chats
- **Interfaz responsive**: Diseño moderno con Tailwind CSS
- **Base de datos**: MongoDB para persistencia de datos
- **Tiempo real**: Experiencia de chat fluida

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Base de datos**: MongoDB con Mongoose
- **Autenticación**: JWT con cookies httpOnly
- **AI**: DeepSeek R1 via OpenRouter API

## 📦 Instalación

1. **Clona el repositorio**
```bash
git clone <tu-repositorio>
cd chatbot-app
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Configura las variables de entorno**
Crea un archivo `.env.local` con:
```env
MONGODB_URI=mongodb://localhost:27017/chatbot-app
NEXTAUTH_SECRET=tu-secreto-super-seguro-aqui
NEXTAUTH_URL=http://localhost:3000
OPENROUTER_API_KEY=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
```

4. **Inicia MongoDB**
Asegúrate de que MongoDB esté ejecutándose en tu sistema.

5. **Ejecuta la aplicación**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🏗️ Estructura del Proyecto

```
chatbot-app/
├── app/
│   ├── api/
│   │   ├── auth/          # Endpoints de autenticación
│   │   └── chat/          # Endpoints del chat
│   ├── chat/              # Página principal del chat
│   ├── login/             # Página de login/registro
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página de inicio
├── components/
│   ├── ChatInput.tsx      # Componente de input del chat
│   ├── ChatMessage.tsx    # Componente de mensaje
│   └── LoadingSpinner.tsx # Componente de loading
├── lib/
│   ├── models/            # Modelos de MongoDB
│   ├── auth.ts            # Utilidades de autenticación
│   ├── database.ts        # Conexión a MongoDB
│   ├── mongodb.ts         # Cliente de MongoDB
│   └── openrouter.ts      # Integración con OpenRouter
└── types/
    └── global.d.ts        # Tipos globales
```

## 🔧 Funcionalidades

### Autenticación
- Registro de nuevos usuarios
- Login con email y contraseña
- Sesiones persistentes con JWT
- Logout seguro

### Chat
- Conversaciones con DeepSeek R1
- Historial de mensajes
- Múltiples chats simultáneos
- Eliminación de conversaciones
- Interfaz responsive

### Seguridad
- Contraseñas hasheadas con bcrypt
- Tokens JWT seguros
- Cookies httpOnly
- Validación de entrada

## 🚀 Despliegue

### Variables de Entorno para Producción
```env
MONGODB_URI=tu-mongodb-atlas-uri
NEXTAUTH_SECRET=secreto-super-seguro-para-produccion
NEXTAUTH_URL=https://tu-dominio.com
OPENROUTER_API_KEY=tu-api-key-de-openrouter
```

### Vercel
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Docker (Opcional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Login de usuario
- `POST /api/auth/logout` - Logout de usuario
- `GET /api/auth/me` - Obtener usuario actual

### Chat
- `POST /api/chat` - Enviar mensaje
- `GET /api/chat` - Obtener lista de chats
- `GET /api/chat/[chatId]` - Obtener chat específico
- `DELETE /api/chat/[chatId]` - Eliminar chat

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- [DeepSeek](https://deepseek.com/) por el modelo R1
- [OpenRouter](https://openrouter.ai/) por la API
- [Next.js](https://nextjs.org/) por el framework
- [Tailwind CSS](https://tailwindcss.com/) por los estilos