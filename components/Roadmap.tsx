"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ---------- types ---------- */
export interface Step {
  id: string;
  text: string;
  completed: boolean;
}

export interface Phase {
  id: string;
  name: string;
  steps: Step[];
}

type ThemeMode = "dark" | "light";

type RoadmapProps = {
  phases: Phase[];
  setPhases: React.Dispatch<React.SetStateAction<Phase[]>>;
  theme?: ThemeMode;
};

/* ---------- helpers ---------- */
function safeText(v: unknown) { return typeof v === "string" ? v : ""; }
function uid() { return crypto.randomUUID(); }
function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)); }

function getGlobalNext(phases: Phase[]) {
  for (const phase of phases) {
    for (const step of phase.steps) {
      if (!step.completed) return { phaseId: phase.id, stepId: step.id };
    }
  }
  return null;
}

function countDone(phases: Phase[]) {
  let done = 0;
  let total = 0;
  for (const p of phases) {
    for (const s of p.steps) {
      total++;
      if (s.completed) done++;
    }
  }
  return { done, total };
}

function phaseDone(phase: Phase) {
  return phase.steps.length > 0 && phase.steps.every((s) => s.completed);
}

function buildMysticPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  const p = points;
  const d: string[] = [`M ${p[0].x} ${p[0].y}`];

  for (let i = 1; i < p.length; i++) {
    const prev = p[i - 1];
    const cur = p[i];
    const dy = cur.y - prev.y;
    const c1x = prev.x;
    const c1y = prev.y + dy * 0.5;
    const c2x = cur.x;
    const c2y = cur.y - dy * 0.5;
    d.push(`C ${c1x} ${c1y}, ${c2x} ${c2y}, ${cur.x} ${cur.y}`);
  }
  return d.join(" ");
}

