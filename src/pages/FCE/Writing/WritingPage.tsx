// src/pages/fce/writing/WritingPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { getTasksForPart, tasks, WritingTask } from "./data/writingData";
import logo from "@/assets/logo.svg"; // ajustează path-ul

type Part = 1 | 2;

const LS_KEY = "proerudio_fce_writing_v1";

type DraftsState = {
  // păstrăm text separat pentru fiecare task, ca să nu pierzi ce ai scris
  drafts: Record<number, string>;
  chosenPart2TaskId: number | null; // 2/3/4 (în mod examen alegi una)
};

const countWords = (text: string) => {
  const cleaned = text.trim().replace(/\s+/g, " ");
  if (!cleaned) return 0;
  return cleaned.split(" ").length;
};

export default function WritingPage() {
  const [part, setPart] = useState<Part>(1);
  const [taskIndex, setTaskIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const [state, setState] = useState<DraftsState>(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try {
        return JSON.parse(raw) as DraftsState;
      } catch {}
    }
    return { drafts: {}, chosenPart2TaskId: null };
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }, [state]);

  const tasksInPart = useMemo(() => getTasksForPart(part), [part]);
  const task: WritingTask | undefined = tasksInPart[taskIndex];

  // safety
  useEffect(() => {
    setTaskIndex((i) => Math.min(i, tasksInPart.length - 1));
  }, [tasksInPart.length]);

  const currentText = task ? state.drafts[task.id] ?? "" : "";
  const words = useMemo(() => countWords(currentText), [currentText]);

  const minW = task?.constraints?.minWords ?? 140;
  const maxW = task?.constraints?.maxWords ?? 190;

  const wordStatus = useMemo(() => {
    if (!task) return "ok";
    if (words < minW) return "low";
    if (words > maxW) return "high";
    return "ok";
  }, [words, minW, maxW, task]);

  const updateText = (val: string) => {
    if (!task) return;
    setState((prev) => ({
      ...prev,
      drafts: { ...prev.drafts, [task.id]: val },
    }));
  };

  const Header = () => (
    <div className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Pro Erudio Logo" className="h-9 w-auto object-contain" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-gray-900">Pro Erudio</div>
            <div className="text-xs text-gray-500">FCE Writing</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFinished(true)}
            className="rounded-lg border px-3 py-2 text-xs font-semibold text-gray-900 transition duration-300 ease-in-out hover:bg-gray-50"
          >
            Finish test
          </button>
        </div>
      </div>
    </div>
  );

  const LeftPrompt = () => {
    if (!task) return null;

    return (
      <div className="rounded-xl border bg-white">
        <div className="border-b px-5 py-4">
          <div className="text-sm font-semibold text-gray-900">{task.title}</div>
          <div className="mt-1 text-sm text-gray-600">{task.instructionTop}</div>
        </div>

        <div className="px-5 py-5 text-sm text-gray-800">
          {task.context.map((p, idx) => (
            <p key={idx} className={idx === 0 ? "" : "mt-3"}>
              {p}
            </p>
          ))}

          <div className="mt-4 rounded-lg border bg-gray-50 p-4">
            <div className="font-semibold text-gray-900">{task.mainPrompt}</div>

            {(task.notes?.length ?? 0) > 0 && (
              <div className="mt-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-700">
                  {task.notesTitle ?? "Notes"}
                </div>
                <div className="mt-2 text-sm text-gray-800">
                  <div className="font-semibold text-gray-900">Write about:</div>
                  <ol className="mt-2 list-decimal pl-5">
                    {task.notes!.map((n, i) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>

          {(task.extraBoxLines?.length ?? 0) > 0 && (
            <div className="mt-4 rounded-lg border bg-white p-4">
              {task.extraBoxLines!.map((line, idx) => (
                <div key={idx} className="text-sm text-gray-800">
                  {line === "" ? <div className="h-3" /> : line}
                </div>
              ))}
            </div>
          )}

          {part === 2 && (
            <div className="mt-4 rounded-lg border bg-blue-50 p-4 text-sm">
              <div className="font-semibold text-gray-900">Exam tip</div>
              <div className="mt-1 text-gray-700">
                In Part 2 you should choose <span className="font-semibold">one</span> question (2–4) to answer.
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {[2, 3, 4].map((id) => (
                  <button
                    key={id}
                    onClick={() => setState((prev) => ({ ...prev, chosenPart2TaskId: id }))}
                    className={[
                      "rounded-md px-3 py-2 text-xs font-semibold transition duration-300 ease-in-out",
                      state.chosenPart2TaskId === id
                        ? "bg-primary text-white"
                        : "border bg-white text-gray-800 hover:bg-gray-50",
                    ].join(" ")}
                  >
                    Choose Q{id}
                  </button>
                ))}
                {state.chosenPart2TaskId && (
                  <span className="self-center text-xs text-gray-700">
                    Selected: <span className="font-semibold">Q{state.chosenPart2TaskId}</span>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const RightEditor = () => {
    if (!task) return null;

    return (
      <div className="rounded-xl border bg-white">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="text-sm font-semibold text-gray-900">Your answer</div>
          <div className="text-xs text-gray-600">
            Words:{" "}
            <span
              className={[
                "font-semibold",
                wordStatus === "ok" ? "text-gray-900" : wordStatus === "low" ? "text-amber-600" : "text-red-600",
              ].join(" ")}
            >
              {words}
            </span>
          </div>
        </div>

        <div className="p-5">
          <textarea
            value={currentText}
            onChange={(e) => updateText(e.target.value)}
            placeholder="Write your answer here..."
            className="h-[520px] w-full resize-none rounded-lg border p-4 text-sm leading-6 outline-none transition duration-300 ease-in-out focus:border-primary"
          />

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600">
            <div>
              Target: <span className="font-semibold">{minW}–{maxW}</span> words
              {task.constraints?.styleHint ? (
                <>
                  {" "}• Style: <span className="font-semibold">{task.constraints.styleHint}</span>
                </>
              ) : null}
            </div>

            <button
              onClick={() => updateText("")}
              className="rounded-md border px-3 py-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    );
  };

  const Nav = () => (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs font-semibold text-gray-700">Part</span>

          <button
            onClick={() => {
              setPart(1);
              setTaskIndex(0);
            }}
            className={[
              "rounded-md px-3 py-2 text-xs font-semibold transition duration-300 ease-in-out",
              part === 1 ? "bg-primary text-white" : "border text-gray-700 hover:bg-gray-50",
            ].join(" ")}
          >
            Part 1
          </button>

          <button
            onClick={() => {
              setPart(2);
              setTaskIndex(0);
            }}
            className={[
              "rounded-md px-3 py-2 text-xs font-semibold transition duration-300 ease-in-out",
              part === 2 ? "bg-primary text-white" : "border text-gray-700 hover:bg-gray-50",
            ].join(" ")}
          >
            Part 2
          </button>

          {/* Task tabs */}
          <div className="ml-2 flex items-center gap-2">
            {tasksInPart.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setTaskIndex(idx)}
                className={[
                  "rounded-md px-3 py-2 text-xs font-semibold transition duration-300 ease-in-out",
                  taskIndex === idx ? "bg-primary text-white" : "border text-gray-700 hover:bg-gray-50",
                ].join(" ")}
              >
                {t.id}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setTaskIndex((i) => Math.max(0, i - 1))}
              disabled={taskIndex === 0}
              className="rounded-lg border px-3 py-2 text-sm font-semibold text-gray-900 transition duration-300 ease-in-out hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ←
            </button>
            <button
              onClick={() => setTaskIndex((i) => Math.min(tasksInPart.length - 1, i + 1))}
              disabled={taskIndex === tasksInPart.length - 1}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const Finish = () => {
    // Pentru writing nu e “scor” automat (depinde de evaluare),
    // dar putem valida word count + dacă la Part 2 ai ales una.
    const p1 = tasks.find((t) => t.id === 1)!;
    const p1Words = countWords(state.drafts[p1.id] ?? "");
    const p1Ok = p1Words >= 140 && p1Words <= 190;

    const chosen = state.chosenPart2TaskId;
    const chosenTask = chosen ? tasks.find((t) => t.id === chosen) : null;
    const chosenWords = chosenTask ? countWords(state.drafts[chosenTask.id] ?? "") : 0;
    const chosenOk = chosenTask ? chosenWords >= 140 && chosenWords <= 190 : false;

    return (
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-6">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="text-xl font-bold text-gray-900">Finish</div>
          <div className="mt-1 text-sm text-gray-600">
            Writing isn’t auto-scored, but we can check if you followed the word limits.
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border bg-gray-50 p-4">
              <div className="text-xs font-semibold text-gray-700">Part 1 (Question 1)</div>
              <div className="mt-1 text-sm text-gray-700">
                Words: <span className="font-semibold text-gray-900">{p1Words}</span>{" "}
                {p1Ok ? <span className="text-emerald-700">✓ within range</span> : <span className="text-red-600">✕ out of range</span>}
              </div>
            </div>

            <div className="rounded-xl border bg-gray-50 p-4">
              <div className="text-xs font-semibold text-gray-700">Part 2 (Choose one: Q2–Q4)</div>
              <div className="mt-1 text-sm text-gray-700">
                Selected:{" "}
                <span className="font-semibold text-gray-900">{chosen ? `Q${chosen}` : "None"}</span>
              </div>
              {chosenTask ? (
                <div className="mt-1 text-sm text-gray-700">
                  Words: <span className="font-semibold text-gray-900">{chosenWords}</span>{" "}
                  {chosenOk ? <span className="text-emerald-700">✓ within range</span> : <span className="text-red-600">✕ out of range</span>}
                </div>
              ) : (
                <div className="mt-1 text-sm text-red-600">Please choose one task in Part 2.</div>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setFinished(false)}
              className="rounded-lg border px-4 py-2 text-sm font-semibold text-gray-900 transition duration-300 ease-in-out hover:bg-gray-50"
            >
              Back
            </button>

            <button
              onClick={() => {
                localStorage.removeItem(LS_KEY);
                setState({ drafts: {}, chosenPart2TaskId: null });
                setPart(1);
                setTaskIndex(0);
                setFinished(false);
              }}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:brightness-110"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {finished ? (
        <Finish />
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 pb-24 pt-6 lg:grid-cols-2">
          <LeftPrompt />
          <RightEditor />
        </div>
      )}

      <Nav />
    </div>
  );
}
