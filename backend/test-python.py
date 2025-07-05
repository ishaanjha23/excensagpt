import requests
import sys

# Test script to check if Python and requests work
API_KEY = "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"
MODEL = "mistralai/mistral-small-3.2-24b-instruct:free"
URL = "https://openrouter.ai/api/v1/chat/completions"

print("Testing Python setup...")
print(f"Python version: {sys.version}")

try:
    import requests
    print("✅ Requests library is available")
except ImportError:
    print("❌ Requests library not found. Run: pip3 install requests")
    sys.exit(1)

# Test API call
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

payload = {
    "model": MODEL,
    "messages": [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Say hello"}
    ]
}

try:
    print("Testing API connection...")
    res = requests.post(URL, headers=headers, json=payload, timeout=30)
    print(f"Status code: {res.status_code}")
    
    if res.status_code == 200:
        reply = res.json()['choices'][0]['message']['content']
        print(f"✅ API working! Response: {reply}")
    else:
        print(f"❌ API Error: {res.status_code}")
        print(f"Response: {res.text}")
        
except Exception as e:
    print(f"❌ Connection error: {e}")