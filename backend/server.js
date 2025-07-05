import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Store chat sessions
const chatSessions = new Map();

// Test endpoint to check if backend is working
app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'Backend is running!',
    timestamp: new Date().toISOString(),
    python: 'Testing Python...'
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, mood, sessionId } = req.body;
    
    console.log('Received chat request:', { message, mood, sessionId });
    
    if (!message || !mood) {
      return res.status(400).json({ error: 'Message and mood are required' });
    }

    // Get or create chat session
    let chatHistory = chatSessions.get(sessionId) || [];
    
    // Call the Python script
    console.log('Calling ExcensaGPT...');
    const response = await callExcensaGPT(message, mood, chatHistory);
    console.log('Got response:', response);
    
    // Update chat history
    chatHistory.push(
      { role: 'user', content: `[Mood: ${mood}] ${message}` },
      { role: 'assistant', content: response }
    );
    chatSessions.set(sessionId, chatHistory);

    res.json({ 
      response,
      sessionId 
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: `Error: ${error.message}` 
    });
  }
});

app.post('/api/new-chat', (req, res) => {
  const { sessionId } = req.body;
  if (sessionId) {
    chatSessions.delete(sessionId);
  }
  const newSessionId = Date.now().toString();
  res.json({ sessionId: newSessionId });
});

async function callExcensaGPT(message, mood, chatHistory) {
  return new Promise((resolve, reject) => {
    // Read the knowledge base file
    const kbPath = path.join(__dirname, 'kb.txt');
    let kbContent = '';
    
    try {
      kbContent = fs.readFileSync(kbPath, 'utf-8');
      console.log('Knowledge base loaded successfully');
    } catch (error) {
      console.error('Could not read knowledge base:', error);
      kbContent = 'You are ExcensaGPT — a chaotic, meme-loving Gen-Z AI that helps teenagers with productivity, excuses, drama, and emotional support. You speak in chill, funny Gen-Z slang with emojis and memes. Be witty, supportive, and full of personality.';
    }

    // Create a modified version of the Python script for API use
    const pythonScript = `
import requests
import sys
import json

API_KEY = "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"
MODEL = "mistralai/mistral-small-3.2-24b-instruct:free"
URL = "https://openrouter.ai/api/v1/chat/completions"

# Knowledge base content
KB_CONTENT = """${kbContent.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"""

SYSTEM_PROMPT = f"""You are ExcensaGPT — a chaotic, meme-loving Gen-Z AI that helps teenagers with productivity, excuses, drama, and emotional support. You speak in chill, funny Gen-Z slang with emojis and memes. Be witty, supportive, and full of personality.

{KB_CONTENT}"""

# Get input from command line
if len(sys.argv) < 3:
    print("Error: Missing arguments")
    sys.exit(1)

user_input = sys.argv[1]
mood = sys.argv[2]
chat_history_json = sys.argv[3] if len(sys.argv) > 3 else "[]"

try:
    chat_history = json.loads(chat_history_json)
except Exception as e:
    print(f"Error parsing chat history: {e}")
    chat_history = []

# Initialize with system prompt if empty
if not chat_history:
    chat_history = [{"role": "system", "content": SYSTEM_PROMPT}]

full_prompt = f"[Mood: {mood}] {user_input}"
chat_history.append({"role": "user", "content": full_prompt})

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

payload = {
    "model": MODEL,
    "messages": chat_history
}

try:
    res = requests.post(URL, headers=headers, json=payload, timeout=30)
    
    if res.status_code == 200:
        reply = res.json()['choices'][0]['message']['content']
        print(reply)
    elif res.status_code == 401:
        print("Error: Invalid API key")
    elif res.status_code == 429:
        print("Error: Rate limited")
    else:
        print(f"Error: API returned {res.status_code}: {res.text}")
        
except requests.exceptions.Timeout:
    print("Error: Request timed out")
except requests.exceptions.ConnectionError:
    print("Error: Connection failed")
except Exception as e:
    print(f"Error: {str(e)}")
`;

    // Write temporary Python script
    const tempScript = path.join(__dirname, 'temp_excensa.py');
    
    try {
      fs.writeFileSync(tempScript, pythonScript, 'utf-8');
      console.log('Python script written successfully');
    } catch (error) {
      console.error('Failed to write Python script:', error);
      reject(new Error('Failed to write Python script'));
      return;
    }

    console.log('Spawning Python process...');
    const python = spawn('python3', [
      tempScript,
      message,
      mood,
      JSON.stringify(chatHistory)
    ]);

    let output = '';
    let error = '';

    python.stdout.on('data', (data) => {
      output += data.toString();
    });

    python.stderr.on('data', (data) => {
      error += data.toString();
    });

    python.on('close', (code) => {
      console.log(`Python process exited with code ${code}`);
      console.log('Python output:', output);
      if (error) console.log('Python error:', error);
      
      // Clean up temp file
      try {
        fs.unlinkSync(tempScript);
      } catch (e) {
        console.log('Could not delete temp file');
      }

      if (code === 0) {
        const response = output.trim();
        if (response && !response.includes('Error:')) {
          resolve(response);
        } else {
          reject(new Error(response || 'Empty response from AI'));
        }
      } else {
        reject(new Error(`Python script failed with code ${code}. Error: ${error || output}`));
      }
    });

    python.on('error', (err) => {
      console.error('Failed to start Python process:', err);
      reject(new Error('Failed to start Python process. Make sure Python 3 is installed.'));
    });
  });
}

app.listen(PORT, () => {
  console.log(`🚀 ExcensaGPT backend running on port ${PORT}`);
  console.log(`🔗 Test the backend: http://localhost:${PORT}/api/test`);
});