export default function Roadmap({ phases, setPhases, theme = "dark" }: RoadmapProps) {
  const [activePhaseId, setActivePhaseId] = useState<string>(() => phases[0]?.id ?? "");
  const [launchOpen, setLaunchOpen] = useState(false);

  // Constantes de diseño (Sincronizadas)
  const CARD_W = 400;
  const GAP_Y = 180;
  const TOP_PAD = 100;
  const MID_X = 500; 
  const SWAY = 180; // Antes había 160 vs 170, ahora 180 en ambos.
  const DOT_R = 6;

  useEffect(() => {
    if (!phases.length) return;
    setActivePhaseId((prev) => {
      const exists = phases.some((p) => p.id === prev);
      return exists ? prev : phases[0].id;
    });
  }, [phases]);

  const activePhase = useMemo(() => {
    return phases.find((p) => p.id === activePhaseId) ?? phases[0] ?? null;
  }, [phases, activePhaseId]);

  const nextGlobal = useMemo(() => getGlobalNext(phases), [phases]);
  const { done, total } = useMemo(() => countDone(phases), [phases]);
  const progressRatio = total === 0 ? 0 : done / total;
  const allDone = total > 0 && done === total;

  const points = useMemo(() => {
    if (!activePhase) return [];
    return activePhase.steps.map((_, i) => ({
      x: MID_X + (i % 2 === 0 ? -SWAY : SWAY),
      y: TOP_PAD + i * GAP_Y + 70, // +70 para que el punto esté en el centro de la tarjeta
    }));
  }, [activePhase?.steps]);

  const pathD = useMemo(() => buildMysticPath(points), [points]);
  const viewBoxH = points.length > 0 ? points[points.length - 1].y + 200 : 500;

  /* ---------- mutations ---------- */
  function updateStepText(stepId: string, text: string) {
    setPhases(prev => prev.map(p => p.id !== activePhase?.id ? p : 
      {...p, steps: p.steps.map(s => s.id === stepId ? {...s, text} : s)}
    ));
  }

  function toggleStep(stepId: string) {
    setPhases(prev => prev.map(p => p.id !== activePhase?.id ? p : 
      {...p, steps: p.steps.map(s => s.id === stepId ? {...s, completed: !s.completed} : s)}
    ));
  }

  function addStep(afterIndex: number) {
    setPhases(prev => prev.map(p => {
      if (p.id !== activePhase?.id) return p;
      const newStep = { id: uid(), text: "New step", completed: false };
      const steps = [...p.steps];
      steps.splice(afterIndex + 1, 0, newStep);
      return { ...p, steps };
    }));
  }

  function removeStep(stepId: string) {
    setPhases(prev => prev.map(p => p.id !== activePhase?.id ? p : 
      {...p, steps: p.steps.filter(s => s.id !== stepId).length ? p.steps.filter(s => s.id !== stepId) : p.steps}
    ));
  }

  const ui = useMemo(() => theme === "light" ? {
    textMain: "text-slate-900",
    textSub: "text-slate-600",
    pillOn: "border-sky-500 text-sky-700 bg-white shadow-sm",
    pillOff: "border-slate-200 text-slate-500 hover:bg-slate-50",
    card: "bg-white/80 border-slate-200 backdrop-blur-md",
    cardOff: "opacity-60",
    glow: "shadow-xl",
    input: "text-slate-900",
    line: "rgba(2,132,199,0.5)",
    dotActive: "#0284c7",
    dotInactive: "#cbd5e1",
    action: "text-sky-600 hover:bg-sky-50",
    danger: "text-rose-500 hover:bg-rose-50",
    badgeDone: "bg-sky-600 text-white",
    badgeOpen: "bg-slate-100 text-slate-600"
  } : {
    textMain: "text-white",
    textSub: "text-slate-400",
    pillOn: "border-blue-500 text-blue-400 bg-blue-500/10",
    pillOff: "border-slate-800 text-slate-500 hover:border-slate-700",
    card: "bg-slate-900/60 border-slate-800 backdrop-blur-md",
    cardOff: "opacity-50",
    glow: "shadow-[0_0_30px_rgba(30,41,59,0.5)]",
    input: "text-white",
    line: "rgba(56,189,248,0.5)",
    dotActive: "#38bdf8",
    dotInactive: "#334155",
    action: "text-blue-400 hover:bg-white/5",
    danger: "text-rose-400 hover:bg-white/5",
    badgeDone: "bg-blue-600 text-white",
    badgeOpen: "bg-slate-800 text-slate-300"
  }, [theme]);

  if (!activePhase) return null;

  return (
    <div className="relative w-full">
      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-12">
        {phases.map(p => (
          <button
            key={p.id}
            onClick={() => setActivePhaseId(p.id)}
            className={`px-5 py-2 rounded-full border text-sm font-medium transition-all ${p.id === activePhaseId ? ui.pillOn : ui.pillOff}`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="text-center mb-16">
        <h2 className={`text-4xl font-bold mb-4 ${ui.textMain}`}>
          {phaseDone(activePhase) ? "Phase Completed" : (activePhase.steps.find(s => !s.completed)?.text || "Next Step")}
        </h2>
        <div className="max-w-md mx-auto h-1.5 bg-slate-800/30 rounded-full overflow-hidden">
          <motion.div 
            animate={{ width: `${progressRatio * 100}%` }}
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
          />
        </div>
      </div>

      <div className="relative mx-auto" style={{ width: '1000px', height: viewBoxH }}>
        {/* SVG Path */}
        <svg viewBox={`0 0 1000 ${viewBoxH}`} className="absolute inset-0 w-full h-full pointer-events-none">
          <path d={pathD} fill="none" stroke={ui.line} strokeWidth="3" strokeDasharray="8 8" />
          {points.map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r={DOT_R} fill={activePhase.steps[i].completed ? ui.dotActive : ui.dotInactive} />
          ))}
        </svg>

        {/* Step Cards */}
        {activePhase.steps.map((step, i) => {
          const side = i % 2 === 0 ? -1 : 1;
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: side * 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute"
              style={{
                top: TOP_PAD + i * GAP_Y,
                left: `calc(50% + ${side * SWAY}px)`,
                width: CARD_W,
                transform: 'translateX(-50%)' // Esto centra la tarjeta sobre el punto
              }}
            >
              <div className={`p-6 rounded-2xl border transition-all ${ui.card} ${ui.glow} ${!step.completed && ui.cardOff}`}>
                <input
                  value={step.text}
                  onChange={(e) => updateStepText(step.id, e.target.value)}
                  className={`w-full bg-transparent font-semibold text-lg outline-none mb-4 ${ui.input}`}
                />
                <div className="flex justify-between items-center">
                  <button onClick={() => addStep(i)} className={`text-xs font-bold px-2 py-1 rounded ${ui.action}`}>+ STEP</button>
                  <button 
                    onClick={() => toggleStep(step.id)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-tighter ${step.completed ? ui.badgeDone : ui.badgeOpen}`}
                  >
                    {step.completed ? "COMPLETED" : "MARK DONE"}
                  </button>
                  <button onClick={() => removeStep(step.id)} className={`text-xs font-bold px-2 py-1 rounded ${ui.danger}`}>REMOVE</button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}