// src/pages/Preliminary/Listening/PreliminaryListeningPage.tsx

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import {
  audioByPart,
  part1MCQ,
  part2MCQ,
  part3Gaps,
  part4MCQ,
  TOTAL_QUESTIONS,
  type MCQ,
  type PreliminaryPart,
} from "./data/preliminaryListeningData";

type AnswersState = {
  mcq: Record<number, "A" | "B" | "C" | null>;
  gaps: Record<number, string>;
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

const LS_KEY = "proerudio_preliminary_listening_v1";
const STUDENT_INFO_KEY = "proerudio_preliminary_student_info";
const NEXT_READING_PATH = "/preliminary/reading";

const formatTimeSpent = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

const normalize = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[’']/g, "'")
    .replace(/\.$/, "");

function buildInitialState(): AnswersState {
  const mcq: AnswersState["mcq"] = {};
  [...part1MCQ, ...part2MCQ, ...part4MCQ].forEach((q) => (mcq[q.id] = null));

  const gaps: AnswersState["gaps"] = {};
  part3Gaps.forEach((q) => (gaps[q.id] = ""));

  return { mcq, gaps };
}

export default function PreliminaryListeningPage() {
  const [part, setPart] = useState<PreliminaryPart>(1);
  const [indexInPart, setIndexInPart] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<AnswersState>(() => buildInitialState());

  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState("");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const testStartTimeRef = useRef<number>(Date.now());

  const getTimeSpent = () => {
    const totalSeconds = Math.round((Date.now() - testStartTimeRef.current) / 1000);

    return {
      timeSpentSeconds: totalSeconds,
      timeSpentFormatted: formatTimeSpent(totalSeconds),
    };
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const studentInfoRaw = window.localStorage.getItem(STUDENT_INFO_KEY);
    if (studentInfoRaw) {
      try {
        const parsed = JSON.parse(studentInfoRaw);
        setStudentName(parsed.studentName || "");
        setStudentEmail(parsed.studentEmail || "");
      } catch {
        // ignore corrupted localStorage
      }
    }

    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as AnswersState;
      setAnswers({ ...buildInitialState(), ...parsed });
    } catch {
      // ignore corrupted localStorage
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LS_KEY, JSON.stringify(answers));
  }, [answers]);

  const partMeta = useMemo(() => {
    return {
      1: { label: "Part 1", range: "Questions 1–7", count: part1MCQ.length },
      2: { label: "Part 2", range: "Questions 8–13", count: part2MCQ.length },
      3: { label: "Part 3", range: "Questions 14–19", count: part3Gaps.length },
      4: { label: "Part 4", range: "Questions 20–25", count: part4MCQ.length },
    } as const;
  }, []);

  useEffect(() => {
    setIndexInPart((i) => Math.min(i, Math.max(0, partMeta[part].count - 1)));
  }, [part, partMeta]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    el.pause();
    el.currentTime = 0;
    setAudioPlaying(false);
  }, [part]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onPlay = () => setAudioPlaying(true);
    const onPause = () => setAudioPlaying(false);

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, []);

  const enableAudio = async () => {
    const el = audioRef.current;
    if (!el) return;

    try {
      await el.play();
      setAudioEnabled(true);
      setAudioPlaying(true);
    } catch {
      setAudioEnabled(false);
    }
  };

  const currentTotalInPart = partMeta[part].count;
  const goPrev = () => setIndexInPart((i) => Math.max(0, i - 1));
  const goNext = () => setIndexInPart((i) => Math.min(currentTotalInPart - 1, i + 1));

  const resetAll = () => {
    setAnswers(buildInitialState());
    setPart(1);
    setIndexInPart(0);
    setFinished(false);
    setSendSuccess(false);
    setSendError("");
  };

  const score = useMemo(() => {
    let s = 0;

    [...part1MCQ, ...part2MCQ, ...part4MCQ].forEach((q) => {
      if (answers.mcq[q.id] === q.correctLetter) s += 1;
    });

    part3Gaps.forEach((q) => {
      const value = normalize(answers.gaps[q.id] || "");
      const ok = q.correctAnswers.some((c) => normalize(c) === value);
      if (value && ok) s += 1;
    });

    return s;
  }, [answers]);

  const breakdown = useMemo(() => {
    let p1 = 0;
    let p2 = 0;
    let p3 = 0;
    let p4 = 0;

    part1MCQ.forEach((q) => {
      if (answers.mcq[q.id] === q.correctLetter) p1 += 1;
    });

    part2MCQ.forEach((q) => {
      if (answers.mcq[q.id] === q.correctLetter) p2 += 1;
    });

    part3Gaps.forEach((q) => {
      const value = normalize(answers.gaps[q.id] || "");
      const ok = q.correctAnswers.some((c) => normalize(c) === value);
      if (value && ok) p3 += 1;
    });

    part4MCQ.forEach((q) => {
      if (answers.mcq[q.id] === q.correctLetter) p4 += 1;
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

  const getSelectedMCQText = (q: MCQ) => {
    const selectedLetter = answers.mcq[q.id];
    if (!selectedLetter) return "No answer";
    const option = q.options.find((opt) => opt.label === selectedLetter);
    return option ? `${option.label} — ${option.text}` : selectedLetter;
  };

  const getCorrectMCQText = (q: MCQ) => {
    const option = q.options.find((opt) => opt.label === q.correctLetter);
    return option ? `${option.label} — ${option.text}` : q.correctLetter;
  };

  const detailedAnswers = useMemo<DetailedAnswer[]>(() => {
    const mcqDetails = [...part1MCQ, ...part2MCQ, ...part4MCQ].map((q) => {
      const isCorrect = answers.mcq[q.id] === q.correctLetter;
      return {
        part: `Part ${q.part}`,
        questionId: q.id,
        questionText: [q.questionHeader, q.question].filter(Boolean).join(" — "),
        studentAnswer: getSelectedMCQText(q),
        correctAnswer: getCorrectMCQText(q),
        isCorrect,
        points: isCorrect ? 1 : 0,
        maxPoints: 1,
      };
    });

    const gapDetails = part3Gaps.map((q) => {
      const value = answers.gaps[q.id] || "";
      const normalizedValue = normalize(value);
      const isCorrect = Boolean(normalizedValue) && q.correctAnswers.some((c) => normalize(c) === normalizedValue);

      return {
        part: "Part 3",
        questionId: q.id,
        questionText: q.prompt,
        studentAnswer: value.trim() || "No answer",
        correctAnswer: q.correctAnswers.join(" / "),
        isCorrect,
        points: isCorrect ? 1 : 0,
        maxPoints: 1,
      };
    });

    return [...mcqDetails, ...gapDetails].sort((a, b) => a.questionId - b.questionId);
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

    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        STUDENT_INFO_KEY,
        JSON.stringify({
          studentName: studentName.trim(),
          studentEmail: studentEmail.trim(),
        })
      );
    }

    const timeSpent = getTimeSpent();

    const endpoint = import.meta.env.VITE_PRELIMINARY_LISTENING_RESULTS_API_URL || import.meta.env.VITE_LISTENING_RESULTS_API_URL;

    if (!endpoint) {
      setSendError("Missing VITE_PRELIMINARY_LISTENING_RESULTS_API_URL or VITE_LISTENING_RESULTS_API_URL in the environment file.");
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examName: "Preliminary Listening",
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
            <div className="text-xs text-gray-500">Preliminary Listening</div>
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <div className="text-xs text-gray-600">
            <div className="font-semibold text-gray-900">{partMeta[part].label}</div>
            <div className="text-gray-500">{audioPlaying ? "Audio is playing" : "Audio is paused"}</div>
          </div>

          <button
            onClick={enableAudio}
            className="rounded-lg bg-[#2094F3] px-3 py-2 text-xs font-semibold text-white transition duration-300 ease-in-out hover:brightness-110"
          >
            {audioEnabled ? "Play audio" : "Enable audio"}
          </button>

          <button
            onClick={() => setFinished(true)}
            className="rounded-lg border px-3 py-2 text-xs font-semibold text-gray-900 transition duration-300 ease-in-out hover:bg-gray-50"
          >
            Finish test
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={enableAudio}
            className="rounded-lg bg-[#2094F3] px-3 py-2 text-xs font-semibold text-white transition duration-300 ease-in-out hover:brightness-110"
          >
            Audio
          </button>
          <button
            onClick={() => setFinished(true)}
            className="rounded-lg border px-3 py-2 text-xs font-semibold text-gray-900 transition duration-300 ease-in-out hover:bg-gray-50"
          >
            Finish
          </button>
        </div>
      </div>
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
              onClick={() => setPart(p as PreliminaryPart)}
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

  const renderTopInstruction = () => (
    <div className="border-b px-6 py-5">
      <div className="text-sm font-semibold text-gray-900">{partMeta[part].range}</div>
      <div className="mt-1 text-sm text-gray-600">
        {part === 3
          ? "For each question, write the correct answer in the gap. Write one or two words or a number or a date or a time."
          : "For each question, choose the correct answer."}
      </div>
    </div>
  );

  const renderMCQPart = (mcqs: MCQ[]) => {
    const q = mcqs[indexInPart];
    const chosen = answers.mcq[q.id];

    return renderCardShell(
      <>
        {renderTopInstruction()}
        <div className="px-6 py-6">
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border text-sm font-bold text-gray-900">{q.id}</div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">{q.questionHeader}</div>
              {q.question ? <div className="mt-2 text-sm text-gray-700">{q.question}</div> : null}
            </div>
          </div>

          <div className={part === 1 ? "mt-6 grid gap-3 md:grid-cols-3" : "mt-6 space-y-2"}>
            {q.options.map((opt) => (
              <label
                key={opt.label}
                className="flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 transition duration-300 ease-in-out hover:bg-gray-50"
              >
                <input
                  type="radio"
                  name={`q_${q.id}`}
                  className="mt-1"
                  checked={chosen === opt.label}
                  onChange={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      mcq: { ...prev.mcq, [q.id]: opt.label },
                    }))
                  }
                />
                <span className="w-full text-sm text-gray-800">
                  <span className="font-bold">{opt.label}.</span> {opt.text}
                  {opt.imageSrc ? (
                    <img
                      src={opt.imageSrc}
                      alt={`${q.id}${opt.label}`}
                      className="mt-3 aspect-video w-full rounded-lg border bg-gray-50 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : null}
                </span>
              </label>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderPart3 = () => {
    const q = part3Gaps[indexInPart];
    const value = answers.gaps[q.id] ?? "";

    return renderCardShell(
      <>
        {renderTopInstruction()}
        <div className="px-6 py-6">
          <div className="mb-6 rounded-xl border bg-gray-50 p-4">
            <div className="text-sm font-semibold text-gray-900">Mini Olympic Games</div>
            <div className="mt-2 text-sm text-gray-700">Location: Greenford Primary School</div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border text-sm font-bold text-gray-900">{q.id}</div>
            <div className="flex-1">
              <div className="text-sm text-gray-700">{q.prompt}</div>

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
                <div className="mt-2 text-xs text-gray-500">Tip: one or two words, a number, a date or a time.</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderFinishScreen = () =>
    renderCardShell(
      <div className="px-6 py-6">
        <div className="text-xl font-bold text-gray-900">Test finished</div>
        <div className="mt-1 text-sm text-gray-600">
          Your score: <span className="font-semibold text-gray-900">{score}</span> / {TOTAL_QUESTIONS} ({percentage}%)
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <div className="rounded-xl border bg-gray-50 p-4">
            <div className="text-xs font-semibold text-gray-700">Part 1</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p1}/7</div>
          </div>
          <div className="rounded-xl border bg-gray-50 p-4">
            <div className="text-xs font-semibold text-gray-700">Part 2</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p2}/6</div>
          </div>
          <div className="rounded-xl border bg-gray-50 p-4">
            <div className="text-xs font-semibold text-gray-700">Part 3</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p3}/6</div>
          </div>
          <div className="rounded-xl border bg-gray-50 p-4">
            <div className="text-xs font-semibold text-gray-700">Part 4</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p4}/6</div>
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
                The listening result was sent successfully.
              </div>

              <Link
                to={NEXT_READING_PATH}
                className="inline-flex rounded-lg bg-[#2094F3] px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:brightness-110"
              >
                Continue to Reading
              </Link>
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
    );

  const renderCurrent = () => {
    if (finished) return renderFinishScreen();
    if (part === 1) return renderMCQPart(part1MCQ);
    if (part === 2) return renderMCQPart(part2MCQ);
    if (part === 3) return renderPart3();
    return renderMCQPart(part4MCQ);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}

      <audio ref={audioRef} key={part} src={audioByPart[part]} preload="auto" controls className="mx-auto mt-4 block w-full max-w-5xl px-4" />

      {renderCurrent()}
      {renderPartNav()}
    </div>
  );
}
