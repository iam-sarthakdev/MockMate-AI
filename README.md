# 🤖 MockMate AI

> **Your Personal AI Interview Coach.**  
> Master your interviews with real-time voice conversations, adaptive questioning, and instant feedback.

![MockMate AI Images]
<img width="1920" height="1080" alt="3" src="https://github.com/user-attachments/assets/b54c74c0-125f-42aa-a0bd-4309f7610822" />
<img width="1920" height="1080" alt="11" src="https://github.com/user-attachments/assets/a8a3391b-eaab-4cbe-b689-b3e5c51a9656" />
<img width="1920" height="1080" alt="10" src="https://github.com/user-attachments/assets/81feac80-c722-416c-9221-aa80f8c20712" />
<img width="1920" height="1080" alt="9" src="https://github.com/user-attachments/assets/e20c0d38-c759-49b2-b708-0b23b7a47435" />
<img width="1920" height="1078" alt="8" src="https://github.com/user-attachments/assets/916345f2-4ba1-41b6-8e93-ad685924bb62" />
<img width="1920" height="1077" alt="7" src="https://github.com/user-attachments/assets/c8a86438-f4dd-4fdb-bcab-7ec6c313ed77" />
<img width="1920" height="1080" alt="6" src="https://github.com/user-attachments/assets/84c0f639-78ec-4c07-83c2-124e88b10ab3" />
<img width="1920" height="1080" alt="5" src="https://github.com/user-attachments/assets/d3ad6943-d698-44e6-9fbb-08c32a67f85f" />
<img width="1920" height="1080" alt="4" src="https://github.com/user-attachments/assets/4e4123ca-f1ec-4027-925b-6b82b47ef918" />
<img width="1920" height="1080" alt="1" src="https://github.com/user-attachments/assets/ebdb3f60-c497-433b-81af-eec79e27a0db" />
<img width="1920" height="1080" alt="2" src="https://github.com/user-attachments/assets/49975bf9-9735-4e65-a919-bae28ce238d3" />

## 🚀 Overview

**MockMate AI** is a cutting-edge interview preparation platform that simulates real-world interviews using advanced Voice AI. Unlike standard text-based chatbots, MockMate AI provides a **voice-first experience** where you speak to an AI interviewer who listens, reacts, and asks follow-up questions in real-time.

Whether you are preparing for a **Behavioral**, **Technical**, or **System Design** interview, MockMate AI adapts its persona and difficulty to help you practice effectively.

## ✨ Key Features

- **🗣️ Real-Time Voice Interaction**: Powered by **VAPI**, ensuring sub-second latency for natural, conversational flow.
- **🎯 Multiple Interview Modes**:
  - **Behavioral**: STAR method focused questions (Leadership, Conflict Resolution, etc.).
  - **Technical**: Deep dives into Data Structures, Algorithms, and specific tech stacks.
  - **System Design**: Architectural challenges for senior-level preparation.
- **🎨 Premium UI/UX**: Built with **Framer Motion** for 60fps animations, 3D tilt effects, and a modern "glassmorphism" aesthetic.
- **📊 Live Audio Visualization**: Real-time frequency analysis visualization during the conversation.
- **📝 Structured Questioning**: Intelligent question selection based on role and difficulty level (Junior/Mid/Senior).
- **🔒 Secure Authentication**: Robust user management with **NextAuth.js**.

## 🛠️ Tech Stack

This project is built with the "bleeding edge" of modern web development:

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI/Voice**: [VAPI](https://vapi.ai/) (Voice AI Pipeline) implementation
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## ⚡ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+
- MongoDB Database URI
- VAPI Public Key & Workflow ID

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/MockMateAI.git
   cd MockMateAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secure_random_string

   # VAPI Voice AI
   NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_public_key
   NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_vapi_workflow_id

   # OAuth Providers (Optional covers Google/Github login)
   GITHUB_CLIENT_ID=...
   GITHUB_CLIENT_SECRET=...
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open** https://mockmateai-sarthak-kanois-projects.vercel.app/ in your browser.

## 📂 Project Structure

```bash
src/
├── app/                  # Next.js App Router pages
├── components/           # Reusable UI components
│   ├── Agent.tsx         # Main VAPI integration logic
│   ├── InterviewModeSelector.tsx # 3D Cards & Selection Logic
│   └── ui/               # Shared UI elements (buttons, inputs)
├── constants/            # Static data (Questions, Prompts)
├── lib/                  # Utility functions & DB connection
├── models/               # Mongoose schemas
└── types/                # TypeScript interfaces
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by [Sarthak Kanoi]
</p>
