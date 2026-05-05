# NOVA — AI Chatbot with Web Search

A Grok-style AI chatbot with real-time web search, sharp personality, and a sleek dark UI. Built with plain HTML/JS + a Vercel serverless backend powered by Claude.

---

## 🚀 Deploy in 10 Minutes (All Free)

### Step 1 — Get Your Free API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up for a free account
3. Go to **API Keys** → click **Create Key**
4. Copy the key — looks like `sk-ant-...`
5. Save it somewhere safe (you only see it once)

---

### Step 2 — Put the Code on GitHub

1. Go to [github.com](https://github.com) and sign up (free)
2. Click the **+** icon → **New repository**
3. Name it `nova-ai-chat`
4. Keep it **Public**, click **Create repository**
5. Now upload files:
   - Click **uploading an existing file**
   - Upload ALL the files from this folder:
     - `public/index.html`
     - `api/chat.js`
     - `vercel.json`
     - `package.json`
   - Click **Commit changes**

---

### Step 3 — Deploy on Vercel (Free)

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **Add New → Project**
3. Select your `nova-ai-chat` repository
4. Click **Deploy** (don't change any settings)
5. Wait ~30 seconds — it'll fail. That's okay! We need to add the API key first.

---

### Step 4 — Add Your API Key to Vercel

1. In your Vercel project dashboard, go to **Settings → Environment Variables**
2. Click **Add**:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** paste your `sk-ant-...` key
   - **Environment:** check all three (Production, Preview, Development)
3. Click **Save**
4. Go to **Deployments** → click the three dots → **Redeploy**

---

### Step 5 — Your AI is Live! 🎉

Vercel gives you a free URL like:
`https://nova-ai-chat-yourname.vercel.app`

Share it with anyone. It works on mobile too.

---

## What NOVA Can Do

- ✅ Real-time web search (knows today's news, prices, events)
- ✅ Sharp Grok-style personality — direct, witty, honest
- ✅ Markdown formatting (code blocks, bold, lists)
- ✅ Full conversation memory within a session
- ✅ Mobile responsive
- ✅ New chat button

---

## Customizing Your AI

To change the personality, open `public/index.html` and find `const SYSTEM_PROMPT`. Edit the text to make your AI sound however you want. Push the change to GitHub and Vercel auto-redeploys.

---

## Costs

| Service | Free Tier |
|---------|-----------|
| Anthropic API | ~$5 free credits to start |
| Vercel Hosting | Free forever (hobby plan) |
| GitHub | Free forever |

After free credits, Anthropic charges ~$0.003 per message (very cheap).

---

## Problems?

- **"API key not configured"** → Check Step 4, make sure you redeployed
- **Blank page** → Check browser console (F12) for errors
- **Slow responses** → Normal, web search adds 2-3 seconds
