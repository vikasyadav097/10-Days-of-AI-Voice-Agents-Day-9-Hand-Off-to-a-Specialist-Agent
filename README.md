
# 📊 Day 8 – Build a Call Analytics Dashboard

> Giving LearnMate a dashboard to understand how its voice conversations are performing.

Part of **10 Days of Voice Agents – Voice for Bharat Edition** 🚀

Day 7 taught LearnMate when it should stop trying to solve everything itself and ask for human help.

Day 8 focuses on **call analytics** — giving LearnMate a simple dashboard where I can monitor voice sessions and understand whether learning conversations successfully achieved their objective.

---

# 🎯 Day 8 Objective

For Day 8, I upgraded **LearnMate**, my Learning & Literacy voice assistant, with a call analytics dashboard.

The dashboard provides a simple overview of voice learning sessions and tracks whether each call successfully achieved its defined objective.

LearnMate can now:

- 📞 Track total voice calls
- ✅ Track successful calls
- ❌ Track unsuccessful calls
- 📈 Calculate the overall success rate
- 📋 Display recent learning sessions
- 🧠 Show learning-related call outcomes
- 🔐 Keep sensitive caller information out of the dashboard

---

# 🎯 What Does a Successful Call Mean?

For the **Learning & Literacy** track, I defined a successful call as:

> **The learner successfully completes the intended learning interaction or achieves the objective of the conversation.**

For example:

```text
Learner:
"What is an IP address?"

LearnMate:
Explains the concept and provides an example.

Learner:
"Okay, now I understand it."

→ Successful Call
````

A call can be unsuccessful when the learner does not complete the intended objective.

For example:

```text
Learner:
"I don't understand this and I want to stop."

→ Unsuccessful Call
```

An unsuccessful call does **not necessarily mean the system failed technically**.

It simply means the defined success condition was not achieved.

---

# 📊 Call Analytics Dashboard

The dashboard displays four important metrics:

| Metric               | Description                                      |
| -------------------- | ------------------------------------------------ |
| 📞 Total Calls       | Total number of voice learning sessions          |
| ✅ Successful Calls   | Calls where the learning objective was completed |
| ❌ Unsuccessful Calls | Calls where the objective was not completed      |
| 📈 Success Rate      | Percentage of successful calls                   |

The dashboard provides a quick way to understand how LearnMate is performing.

---

# 📈 Success Rate

The success rate represents the percentage of successful conversations.

```text
Success Rate =
Successful Calls / Total Calls × 100
```

For example:

```text
Total Calls       → 20
Successful Calls  → 15
Unsuccessful      → 5

Success Rate      → 75%
```

This makes it easier to understand the overall performance of the voice agent.

---

# 🔄 Call Analytics Flow

```text
                    Learner
                       │
                       ▼
                Start Voice Call
                       │
                       ▼
                 LearnMate Agent
                       │
                       ▼
              Learning Conversation
                       │
                       ▼
              Did the call achieve
               its objective?
                       │
              ┌────────┴────────┐
              │                 │
             Yes               No
              │                 │
              ▼                 ▼
         Successful        Unsuccessful
              │                 │
              └────────┬────────┘
                       │
                       ▼
                 Call Statistics
                       │
                       ▼
              Analytics Dashboard
                       │
                       ▼
        Total • Successful • Failed
                    • Rate
```

---

# 🖥️ Dashboard Features

The LearnMate dashboard contains:

### 📞 Total Calls

Shows the total number of voice sessions.

### ✅ Successful Calls

Shows how many conversations achieved their learning objective.

### ❌ Unsuccessful Calls

Shows conversations where the intended objective was not completed.

### 📈 Success Rate

Shows the overall percentage of successful conversations.

---

# 📋 Recent Sessions

The dashboard also provides a simple view of recent learning sessions.

Example:

```text
🧠 Python Practice
Today
        ✅ Successful


🧠 Computer Networks
Today
        ✅ Successful


🧠 Data Structures
Yesterday
        ❌ Unsuccessful


🧠 Algorithms
Yesterday
        ✅ Successful
```

This makes it easier to understand what types of learning conversations are happening.

---

# 🧠 LearnMate Learning Analytics

The dashboard is designed around the Learning & Literacy use case.

It can be used to monitor conversations such as:

* 🐍 Python
* 🧮 Data Structures
* 🌐 Computer Networks
* 🗄️ DBMS
* ⚡ Algorithms
* 💻 Computer Science concepts

The goal is not just to count calls, but to understand whether the learner actually achieved the intended outcome.

---

# 🔐 Privacy & Safety

The dashboard is intentionally designed to avoid exposing sensitive learner information.

### Dashboard CAN show:

* ✅ Total call count
* ✅ Successful call count
* ✅ Unsuccessful call count
* ✅ Success rate
* ✅ General learning topic
* ✅ Call outcome
* ✅ Basic session information

### Dashboard MUST NOT show:

* ❌ Passwords
* ❌ OTPs
* ❌ PINs
* ❌ Account numbers
* ❌ Medical information
* ❌ Sensitive personal information
* ❌ Full conversation transcripts

The dashboard focuses on **analytics rather than exposing private conversations**.

---

# 🏗️ Architecture

```text
                       LearnMate
                          │
                          ▼
                   Voice Conversation
                          │
                          ▼
                       LiveKit
                          │
                          ▼
                    Agent Processing
                          │
                          ▼
                  Determine Call Outcome
                          │
             ┌────────────┴────────────┐
             │                         │
        Successful                 Unsuccessful
             │                         │
             └────────────┬────────────┘
                          │
                          ▼
                    Call Statistics
                          │
                          ▼
                 Next.js Dashboard
                          │
                          ▼
             ┌─────────────────────────┐
             │      CALL ANALYTICS    │
             │                         │
             │ 📞 Total Calls          │
             │ ✅ Successful           │
             │ ❌ Unsuccessful         │
             │ 📈 Success Rate         │
             └─────────────────────────┘
