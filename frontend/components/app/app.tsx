'use client';

import { useEffect, useMemo, useState } from 'react';
import { TokenSource } from 'livekit-client';
import { useSession } from '@livekit/components-react';
import {
  WarningIcon,
  BrainIcon,
  MicrophoneStageIcon,
} from '@phosphor-icons/react/dist/ssr';

import type { AppConfig } from '@/app-config';
import { AgentSessionProvider } from '@/components/agents-ui/agent-session-provider';
import { StartAudioButton } from '@/components/agents-ui/start-audio-button';
import { ViewController } from '@/components/app/view-controller';
import { Toaster } from '@/components/ui/sonner';
import { useAgentErrors } from '@/hooks/useAgentErrors';
import { useDebugMode } from '@/hooks/useDebug';
import { getSandboxTokenSource } from '@/lib/utils';

const IN_DEVELOPMENT = process.env.NODE_ENV !== 'production';

function AppSetup() {
  useDebugMode({ enabled: IN_DEVELOPMENT });
  useAgentErrors();
  return null;
}

interface AppProps {
  appConfig: AppConfig;
}

export function App({ appConfig }: AppProps) {
  const [activePage, setActivePage] = useState<
    'home' | 'dashboard' | 'about'
  >('home');

  const tokenSource = useMemo(() => {
    return typeof process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT === 'string'
      ? getSandboxTokenSource(appConfig)
      : TokenSource.endpoint('/api/token');
  }, [appConfig]);

  const session = useSession(
    tokenSource,
    appConfig.agentName ? { agentName: appConfig.agentName } : undefined
  );

  // ---- live-ish ticking stats -------------------------------------------
  const [totalCalls, setTotalCalls] = useState(16);
  const [successCalls, setSuccessCalls] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalCalls((t) => t + 1);
      setSuccessCalls((s) => (Math.random() < 0.75 ? s + 1 : s));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const failedCalls = totalCalls - successCalls;
  const successRate = Math.round((successCalls / totalCalls) * 100);

  const stats = [
    ['Total Calls', totalCalls, 'Voice sessions', 'text-white'],
    ['Successful', successCalls, 'Objective completed', 'text-emerald-400'],
    ['Unsuccessful', failedCalls, 'Objective not completed', 'text-red-400'],
    ['Success Rate', `${successRate}%`, 'Overall performance', 'text-violet-400'],
  ] as const;
  // -------------------------------------------------------------------------

  return (
    <AgentSessionProvider session={session}>
      <AppSetup />

      <main className="relative min-h-svh overflow-hidden bg-[#050816] text-white">

        {/* ================================================= */}
        {/* BACKGROUND */}
        {/* ================================================= */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[130px]" />

          <div className="absolute right-[-180px] top-[20%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />

          <div className="absolute bottom-[-250px] left-[30%] h-[500px] w-[700px] rounded-full bg-indigo-600/10 blur-[150px]" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <header className="fixed left-0 right-0 top-0 z-50 px-5 pt-5">

          <div className="mx-auto flex max-w-7xl items-center justify-between">

            {/* LOGO — plain, no panel behind it */}

            <button
              onClick={() => setActivePage('home')}
              className="group flex items-center gap-4"
            >
              <BrainIcon
                size={40}
                weight="regular"
                className="text-emerald-400 transition group-hover:scale-105"
              />

              <div className="text-left">
                <div className="text-2xl font-extrabold tracking-tight text-white sm:text-[28px]">
                  Learn<span className="text-emerald-400">Mate</span>
                </div>

                <div className="mt-0.5 text-xs font-semibold tracking-[0.15em] text-amber-400 sm:text-sm">
                  AI Learning Companion
                </div>
              </div>
            </button>

            {/* NAVIGATION — the only boxed element in the header */}

            <nav className="hidden items-center gap-2 rounded-xl border border-white/[0.08] bg-[#080d20]/80 p-1.5 shadow-2xl shadow-black/20 backdrop-blur-2xl md:flex">

              {[
                ['home', 'Home', '🏠'],
                ['dashboard', 'Dashboard', '📊'],
                ['about', 'About', 'ℹ️'],
              ].map(([page, label, icon]) => (
                <button
                  key={page}
                  onClick={() =>
                    setActivePage(page as 'home' | 'dashboard' | 'about')
                  }
                  className={`rounded-lg px-5 py-2 text-sm font-medium transition-all ${
                    activePage === page
                      ? 'bg-white/[0.1] text-white shadow-lg'
                      : 'text-slate-400 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span className="mr-2">{icon}</span>
                  {label}
                </button>
              ))}
            </nav>

            {/* STATUS — plain, no panel */}

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)]" />
              <span className="hidden text-[11px] font-semibold tracking-wide text-emerald-300 sm:block">
                ONLINE
              </span>
            </div>

          </div>
        </header>

        {/* ================================================= */}
        {/* HOME */}
        {/* ================================================= */}

        {activePage === 'home' && (
          <section className="relative z-10 min-h-svh px-5 pt-28">

            <div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-6xl flex-col items-center justify-center">

              {/* BADGE */}

              <div className="mb-7 flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.06] px-4 py-2 text-xs font-medium text-violet-300 shadow-lg shadow-violet-900/10">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                Your AI-powered learning companion
              </div>

              {/* HERO */}

              <div className="text-center">

                <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">
                  Learn smarter.
                  <br />

                  <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    Speak naturally.
                  </span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                  Practice Computer Science, ask questions, and improve your
                  skills through real-time voice conversations with LearnMate.
                </p>

              </div>

              {/* LIVEKIT AREA */}

              <div className="relative mt-10 w-full max-w-3xl">

                {/* rotating glow border */}
                <div
                  className="spin-slow pointer-events-none absolute -inset-[1.5px] rounded-[29px] opacity-70 blur-[3px]"
                  style={{
                    background:
                      'conic-gradient(from 0deg, transparent 0%, rgba(167,139,250,0.7) 15%, transparent 32%, transparent 68%, rgba(34,211,238,0.5) 82%, transparent 100%)',
                  }}
                />

                {/* soft ambient glow */}
                <div className="absolute inset-0 rounded-[32px] bg-violet-500/10 blur-3xl" />

                <div className="relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-white/[0.035] p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">

                  <div className="rounded-[22px] border border-white/[0.06] bg-[#080d1d]/80 px-5 py-8 sm:px-8">

                    {/* top mini status */}

                    <div className="mb-8 flex items-center justify-between">

                      <div className="flex items-center gap-3">
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                          <span className="ping-slow absolute inset-0 rounded-xl border border-violet-400/40" />
                          <MicrophoneStageIcon size={18} weight="duotone" className="text-violet-300" />
                        </div>

                        <div className="text-left">
                          <p className="text-sm font-semibold">
                            LearnMate Voice Session
                          </p>
                          <p className="text-xs text-slate-500">
                            Real-time AI conversation
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 rounded-full bg-emerald-400/[0.06] px-3 py-1.5">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        <span className="text-[10px] font-medium text-emerald-300">
                          READY
                        </span>
                      </div>

                    </div>

                    {/* Existing LiveKit UI */}

                    <div className="min-h-[250px]">
                      <ViewController appConfig={appConfig} />
                    </div>

                  </div>
                </div>

              </div>

              {/* FEATURE CARDS */}

              <div className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">

                {[
                  {
                    icon: '🧠',
                    title: 'AI Tutor',
                    text: 'Ask and learn',
                  },
                  {
                    icon: '🎙️',
                    title: 'Voice First',
                    text: 'Natural conversations',
                  },
                  {
                    icon: '📚',
                    title: 'CS Practice',
                    text: 'Learn by doing',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-left backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.045]"
                  >
                    <div className="mb-3 text-xl">{item.icon}</div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.text}</p>
                  </div>
                ))}

              </div>

            </div>

            <StartAudioButton label="Start Audio" />

            <div className="pb-6 pt-8 text-center text-[10px] uppercase tracking-[0.25em] text-slate-600">
              LiveKit • Gemini • Deepgram • Murf Falcon
            </div>

          </section>
        )}

        {/* ================================================= */}
        {/* DASHBOARD */}
        {/* ================================================= */}

        {activePage === 'dashboard' && (
          <section className="relative z-10 min-h-svh px-5 pb-16 pt-32">

            <div className="mx-auto max-w-6xl">

              <div className="mb-10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
                  Analytics
                </p>

                <h1 className="mt-3 text-4xl font-black sm:text-5xl">
                  Call Performance
                </h1>

                <p className="mt-3 max-w-xl text-slate-400">
                  A quick overview of LearnMate learning sessions and
                  conversation outcomes.
                </p>
              </div>

              {/* STATS */}

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {stats.map(([title, value, sub, color]) => (
                  <div
                    key={title}
                    className="group rounded-2xl border border-white/[0.07] bg-white/[0.035] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.05]"
                  >
                    <p className="text-sm text-slate-500">{title}</p>

                    <p key={value} className={`stat-pop mt-4 text-4xl font-black tabular-nums ${color}`}>
                      {value}
                    </p>

                    <p className="mt-2 text-xs text-slate-600">{sub}</p>
                  </div>
                ))}

              </div>

              {/* RECENT SESSIONS */}

              <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.035] p-6 backdrop-blur-xl">

                <div className="mb-6 flex items-center justify-between">

                  <div>
                    <h2 className="text-lg font-bold">
                      Recent Sessions
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Computer Science learning activity
                    </p>
                  </div>

                  <span className="rounded-full border border-violet-400/20 bg-violet-400/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-violet-300">
                    Analytics
                  </span>

                </div>

                <div className="space-y-3">

                  {[
                    ['Python Practice', 'Today', 'Successful', true],
                    ['Computer Networks', 'Today', 'Successful', true],
                    ['Data Structures', 'Yesterday', 'Unsuccessful', false],
                    ['Algorithms', 'Yesterday', 'Successful', true],
                  ].map(([title, date, status, success]) => (
                    <div
                      key={title as string}
                      className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-black/10 p-4"
                    >
                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04]">
                          🧠
                        </div>

                        <div>
                          <p className="text-sm font-medium">{title}</p>
                          <p className="mt-1 text-xs text-slate-600">
                            {date}
                          </p>
                        </div>

                      </div>

                      <span
                        className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${
                          success
                            ? 'bg-emerald-400/10 text-emerald-400'
                            : 'bg-red-400/10 text-red-400'
                        }`}
                      >
                        {status}
                      </span>

                    </div>
                  ))}

                </div>

              </div>

              {/* INFO */}

              <div className="mt-6 grid gap-4 md:grid-cols-3">

                {[
                  ['🎙️', 'Voice Learning', 'Real-time voice conversations with LearnMate.'],
                  ['📚', 'Computer Science', 'Practice Python, DBMS, Networks, Algorithms and more.'],
                  ['📈', 'Progress Tracking', 'Understand how learning sessions are performing.'],
                ].map(([icon, title, text]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
                  >
                    <div className="text-2xl">{icon}</div>
                    <h3 className="mt-4 font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {text}
                    </p>
                  </div>
                ))}

              </div>

            </div>
          </section>
        )}

        {/* ================================================= */}
        {/* ABOUT */}
        {/* ================================================= */}

        {activePage === 'about' && (
          <section className="relative z-10 min-h-svh px-5 pb-16 pt-32">

            <div className="mx-auto max-w-5xl">

              <div className="text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-violet-400/20 bg-violet-500/10 shadow-2xl shadow-violet-900/20">
                  <BrainIcon size={36} weight="duotone" className="text-violet-300" />
                </div>

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
                  About LearnMate
                </p>

                <h1 className="mt-3 text-4xl font-black sm:text-5xl">
                  Your AI Learning Companion
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400">
                  LearnMate is a voice-first AI learning assistant designed
                  to make Computer Science learning more interactive,
                  conversational and accessible.
                </p>

              </div>

              <div className="mt-12 grid gap-4 md:grid-cols-2">

                {[
                  [
                    '🎓',
                    'Interactive Learning',
                    'Practice Computer Science through natural voice conversations instead of relying only on traditional text interfaces.',
                  ],
                  [
                    '🧠',
                    'Personalised Memory',
                    'LearnMate can remember useful learning preferences and previous topics to create a more personalised experience.',
                  ],
                  [
                    '🎙️',
                    'Voice First',
                    'Speak naturally with your AI learning companion and receive real-time voice responses.',
                  ],
                  [
                    '⚡',
                    'Modern AI Stack',
                    'Built using LiveKit, Gemini, Deepgram and Murf Falcon for real-time voice AI.',
                  ],
                ].map(([icon, title, text]) => (
                  <div
                    key={title}
                    className="rounded-3xl border border-white/[0.07] bg-white/[0.035] p-7 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.05]"
                  >
                    <div className="text-3xl">{icon}</div>

                    <h2 className="mt-5 text-xl font-bold">{title}</h2>

                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {text}
                    </p>
                  </div>
                ))}

              </div>

              <div className="mt-5 rounded-3xl border border-violet-400/15 bg-gradient-to-r from-violet-500/[0.08] to-indigo-500/[0.04] p-8 text-center">

                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  Built for
                </p>

                <p className="mt-3 text-xl font-bold text-violet-300">
                  10 Days of Voice Agents
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Voice for Bharat Edition 🇮🇳
                </p>

              </div>

            </div>

          </section>
        )}

        {/* ================================================= */}
        {/* TOASTER */}
        {/* ================================================= */}

        <Toaster
          icons={{
            warning: <WarningIcon weight="bold" />,
          }}
          position="top-center"
          className="toaster group"
          style={
            {
              '--normal-bg': 'var(--popover)',
              '--normal-text': 'var(--popover-foreground)',
              '--normal-border': 'var(--border)',
            } as React.CSSProperties
          }
        />

      </main>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-slow { animation: spin-slow 6s linear infinite; }

        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(1.8); opacity: 0; }
        }
        .ping-slow { animation: ping-slow 2.4s cubic-bezier(0, 0, 0.2, 1) infinite; }

        @keyframes stat-pop {
          0% { opacity: 0; transform: scale(0.85) translateY(4px); }
          60% { opacity: 1; transform: scale(1.05) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .stat-pop { animation: stat-pop 0.4s ease-out; }

        @media (prefers-reduced-motion: reduce) {
          .spin-slow, .ping-slow, .stat-pop {
            animation: none !important;
          }
        }
      `}</style>
    </AgentSessionProvider>
  );
}

