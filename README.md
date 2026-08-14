# 🧮 Day 9 – Hand Off to a Specialist Agent

> Teaching LearnMate to recognise when a focused problem should be handled by a dedicated specialist agent.

Part of **10 Days of Voice Agents – Voice for Bharat Edition** 🚀

Day 8 focused on analysing LearnMate's call performance through a call analytics dashboard.

For **Day 9**, I extended LearnMate with a **specialist agent** for mathematics practice. Instead of making the main learning agent responsible for every type of question, LearnMate can now hand a mathematics-focused conversation to a dedicated **Maths Practice Specialist**.

---

## 🎯 Day 9 Objective

For Day 9, I added an agent handoff system to **LearnMate**, my Learning & Literacy voice assistant.

The main agent can now:

- 🧠 Recognise when a learner needs focused mathematics assistance
- 🧮 Route mathematics questions to a dedicated specialist
- 🗣️ Clearly announce the handoff to the learner
- 🔄 Transfer the conversation without making the learner repeat the entire problem
- 📚 Preserve relevant conversation context
- 🎯 Keep the specialist focused on mathematics practice

The goal is simple:

> **One agent does not need to be an expert at everything.**

---

# 🧮 Maths Practice Specialist

For the Learning & Literacy track, I selected **Maths Practice Specialist** as the specialist agent.

The specialist has one focused responsibility:

> Help learners understand and practise mathematics.

It can assist with:

- ➗ Arithmetic
- 📐 Algebra
- 📊 Basic statistics
- 📈 Functions
- 📏 Geometry
- 🧮 Equations and inequalities
- 📝 Practice questions
- 🧠 Step-by-step problem solving

The main LearnMate agent continues handling general learning conversations and only performs a handoff when focused mathematics assistance is required.

---

# 🔄 Agent Handoff Flow

```text
                    Learner
                       │
                       ▼
                LearnMate Main Agent
                       │
                       ▼
              Understand the Request
                       │
             ┌─────────┴─────────┐
             │                   │
       General Learning      Maths Request
             │                   │
             ▼                   ▼
       Main Agent Answers   Announce Handoff
                                   │
                                   ▼
                         Maths Specialist Agent
                                   │
                                   ▼
                          Continue Conversation
                                   │
                                   ▼
                         Solve / Explain Maths
````

---

# 🗣️ Handoff Example

### Normal Learning Question

```text
Learner:
"What is an IP address?"

LearnMate:
"An IP address is a unique address used to identify
a device on a network. Would you like an example?"
```

The main agent handles the request because it does not require the Maths Specialist.

---

### Mathematics Question

```text
Learner:
"I need help solving a quadratic equation."

LearnMate:
"This is a focused mathematics problem.
I'll connect you with our Maths Specialist."

Maths Specialist:
"Hi! I'm LearnMate's Maths Practice Specialist.
I can help you solve the equation step by step."
```

The conversation is handed off to the specialist.

---

# 🧠 Context Preservation

An important part of the handoff is maintaining the learner's context.

The learner should not have to explain the entire problem again after the specialist takes over.

For example:

```text
Learner:
"I'm preparing for an exam and I'm struggling with quadratic equations."

LearnMate:
"I can help you understand quadratic equations.
What part are you finding difficult?"

Learner:
"I understand the concept, but I need help solving this problem."

LearnMate:
"This is a focused mathematics problem.
I'll connect you with our Maths Specialist."

Maths Specialist:
"Sure. I know you're working on quadratic equations.
Let's solve the problem step by step."
```

The specialist continues from the existing conversation instead of restarting the interaction.

---

# 🛠️ Handoff Tool

The main agent uses a dedicated handoff mechanism to transfer the conversation to the Maths Specialist.

Conceptually, the handoff is triggered through:

```python
transfer_to_maths_specialist()
```

The tool description clearly tells the main agent when it should be used.

The main agent should hand off when:

* The learner explicitly asks for mathematics help
* The problem requires focused mathematical reasoning
* The learner wants mathematics practice
* A dedicated maths explanation would provide a better experience

The main agent should **not** hand off for unrelated or general learning questions.

---

# 🧑‍🏫 Specialist Responsibilities

## The Maths Specialist CAN:

* ✅ Explain mathematical concepts
* ✅ Solve mathematics problems step by step
* ✅ Give practice questions
* ✅ Explain mistakes
* ✅ Identify common misconceptions
* ✅ Ask clarifying questions
* ✅ Adapt explanations to the learner's level
* ✅ Continue using the context provided during handoff

## The Maths Specialist SHOULD NOT:

* ❌ Handle unrelated technical requests
* ❌ Pretend to be a human teacher
* ❌ Claim capabilities it does not have
* ❌ Take over normal conversations unnecessarily
* ❌ Perform tasks outside its mathematics role

---

# 🔐 Clear Handoff for the Learner

The handoff should never happen silently.

Before transferring the conversation, LearnMate clearly tells the learner what is happening.

Example:

```text
LearnMate:

