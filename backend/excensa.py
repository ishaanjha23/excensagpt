import requests

API_KEY = "MY-API-KEY"  # ⛔ Replace with your actual OpenRouter API key
MODEL = "mistralai/mistral-small-3.2-24b-instruct:free"
URL = "https://openrouter.ai/api/v1/chat/completions"

# Initial ExcensaGPT system prompt
SYSTEM_PROMPT = (
    "You are ExcensaGPT — a chaotic, meme-loving Gen-Z AI that helps teenagers "
    "with productivity, excuses, drama, and emotional support. You speak in chill, "
    "funny Gen-Z slang with emojis and memes. Be witty, supportive, and full of personality."
)

# --- Set Mood Once ---
mood = input("🌡️ Set your mood once (e.g. 😭, 😎, 😤): ").strip() or "😐"
print("✅ Mood locked in!\n")

# --- Chat History ---
chat_history = [{"role": "system", "content": SYSTEM_PROMPT}]

# --- Main Loop ---
print("💬 ExcensaGPT is ready! Type 'exit' to quit or 'reset' to start fresh.\n")

while True:
    user_input = input("👤 You: ")

    if user_input.lower() == "exit":
        print("👋 Exiting ExcensaGPT. Stay chaotic! 💀")
        break
    elif user_input.lower() == "reset":
        chat_history = [{"role": "system", "content": SYSTEM_PROMPT}]
        print("🔄 Chat history cleared.\n")
        continue

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
        res = requests.post(URL, headers=headers, json=payload)
        res.raise_for_status()
        reply = res.json()['choices'][0]['message']['content']
        chat_history.append({"role": "assistant", "content": reply})
        print(f"\n🤖 ExcensaGPT: {reply}\n")

    except requests.exceptions.HTTPError as err:
        print(f"❌ Error {res.status_code}:")
        print(res.text)
    except Exception as e:
        print("⚠️ Unexpected error:", str(e))
