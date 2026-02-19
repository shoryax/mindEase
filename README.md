# 🧠 MindEase - Your Digital Wellness Companion

A modern, compassionate mental health and wellness web application designed to help users on their journey to better mental well-being with mymentalhealthpal AI therapist support.

## ✨ Features

- **🤖 AI Therapist (mymentalhealthpal)** - Chat with an AI-powered therapist for guidance on mental health, symptoms, nutrition, and wellness tips
- **🧘 Guided Activities** - Access curated mindfulness, meditation, breathing exercises, and journaling prompts
- **📊 Personal Dashboard** - Track your daily wellness goals and monitor your progress
- **🌙 Dark Mode** - Comfortable viewing experience in any lighting condition
- **🔐 Secure Authentication** - User accounts powered by Supabase

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with React 19
- **Styling:** Tailwind CSS with custom animations
- **UI Components:** Radix UI + shadcn/ui
- **Database & Auth:** Supabase
- **AI Integration:** Cohere AI
- **Animations:** GSAP
- **Icons:** Lucide React

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/shoryax/MindEase.git
   cd MindEase
   ```

2.  **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp . env.example .env
   ```
   Fill in your API keys:
   - `COHERE_API_KEY` - Your Cohere API key for the chatbot
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/chats/      # AI chatbot API endpoint
│   │   ├── dashboard/      # User dashboard with activity tracking
│   │   ├── signin/         # Authentication pages
│   │   └── settings/       # User settings
│   ├── components/         # Reusable UI components
│   ├── contexts/           # React context providers
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utility functions & Supabase client
├── data/                   # Activity data and configurations
└── public/                 # Static assets
```

## ⚠️ Disclaimer

This application is designed for general wellness support and is **not a substitute for professional medical advice**. Always consult a qualified healthcare provider for serious health concerns.

## 📄 License

This project is private and proprietary. 

---

*Healing starts with connection* 💜
