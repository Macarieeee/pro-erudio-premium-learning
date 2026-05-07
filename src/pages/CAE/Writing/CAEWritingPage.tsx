// src/pages/cae/writing/CAEWritingPage.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getTasksForPart, tasks, WritingTask } from "./data/caeWritingData";
import logo from "@/assets/logo.svg"; // ajustează path-ul

type Part = 1 | 2;

const LS_KEY = "proerudio_cae_writing_v1";
const STUDENT_INFO_KEY = "proerudio_fce_student_info";

const WRITING_RESULTS_API_URL = import.meta.env.VITE_CAE_WRITING_RESULTS_API_URL || import.meta.env.VITE_WRITING_RESULTS_API_URL;

// Modify these values when you need a different duration/warning for another test.
// 90 * 60 = 1h 30min
const TIMER_DURATION_SECONDS = 90 * 60;
const TIMER_WARNING_SECONDS = 10 * 60;

const formatCountdown = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const writingPartMeta: Record<Part, { exam: string; level: string; paper: string; partLabel: string; taskType: string; instruction: string }> = {
  1: {
    exam: "C1 Advanced (CAE)",
    level: "Level C1",
    paper: "Writing",
    partLabel: "Part 1",
    taskType: "Essay",
    instruction: "Read the input material and write an essay using the notes provided.",
  },
  2: {
    exam: "C1 Advanced (CAE)",
    level: "Level C1",
    paper: "Writing",
    partLabel: "Part 2",
    taskType: "Choose one writing task",
    instruction: "Choose one question from Part 2 and write your answer in the appropriate style.",
  },
};

type DraftsState = {
  // păstrăm text separat pentru fiecare task, ca să nu pierzi ce ai scris
  drafts: Record<number, string>;
  chosenPart2TaskId: number | null; // 2/3/4 (în mod examen alegi una)
};
const formatTimeSpent = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }

  return `${seconds}s`;
};
const countWords = (text: string) => {
  const cleaned = text.trim().replace(/\s+/g, " ");
  if (!cleaned) return 0;
  return cleaned.split(" ").length;
};

export default function CAEWritingPage() {
  const [part, setPart] = useState<Part>(1);
  const [taskIndex, setTaskIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION_SECONDS);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sendSuccess, setSendSuccess] = useState(false);
  const testStartTimeRef = useRef<number>(Date.now());
  const timeWarningShownRef = useRef(false);

  const getTimeSpent = () => {
    const totalSeconds = Math.round((Date.now() - testStartTimeRef.current) / 1000);

    return {
      timeSpentSeconds: totalSeconds,
      timeSpentFormatted: formatTimeSpent(totalSeconds),
    };
  };

const [state, setState] = useState<DraftsState>(() => ({ drafts: {}, chosenPart2TaskId: null }));

useEffect(() => {
  if (typeof window === "undefined") return;

  const raw = window.localStorage.getItem(LS_KEY);
  if (!raw) return;

  try {
    setState(JSON.parse(raw) as DraftsState);
  } catch {}
}, []);

useEffect(() => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LS_KEY, JSON.stringify(state));
}, [state]);

useEffect(() => {
  if (typeof window === "undefined") return;

  const raw = window.localStorage.getItem(STUDENT_INFO_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw) as { studentName?: string; studentEmail?: string };
    setStudentName(parsed.studentName || "");
    setStudentEmail(parsed.studentEmail || "");
  } catch {
    // ignore
  }
}, []);

