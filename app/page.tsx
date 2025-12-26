"use client";

import { useEffect, useMemo, useState } from "react";
import Roadmap, { Phase } from "@/components/Roadmap";

function uid() {
  return crypto.randomUUID();
}

const STORAGE_KEY = "eyla-project";
const THEME_KEY = "eyla-theme";
const CAPTURE_KEY = "eyla-captures";

type ThemeMode = "dark" | "light";

type Capture = {
  id: string;
  text: string;
  createdAt: number;
};

function generateLocalRoadmap(): Phase[] {
  return [
    {
      id: uid(),
      name: "Planning",
      steps: [
        { id: uid(), text: "Define the problem", completed: false },
        { id: uid(), text: "Clarify the core idea", completed: false },
      ],
    },
    {
      id: uid(),
      name: "Design",
      steps: [
        { id: uid(), text: "Sketch main user flow", completed: false },
        { id: uid(), text: "Decide MVP scope", completed: false },
      ],
    },
    {
      id: uid(),
      name: "Development",
      steps: [
        { id: uid(), text: "Implement core logic", completed: false },
        { id: uid(), text: "Test interactions", completed: false },
      ],
    },
  ]
}

export default function Page() {
  const [idea, setIdea] = useState("");
  const [phases, setPhases] = useState<Phase[]>([]);
  const [theme, setTheme] = useState<ThemeMode>("dark");

  // sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [captureDraft, setCaptureDraft] = useState("");
  const [captures, setCaptures] = useState<Capture[]>([]);

  // Load persisted project + theme + captures
  useEffect(() => {
    const rawTheme = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    if (rawTheme === "light" || rawTheme === "dark") setTheme(rawTheme);

    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setIdea(parsed.idea ?? "");
        setPhases(parsed.phases ?? []);
      } catch {}
    }

    const rawCaptures = localStorage.getItem(CAPTURE_KEY);
    if (rawCaptures) {
      try {
        const parsed = JSON.parse(rawCaptures);
        setCaptures(Array.isArray(parsed) ? parsed : []);
      } catch {}
    }
  }, []);

  // Persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ idea, phases }));
  }, [idea, phases]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(CAPTURE_KEY, JSON.stringify(captures));
  }, [captures]);

  const hasRoadmap = phases.length > 0;
  const canStart = useMemo(() => idea.trim().length > 0, [idea]);

  function start() {
    if (!canStart) return;
    setPhases(generateLocalRoadmap());
  }

  function reset() {
    setIdea("");
    setPhases([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  function addCapture() {
    const text = captureDraft.trim();
    if (!text) return;
    setCaptures((prev) => [{ id: uid(), text, createdAt: Date.now() }, ...prev]);
    setCaptureDraft("");
  }

  function removeCapture(id: string) {
    setCaptures((prev) => prev.filter((c) => c.id !== id));
  }

  const ui = useMemo(() => {
    // Dark: menos negro, más aura
    if (theme === "light") {
      return {
        pageBg:
          "bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(56,189,248,0.22),transparent_62%),radial-gradient(900px_600px_at_15%_85%,rgba(99,102,241,0.18),transparent_60%),linear-gradient(to_bottom,#f8fbff,#edf4ff)]",
        text: "text-slate-900",
        sub: "text-slate-600",
        panel: "bg-white/70 border-slate-200",
        panel2: "bg-white/55 border-slate-200",
        input:
          "bg-white/80 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-sky-400",
        btn:
          "bg-sky-600 hover:bg-sky-700 text-white shadow-[0_16px_44px_rgba(2,132,199,0.25)]",
        ghost:
          "bg-white/45 hover:bg-white/65 border-slate-200 text-slate-700",
        link: "text-slate-600 hover:text-slate-900",
        pill:
          "bg-white/55 border-slate-200 text-slate-700 hover:bg-white/75",
        divider: "border-slate-200/70",
      };
    }

    return {
      pageBg:
        "bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(56,189,248,0.18),transparent_60%),radial-gradient(1000px_700px_at_10%_85%,rgba(99,102,241,0.16),transparent_62%),linear-gradient(to_bottom,#081022,#0b1020)]",
      text: "text-white",
      sub: "text-slate-300/80",
      panel: "bg-[#0f172a]/55 border-slate-800/70",
      panel2: "bg-[#0b1226]/45 border-slate-800/60",
      input:
        "bg-[#0b1226]/60 border-slate-700/80 text-white placeholder:text-slate-400 focus:border-sky-400",
      btn:
        "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_16px_44px_rgba(37,99,235,0.22)]",
      ghost:
        "bg-[#0b1226]/30 hover:bg-[#0b1226]/45 border-slate-700/70 text-slate-200",
      link: "text-slate-300/70 hover:text-slate-100",
      pill:
        "bg-[#0b1226]/30 border-slate-700/70 text-slate-200 hover:bg-[#0b1226]/45",
      divider: "border-slate-800/60",
    };
  }, [theme]);

  return (
    <main className={["min-h-screen w-full", ui.pageBg, ui.text].join(" ")}>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 py-10 md:py-12">
        {/* APP SHELL */}
        <div className="flex gap-4 md:gap-6">
          {/* SIDEBAR (prototype) */}
          <aside
            className={[
              "shrink-0 transition-all duration-300",
              sidebarOpen ? "w-[280px]" : "w-[56px]",
            ].join(" ")}
          >
            <div
              className={[
                "sticky top-6 rounded-2xl border overflow-hidden",
                ui.panel,
                "shadow-[0_22px_70px_rgba(0,0,0,0.18)]",
              ].join(" ")}
            >
              <div className="p-3 flex items-center justify-between">
                <button
                  onClick={() => setSidebarOpen((v) => !v)}
                  className={[
                    "rounded-xl px-3 py-2 text-xs border transition",
                    ui.pill,
                  ].join(" ")}
                  title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                  aria-label="Toggle sidebar"
                >
                  {sidebarOpen ? "Collapse" : "☰"}
                </button>

                {sidebarOpen && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setTheme((t) => (t === "dark" ? "light" : "dark"))
                      }
                      className={[
                        "rounded-xl px-3 py-2 text-xs border transition",
                        ui.pill,
                      ].join(" ")}
                      aria-label="Toggle theme"
                      title="Toggle theme"
                    >
                      {theme === "dark" ? "Light" : "Dark"}
                    </button>
                  </div>
                )}
              </div>

              {sidebarOpen && (
                <div className="px-4 pb-4">
                  <div className="pb-3">
                    <div className="text-xs uppercase tracking-wider opacity-70">
                      Workspace
                    </div>
                    <div className="mt-1 text-sm font-medium">Projects</div>
                    <div className={["mt-2 rounded-xl border p-3", ui.panel2].join(" ")}>
                      <div className="text-sm">EYLA (Local)</div>
                      <div className={["text-xs mt-1", ui.sub].join(" ")}>
                        No backend yet • LocalStorage
                      </div>
                    </div>
                  </div>

                  <div className={["my-3 border-t", ui.divider].join(" ")} />

                  <div>
                    <div className="text-sm font-medium">Capture</div>
                    <p className={["text-xs mt-1", ui.sub].join(" ")}>
                      Quick ideas (sidebar prototype). Later → reminders + projects list.
                    </p>

                    <textarea
                      value={captureDraft}
                      onChange={(e) => setCaptureDraft(e.target.value)}
                      placeholder="Capture a thought..."
                      className={[
                        "mt-3 w-full min-h-[74px] resize-none rounded-xl border p-3 outline-none transition text-sm",
                        ui.input,
                      ].join(" ")}
                    />

                    <button
                      onClick={addCapture}
                      className={[
                        "mt-3 w-full rounded-xl py-2.5 text-sm font-medium transition border",
                        ui.ghost,
                      ].join(" ")}
                    >
                      Add to inbox
                    </button>

                    <div className="mt-4 space-y-2">
                      {captures.slice(0, 6).map((c) => (
                        <div
                          key={c.id}
                          className={[
                            "rounded-xl border p-3 group transition",
                            ui.panel2,
                            "hover:shadow-[0_12px_40px_rgba(0,0,0,0.14)]",
                          ].join(" ")}
                        >
                          <div className="text-sm leading-snug">{c.text}</div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className={["text-[11px]", ui.sub].join(" ")}>
                              {new Date(c.createdAt).toLocaleDateString()}
                            </span>
                            <button
                              onClick={() => removeCapture(c.id)}
                              className="text-[11px] opacity-70 hover:opacity-100 underline underline-offset-4"
                              title="Remove"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}

                      {captures.length === 0 && (
                        <div className={["text-xs mt-2", ui.sub].join(" ")}>
                          Nothing captured yet.
                        </div>
                      )}
                    </div>

                    <div className={["my-4 border-t", ui.divider].join(" ")} />

                    <div>
                      <div className="text-sm font-medium">Reminders (placeholder)</div>
                      <p className={["text-xs mt-1", ui.sub].join(" ")}>
                        Next iteration: real reminders like ChatGPT (push/mobile).
                      </p>
                      <div className={["mt-2 rounded-xl border p-3", ui.panel2].join(" ")}>
                        <div className={["text-xs", ui.sub].join(" ")}>
                          • No reminders yet
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* MAIN */}
          <section className="flex-1 min-w-0">
            {/* Header */}
            <div className="w-full flex items-start justify-center mb-8">
              <div className="text-center">
                <h1 className="text-4xl font-semibold tracking-wide">EYLA</h1>
                <p className={["mt-2", ui.sub].join(" ")}>
                  Turn ideas into clear paths.
                </p>
              </div>
            </div>

            {!hasRoadmap && (
              <div className="mx-auto w-full max-w-2xl">
                <div
                  className={[
                    "rounded-2xl border p-5 md:p-6",
                    ui.panel,
                    "shadow-[0_22px_70px_rgba(0,0,0,0.18)]",
                  ].join(" ")}
                >
                  <input
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && start()}
                    placeholder="Plan the new project launch"
                    className={[
                      "w-full p-4 rounded-xl border text-lg outline-none transition",
                      ui.input,
                    ].join(" ")}
                  />

                  <button
                    onClick={start}
                    disabled={!canStart}
                    className={[
                      "mt-4 w-full rounded-xl py-4 text-lg font-medium transition",
                      ui.btn,
                      !canStart ? "opacity-50 cursor-not-allowed" : "",
                    ].join(" ")}
                  >
                    Start planning
                  </button>
                </div>
              </div>
            )}

            {hasRoadmap && (
              <>
                <div className="flex justify-center">
                  <button
                    onClick={reset}
                    className={[
                      "mb-8 text-sm transition underline underline-offset-4 decoration-transparent hover:decoration-current",
                      ui.link,
                    ].join(" ")}
                  >
                    Reset project
                  </button>
                </div>

                <Roadmap phases={phases} setPhases={setPhases} theme={theme} />
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