```

---

# 🛠️ Tech Stack

| Component       | Technology         |
| --------------- | ------------------ |
| Voice Agent     | LiveKit Agents     |
| LLM             | Google Gemini      |
| Speech-to-Text  | Deepgram           |
| Text-to-Speech  | Murf Falcon        |
| Frontend        | Next.js            |
| UI              | React + TypeScript |
| Styling         | Tailwind CSS       |
| Voice Transport | LiveKit            |
| Analytics UI    | Next.js / React    |

---

# 📂 Project Structure

```text
Day-8-Call-Analytics-LearnMate/
│
├── backend/
│   ├── src/
│   │   ├── agent.py
│   │   ├── memory.py
│   │   ├── learning_tools.py
│   │   └── analytics.py
│   │
│   ├── data/
│   │   └── call_analytics.json
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

Day 8 continues the same frontend and backend architecture used in the previous days.

## 1️⃣ Start LiveKit

```bash
livekit-server.exe --dev
```

---

## 2️⃣ Start Backend

```bash
cd backend
uv sync
uv run python src/agent.py dev
```

---

## 3️⃣ Start Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Open:

```text
http://localhost:3000
```

---

# 🧪 Day 8 Testing Checklist

### Test 1 — Start a Voice Call

* ✅ Open LearnMate
* ✅ Start a voice conversation
* ✅ Complete a learning interaction
* ✅ End the call
* ✅ Check the dashboard

---

### Test 2 — Successful Call

* ✅ Start LearnMate
* ✅ Ask a Computer Science question
* ✅ Complete the intended learning objective
* ✅ End the conversation
* ✅ Open the Dashboard
* ✅ Total calls increases
* ✅ Successful calls increases
* ✅ Success rate updates

---

### Test 3 — Unsuccessful Call

* ✅ Start a learning conversation
* ✅ Do not complete the intended objective
* ✅ End the conversation
* ✅ Open the Dashboard
* ✅ Total calls increases
* ✅ Unsuccessful calls increases

---

### Test 4 — Dashboard

Verify that the dashboard displays:

```text
📞 Total Calls

✅ Successful Calls

❌ Unsuccessful Calls

📈 Success Rate
```

---

# 🎥 Day 8 Demo

The demonstration shows the complete analytics workflow:

1. 🎙️ Start a voice conversation with LearnMate
2. 🧠 Ask a Computer Science learning question
3. 💬 Complete the learning interaction
4. 🛑 End the call
5. 📊 Open the Dashboard
6. 📞 Total calls increase
7. ✅ Successful calls increase
8. 📈 Success rate updates

The dashboard provides a simple visual overview of LearnMate's call performance.

---

# 🚀 What I Built

For Day 8, I upgraded LearnMate with a **Call Analytics Dashboard**.

The dashboard gives me a simple way to understand how my voice agent is performing by tracking:

**Total Calls → Successful Calls → Unsuccessful Calls → Success Rate**

Instead of only building a voice agent that can have conversations, LearnMate can now also provide visibility into the outcomes of those conversations.

This makes it easier to evaluate the agent and understand whether learners are actually achieving the intended learning objectives.

---

# 🔮 Future Improvements

The current dashboard provides the core call metrics.

Future versions could include:

* 📊 Calls over time
* 📈 Daily / weekly / monthly analytics
* ⏱️ Average call duration
* 🧠 Most common learning topics
* 🎯 Objective completion rate by topic
* 📞 Call duration analytics
* 👨‍🏫 Human escalation analytics
* 🌐 Language-wise analytics
* 📱 Mobile dashboard
* 🔔 Real-time analytics
* 📋 Export analytics as CSV
* 📊 Interactive charts
* 🔐 Role-based dashboard access

---

# 👨‍💻 Author

**Vikas Yadav**

GitHub: [https://github.com/vikasyadav097](https://github.com/vikasyadav097)

---

# 📜 License

MIT License

---

# 🚀 10 Days of Voice Agents

Built as part of **10 Days of Voice Agents – Voice for Bharat Edition** 🇮🇳

Powered by:

**Murf Falcon • LiveKit • Deepgram • Gemini • Next.js • Python**

#10DaysofAIVoiceAgents #MurfFalcon #VoiceForBharat #MurfAI #VoiceAI #GenerativeAI #LearningAndLiteracy #ComputerScience #AI #LiveKit #Deepgram #Gemini

```

**Important:** Maine Day 7 ki escalation-specific cheezein (`create_escalation()`, human teacher flow, reference ID, etc.) hata kar Day 8 ka actual focus **call analytics + dashboard + success/failure tracking** rakha hai.
```
