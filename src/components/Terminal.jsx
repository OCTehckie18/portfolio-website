import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ASCII_NAME,
  PIXEL_ART,
  OWNER,
  PROJECTS,
  CLIENTS,
  SKILLS,
  TOOLS,
  TESTIMONIALS,
  ARTICLES,
} from "../data/portfolioData.js";
import { findSuggestion } from "../data/typo-suggestions.js";
import { initializeVoiceCommands } from "../data/voice-commands.js";
import pfp from "../assets/pfp.png";
import {
  COMMANDS,
  INFO_COMMANDS,
  PROJECT_COMMANDS,
  THEME_COMMANDS,
  ALIASES,
  buildHelp,
  buildAbout,
  buildWork,
  buildClients,
  buildSkills,
  buildPhilosophy,
  buildSocial,
  buildContact,
  buildTestimonials,
  buildArticles,
  buildShortcuts,
  buildSecrets,
  buildMatrix,
  buildCoffee,
  buildLs,
  buildReadme,
  buildWhoami,
  buildGitLog,
  buildPing,
  BOOT_LINES,
} from "../data/commands.js";
import { buildStats } from "../data/stats-builder.js";
import { checkAchievements, getAchievementDisplay } from "../data/achievements.js";

// ================================================================
// THEMES
// ================================================================
const THEMES = {
  dark: {},
  light: {
    "--bg": "#f0f0f5",
    "--bg-window": "#ffffff",
    "--bg-darker": "#e8e8f0",
    "--border": "#d0d0dd",
    "--border-dashed": "#b0b0cc",
    "--text": "#2a2a3e",
    "--text-dim": "#6a6a8a",
    "--text-muted": "#9a9ab0",
    "--accent": "#c47840",
    "--accent-bright": "#d89060",
    "--green": "#3a8a5a",
    "--red": "#c44040",
    "--blue": "#4070c4",
    "--yellow": "#b89a30",
    "--purple": "#8050b0",
    "--cyan": "#308a80",
  },
  retro: {
    "--bg": "#001400",
    "--bg-window": "#001800",
    "--bg-darker": "#000f00",
    "--border": "#00aa00",
    "--border-dashed": "#00cc00",
    "--text": "#00ff00",
    "--text-dim": "#009900",
    "--text-muted": "#006600",
    "--accent": "#00ff00",
    "--accent-bright": "#33ff33",
    "--green": "#00ff00",
    "--red": "#ff0000",
    "--blue": "#00ffff",
    "--yellow": "#ffff00",
    "--purple": "#ff00ff",
    "--cyan": "#00ffff",
  },
  glass: {
    "--bg": "#0f0f1a",
    "--bg-window": "rgba(255,255,255,0.06)",
    "--bg-darker": "rgba(255,255,255,0.03)",
    "--border": "rgba(255,255,255,0.12)",
    "--border-dashed": "rgba(255,255,255,0.18)",
    "--text": "#f0f0ff",
    "--text-dim": "#9a9abc",
    "--text-muted": "#6a6a8e",
    "--accent": "#a78bfa",
    "--accent-bright": "#c4b5fd",
    "--green": "#86efac",
    "--red": "#fca5a5",
    "--blue": "#93c5fd",
    "--yellow": "#fde68a",
    "--purple": "#c4b5fd",
    "--cyan": "#67e8f9",
  },
};

function applyTheme(name) {
  const root = document.documentElement;
  // Reset to dark base first
  const baseVars = {
    "--bg": "#1a1a2e",
    "--bg-window": "#252540",
    "--bg-darker": "#1e1e35",
    "--border": "#3a3a5c",
    "--border-dashed": "#5a5a8a",
    "--text": "#e2e2f0",
    "--text-dim": "#8888aa",
    "--text-muted": "#6a6a8a",
    "--accent": "#e8a87c",
    "--accent-bright": "#f0c4a0",
    "--green": "#7ec89b",
    "--red": "#e87c7c",
    "--blue": "#7caae8",
    "--yellow": "#e8d87c",
    "--purple": "#b88ce8",
    "--cyan": "#7ce8d8",
    "--dot-red": "#ff5f57",
    "--dot-yellow": "#febc2e",
    "--dot-green": "#28c840",
  };
  const vars = { ...baseVars, ...(THEMES[name] || {}) };
  for (const [k, v] of Object.entries(vars)) {
    root.style.setProperty(k, v);
  }
}

