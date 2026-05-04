// src/pages/cae/listening/CAEListeningPage.tsx
// Built to match the FCE Listening page style, with CAE data stored separately.
// Focus-safe structure: render helpers are called as functions, not nested React components.

import React, { useEffect, useMemo, useRef, useState } from "react";
import logo from "@/assets/logo.svg";
import {
  audioTracks,
  part1MCQ,
  part2Gaps,
  part2Title,
  part3MCQ,
  part4Task1Matches,
  part4Task1Options,
  part4Task2Matches,
  part4Task2Options,
  TOTAL_QUESTIONS,
  type MatchOption,
  type Part,
} from "./data/caeListeningData";

type AnswersState = {
  mcq: Record<number, number | null>;
  gaps: Record<number, string>;
  matches: Record<number, string | null>;
};

type DetailedAnswer = {
  part: string;
  questionId: number;
  questionText: string;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  points: number;
  maxPoints: number;
};

const LS_KEY = "proerudio_cae_listening_v1";
const STUDENT_INFO_KEY = "proerudio_cae_student_info";
const NEXT_READING_PATH = "/cae/reading";
const normalize = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[’']/g, "'");

const formatTimeSpent = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

function buildInitialState(): AnswersState {
  const mcq: AnswersState["mcq"] = {};
  [...part1MCQ, ...part3MCQ].forEach((q) => (mcq[q.id] = null));

  const gaps: AnswersState["gaps"] = {};
  part2Gaps.forEach((q) => (gaps[q.id] = ""));

  const matches: AnswersState["matches"] = {};
  [...part4Task1Matches, ...part4Task2Matches].forEach((q) => (matches[q.id] = null));

  return { mcq, gaps, matches };
}

export default function CAEListeningPage() {
  const [part, setPart] = useState<Part>(1);
  const [indexInPart, setIndexInPart] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<AnswersState>(() => buildInitialState());

  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState("");

  const [selectedAudioIndex, setSelectedAudioIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const testStartTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as AnswersState;
      setAnswers({
        mcq: { ...buildInitialState().mcq, ...(parsed.mcq || {}) },
        gaps: { ...buildInitialState().gaps, ...(parsed.gaps || {}) },
        matches: { ...buildInitialState().matches, ...(parsed.matches || {}) },
      });
    } catch {
      // ignore invalid storage
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = window.localStorage.getItem(STUDENT_INFO_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as { studentName?: string; studentEmail?: string };
      setStudentName(parsed.studentName || "");
      setStudentEmail(parsed.studentEmail || "");
    } catch {
      // ignore invalid storage
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LS_KEY, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    setSelectedAudioIndex(0);
    audioRef.current?.pause();
  }, [part]);

  const partMeta = useMemo(() => {
    return {
      1: { label: "Part 1", range: "Questions 1–6", count: part1MCQ.length },
      2: { label: "Part 2", range: "Questions 7–14", count: part2Gaps.length },
      3: { label: "Part 3", range: "Questions 15–20", count: part3MCQ.length },
      4: { label: "Part 4", range: "Questions 21–30", count: 5 },
    } as const;
  }, []);

  useEffect(() => {
    setIndexInPart((i) => {
      const max = partMeta[part].count - 1;
      return Math.min(i, Math.max(0, max));
    });
  }, [part, partMeta]);

  const currentTracks = audioTracks[part] || [];
  const currentTrack = currentTracks[selectedAudioIndex] || currentTracks[0];
  const currentTotalInPart = partMeta[part].count;

  const getTimeSpent = () => {
    const totalSeconds = Math.round((Date.now() - testStartTimeRef.current) / 1000);

    return {
      timeSpentSeconds: totalSeconds,
      timeSpentFormatted: formatTimeSpent(totalSeconds),
    };
  };

  const goPrev = () => setIndexInPart((i) => Math.max(0, i - 1));
  const goNext = () => setIndexInPart((i) => Math.min(currentTotalInPart - 1, i + 1));

  const resetAll = () => {
    setAnswers(buildInitialState());
    setPart(1);
    setIndexInPart(0);
    setFinished(false);
    setSendSuccess(false);
    setSendError("");
    testStartTimeRef.current = Date.now();
    if (typeof window !== "undefined") window.localStorage.removeItem(LS_KEY);
  };

  const usedTask1Letters = useMemo(() => {
    const used = new Set<string>();
    part4Task1Matches.forEach((q) => {
      const v = answers.matches[q.id];
      if (v) used.add(v.toUpperCase());
    });
    return used;
  }, [answers.matches]);

  const usedTask2Letters = useMemo(() => {
    const used = new Set<string>();
    part4Task2Matches.forEach((q) => {
      const v = answers.matches[q.id];
      if (v) used.add(v.toUpperCase());
    });
    return used;
  }, [answers.matches]);

  const score = useMemo(() => {
    let s = 0;

    [...part1MCQ, ...part3MCQ].forEach((q) => {
      if (answers.mcq[q.id] === q.correctIndex) s += 1;
    });

    part2Gaps.forEach((q) => {
      const value = normalize(answers.gaps[q.id] || "");
      if (value && q.correctAnswers.some((correct) => normalize(correct) === value)) s += 1;
    });

    [...part4Task1Matches, ...part4Task2Matches].forEach((q) => {
      const value = (answers.matches[q.id] || "").toUpperCase();
      if (value && value === q.correctLetter.toUpperCase()) s += 1;
    });

    return s;
  }, [answers]);

  const breakdown = useMemo(() => {
    let p1 = 0;
    let p2 = 0;
    let p3 = 0;
    let p4 = 0;

    part1MCQ.forEach((q) => {
      if (answers.mcq[q.id] === q.correctIndex) p1 += 1;
    });

    part2Gaps.forEach((q) => {
      const value = normalize(answers.gaps[q.id] || "");
      if (value && q.correctAnswers.some((correct) => normalize(correct) === value)) p2 += 1;
    });

    part3MCQ.forEach((q) => {
      if (answers.mcq[q.id] === q.correctIndex) p3 += 1;
    });

    [...part4Task1Matches, ...part4Task2Matches].forEach((q) => {
      const value = (answers.matches[q.id] || "").toUpperCase();
      if (value && value === q.correctLetter.toUpperCase()) p4 += 1;
    });

    return { p1, p2, p3, p4 };
  }, [answers]);

  const percentage = useMemo(() => Math.round((score / TOTAL_QUESTIONS) * 100), [score]);

  const resultMessage = useMemo(() => {
    if (percentage >= 80) return "Excellent result. Keep up the strong work.";
    if (percentage >= 60) return "Good result. There is still room to improve.";
    if (percentage >= 40) return "Fair result. More practice is recommended.";
    return "More practice is recommended before the next test.";
  }, [percentage]);

  const detailedAnswers = useMemo<DetailedAnswer[]>(() => {
    const mcqAnswers = [...part1MCQ, ...part3MCQ].map((q) => {
      const selectedIndex = answers.mcq[q.id];
      const isCorrect = selectedIndex === q.correctIndex;

      return {
        part: `Part ${q.part}`,
        questionId: q.id,
        questionText: [q.extract, q.questionHeader, q.question].filter(Boolean).join(" — "),
        studentAnswer: selectedIndex === null || selectedIndex === undefined ? "No answer" : q.options[selectedIndex],
        correctAnswer: q.options[q.correctIndex],
        isCorrect,
        points: isCorrect ? 1 : 0,
        maxPoints: 1,
      };
    });

    const gapAnswers = part2Gaps.map((q) => {
      const value = answers.gaps[q.id] || "";
      const normalizedValue = normalize(value);
      const isCorrect = Boolean(normalizedValue) && q.correctAnswers.some((correct) => normalize(correct) === normalizedValue);

      return {
        part: "Part 2",
        questionId: q.id,
        questionText: q.prompt,
        studentAnswer: value.trim() || "No answer",
        correctAnswer: q.correctAnswers.join(" / "),
        isCorrect,
        points: isCorrect ? 1 : 0,
        maxPoints: 1,
      };
    });

    const makeMatchAnswers = (taskLabel: string, questions: typeof part4Task1Matches, options: MatchOption[]) =>
      questions.map((q) => {
        const selectedLetter = (answers.matches[q.id] || "").toUpperCase();
        const correctLetter = q.correctLetter.toUpperCase();
        const selectedOption = options.find((opt) => opt.letter === selectedLetter);
        const correctOption = options.find((opt) => opt.letter === correctLetter);
        const isCorrect = Boolean(selectedLetter) && selectedLetter === correctLetter;

        return {
          part: "Part 4",
          questionId: q.id,
          questionText: `${taskLabel} — ${q.speakerLabel}`,
          studentAnswer: selectedOption ? `${selectedOption.letter} — ${selectedOption.text}` : "No answer",
          correctAnswer: correctOption ? `${correctOption.letter} — ${correctOption.text}` : correctLetter,
          isCorrect,
          points: isCorrect ? 1 : 0,
          maxPoints: 1,
        };
      });

    return [
      ...mcqAnswers.filter((item) => item.part === "Part 1"),
      ...gapAnswers,
      ...mcqAnswers.filter((item) => item.part === "Part 3"),
      ...makeMatchAnswers("Task 1", part4Task1Matches, part4Task1Options),
      ...makeMatchAnswers("Task 2", part4Task2Matches, part4Task2Options),
    ];
  }, [answers]);

  const sendResultEmail = async () => {
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

    const endpoint = import.meta.env.VITE_CAE_LISTENING_RESULTS_API_URL || import.meta.env.VITE_LISTENING_RESULTS_API_URL;

    if (!endpoint) {
      setSendError("Missing VITE_CAE_LISTENING_RESULTS_API_URL or VITE_LISTENING_RESULTS_API_URL in the environment file.");
      return;
    }

    const timeSpent = getTimeSpent();

    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        STUDENT_INFO_KEY,
        JSON.stringify({ studentName: studentName.trim(), studentEmail: studentEmail.trim() })
      );
    }

    setIsSending(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exam: "CAE Listening",
          studentName: studentName.trim(),
          studentEmail: studentEmail.trim(),
          totalScore: score,
          maxScore: TOTAL_QUESTIONS,
          percentage,
          resultMessage,
          breakdown,
          detailedAnswers,
          timeSpent,
          timeSpentSeconds: timeSpent.timeSpentSeconds,
          timeSpentFormatted: timeSpent.timeSpentFormatted,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(data?.error || "The email could not be sent.");

      if (data?.partial) {
        setSendError(data?.message || "Teacher email was sent, but student email could not be sent.");
        return;
      }

      setSendSuccess(true);
    } catch (error) {
      console.error(error);
      setSendError(error instanceof Error ? error.message : "The email could not be sent. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const renderCardShell = (children: React.ReactNode) => (
    <div className="mx-auto w-full max-w-5xl px-4 pb-28 pt-6">
      <div className="rounded-xl border bg-white shadow-sm">{children}</div>
    </div>
  );

  const renderHeader = () => (
    <div className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Pro Erudio Logo" className="h-9 w-auto object-contain" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-gray-900">Pro Erudio</div>
            <div className="text-xs text-gray-500">CAE Listening</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden text-right text-xs text-gray-600 md:block">
            <div className="font-semibold text-gray-900">{partMeta[part].label}</div>
            <div className="text-gray-500">{partMeta[part].range}</div>
          </div>
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

  const renderAudioPanel = () => (
    <div className="border-b bg-gray-50 px-6 py-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Audio</div>
          <div className="text-sm font-semibold text-gray-900">{currentTrack?.label || "No audio selected"}</div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {currentTracks.map((track, idx) => (
            <button
              key={track.src}
              onClick={() => {
                setSelectedAudioIndex(idx);
                setTimeout(() => audioRef.current?.load(), 0);
              }}
              className={[
                "rounded-md px-3 py-2 text-xs font-semibold transition duration-300 ease-in-out",
                selectedAudioIndex === idx ? "bg-[#2094F3] text-white" : "border bg-white text-gray-700 hover:bg-gray-50",
              ].join(" ")}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {currentTrack ? (
        <audio ref={audioRef} controls preload="metadata" className="mt-3 w-full" src={encodeURI(currentTrack.src)} />
      ) : null}
    </div>
  );

  const renderPartNav = () => (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white">
      <div className="mx-auto max-w-5xl px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs font-semibold text-gray-700">Part</span>
          {[1, 2, 3, 4].map((p) => (
            <button
              key={p}
              onClick={() => setPart(p as Part)}
              className={[
                "rounded-md px-3 py-2 text-xs font-semibold transition duration-300 ease-in-out",
                part === p ? "bg-[#2094F3] text-white" : "border text-gray-700 hover:bg-gray-50",
              ].join(" ")}
            >
              {p}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={goPrev}
              disabled={indexInPart === 0}
              className="rounded-lg border px-3 py-2 text-sm font-semibold text-gray-900 transition duration-300 ease-in-out hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Previous"
            >
              ←
            </button>
            <button
              onClick={goNext}
              disabled={indexInPart === currentTotalInPart - 1}
              className="rounded-lg bg-[#2094F3] px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTopInstruction = () => {
    const instruction =
      part === 1
        ? "You will hear three different extracts. For each question, choose the correct answer. There are two questions for each extract."
        : part === 2
          ? "You will hear a man called Paul Osborne giving a careers talk about his work as a computer game designer. For each question, write a word or short phrase."
          : part === 3
            ? "You will hear an interview with a young film director, Lauren Casio. For each question, choose the correct answer."
            : "You will hear five short extracts in which actors are talking about performing in live theatre productions. Complete both tasks.";

    return (
      <div className="border-b px-6 py-5">
        <div className="text-sm font-semibold text-gray-900">{partMeta[part].range}</div>
        <div className="mt-1 text-sm text-gray-600">{instruction}</div>
      </div>
    );
  };

  const renderFinishScreen = () =>
    renderCardShell(
      <>
        <div className="px-6 py-6">
          <div className="text-xl font-bold text-gray-900">Test finished</div>
          <div className="mt-1 text-sm text-gray-600">
            Your score: <span className="font-semibold text-gray-900">{score}</span> / {TOTAL_QUESTIONS} ({percentage}%)
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <div className="rounded-xl border bg-gray-50 p-4">
              <div className="text-xs font-semibold text-gray-700">Part 1</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p1}/6</div>
            </div>
            <div className="rounded-xl border bg-gray-50 p-4">
              <div className="text-xs font-semibold text-gray-700">Part 2</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p2}/8</div>
            </div>
            <div className="rounded-xl border bg-gray-50 p-4">
              <div className="text-xs font-semibold text-gray-700">Part 3</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p3}/6</div>
            </div>
            <div className="rounded-xl border bg-gray-50 p-4">
              <div className="text-xs font-semibold text-gray-700">Part 4</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p4}/10</div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border bg-white p-5">
            <div className="text-base font-bold text-gray-900">Send result by email</div>
            <div className="mt-1 text-sm text-gray-600">
              The student receives the score summary. The teacher receives the full report with correct and incorrect answers.
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Student name"
                className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition duration-300 ease-in-out focus:border-[#2094F3]"
              />
              <input
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                placeholder="Student email"
                className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition duration-300 ease-in-out focus:border-[#2094F3]"
              />
            </div>

            {sendError ? <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{sendError}</div> : null}

            {sendSuccess ? (
              <div className="mt-4 space-y-3">
                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  The CAE Listening result was sent successfully. You can now continue to the Reading test.
                </div>
                <a
                  href={NEXT_READING_PATH}
                  className="inline-flex rounded-lg bg-[#2094F3] px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:brightness-110"
                >
                  Continue to Reading
                </a>
              </div>
            ) : null}

            <button
              onClick={sendResultEmail}
              disabled={isSending}
              className="mt-4 rounded-lg bg-[#2094F3] px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? "Sending..." : "Send result"}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setFinished(false)}
              className="rounded-lg border px-4 py-2 text-sm font-semibold text-gray-900 transition duration-300 ease-in-out hover:bg-gray-50"
            >
              Back to test
            </button>
            <button
              onClick={resetAll}
              className="rounded-lg bg-[#2094F3] px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:brightness-110"
            >
              Reset test
            </button>
          </div>
        </div>
      </>
    );

  const renderMCQ = (mcqs: typeof part1MCQ) => {
    const q = mcqs[indexInPart];
    const chosen = answers.mcq[q.id];

    return renderCardShell(
      <>
        {renderAudioPanel()}
        {renderTopInstruction()}
        <div className="px-6 py-6">
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border text-sm font-bold text-gray-900">{q.id}</div>
            <div className="flex-1">
              {q.extract ? <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[#2094F3]">{q.extract}</div> : null}
              <div className="text-sm font-semibold text-gray-900">{q.questionHeader}</div>
              <div className="mt-2 text-sm text-gray-700">{q.question}</div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {q.options.map((option, idx) => (
              <label key={idx} className="flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 transition duration-300 ease-in-out hover:bg-gray-50">
                <input
                  type="radio"
                  name={`q_${q.id}`}
                  className="mt-1"
                  checked={chosen === idx}
                  onChange={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      mcq: { ...prev.mcq, [q.id]: idx },
                    }))
                  }
                />
                <span className="text-sm text-gray-800">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderPart2 = () => {
    const q = part2Gaps[indexInPart];
    const value = answers.gaps[q.id] ?? "";

    return renderCardShell(
      <>
        {renderAudioPanel()}
        {renderTopInstruction()}
        <div className="px-6 py-6">
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border text-sm font-bold text-gray-900">{q.id}</div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">{part2Title}</div>
              <div className="mt-2 text-sm text-gray-700">{q.prompt}</div>

              <div className="mt-5">
                <input
                  value={value}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      gaps: { ...prev.gaps, [q.id]: e.target.value },
                    }))
                  }
                  placeholder="Type your answer"
                  className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition duration-300 ease-in-out focus:border-[#2094F3]"
                />
                <div className="mt-2 text-xs text-gray-500">Tip: write a word or short phrase.</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderMatchSelect = (
    questionId: number,
    selected: string,
    options: MatchOption[],
    usedLetters: Set<string>,
    onChange: (value: string) => void
  ) => (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value.toUpperCase())}
      className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition duration-300 ease-in-out focus:border-[#2094F3]"
    >
      <option value="">Select a letter</option>
      {options.map((option) => {
        const isUsedElsewhere = usedLetters.has(option.letter) && option.letter !== selected;
        return (
          <option key={`${questionId}-${option.letter}`} value={option.letter} disabled={isUsedElsewhere}>
            {option.letter} {isUsedElsewhere ? "(used)" : ""}
          </option>
        );
      })}
    </select>
  );

  const renderOptionsList = (title: string, options: MatchOption[]) => (
    <div className="rounded-xl border bg-gray-50 p-4">
      <div className="text-sm font-semibold text-gray-900">{title}</div>
      <div className="mt-3 space-y-2">
        {options.map((option) => (
          <div key={option.letter} className="flex items-start gap-3 text-sm text-gray-800">
            <span className="mt-[2px] inline-flex h-6 w-6 items-center justify-center rounded-md border bg-white text-xs font-bold">{option.letter}</span>
            <span>{option.text}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPart4 = () => {
    const task1 = part4Task1Matches[indexInPart];
    const task2 = part4Task2Matches[indexInPart];
    const selectedTask1 = (answers.matches[task1.id] || "").toUpperCase();
    const selectedTask2 = (answers.matches[task2.id] || "").toUpperCase();

    return renderCardShell(
      <>
        {renderAudioPanel()}
        {renderTopInstruction()}
        <div className="px-6 py-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {renderOptionsList("Task 1: what each speaker usually does before a performance", part4Task1Options)}
            {renderOptionsList("Task 2: what each speaker says went wrong on a recent production", part4Task2Options)}
          </div>

          <div className="mt-6 rounded-xl border bg-white p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-md border text-sm font-bold text-gray-900">{task1.speakerNumber}</div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{task1.speakerLabel}</div>
                <div className="text-xs text-gray-500">Complete both tasks for this speaker.</div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">Task 1 — Question {task1.id}</label>
                {renderMatchSelect(task1.id, selectedTask1, part4Task1Options, usedTask1Letters, (value) =>
                  setAnswers((prev) => ({
                    ...prev,
                    matches: { ...prev.matches, [task1.id]: value || null },
                  }))
                )}
                <div className="mt-2 text-xs text-gray-500">
                  Selected: <span className="font-semibold text-gray-800">{selectedTask1 || "—"}</span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">Task 2 — Question {task2.id}</label>
                {renderMatchSelect(task2.id, selectedTask2, part4Task2Options, usedTask2Letters, (value) =>
                  setAnswers((prev) => ({
                    ...prev,
                    matches: { ...prev.matches, [task2.id]: value || null },
                  }))
                )}
                <div className="mt-2 text-xs text-gray-500">
                  Selected: <span className="font-semibold text-gray-800">{selectedTask2 || "—"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderCurrent = () => {
    if (finished) return renderFinishScreen();
    if (part === 1) return renderMCQ(part1MCQ);
    if (part === 2) return renderPart2();
    if (part === 3) return renderMCQ(part3MCQ);
    return renderPart4();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      {renderCurrent()}
      {renderPartNav()}
    </div>
  );
}