useEffect(() => {
  if (finished) return;

  const interval = window.setInterval(() => {
    setTimeLeft((prev) => {
      const nextTime = prev - 1;

      if (nextTime === TIMER_WARNING_SECONDS && !timeWarningShownRef.current) {
        timeWarningShownRef.current = true;
        setShowTimeWarning(true);
      }

      if (prev <= 1) {
        window.clearInterval(interval);
        setFinished(true);
        return 0;
      }

      return nextTime;
    });
  }, 1000);

  return () => window.clearInterval(interval);
}, [finished]);

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

  const renderHeader = () => (
    <div className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Pro Erudio Logo" className="h-9 w-auto object-contain" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-gray-900">Pro Erudio</div>
            <div className="text-xs text-gray-500">CAE Writing</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={[
              "rounded-lg border px-4 py-2 text-sm font-bold tabular-nums",
              timeLeft <= TIMER_WARNING_SECONDS
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-gray-200 bg-gray-50 text-gray-900",
            ].join(" ")}
          >
            {formatCountdown(timeLeft)}
          </div>

          <button
            onClick={() => setFinished(true)}
            className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition duration-300 ease-in-out hover:brightness-110"
          >
            Finish test
          </button>
        </div>
      </div>
    </div>
  );

  const TimeWarningModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl font-bold text-red-700">
          !
        </div>
        <div className="text-xl font-bold text-gray-900">10 minutes left</div>
        <div className="mt-2 text-sm text-gray-600">
          Please finish your writing answers and make sure you submit the test in time.
        </div>
        <button
          onClick={() => setShowTimeWarning(false)}
          className="mt-5 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:brightness-110"
        >
          Continue test
        </button>
      </div>
    </div>
  );

  const renderLeftPrompt = () => {
    if (!task) return null;

    const meta = writingPartMeta[part];

    return (
      <div className="rounded-xl border bg-white">
        <div className="border-b px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-primary">{meta.exam}</div>
              <div className="mt-1 text-lg font-bold text-gray-900">
                {meta.paper} — {meta.partLabel}
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-primary">{meta.level}</span>
                <span className="rounded-full border bg-gray-50 px-3 py-1 text-gray-700">{meta.taskType}</span>
              </div>
            </div>

            <div className="rounded-lg border bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700">
              Question {task.id}
            </div>
          </div>

          <div className="mt-4 rounded-lg border bg-white p-4">
            <div className="text-sm font-semibold text-gray-900">{task.title}</div>
            <div className="mt-1 text-sm text-gray-600">{task.instructionTop}</div>
            <div className="mt-2 text-xs text-gray-500">{meta.instruction}</div>
          </div>
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

          {(task.opinions?.length ?? 0) > 0 && (
            <div className="mt-4 rounded-lg border bg-white p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-700">
                {task.opinionsTitle ?? "Opinions"}
              </div>
              <div className="mt-3 space-y-2 text-sm text-gray-800">
                {task.opinions!.map((opinion, idx) => (
                  <div key={idx} className="rounded-md border bg-gray-50 px-3 py-2 italic">
                    “{opinion}”
                  </div>
                ))}
              </div>
            </div>
          )}

          {(task.extraBoxLines?.length ?? 0) > 0 && (
            <div className="mt-4 rounded-lg border bg-white p-4">
              {task.extraBoxTitle ? (
                <div className="mb-3 text-sm font-bold text-gray-900">{task.extraBoxTitle}</div>
              ) : null}
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
                In CAE Writing Part 2 you should choose <span className="font-semibold">one</span> question (2–4) to answer.
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

  const renderRightEditor = () => {
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

  const renderNav = () => (
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

  const sendWritingEmail = async () => {
    setSendError("");
    setSendSuccess(false);

    if (!studentName.trim()) {
      setSendError("Please enter the student name.");
      return;
    }

    if (!studentEmail.trim()) {
      setSendError("Please enter the student email.");
      return;
    }

    if (!WRITING_RESULTS_API_URL) {
      setSendError("Missing VITE_CAE_WRITING_RESULTS_API_URL or VITE_WRITING_RESULTS_API_URL. Please check the .env file.");
      return;
    }

    const p1Task = tasks.find((t) => t.id === 1)!;
    const chosenTask = state.chosenPart2TaskId ? tasks.find((t) => t.id === state.chosenPart2TaskId) : null;

    if (!chosenTask) {
      setSendError("Please choose one task in Part 2 before sending the writing test.");
      return;
    }

    const p1Text = state.drafts[p1Task.id] ?? "";
    const chosenText = state.drafts[chosenTask.id] ?? "";

    if (!p1Text.trim()) {
      setSendError("Please complete Part 1 before sending the writing test.");
      return;
    }

    if (!chosenText.trim()) {
      setSendError("Please complete the selected Part 2 task before sending the writing test.");
      return;
    }

    const submittedTasks = [
      {
        id: p1Task.id,
        part: p1Task.part,
        title: p1Task.title,
        instructionTop: p1Task.instructionTop,
        mainPrompt: p1Task.mainPrompt,
        notes: p1Task.notes ?? [],
        extraBoxLines: p1Task.extraBoxLines ?? [],
        styleHint: p1Task.constraints?.styleHint ?? "",
        minWords: p1Task.constraints?.minWords ?? 140,
        maxWords: p1Task.constraints?.maxWords ?? 190,
        answer: p1Text,
        wordCount: countWords(p1Text),
      },
      {
        id: chosenTask.id,
        part: chosenTask.part,
        title: chosenTask.title,
        instructionTop: chosenTask.instructionTop,
        mainPrompt: chosenTask.mainPrompt,
        notes: chosenTask.notes ?? [],
        extraBoxLines: chosenTask.extraBoxLines ?? [],
        styleHint: chosenTask.constraints?.styleHint ?? "",
        minWords: chosenTask.constraints?.minWords ?? 140,
        maxWords: chosenTask.constraints?.maxWords ?? 190,
        answer: chosenText,
        wordCount: countWords(chosenText),
      },
    ];

    const timeSpent = getTimeSpent();



    if (typeof window !== "undefined") {


      window.localStorage.setItem(


        STUDENT_INFO_KEY,


        JSON.stringify({


          studentName: studentName.trim(),


          studentEmail: studentEmail.trim(),


        })


      );


    }



    setIsSending(true);



    try {
      const response = await fetch(WRITING_RESULTS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: studentName.trim(),
          studentEmail: studentEmail.trim(),
          submittedTasks,
          timeSpent,
          timeSpentSeconds: timeSpent.timeSpentSeconds,
          timeSpentFormatted: timeSpent.timeSpentFormatted,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok && response.status !== 207) {
        throw new Error(data?.error || "The writing test could not be sent.");
      }

      setSendSuccess(true);

      if (data?.partial) {
        setSendError(data?.message || "The teacher received the writing test, but the student confirmation email could not be sent.");
      }
    } catch (error) {
      console.error(error);
      setSendError(error instanceof Error ? error.message : "The writing test could not be sent. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const Finish = () => {
    // Pentru writing nu e “scor” automat (depinde de evaluare),
    // dar putem valida word count + dacă la Part 2 ai ales una.
    const p1 = tasks.find((t) => t.id === 1)!;
    const p1Words = countWords(state.drafts[p1.id] ?? "");
    const p1Min = p1.constraints?.minWords ?? 220;
    const p1Max = p1.constraints?.maxWords ?? 260;
    const p1Ok = p1Words >= p1Min && p1Words <= p1Max;

    const chosen = state.chosenPart2TaskId;
    const chosenTask = chosen ? tasks.find((t) => t.id === chosen) : null;
    const chosenWords = chosenTask ? countWords(state.drafts[chosenTask.id] ?? "") : 0;
    const chosenMin = chosenTask?.constraints?.minWords ?? 220;
    const chosenMax = chosenTask?.constraints?.maxWords ?? 260;
    const chosenOk = chosenTask ? chosenWords >= chosenMin && chosenWords <= chosenMax : false;

    return (
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-6">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="text-xl font-bold text-gray-900">Finish</div>
          <div className="mt-1 text-sm text-gray-600">
            CAE Writing isn’t auto-scored, but we can check if you followed the word limits.
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

          <div className="mt-6 rounded-xl border bg-white p-5">
            <div className="text-lg font-bold text-gray-900">Send writing test by email</div>
            <p className="mt-1 text-sm text-gray-600">
              The student receives a confirmation email. The teacher receives the full writing submission for review.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <input
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Student name"
                className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition duration-300 ease-in-out focus:border-primary"
              />

              <input
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                placeholder="Student email"
                className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition duration-300 ease-in-out focus:border-primary"
              />
            </div>

            {sendError ? (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {sendError}
              </div>
            ) : null}

            {sendSuccess ? (
              <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Writing test sent successfully.
              </div>
            ) : null}

            <button
              onClick={sendWritingEmail}
              disabled={isSending}
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? "Sending..." : "Send writing test"}
            </button>
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
                setStudentName("");
                setStudentEmail("");
                setSendError("");
                setSendSuccess(false);
                setTimeLeft(TIMER_DURATION_SECONDS);
                setShowTimeWarning(false);
                timeWarningShownRef.current = false;
                testStartTimeRef.current = Date.now();
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
      {renderHeader()}
      {showTimeWarning && !finished && <TimeWarningModal />}

      {finished ? (
  Finish()
) : (
  <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 pb-24 pt-6 lg:grid-cols-2">
    {renderLeftPrompt()}
    {renderRightEditor()}
  </div>
)}

      {renderNav()}
    </div>
  );
}
