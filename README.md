# ExcensaGPT Chat App 🚀

A beautiful, modern chat application for ExcensaGPT - your chaotic Gen-Z AI bestie that helps with productivity, excuses, drama, and emotional support!

## ✨ Features

- **Beautiful Gen-Z UI**: Gradient backgrounds, glassmorphism effects, and smooth animations
- **Mood-Based Chat**: Select your vibe (😭, 😐, 😤, 🤡, 😎) to get personalized responses
- **Real-time Chat**: Instant messaging with typing indicators
- **Mobile Responsive**: Works perfectly on all devices
- **Session Management**: Start new chats and maintain conversation history

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS + Vite
- **Backend**: Node.js + Express
- **AI Integration**: Python script calling OpenRouter's Mistral API
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Python 3.x
- OpenRouter API key

### Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Set up your OpenRouter API key:**
   - Get your API key from [OpenRouter](https://openrouter.ai/)
   - Open `backend/server.js`
   - Replace `"MY-API-KEY"` with your actual API key

3. **Install Python dependencies:**
```bash
pip install requests
```

4. **Start the application:**
```bash
npm run dev
```

This will start both the frontend (http://localhost:5173) and backend (http://localhost:3001) concurrently.

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── ChatMessage.tsx      # Individual chat message component
│   │   ├── MoodSelector.tsx     # Mood selection interface
│   │   └── TypingIndicator.tsx  # Loading animation
│   ├── App.tsx                  # Main chat interface
│   └── index.css               # Styles and animations
├── backend/
│   ├── server.js               # Express server
│   └── kb.txt                  # ExcensaGPT knowledge base
└── README.md
```

## 🎨 Design Features

- **Glassmorphism UI**: Translucent elements with backdrop blur
- **Gradient Backgrounds**: Dynamic purple-to-blue gradients
- **Smooth Animations**: Fade-in effects and hover states
- **Custom Scrollbars**: Styled for the dark theme
- **Responsive Design**: Mobile-first approach

## 🔧 Configuration

### Mood Options
The app includes 5 mood states that affect AI responses:
- 😭 Crying (sad/emotional support mode)
- 😐 Neutral (balanced responses)
- 😤 Frustrated (motivational/problem-solving)
- 🤡 Chaotic (fun/meme-heavy responses)
- 😎 Cool (confident/hype mode)

### API Integration
The backend creates a temporary Python script for each request that:
1. Loads the knowledge base from `kb.txt`
2. Maintains chat history for context
3. Calls OpenRouter's Mistral API
4. Returns the AI response

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
```
Deploy the `dist` folder to your preferred hosting platform.

### Backend (Railway/Render/Heroku)
The backend is a standard Express.js app that can be deployed to any Node.js hosting platform. Make sure to:
1. Set your OpenRouter API key as an environment variable
2. Install Python and the `requests` library on your server
3. Update CORS settings for your frontend domain

## 🎯 Usage Tips

1. **Start with a mood**: Select how you're feeling to get personalized responses
2. **Be conversational**: ExcensaGPT responds best to casual, Gen-Z style messages
3. **Ask for anything**: Homework help, excuses, playlist recommendations, emotional support
4. **Use "New Chat"**: Clear history when switching topics or moods

## 🤝 Contributing

This is a teen-founded project by Inceptive! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Share your experience

## 📄 License

MIT License - feel free to use this for your own projects!

---

Built with 💜 by the Inceptive team
*"Making AI that actually gets Gen-Z"*