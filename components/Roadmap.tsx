"use client";

import { useState } from "react";

export interface Phase {
  name: string;
  steps: string[];
}

interface RoadmapProps {
  phases: Phase[] | null;
}

export default function Roadmap({ phases }: RoadmapProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!phases || phases.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        No roadmap generated yet.
      </p>
    );
  }

  const activePhase = phases[activeIndex];

  return (
    <section className="w-full max-w-4xl">
      {/* ===== Timeline ===== */}
      <svg
        viewBox="0 0 1000 200"
        className="w-full h-40 mb-16"
      >
        <path
          d="M 50 100 Q 300 20, 500 100 T 950 100"
          stroke="rgba(59,130,246,0.4)"
          strokeWidth="4"
          fill="none"
        />

        {phases.map((phase, index) => {
          const x =
            phases.length === 1
              ? 500
              : 50 + (index / (phases.length - 1)) * 900;

          const isActive = index === activeIndex;

          return (
            <g
              key={index}
              onClick={() => setActiveIndex(index)}
              className="cursor-pointer"
            >
              <circle
                cx={x}
                cy={100}
                r={isActive ? 18 : 14}
                fill="#0b0f19"
                stroke={isActive ? "#60a5fa" : "#3b82f6"}
                strokeWidth="3"
              />
              <text
                x={x}
                y={105}
                textAnchor="middle"
                fontSize="12"
                fill="#e5e7eb"
              >
                {index + 1}
              </text>
              <text
                x={x}
                y={140}
                textAnchor="middle"
                fontSize="14"
                fill={isActive ? "#bfdbfe" : "#9ca3af"}
              >
                {phase.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* ===== Active Phase Details ===== */}
      <div>
        <h2 className="text-xl font-semibold text-blue-400 mb-4">
          {activeIndex + 1}. {activePhase.name}
        </h2>

        <ul className="space-y-3">
          {activePhase.steps.map((step, index) => (
            <li
              key={index}
              className="text-gray-300 border-l border-blue-800 pl-4"
            >
              {step}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
