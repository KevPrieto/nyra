"use client";

import { useState } from "react";
import Roadmap, { Phase } from "@/components/Roadmap";

const INITIAL_ROADMAP: Phase[] = [
  {
    name: "Planning",
    steps: [
      "Clarify the core idea",
      "Define the problem to solve",
      "Set clear goals for the roadmap",
    ],
  },
  {
    name: "Design",
    steps: [
      "Outline the main user flow",
      "Decide what to include and exclude",
      "Sketch a minimal interface",
    ],
  },
  {
    name: "Development",
    steps: [
      "Set up the project structure",
      "Implement core functionality",
      "Test basic interactions",
    ],
  },
  {
    name: "Launch",
    steps: [
      "Prepare a first release",
      "Collect initial feedback",
      "Iterate based on learnings",
    ],
  },
];

export default function Page() {
  const [idea, setIdea] = useState("");
  const [phases, setPhases] = useState<Phase[] | null>(null);

  function generateLocalRoadmap() {
    if (!idea.trim()) return;
    setPhases(INITIAL_ROADMAP);
  }

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white flex flex-col items-center px-6 py-16">
      <h1 className="text-4xl font-bold mb-2 tracking-wide">EYLA</h1>
      <p className="text-gray-400 mb-10">
        Turn ideas into clear paths.
      </p>

      <div className="w-full max-w-md flex flex-col gap-4">
        <input
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe your idea..."
          className="w-full p-3 rounded bg-[#111827] border border-gray-700 focus:outline-none focus:border-blue-500"
        />

        <button
          onClick={generateLocalRoadmap}
          className="bg-blue-600 hover:bg-blue-700 transition rounded py-3 font-medium"
        >
          Generate roadmap
        </button>
      </div>

      <div className="w-full mt-20 flex justify-center">
        <Roadmap phases={phases} />
      </div>
    </main>
  );
}
