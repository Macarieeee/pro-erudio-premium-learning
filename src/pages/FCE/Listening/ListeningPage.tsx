// src/pages/fce/listening/ListeningPage.tsx
// Focus fix: avoid defining React components inside the main component and then using them as <Component />
// because they remount on every keystroke and inputs lose focus.

import React, { useEffect, useMemo, useRef, useState } from "react";
import logo from "@/assets/logo.svg";
import {
  part1MCQ,
  part2Gaps,
  part3Matches,
  part3Options,
  part4MCQ,
  TOTAL_QUESTIONS,
} from "./data/listeningData";

type Part = 1 | 2 | 3 | 4;

type AnswersState = {
  mcq: Record<number, number | null>; // qId -> selectedIndex
  gaps: Record<number, string>; // qId -> typed answer
  matches: Record<number, string | null>; // qId -> selectedLetter
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

const LS_KEY = "proerudio_fce_listening_v1";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[’']/g, "'");

function buildInitialState(): AnswersState {
  const mcq: AnswersState["mcq"] = {};
  [...part1MCQ, ...part4MCQ].forEach((q) => (mcq[q.id] = null));

  const gaps: AnswersState["gaps"] = {};
  part2Gaps.forEach((q) => (gaps[q.id] = ""));

  const matches: AnswersState["matches"] = {};
  part3Matches.forEach((q) => (matches[q.id] = null));

  return { mcq, gaps, matches };
}

export default function ListeningPage() {
  const [part, setPart] = useState<Part>(1);
  const [indexInPart, setIndexInPart] = useState(0);
  const [finished, setFinished] = useState(false);

  const [answers, setAnswers] = useState<AnswersState>(() => buildInitialState());

  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState("");

  useEffect(() => {
    // read from localStorage ONLY in browser
    if (typeof window === "undefined") return;

    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as AnswersState;
      setAnswers({ ...buildInitialState(), ...parsed });
    } catch {
      // ignore
    }
  }, []);

  // Persist progress
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LS_KEY, JSON.stringify(answers));
  }, [answers]);

  // Audio handling (single track for whole exam)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const enableAudio = async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      el.muted = false;
      await el.play();
      setAudioEnabled(true);
      setAudioPlaying(true);
    } catch {
      // user gesture should allow it; if not, keep button
      setAudioEnabled(false);
    }
  };

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onPlay = () => setAudioPlaying(true);
    const onPause = () => setAudioPlaying(false);

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);

    // Attempt silent autoplay (allowed), then ask user to enable sound
    el.muted = true;
    el.play().catch(() => {});

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, []);

  // Part datasets for navigation
  const partMeta = useMemo(() => {
    return {
      1: { label: "Part 1", range: "Questions 1–8", count: part1MCQ.length },
      2: { label: "Part 2", range: "Questions 9–18", count: part2Gaps.length },
      3: { label: "Part 3", range: "Questions 19–23", count: part3Matches.length },
      4: { label: "Part 4", range: "Questions 24–30", count: part4MCQ.length },
    } as const;
  }, []);

  useEffect(() => {
    setIndexInPart((i) => {
      const max = partMeta[part].count - 1;
      return Math.min(i, Math.max(0, max));
    });
  }, [part, partMeta]);

  const currentTotalInPart = partMeta[part].count;
  const goPrev = () => setIndexInPart((i) => Math.max(0, i - 1));
  const goNext = () => setIndexInPart((i) => Math.min(currentTotalInPart - 1, i + 1));

  const resetAll = () => {
    setAnswers(buildInitialState());
    setPart(1);
    setIndexInPart(0);
    setFinished(false);
  };

  // Score + breakdown
  const score = useMemo(() => {
    let s = 0;
    // Part 1 + 4 MCQ
    [...part1MCQ, ...part4MCQ].forEach((q) => {
      if (answers.mcq[q.id] === q.correctIndex) s += 1;
    });
    // Part 2 gaps
    part2Gaps.forEach((q) => {
      const v = normalize(answers.gaps[q.id] || "");
      const ok = q.correctAnswers.some((c) => normalize(c) === v);
      if (v && ok) s += 1;
    });
    // Part 3 matches
    part3Matches.forEach((q) => {
      const v = (answers.matches[q.id] || "").toUpperCase();
      if (v && v === q.correctLetter.toUpperCase()) s += 1;
    });
    return s;
  }, [answers]);

  const breakdown = useMemo(() => {
    let p1 = 0,
      p2 = 0,
      p3 = 0,
      p4 = 0;
    part1MCQ.forEach((q) => {
      if (answers.mcq[q.id] === q.correctIndex) p1 += 1;
    });
    part2Gaps.forEach((q) => {
      const v = normalize(answers.gaps[q.id] || "");
      const ok = q.correctAnswers.some((c) => normalize(c) === v);
      if (v && ok) p2 += 1;
    });
    part3Matches.forEach((q) => {
      const v = (answers.matches[q.id] || "").toUpperCase();
      if (v && v === q.correctLetter.toUpperCase()) p3 += 1;
    });
    part4MCQ.forEach((q) => {
      if (answers.mcq[q.id] === q.correctIndex) p4 += 1;
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
    const part1 = part1MCQ.map((q) => {
      const selectedIndex = answers.mcq[q.id];
      const isCorrect = selectedIndex === q.correctIndex;
      return {
        part: "Part 1",
        questionId: q.id,
        questionText: [q.questionHeader, q.question].filter(Boolean).join(" — "),
        studentAnswer: selectedIndex === null || selectedIndex === undefined ? "No answer" : q.options[selectedIndex],
        correctAnswer: q.options[q.correctIndex],
        isCorrect,
        points: isCorrect ? 1 : 0,
        maxPoints: 1,
      };
    });

    const part2 = part2Gaps.map((q) => {
      const value = answers.gaps[q.id] || "";
      const normalizedValue = normalize(value);
      const isCorrect = Boolean(normalizedValue) && q.correctAnswers.some((c) => normalize(c) === normalizedValue);
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

    const part3 = part3Matches.map((q) => {
      const selectedLetter = (answers.matches[q.id] || "").toUpperCase();
      const correctLetter = q.correctLetter.toUpperCase();
      const selectedOption = part3Options.find((opt) => opt.letter === selectedLetter);
      const correctOption = part3Options.find((opt) => opt.letter === correctLetter);
      const isCorrect = Boolean(selectedLetter) && selectedLetter === correctLetter;
      return {
        part: "Part 3",
        questionId: q.id,
        questionText: q.speakerLabel,
        studentAnswer: selectedOption ? `${selectedOption.letter} — ${selectedOption.text}` : "No answer",
        correctAnswer: correctOption ? `${correctOption.letter} — ${correctOption.text}` : correctLetter,
        isCorrect,
        points: isCorrect ? 1 : 0,
        maxPoints: 1,
      };
    });

    const part4 = part4MCQ.map((q) => {
      const selectedIndex = answers.mcq[q.id];
      const isCorrect = selectedIndex === q.correctIndex;
      return {
        part: "Part 4",
        questionId: q.id,
        questionText: [q.questionHeader, q.question].filter(Boolean).join(" — "),
        studentAnswer: selectedIndex === null || selectedIndex === undefined ? "No answer" : q.options[selectedIndex],
        correctAnswer: q.options[q.correctIndex],
        isCorrect,
        points: isCorrect ? 1 : 0,
        maxPoints: 1,
      };
    });

    return [...part1, ...part2, ...part3, ...part4];
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

    const endpoint = import.meta.env.VITE_LISTENING_RESULTS_API_URL;

    if (!endpoint) {
      setSendError("Missing VITE_LISTENING_RESULTS_API_URL in the environment file.");
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName: studentName.trim(),
          studentEmail: studentEmail.trim(),
          totalScore: score,
          maxScore: TOTAL_QUESTIONS,
          percentage,
          resultMessage,
          breakdown,
          detailedAnswers,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "The email could not be sent.");
      }

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

  // Used letters in Part 3 (single-use enforcement)
  const usedLetters = useMemo(() => {
    const used = new Set<string>();
    Object.values(answers.matches).forEach((v) => {
      if (v) used.add(v.toUpperCase());
    });
    return used;
  }, [answers.matches]);

  // -----------------------------
  // Render helpers (NOT components)
  // -----------------------------
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
            <div className="text-xs text-gray-500">FCE Listening</div>
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <div className="text-xs text-gray-600">
            <div className="font-semibold text-gray-900">Candidate ID</div>
            <div className="text-gray-500">{audioPlaying ? "Audio is playing" : "Audio is paused"}</div>
          </div>

          {!audioEnabled && (
            <button
              onClick={enableAudio}
              className="rounded-lg bg-[#2094F3] px-3 py-2 text-xs font-semibold text-white transition duration-300 ease-in-out hover:brightness-110"
            >
              Enable audio
            </button>
          )}

          <button
            onClick={() => setFinished(true)}
            className="rounded-lg border px-3 py-2 text-xs font-semibold text-gray-900 transition duration-300 ease-in-out hover:bg-gray-50"
          >
            Finish test
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {!audioEnabled && (
            <button
              onClick={enableAudio}
              className="rounded-lg bg-[#2094F3] px-3 py-2 text-xs font-semibold text-white transition duration-300 ease-in-out hover:brightness-110"
            >
              Audio
            </button>
          )}
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

  const renderTopInstruction = () => (
    <div className="border-b px-6 py-5">
      <div className="text-sm font-semibold text-gray-900">{partMeta[part].range}</div>
      <div className="mt-1 text-sm text-gray-600">
        {part === 1 || part === 4
          ? "For each question, choose the correct answer."
          : part === 2
            ? "For questions 9–18, complete the sentences with a word or a short phrase."
            : "For questions 19–23, choose from the list (A–H). Use the letters only once."}
      </div>
    </div>
  );

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
              <div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p1}/8</div>
            </div>
            <div className="rounded-xl border bg-gray-50 p-4">
              <div className="text-xs font-semibold text-gray-700">Part 2</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p2}/10</div>
            </div>
            <div className="rounded-xl border bg-gray-50 p-4">
              <div className="text-xs font-semibold text-gray-700">Part 3</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p3}/5</div>
            </div>
            <div className="rounded-xl border bg-gray-50 p-4">
              <div className="text-xs font-semibold text-gray-700">Part 4</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p4}/7</div>
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

            {sendError ? (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{sendError}</div>
            ) : null}

            {sendSuccess ? (
              <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                The listening result was sent successfully.
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

  const renderPart1or4 = (mcqs: typeof part1MCQ) => {
    const q = mcqs[indexInPart];
    const chosen = answers.mcq[q.id];

    return renderCardShell(
      <>
        {renderTopInstruction()}
        <div className="px-6 py-6">
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border text-sm font-bold text-gray-900">
              {q.id}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">{q.questionHeader}</div>
              {q.question ? <div className="mt-2 text-sm text-gray-700">{q.question}</div> : null}
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {q.options.map((opt, idx) => (
              <label
                key={idx}
                className="flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 transition duration-300 ease-in-out hover:bg-gray-50"
              >
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
                <span className="text-sm text-gray-800">{opt}</span>
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
        {renderTopInstruction()}
        <div className="px-6 py-6">
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border text-sm font-bold text-gray-900">
              {q.id}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">The Albuquerque Balloon Festival</div>
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
                <div className="mt-2 text-xs text-gray-500">Tip: one word or a short phrase.</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderPart3 = () => {
    const q = part3Matches[indexInPart];
    if (!q) {
      return renderCardShell(
        <>
          {renderTopInstruction()}
          <div className="px-6 py-6 text-sm text-gray-700">Something went wrong. Please select a question again.</div>
        </>
      );
    }
    const selected = (answers.matches[q.id] || "").toUpperCase();

    return renderCardShell(
      <>
        {renderTopInstruction()}
        <div className="px-6 py-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border bg-gray-50 p-4">
              <div className="text-sm font-semibold text-gray-900">Options (A–H)</div>
              <div className="mt-3 space-y-2">
                {part3Options.map((opt) => (
                  <div key={opt.letter} className="flex items-start gap-3 text-sm text-gray-800">
                    <span className="mt-[2px] inline-flex h-6 w-6 items-center justify-center rounded-md border bg-white text-xs font-bold">
                      {opt.letter}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-gray-500">Letters can only be used once.</div>
            </div>

            <div>
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-md border text-sm font-bold text-gray-900">
                  {q.id}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">{q.speakerLabel}</div>
                  <div className="mt-2 text-sm text-gray-700">Choose the letter (A–H) that matches how the speaker felt.</div>

                  <div className="mt-5">
                    <select
                      value={selected}
                      onChange={(e) => {
                        const v = e.target.value.toUpperCase();
                        setAnswers((prev) => ({
                          ...prev,
                          matches: { ...prev.matches, [q.id]: v || null },
                        }));
                      }}
                      className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition duration-300 ease-in-out focus:border-[#2094F3]"
                    >
                      <option value="">Select a letter</option>
                      {part3Options.map((opt) => {
                        const isUsedElsewhere = usedLetters.has(opt.letter) && opt.letter !== selected;
                        return (
                          <option key={opt.letter} value={opt.letter} disabled={isUsedElsewhere}>
                            {opt.letter} {isUsedElsewhere ? "(used)" : ""}
                          </option>
                        );
                      })}
                    </select>

                    <div className="mt-2 text-xs text-gray-500">
                      Selected: <span className="font-semibold text-gray-800">{selected || "—"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Part renderer
  const renderCurrent = () => {
    if (finished) return renderFinishScreen();
    if (part === 1) return renderPart1or4(part1MCQ);
    if (part === 2) return renderPart2();
    if (part === 3) return renderPart3();
    return renderPart1or4(part4MCQ);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}

      {/* audio */}
      <audio ref={audioRef} src="/audio/fce-listening.mp3" preload="auto" />

      {renderCurrent()}
      {renderPartNav()}
    </div>
  );
}