"This looks like a focused mathematics problem.
I'll connect you with our Maths Specialist so we
can work through it step by step."
```

The specialist then introduces itself:

```text
Maths Specialist:

"Hi! I'm the Maths Practice Specialist.
Let's continue from where you left off."
```

This makes the transition clear and natural.

---

# 🏗️ Architecture

```text
                         LearnMate
                            │
                            ▼
                    Main Voice Agent
                            │
                            ▼
                   Request Classification
                            │
              ┌─────────────┴─────────────┐
              │                           │
        General Learning             Maths Request
              │                           │
              ▼                           ▼
        Main Agent Answer           Handoff Message
                                          │
                                          ▼
                          transfer_to_maths_specialist()
                                          │
                                          ▼
                              Maths Specialist Agent
                                          │
                                          ▼
                              Mathematics Assistance
```

---

# 🛠️ Tech Stack

| Component        | Technology                |
| ---------------- | ------------------------- |
| Voice Agent      | LiveKit Agents            |
| Main Agent       | LearnMate                 |
| Specialist Agent | Maths Practice Specialist |
| LLM              | Google Gemini             |
| Speech-to-Text   | Deepgram                  |
| Text-to-Speech   | Murf Falcon               |
| Agent Handoff    | LiveKit Agent Handoff     |
| Backend          | Python                    |
| Frontend         | Next.js                   |
| UI               | React + TypeScript        |
| Styling          | Tailwind CSS              |
| Voice Transport  | LiveKit                   |

---

# 📂 Project Structure

```text
Day-9-Maths-Specialist-LearnMate/
│
├── backend/
│   ├── src/
│   │   ├── agent.py
│   │   ├── memory.py
│   │   ├── learning_tools.py
│   │   └── maths_specialist.py
│   │
│   ├── .env.example
│   └── pyproject.toml
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── package.json
│
├── README.md
└── LICENSE
```

---

# ▶️ Running LearnMate

Day 9 continues the same LiveKit-based architecture used throughout the previous days.

## 1️⃣ Start LiveKit

```bash
livekit-server.exe --dev
```

## 2️⃣ Start the Backend

```bash
cd backend
uv sync
uv run python src/agent.py dev
```

## 3️⃣ Start the Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Open the application at:

```text
http://localhost:3000
```

---

# 🧪 Testing Checklist

## Test 1 — Normal Conversation

* ✅ Start LearnMate
* ✅ Ask a general learning question
* ✅ Main agent answers normally
* ✅ No specialist handoff occurs

---

## Test 2 — Maths Specialist

* ✅ Start a voice conversation
* ✅ Ask a focused mathematics question
* ✅ Main agent recognises the specialist requirement
* ✅ Main agent announces the handoff
* ✅ Maths Specialist takes over
* ✅ Specialist continues the conversation

---

## Test 3 — Context Preservation

* ✅ Mention the mathematics topic
* ✅ Explain the problem briefly
* ✅ Request specialist assistance
* ✅ Verify that the Maths Specialist receives the relevant context
* ✅ Continue the conversation without repeating the complete problem

---

## Test 4 — Specialist Boundaries

* ✅ Ask a general non-mathematics question
* ✅ Verify that LearnMate handles it directly
* ✅ Ask a mathematics-focused question
* ✅ Verify that the Maths Specialist is selected

---

# 🚀 What I Built

For Day 9, I taught LearnMate how to **delegate specialised tasks instead of trying to handle everything with a single agent**.

A dedicated **Maths Practice Specialist** can now take over when the learner needs focused mathematics assistance.

The main agent identifies the need, clearly informs the learner about the handoff, and transfers the conversation while preserving the relevant context.

This creates a more modular voice-agent architecture and makes it easier to add additional specialists in the future.

---

# 🔮 Future Improvements

The same architecture can be extended with additional specialist agents:

* 🐍 Python Specialist
* 🧮 DSA Specialist
* 🗄️ DBMS Specialist
* 🌐 Computer Networks Specialist
* ⚙️ Operating Systems Specialist
* 📚 English Learning Specialist
* 👨‍🏫 Human Teacher Handoff
* 📊 Specialist-specific analytics
* 🌐 Multi-language specialist routing
* 🧠 Smarter intent-based agent selection

---

# 🇮🇳 10 Days of Voice Agents

Built as part of **10 Days of Voice Agents — Voice for Bharat Edition**.

Powered by:

**Murf Falcon • LiveKit • Deepgram • Gemini • Next.js • Python**

---

# 👨‍💻 Author

**Vikas Yadav**

GitHub:
[https://github.com/vikasyadav097](https://github.com/vikasyadav097)

---

# 📜 License

This project is licensed under the **MIT License**.

---

## 🏷️ Hashtags

`#10DaysofAIVoiceAgents` `#MurfFalcon` `#VoiceForBharat` `#MurfAI` `#VoiceAI` `#GenerativeAI` `#LearningAndLiteracy` `#Maths` `#AI` `#LiveKit` `#Deepgram` `#Gemini`

```
```