// ================================================================
// UTILITIES
// ================================================================
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ================================================================
// CONFETTI
// ================================================================
function startConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particles = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    size: Math.random() * 8 + 4,
    color: `hsl(${Math.random() * 360}, 80%, 60%)`,
    speed: Math.random() * 3 + 2,
    angle: Math.random() * 360,
  }));
  let frame;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
      p.y += p.speed;
      p.angle += 2;
      if (p.y > canvas.height) {
        p.y = -p.size;
        p.x = Math.random() * canvas.width;
      }
    });
    frame = requestAnimationFrame(draw);
  }
  draw();
  setTimeout(() => {
    cancelAnimationFrame(frame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 3000);
}

// ================================================================
// MATRIX RAIN
// ================================================================
function startMatrix() {
  const canvas = document.getElementById("matrixCanvas");
  if (!canvas) return;
  canvas.classList.add("active");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const cols = Math.floor(canvas.width / 20);
  const drops = Array(cols).fill(1);
  let frame;
  function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff41";
    ctx.font = "15px monospace";
    drops.forEach((y, i) => {
      const char = String.fromCharCode(33 + Math.random() * 93);
      ctx.fillText(char, i * 20, y * 20);
      if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
    frame = requestAnimationFrame(draw);
  }
  draw();
  setTimeout(() => {
    cancelAnimationFrame(frame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.classList.remove("active");
  }, 5000);
}

// ================================================================
// MAIN TERMINAL COMPONENT
// ================================================================
export default function Terminal() {
  const [phase, setPhase] = useState("boot"); // boot | terminal
  const [bootText, setBootText] = useState([]);
  const [waitingForEnter, setWaitingForEnter] = useState(false);
  const bootStartedRef = useRef(false);
  const [terminalState, setTerminalState] = useState("maximized"); // normal | minimized | maximized
  const [inputValue, setInputValue] = useState("");
  const [outputBlocks, setOutputBlocks] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [historySearchMode, setHistorySearchMode] = useState(false);
  const [historySearchTerm, setHistorySearchTerm] = useState("");
  const [historySearchResults, setHistorySearchResults] = useState([]);
  const [autocompleteItems, setAutocompleteItems] = useState([]);
  const [acIdx, setAcIdx] = useState(-1);
  const [showClose, setShowClose] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [cmdCount, setCmdCount] = useState(0);
  const [helpCount, setHelpCount] = useState(0);
  const [konamiIdx, setKonamiIdx] = useState(0);
  const [forceScroll, setForceScroll] = useState(false);
  const [commandCounts, setCommandCounts] = useState({}); // Track command usage
  const [achievements, setAchievements] = useState([]); // Track earned achievements

  // AI chat mode state (terminal-only, no extra input field)
  const [aiMode, setAiMode] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [aiConversation, setAiConversation] = useState([]); // Track conversation context

  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const idleTimerRef = useRef(null);
  const idleCountRef = useRef(0);
  const voiceRecognitionRef = useRef(null);
  const [voiceActive, setVoiceActive] = useState(false);
  const sessionStartRef = useRef(new Date());

  const KONAMI = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  // Apply theme on change
  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  // Boot sequence
  useEffect(() => {
    if (bootStartedRef.current) return;
    bootStartedRef.current = true;

    async function runBoot() {
      for (const step of BOOT_LINES) {
        await sleep(step.delay || 100);
        setBootText((prev) => {
          if (step.append) {
            const copy = [...prev];
            const last = copy[copy.length - 1];
            copy[copy.length - 1] = {
              ...last,
              text: last.text + step.text,
              cls: step.cls || last.cls,
            };
            return copy;
          }
          return [...prev, { text: step.text, cls: step.cls || "" }];
        });
      }
      setWaitingForEnter(true);
    }
    runBoot();
  }, []);

  // Listen for Enter in boot phase
  useEffect(() => {
    if (!waitingForEnter) return;
    const handler = (e) => {
      if (e.key === "Enter" || e.type === "click") {
        setPhase("terminal");
        setTimeout(() => {
          inputRef.current?.focus();
          resetIdleTimer();
        }, 100);
      }
    };
    document.addEventListener("keydown", handler);
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      document.removeEventListener("click", handler);
    };
  }, [waitingForEnter]);

  // Scroll handling (either forced on command or near-bottom auto-scroll)
  useEffect(() => {
    const node = bodyRef.current;
    if (!node) return;

    if (forceScroll) {
      window.requestAnimationFrame(() => {
        node.scrollTop = node.scrollHeight;
        setForceScroll(false);
      });
      return;
    }

    const isNearBottom =
      node.scrollHeight - node.scrollTop - node.clientHeight < 120;
    if (isNearBottom) {
      window.requestAnimationFrame(() => {
        node.scrollTop = node.scrollHeight;
      });
    }
  }, [outputBlocks, forceScroll]);

  // Add class to <body> when maximized; avoid CSS :has() for compatibility
  useEffect(() => {
    const usingMaximized = terminalState === "maximized";
    document.body.classList.toggle("terminal-maximized", usingMaximized);
    return () => {
      document.body.classList.remove("terminal-maximized");
    };
  }, [terminalState]);

  // Check for achievement unlocks
  useEffect(() => {
    const newAchievements = checkAchievements(cmdCount, commandCounts, aiConversation, achievements);
    newAchievements.forEach(achievement => {
      if (!achievements.includes(achievement)) {
        const display = getAchievementDisplay(achievement);
        if (display) {
          addSystemMessage(`  ✨ ${display.icon} ${display.name}`);
        }
      }
    });
    if (newAchievements.length > achievements.length) {
      setAchievements(newAchievements);
    }
  }, [cmdCount, commandCounts, aiConversation]);

  // Cmd/Ctrl+K toggles AI chat mode and focuses the command input
  useEffect(() => {
    const handler = (e) => {
      const key = e.key.toLowerCase();
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const check = isMac ? e.metaKey : e.ctrlKey;
      if (check && key === "k") {
        e.preventDefault();
        setAiMode(true);
        clearTimeout(idleTimerRef.current);
        addOutput("/aichat", [
          {
            text: "  AI chat mode enabled via shortcut. Enter any query in the terminal.",
            cls: "accent",
          },
        ]);
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  function resetIdleTimer() {
    clearTimeout(idleTimerRef.current);
    if (aiMode) {
      // Do not show idle messages in AI chat mode
      return;
    }
    idleTimerRef.current = setTimeout(() => {
      const idleMessages = [
        "  Still there? Try /work to see what I've built...",
        "  This terminal has more commands than you think...",
        "  Psst — ever tried typing ls in a portfolio?",
        "  The Konami code works here. Just saying.",
        "  Some commands don't need a slash. Try: whoami",
        "  Type /secrets if you like finding hidden things.",
      ];
      // Only show each message once — stop after exhausting the list
      if (idleCountRef.current < idleMessages.length) {
        addSystemMessage(idleMessages[idleCountRef.current]);
        idleCountRef.current++;
        resetIdleTimer();
      }
    }, 15000);
  }

  function addSystemMessage(text) {
    const block = {
      id: Date.now() + Math.random(),
      echo: null,
      nodes: null,
      lines: [{ text, cls: "dim", style: "font-style:italic" }],
    };
    setOutputBlocks((prev) => [...prev, block]);
  }

  const getAllCmds = useCallback(() => {
    return [
      ...Object.keys(COMMANDS),
      ...Object.keys(INFO_COMMANDS),
      ...Object.keys(PROJECT_COMMANDS),
      ...Object.keys(THEME_COMMANDS),
    ].sort();
  }, []);

  function updateAutocomplete(val) {
    if (!val.startsWith("/") || val.length < 2) {
      setAutocompleteItems([]);
      return;
    }
    const matches = getAllCmds().filter((c) => c.startsWith(val));
    setAutocompleteItems(matches);
    setAcIdx(-1);
  }

  function addOutput(echo, content) {
    const block = { id: Date.now() + Math.random(), echo };
    if (content instanceof HTMLElement) {
      block.node = content;
      block.lines = null;
    } else {
      block.node = null;
      block.lines = Array.isArray(content) ? content : [{ text: content }];
    }
    setOutputBlocks((prev) => [...prev, block]);
  }

  function buildPortfolioContext() {
    const projectSummary = PROJECTS.map(
      (p) =>
        `- ${p.name} (${p.year}): ${p.type}. ${p.desc} Tags: ${p.tags.join(", ")}. Stats: ${p.stats?.join(", ") || "N/A"}`,
    ).join("\n");

    return `Portfolio Reference Data:\n- Name: ${OWNER.name}\n- Title: ${OWNER.title}\n- Location: ${OWNER.location}\n- Email: ${OWNER.email}\n- Phone: ${OWNER.phone}\n- Agency: ${OWNER.agencyName} (${OWNER.agencyUrl})\n\nProjects:\n${projectSummary}\n\nSkills:\n${SKILLS.map((s) => `${s.name} (${s.pct}%)`).join(", ")}\n\nTools:\n${TOOLS.join(", ")}\n\nClients:\n${CLIENTS.join(", ")}\n\nTestimonials:\n${TESTIMONIALS.slice(
      0,
      3,
    )
      .map((t) => `- ${t.name} (${t.title}): ${t.quote}`)
      .join(
        "\n",
      )}\n\nArticles:\n${ARTICLES.map((a) => `${a.cat}: ${a.items.map((i) => i.title).join("; ")}`).join("\n")}`;
  }

  async function callOpenAI(prompt) {
    setAiError(null);
    setAiLoading(true);

    const portfolioContext = buildPortfolioContext();
    
    // Build conversation history for context
    const conversationHistory = aiConversation.slice(-4); // Last 4 messages for context
    const systemMessage = `You are Omkaar, the portfolio owner and developer. Answer as Omkaar would, in first-person, with his tone and perspective. Use the portfolio data to provide accurate, concise responses and avoid generic AI disclaimers.\n\n${portfolioContext}`;
    
    const messages = [
      { role: "system", content: systemMessage },
      ...conversationHistory,
      { role: "user", content: prompt }
    ];
    
    const contextualPrompt = conversationHistory.length > 0 
      ? messages.map(m => `${m.role}: ${m.content}`).join('\n\n')
      : `You are Omkaar, the portfolio owner and developer. Answer as Omkaar would, in first-person, with his tone and perspective. Use the portfolio data to provide accurate, concise responses and avoid generic AI disclaimers.\n\n${portfolioContext}\n\nUser question: ${prompt}`;

    const ollamaUrl =
      import.meta.env.VITE_OLLAMA_URL || "http://localhost:11434";
    const ollamaModel = import.meta.env.VITE_OLLAMA_MODEL || "qwen2.5-coder:7b";
    const openaiKey = import.meta.env.VITE_OPENAI_KEY;

    try {
      if (!ollamaUrl && !openaiKey) {
        throw new Error(
          "No AI provider configured. Set VITE_OLLAMA_URL or VITE_OPENAI_KEY.",
        );
      }

      let reply = "";

      if (ollamaUrl) {
        const normalizedUrl = ollamaUrl.replace(/\/+$|\s+/g, "");
        const endpoints = [
          `${normalizedUrl}/api/models/${ollamaModel}/generate`,
          `${normalizedUrl}/v1/models/${ollamaModel}/generate`,
          `${normalizedUrl}/v1/chat/completions`,
        ];

        let lastError = null;
        for (const url of endpoints) {
          try {
            const body = url.endsWith("/chat/completions")
              ? {
                  model: ollamaModel,
                  messages: messages,
                  max_tokens: 350,
                  temperature: 0.7,
                }
              : {
                  prompt: contextualPrompt,
                  max_tokens: 350,
                  temperature: 0.7,
                  stream: false,
                };

            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            });

            if (!response.ok) {
              const errText = await response.text();
              throw new Error(`Ollama error ${response.status}: ${errText}`);
            }

            const data = await response.json();
            reply =
              data?.results?.[0]?.output?.trim() ||
              data?.results?.[0]?.output?.[0]?.content?.trim() ||
              data?.text?.trim() ||
              data?.choices?.[0]?.message?.content?.trim() ||
              (data?.output && Array.isArray(data.output)
                ? data.output.join("\n")
                : "") ||
              "";

            if (reply) {
              break;
            }
          } catch (err) {
            lastError = err;
          }
        }

        if (!reply) {
          throw (
            lastError ||
            new Error("Ollama returned no response from any endpoint.")
          );
        }
      } else if (openaiKey) {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${openaiKey}`,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: messages,
              max_tokens: 350,
              temperature: 0.7,
            }),
          },
        );

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`OpenAI error ${response.status}: ${errText}`);
        }

        const data = await response.json();
        reply = data.choices?.[0]?.message?.content?.trim() || "";
      }

      // Update conversation history with the exchange
      const updatedConversation = [...aiConversation, { role: "user", content: prompt }, { role: "assistant", content: reply }];
      setAiConversation(updatedConversation);
      
      return reply || "No response received.";
    } catch (err) {
      const errMsg = err?.message || "Failed to contact AI provider.";
      setAiError(errMsg);
      return `Error: ${errMsg}`;
    } finally {
      setAiLoading(false);
    }
  }

  async function executeCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    // Resolve alias
    const resolved = ALIASES[cmd] || cmd;
    const newCount = cmdCount + 1;
    setCmdCount(newCount);
    
    // Track command usage for /stats
    setCommandCounts(prev => ({
      ...prev,
      [resolved]: (prev[resolved] || 0) + 1
    }));
    
    if (newCount === 3)
      addSystemMessage(
        "  You've run 3 commands. There are more hiding beneath the surface.",
      );

    resetIdleTimer();

    // AI chat mode toggles
    if (resolved.startsWith("/aichat") || resolved === "/aichat_off") {
      const after = raw.trim().slice(8).trim();
      if (
        after === "off" ||
        after === "disable" ||
        resolved === "/aichat_off"
      ) {
        setAiMode(false);
        addOutput(raw, [{ text: "  AI chat mode disabled.", cls: "accent" }]);
        resetIdleTimer();
        return;
      }

      if (after.length > 0) {
        setAiMode(true);
        addOutput(raw, [
          { text: "  AI chat mode enabled and question sent.", cls: "accent" },
        ]);
        // Show animated loading
        const dots = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
        let dotIdx = 0;
        const loadingId = Date.now();
        addOutput(null, [{ text: `  Thinking ${dots[0]}`, cls: "dim" }]);
        const interval = setInterval(() => {
          dotIdx = (dotIdx + 1) % dots.length;
          addOutput(null, [{ text: `  Thinking ${dots[dotIdx]}`, cls: "dim" }]);
        }, 100);
        
        const aiResponse = await callOpenAI(after);
        clearInterval(interval);
        addOutput(null, [{ text: aiResponse, cls: "green" }]);
        setForceScroll(true);
        return;
      }

      setAiMode(true);
      clearTimeout(idleTimerRef.current);
      addOutput(raw, [
        {
          text: "  AI chat mode enabled. Enter any query in the terminal.",
          cls: "accent",
        },
        { text: "  Type /aichat_off to disable AI mode.", cls: "dim" },
      ]);
      return;
    }

    if (aiMode) {
      if (
        resolved === "/aichat off" ||
        resolved === "/aichat disable" ||
        resolved === "/aichat_off"
      ) {
        setAiMode(false);
        addOutput(raw, [{ text: "  AI chat mode disabled.", cls: "accent" }]);
        resetIdleTimer();
        return;
      }

      addOutput(raw, [{ cls: "dim" }]);

      // Show animated loading
      const dots = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
      let dotIdx = 0;
      addOutput(null, [{ text: `  Thinking ${dots[0]}`, cls: "dim" }]);
      const interval = setInterval(() => {
        dotIdx = (dotIdx + 1) % dots.length;
        addOutput(null, [{ text: `  Thinking ${dots[dotIdx]}`, cls: "dim" }]);
      }, 100);

      const aiResponse = await callOpenAI(raw);
      clearInterval(interval);
      addOutput(null, [{ text: aiResponse, cls: "green" }]);
      setForceScroll(true);
      return;
    }

    // Help counter easter egg
    if (resolved === "/help") {
      const hc = helpCount + 1;
      setHelpCount(hc);
      if (hc >= 3) {
        addOutput(raw, [
          { text: "  You've typed /help 3 times.", cls: "accent" },
          {
            text: "  I respect the thoroughness. But also... /secrets exists.",
            cls: "dim",
          },
        ]);
        setHelpCount(0);
        return;
      }
      addOutput(raw, buildHelp());
      return;
    }
    setHelpCount(0);

    // Core navigation commands
    if (resolved === "/about") {
      addOutput(raw, buildAbout());
      return;
    }
    if (resolved === "/work") {
      addOutput(raw, buildWork());
      return;
    }
    // Handle individual project commands
    if (PROJECT_COMMANDS[resolved]) {
      const projectName = resolved.slice(1).replace(/-/g, " ").toLowerCase();
      const project = PROJECTS.find(
        (p) =>
          p.name
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "") === resolved.slice(1),
      );
      if (project) {
        const container = document.createElement("div");
        container.innerHTML = `
          <div class="output-line heading">${project.name}</div>
          <div class="output-line dim">${project.type} • ${project.year}</div>
          <div style="height:8px"></div>
          <div class="output-line">${project.desc}</div>
          <div style="height:12px"></div>
          <div class="output-line dim">Tags:</div>
          <div class="output-line">${project.tags.map((t) => `<span class="project-tag" style="display:inline-block;margin:2px 4px 2px 0;padding:4px 8px;background:rgba(255,255,255,0.1);border-radius:3px;font-size:0.8em">${t}</span>`).join("")}</div>
          ${project.stats ? `<div style="height:12px"></div><div class="output-line dim">Stats:</div><div class="output-line">${project.stats.map((s) => `<span style="display:inline-block;margin:2px 4px 2px 0">✦ ${s}</span>`).join("")}</div>` : ""}
          ${project.url ? `<div style="height:12px"></div><div class="output-line"><a href="${project.url}" target="_blank" rel="noopener noreferrer" style="color:var(--accent);text-decoration:underline">→ View Project →</a></div>` : ""}
        `;
        addOutput(raw, container);
      } else {
        addOutput(raw, [
          { text: `  command not found: ${cmd}`, cls: "red" },
          { text: "  Type /help for available commands.", cls: "dim" },
        ]);
      }
      return;
    }
    if (resolved === "/clients") {
      addOutput(raw, buildClients());
      return;
    }
    // /aichat is handled earlier in ai mode logic.
    if (resolved === "/skills") {
      addOutput(raw, buildSkills());
      return;
    }
    if (resolved === "/shortcuts") {
      addOutput(raw, buildShortcuts());
      return;
    }
    if (resolved === "/voice") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        addOutput(raw, [
          { text: "  ❌ Voice commands not supported in your browser.", cls: "red" },
          { text: "  Try Chrome, Edge, or Safari.", cls: "dim" },
        ]);
        return;
      }
      if (!voiceRecognitionRef.current) {
        voiceRecognitionRef.current = initializeVoiceCommands((command) => {
          executeCommand(command);
          setVoiceActive(false);
        });
      }
      setVoiceActive(true);
      voiceRecognitionRef.current.start();
      addOutput(raw, [
        { text: "  🎤 Listening... Say a command like 'help', 'about', 'contact', etc.", cls: "accent" },
        { text: "  (Stop talking to execute the command)", cls: "dim" },
      ]);
      return;
    }
    if (resolved === "/philosophy") {
      addOutput(raw, buildPhilosophy());
      return;
    }
    if (resolved === "/social") {
      addOutput(raw, buildSocial());
      return;
    }
    if (resolved === "/contact") {
      addOutput(raw, buildContact());
      return;
    }
    if (resolved === "/testimonials") {
      addOutput(raw, buildTestimonials());
      return;
    }
    if (resolved === "/articles") {
      addOutput(raw, buildArticles());
      return;
    }

    // Info commands
    if (resolved === "/linkedin") {
      addOutput(raw, [
        {
          html: `  <a href="${OWNER.linkedin}" target="_blank" rel="noopener noreferrer" style="color:var(--accent)">${OWNER.linkedin}</a>`,
        },
      ]);
      return;
    }
    if (resolved === "/github") {
      addOutput(raw, [
        {
          html: `  <a href="${OWNER.github}" target="_blank" rel="noopener noreferrer" style="color:var(--accent)">${OWNER.github}</a>`,
        },
      ]);
      return;
    }
    if (resolved === "/instagram") {
      addOutput(raw, [
        {
          html: `  <a href="${OWNER.instagram}" target="_blank" rel="noopener noreferrer" style="color:var(--accent)">${OWNER.instagram}</a>`,
        },
      ]);
      return;
    }
    if (resolved === "/email") {
      addOutput(raw, [
        {
          html: `  <a href="mailto:${OWNER.email}" style="color:var(--accent)">${OWNER.email}</a>`,
        },
      ]);
      return;
    }
    if (resolved === "/phone") {
      addOutput(raw, [
        {
          html: `  <a href="tel:${OWNER.phone.replace(/\s/g, "")}" style="color:var(--accent)">${OWNER.phone}</a>`,
        },
      ]);
      return;
    }
    if (resolved === "/location") {
      addOutput(raw, [{ text: `  📍 ${OWNER.location}`, cls: "purple" }]);
      return;
    }

    // Theme commands
    if (["/dark", "/light", "/retro", "/glass"].includes(resolved)) {
      const name = resolved.slice(1);
      setCurrentTheme(name);
      const msgs = {
        dark: "  ✦ Dark mode activated. The way it should be.",
        light: "  ☀ Light mode. Controversial choice.",
        retro: "  ▓ CRT mode engaged. Welcome to 1983.",
        glass: "  ◈ Glass mode. Very sleek.",
      };
      addOutput(raw, [
        { text: msgs[name] || "  Theme applied.", cls: "accent" },
      ]);
      return;
    }
    if (resolved === "/themes") {
      addOutput(raw, [
        { text: "Available Themes", cls: "heading" },
        { text: "" },
        {
          html: '  <span class="cmd-name">/dark</span>  <span class="cmd-desc">Default dark (navy)</span>',
        },
        {
          html: '  <span class="cmd-name">/light</span> <span class="cmd-desc">Light mode</span>',
        },
        {
          html: '  <span class="cmd-name">/retro</span> <span class="cmd-desc">CRT green phosphor</span>',
        },
        {
          html: '  <span class="cmd-name">/glass</span> <span class="cmd-desc">Glassmorphism (purple)</span>',
        },
      ]);
      return;
    }

    // Clear
    if (resolved === "/clear") {
      setOutputBlocks([]);
      return;
    }

    // Easter eggs
    if (resolved === "/secrets") {
      addOutput(raw, buildSecrets());
      return;
    }
    if (resolved === "/matrix") {
      addOutput(raw, buildMatrix());
      startMatrix();
      return;
    }
    if (resolved === "/coffee") {
      addOutput(raw, buildCoffee());
      return;
    }
    if (resolved === "/konami") {
      addOutput(raw, [{ text: "  🎉 Party mode!", cls: "accent" }]);
      startConfetti();
      return;
    }
    if (resolved === "/stats") {
      const now = new Date();
      const duration = Math.floor((now - sessionStartRef.current) / 1000);
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      
      const stats = {
        totalCommands: cmdCount,
        historyCount: history.length,
        commandCounts: commandCounts,
        sessionStart: sessionStartRef.current.toLocaleTimeString(),
        sessionDuration: `${minutes}m ${seconds}s`,
        aiMessages: aiConversation.length,
        storedCommands: Object.keys(COMMANDS).length + Object.keys(INFO_COMMANDS).length + Object.keys(PROJECT_COMMANDS).length,
        portfolioSize: PROJECTS.length + CLIENTS.length + SKILLS.length + TOOLS.length,
      };
      
      addOutput(raw, buildStats(stats));
      return;
    }

    if (cmd === "ls") {
      addOutput(raw, buildLs());
      return;
    }
    if (cmd === "cat readme.md") {
      addOutput(raw, buildReadme());
      return;
    }
    if (cmd === "whoami") {
      addOutput(raw, buildWhoami());
      return;
    }
    if (cmd === "git log") {
      addOutput(raw, buildGitLog());
      return;
    }
    if (cmd === "ping me" || cmd === `ping ${OWNER.email}`) {
      addOutput(raw, buildPing());
      return;
    }
    if (cmd === "exit") {
      addOutput(raw, [
        { text: "  Nice try. You can't escape.", cls: "red" },
        { text: "  Type /contact to reach me instead.", cls: "accent" },
      ]);
      return;
    }
    if (cmd === "sudo hire me" || cmd === "sudo hire vlad") {
      addOutput(raw, [
        { text: "[sudo] password for recruiter:", cls: "dim" },
        { text: "" },
        {
          text: "  Generating offer letter... [████████████████████████] done",
          cls: "green",
        },
        { text: "  Attaching benefits package... ok", cls: "green" },
        { text: "" },
        {
          text: "  ✦ Contract generated. Check /contact to send it.",
          cls: "accent",
        },
      ]);
      return;
    }
    if (cmd === "rm -rf doubts") {
      addOutput(raw, [
        { text: "  Removing: self-doubt/", cls: "red" },
        { text: "  Removing: imposter-syndrome/", cls: "red" },
        { text: "  Removing: fear-of-shipping/", cls: "red" },
        { text: "" },
        { text: "  All doubts removed. Ship it.", cls: "green" },
      ]);
      return;
    }

    // Unknown command
    const allCmds = getAllCmds();
    const suggestion = findSuggestion(cmd, allCmds);
    const output = [
      { text: `  command not found: ${cmd}`, cls: "red" },
    ];
    if (suggestion) {
      output.push({ text: `  Did you mean: ${suggestion}?`, cls: "yellow" });
    }
    output.push({ text: "  Type /help for available commands.", cls: "dim" });
    addOutput(raw, output);
  }

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    const val = inputValue.trim();
    if (!val) return;
    setHistory((prev) => [val, ...prev.filter((h) => h !== val)]);
    setHistoryIdx(-1);
    setInputValue("");
    setAutocompleteItems([]);
    setForceScroll(true);
    await executeCommand(val);
  }

  function handleKeyDown(e) {
    // Konami code
    if (e.key === KONAMI[konamiIdx]) {
      const next = konamiIdx + 1;
      if (next === KONAMI.length) {
        setKonamiIdx(0);
        startConfetti();
        addOutput("/konami", [
          { text: "  🎉 KONAMI CODE! Party mode activated!", cls: "accent" },
        ]);
      } else {
        setKonamiIdx(next);
      }
    } else {
      setKonamiIdx(0);
    }

    if (e.key === "Enter") {
      if (autocompleteItems.length > 0 && acIdx >= 0) {
        setInputValue(autocompleteItems[acIdx]);
        setAutocompleteItems([]);
        setAcIdx(-1);
      } else {
        handleSubmit();
      }
      return;
    }
    if (e.key === "Escape") {
      setAutocompleteItems([]);
      setHistorySearchMode(false);
      setHistorySearchTerm("");
      return;
    }
    if (e.ctrlKey && e.key === "r") {
      e.preventDefault();
      setHistorySearchMode(true);
      setHistorySearchTerm("");
      setHistorySearchResults(history);
      return;
    }
    if (historySearchMode) {
      if (e.key === "Escape") {
        setHistorySearchMode(false);
        setHistorySearchTerm("");
        setInputValue("");
        return;
      }
      if (e.key === "Enter" && historySearchResults.length > 0) {
        setInputValue(historySearchResults[0]);
        setHistorySearchMode(false);
        setHistorySearchTerm("");
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (historySearchResults.length > 0) {
          setInputValue(historySearchResults[0]);
        }
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historySearchResults.length > 1) {
          setInputValue(historySearchResults[1]);
        }
        return;
      }
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      if (autocompleteItems.length === 1) {
        setInputValue(autocompleteItems[0]);
        setAutocompleteItems([]);
      } else if (autocompleteItems.length > 1) {
        setAcIdx((i) => (i + 1) % autocompleteItems.length);
      }
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (autocompleteItems.length > 0) {
        setAcIdx(
          (i) => (i - 1 + autocompleteItems.length) % autocompleteItems.length,
        );
        return;
      }
      if (historyIdx < history.length - 1) {
        const next = historyIdx + 1;
        setHistoryIdx(next);
        setInputValue(history[next] || "");
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (autocompleteItems.length > 0) {
        setAcIdx((i) => (i + 1) % autocompleteItems.length);
        return;
      }
      if (historyIdx > 0) {
        const next = historyIdx - 1;
        setHistoryIdx(next);
        setInputValue(history[next] || "");
      } else {
        setHistoryIdx(-1);
        setInputValue("");
      }
      return;
    }
  }

  function handleInputChange(e) {
    const val = e.target.value;
    setInputValue(val);
    
    if (historySearchMode) {
      // Filter history search results
      const results = history.filter(h => h.toLowerCase().includes(val.toLowerCase()));
      setHistorySearchResults(results);
      setHistorySearchTerm(val);
    } else {
      updateAutocomplete(val);
      setHistoryIdx(-1);
    }
  }

  // ================================================================
  // RENDER HELPERS
  // ================================================================

  function renderLine(line, idx) {
    const style = {};
    if (line.style) {
      // Parse style string like "opacity:0.4;font-style:italic"
      line.style.split(";").forEach((s) => {
        const [k, v] = s.split(":");
        if (k && v) {
          const camel = k
            .trim()
            .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
          style[camel] = v.trim();
        }
      });
    }
    const cls = `output-line${line.cls ? " " + line.cls : ""}`;
    if (line.html) {
      return (
        <div
          key={idx}
          className={cls}
          style={style}
          dangerouslySetInnerHTML={{ __html: line.html }}
        />
      );
    }
    return (
      <div key={idx} className={cls} style={style}>
        {line.text}
      </div>
    );
  }

  function renderBlock(block) {
    return (
      <div key={block.id} className="output-block">
        {block.echo && (
          <div className="cmd-echo">
            <span className="prompt-symbol">&gt;</span> {block.echo}
          </div>
        )}
        {block.node ? (
          <DomNode node={block.node} />
        ) : (
          block.lines?.map((line, idx) => renderLine(line, idx))
        )}
      </div>
    );
  }

  // Render a DOM node from the builder functions
  const DomNode = React.memo(({ node }) => {
    const ref = useRef(null);
    useEffect(() => {
      if (ref.current && node) {
        // Clear and re-append
        ref.current.innerHTML = "";
        ref.current.appendChild(node.cloneNode(true));
        // Animate skill bars if present
        setTimeout(() => {
          ref.current?.querySelectorAll(".bar-fill").forEach((el) => {
            el.style.width = el.dataset.width;
          });
        }, 100);
      }
    }, [node]);
    return <div ref={ref} />;
  });

  // ================================================================
  // CLOSE DIALOG
  // ================================================================
  if (showClose) {
    return (
      <>
        <canvas
          id="confettiCanvas"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            pointerEvents: "none",
          }}
        />
        <canvas
          id="matrixCanvas"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            pointerEvents: "none",
            opacity: 0,
            transition: "opacity 0.3s",
          }}
        />
        <div className="wallpaper">
          <div
            style={{ width: "100%", height: "100%", background: "var(--bg)" }}
          />
        </div>
        <div className="close-overlay visible">
          <div className="close-window">
            <div className="titlebar">
              <div className="titlebar-dot red" />
              <div className="titlebar-dot yellow" />
              <div className="titlebar-dot green" />
              <div className="titlebar-title">you@visitor ~ /exit</div>
            </div>
            <div className="close-body">
              <div className="output-line red">$ kill -9 portfolio</div>
              <div className="output-line red">✗ Process terminated.</div>
              <div className="output-line" />
              <div className="output-line dim">
                {" "}
                But great code never really stops.
              </div>
              <div className="output-line accent">
                {" "}
                Let's keep the conversation going.
              </div>
              <div className="close-actions">
                <span className="output-line accent" style={{ marginRight: 4 }}>
                  &gt;
                </span>
                <a
                  href={OWNER.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="close-btn primary"
                >
                  LinkedIn
                </a>
                <a href={`mailto:${OWNER.email}`} className="close-btn primary">
                  Email
                </a>
                <button
                  className="close-btn"
                  onClick={() => setShowClose(false)}
                >
                  Reopen terminal
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ================================================================
  // BOOT SCREEN
  // ================================================================
  if (phase === "boot") {
    return (
      <>
        <canvas
          id="confettiCanvas"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            pointerEvents: "none",
          }}
        />
        <canvas
          id="matrixCanvas"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            pointerEvents: "none",
            opacity: 0,
          }}
        />
        <div className="wallpaper">
          <div
            style={{ width: "100%", height: "100%", background: "var(--bg)" }}
          />
        </div>
        <div className="boot-overlay">
          <div className="boot-text">
            {bootText.map((line, i) => (
              <span
                key={i}
                className={line.cls || ""}
                style={{
                  display:
                    i > 0 && !bootText[i - 1]?.text?.endsWith(" ")
                      ? "block"
                      : "inline",
                }}
              >
                {line.text}
              </span>
            ))}
          </div>
        </div>
      </>
    );
  }

  // ================================================================
  // TERMINAL
  // ================================================================
  const isMinimized = terminalState === "minimized";
  const isMaximized = terminalState === "maximized";

  return (
    <>
      <canvas
        id="confettiCanvas"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          pointerEvents: "none",
        }}
      />
      <canvas
        id="matrixCanvas"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.3s",
        }}
        className=""
      />

      {/* Wallpaper */}
      <div className={`wallpaper ${isMinimized ? "wallpaper-clear" : ""}`}>
        <div
          style={{ width: "100%", height: "100%", background: "var(--bg)" }}
        />
      </div>

      {/* Terminal Window */}
      <div
        className={`terminal-window ${isMinimized ? "minimized" : ""} ${isMaximized ? "maximized" : ""}`}
        id="terminal"
      >
        {/* Minimized Popup Card — shows above titlebar when minimized */}
        {isMinimized && (
          <div
            className="minimized-card"
            onClick={() => setTerminalState("normal")}
          >
            <img src={pfp} alt={OWNER.name} className="minimized-pfp" />
            <div className="minimized-card-text">
              <div className="minimized-card-heading">
                You're really curious, aren't you?
              </div>
              <div className="minimized-card-sub">
                I suppose we really need to chat.
              </div>
            </div>
          </div>
        )}

        {/* Title Bar */}
        <div className="titlebar">
          <button
            type="button"
            className="titlebar-dot red"
            aria-label="Close terminal"
            onClick={() => setShowClose(true)}
          />
          <button
            type="button"
            className="titlebar-dot yellow"
            aria-label="Minimize terminal"
            onClick={() =>
              setTerminalState((s) =>
                s === "minimized" ? "normal" : "minimized",
              )
            }
          />
          <button
            type="button"
            className="titlebar-dot green"
            aria-label="Maximize terminal"
            onClick={() =>
              setTerminalState((s) =>
                s === "maximized" ? "normal" : "maximized",
              )
            }
          />
          <div className="titlebar-title">
            {OWNER.name.toLowerCase().replace(" ", ".")}@portfolio ~ /terminal
          </div>
        </div>

        {/* Terminal Body */}
        {!isMinimized && (
          <div
            className="terminal-body"
            id="terminalBody"
            ref={bodyRef}
            onClick={() => inputRef.current?.focus()}
          >
            <h1 className="sr-only">
              {OWNER.name} — Developer & Creator Portfolio
            </h1>

            {/* ASCII Name */}
            <pre className="ascii-name" aria-hidden="true">
              {ASCII_NAME}
            </pre>

            {/* Welcome Box */}
            <div className="welcome-box" id="welcomeBox">
              <div className="welcome-left">
                <h2 className="greeting">Welcome, visitor.</h2>
                <pre className="pixel-rocket">{PIXEL_ART}</pre>
                <div className="subtitle">
                  {OWNER.title} • {OWNER.location}
                </div>
                <div className="subtitle" id="emailSubtitle">
                  {OWNER.email}
                </div>
              </div>
              <div className="welcome-right">
                <div className="welcome-section">
                  <h2 className="welcome-section-title">Capabilities</h2>
                  <div className="item">
                    <span className="label">Build</span>
                    <span>React, Node.js, TypeScript</span>
                  </div>
                  <div className="item">
                    <span className="label">Design</span>
                    <span>UI/UX, Systems, Accessibility</span>
                  </div>
                  <div className="item">
                    <span className="label">Deploy</span>
                    <span>Vercel, Docker, CI/CD</span>
                  </div>
                  <div className="item">
                    <span className="label">Craft</span>
                    <span>SaaS, Portfolios, APIs</span>
                  </div>
                </div>
                <div className="welcome-section">
                  <h2 className="welcome-section-title">Navigation</h2>
                  {Object.keys(COMMANDS)
                    .slice(0, 5)
                    .map((cmd) => (
                      <div key={cmd} className="item">
                        <span
                          style={{
                            cursor: "pointer",
                            color: "var(--text)",
                            textDecoration: "underline dotted",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            executeCommand(cmd);
                          }}
                        >
                          {cmd}
                        </span>
                      </div>
                    ))}
                  <div className="command-hint">... /help for all commands</div>
                  <div
                    className="command-hint"
                    style={{ marginTop: 6, opacity: 0.5 }}
                  >
                    Try /themes to change the vibe
                  </div>
                </div>
                <div className="welcome-section">
                  <h2 className="welcome-section-title">
                    AI Portfolio Assistant
                  </h2>
                  <div className="command-hint" style={{ marginBottom: 8 }}>
                    Use the terminal line for all AI interactions.
                  </div>
                  <div className="command-hint">
                    Type /aichat to activate AI mode, then enter any message.
                  </div>
                  <div className="command-hint" style={{ marginTop: 6 }}>
                    Type /aichat_off to disable AI mode.
                  </div>
                </div>
              </div>
            </div>

            {/* Output Area */}
            <div className="output-area" id="outputArea">
              {outputBlocks.map((block) => renderBlock(block))}
              {aiLoading && (
                <div className="output-line dim">AI assistant is typing...</div>
              )}
              {aiError && (
                <div className="output-line red">AI Error: {aiError}</div>
              )}
            </div>
          </div>
        )}

        {/* Input Area */}
        {!isMinimized && (
          <form className="input-area" onSubmit={handleSubmit}>
            <span className="input-prompt">&gt;</span>
            <div className="input-wrapper">
              {autocompleteItems.length > 0 && (
                <div className="autocomplete show">
                  {autocompleteItems.map((item, idx) => (
                    <div
                      key={item}
                      className={`autocomplete-item ${idx === acIdx ? "active" : ""}`}
                      onClick={() => {
                        setInputValue(item);
                        setAutocompleteItems([]);
                        inputRef.current?.focus();
                      }}
                    >
                      <span className="ac-cmd">{item}</span>
                      <span className="ac-desc">
                        {(
                          COMMANDS[item] ||
                          INFO_COMMANDS[item] ||
                          PROJECT_COMMANDS[item] ||
                          THEME_COMMANDS[item]
                        )?.desc || ""}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {historySearchMode && (
                <div className="autocomplete show">
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', color: 'var(--accent)' }}>
                    🔍 History Search: {historySearchTerm || "(all)"}
                  </div>
                  {historySearchResults.length > 0 ? (
                    historySearchResults.slice(0, 8).map((item, idx) => (
                      <div
                        key={idx}
                        className="autocomplete-item"
                        onClick={() => {
                          setInputValue(item);
                          setHistorySearchMode(false);
                          setHistorySearchTerm("");
                          inputRef.current?.focus();
                        }}
                      >
                        <span className="ac-cmd">{item}</span>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '8px 12px', color: 'var(--dim)' }}>No matches in history</div>
                  )}
                </div>
              )}
              <input
                ref={inputRef}
                type="text"
                className="input-field"
                id="cmdInput"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={historySearchMode ? 'Search history (Esc to cancel)...' : 'Type a command... try "/help"'}
                autoComplete="off"
                spellCheck="false"
                aria-label="Terminal command input"
              />
            </div>
          </form>
        )}
      </div>
    </>
  );
}
