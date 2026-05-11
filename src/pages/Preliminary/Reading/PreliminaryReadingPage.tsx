import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import {
  Letter,
  MatchingQuestion,
  MCQQuestion,
  OpenGapQuestion,
  TOTAL_QUESTIONS,
  meta,
  part1MCQ,
  part2People,
  part2Programmes,
  part3MCQ,
  part3Text,
  part3Title,
  part4Options,
  part4Paragraphs,
  part4Questions,
  part4Title,
  part5MCQ,
  part5Text,
  part5Title,
  part6OpenGaps,
  part6Text,
  part6Title,
} from "./data/preliminaryReadingData";

type Part = 1 | 2 | 3 | 4 | 5 | 6;

type AnswersState = {
  mcq: Record<number, Letter | null>;
  matching: Record<number, Letter | null>;
  text: Record<number, string>;
};

const LS_KEY = "proerudio_preliminary_reading_v1";
const STUDENT_INFO_KEY = "proerudio_preliminary_student_info";
const NEXT_WRITING_PATH = "/preliminary/writing";
const TIMER_DURATION_SECONDS = 45 * 60; // 45min
const TIMER_WARNING_SECONDS = 10 * 60; // warning at 10min left

const formatCountdown = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const preliminaryReadingPartInfo: Record<Part, { exam: string; level: string; section: string; task: string }> = {
  1: { exam: "B1 Preliminary (PET)", level: "Level B1", section: "Reading — Part 1", task: "Multiple choice" },
  2: { exam: "B1 Preliminary (PET)", level: "Level B1", section: "Reading — Part 2", task: "Matching" },
  3: { exam: "B1 Preliminary (PET)", level: "Level B1", section: "Reading — Part 3", task: "Multiple choice" },
  4: { exam: "B1 Preliminary (PET)", level: "Level B1", section: "Reading — Part 4", task: "Gapped text" },
  5: { exam: "B1 Preliminary (PET)", level: "Level B1", section: "Reading — Part 5", task: "Multiple-choice cloze" },
  6: { exam: "B1 Preliminary (PET)", level: "Level B1", section: "Reading — Part 6", task: "Open cloze" },
};

const formatTimeSpent = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ");

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function buildInitialState(): AnswersState {
  const mcq: AnswersState["mcq"] = {};
  const matching: AnswersState["matching"] = {};
  const text: AnswersState["text"] = {};

  [...part1MCQ, ...part3MCQ, ...part5MCQ].forEach((q) => {
    mcq[q.id] = null;
  });

  [...part2People, ...part4Questions].forEach((q) => {
    matching[q.id] = null;
  });

  part6OpenGaps.forEach((q) => {
    text[q.id] = "";
  });

  return { mcq, matching, text };
}

const CardShell = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6">
    <div className="rounded-xl border bg-white shadow-sm">{children}</div>
  </div>
);

export default function PreliminaryReadingPage() {
  const [part, setPart] = useState<Part>(1);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION_SECONDS);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [hasShownTimeWarning, setHasShownTimeWarning] = useState(false);
  const [answers, setAnswers] = useState<AnswersState>(() => buildInitialState());
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState("");
  const [openPart5Gap, setOpenPart5Gap] = useState<number | null>(null);
  const [openPart4Gap, setOpenPart4Gap] = useState<number | null>(null);

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

    const studentInfo = safeParse<{ studentName?: string; studentEmail?: string }>(
      window.localStorage.getItem(STUDENT_INFO_KEY)
    );

    if (studentInfo) {
      setStudentName(studentInfo.studentName || "");
      setStudentEmail(studentInfo.studentEmail || "");
    }

    const parsed = safeParse<AnswersState>(window.localStorage.getItem(LS_KEY));
    if (parsed) {
      const initial = buildInitialState();
      setAnswers({
        mcq: { ...initial.mcq, ...(parsed.mcq || {}) },
        matching: { ...initial.matching, ...(parsed.matching || {}) },
        text: { ...initial.text, ...(parsed.text || {}) },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LS_KEY, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    if (finished) return;

    const interval = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          setFinished(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [finished]);

  useEffect(() => {
    if (!finished && timeLeft === TIMER_WARNING_SECONDS && !hasShownTimeWarning) {
      setShowTimeWarning(true);
      setHasShownTimeWarning(true);
    }
  }, [timeLeft, finished, hasShownTimeWarning]);

  const setMCQ = (id: number, value: Letter) => {
    setAnswers((prev) => ({ ...prev, mcq: { ...prev.mcq, [id]: value } }));
  };

  const setMatching = (id: number, value: Letter) => {
    setAnswers((prev) => ({ ...prev, matching: { ...prev.matching, [id]: value } }));
  };

  const setText = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, text: { ...prev.text, [id]: value } }));
  };

  const resetAll = () => {
    const initial = buildInitialState();
    setAnswers(initial);
    setFinished(false);
    setTimeLeft(TIMER_DURATION_SECONDS);
    setShowTimeWarning(false);
    setHasShownTimeWarning(false);
    setPart(1);
    setStudentName("");
    setStudentEmail("");
    setSendSuccess(false);
    setSendError("");
    testStartTimeRef.current = Date.now();
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LS_KEY, JSON.stringify(initial));
    }
  };

  const scoreMCQ = (questions: MCQQuestion[]) =>
    questions.reduce((total, q) => total + (answers.mcq[q.id] === q.correctLetter ? 1 : 0), 0);

  const scoreMatching = (questions: MatchingQuestion[]) =>
    questions.reduce((total, q) => total + (answers.matching[q.id] === q.correctLetter ? 1 : 0), 0);

  const scoreOpen = (questions: OpenGapQuestion[]) =>
    questions.reduce((total, q) => {
      const studentAnswer = normalize(answers.text[q.id] || "");
      return total + (q.answers.map(normalize).includes(studentAnswer) ? 1 : 0);
    }, 0);

  const breakdown = useMemo(
    () => ({
      p1: scoreMCQ(part1MCQ),
      p2: scoreMatching(part2People),
      p3: scoreMCQ(part3MCQ),
      p4: scoreMatching(part4Questions),
      p5: scoreMCQ(part5MCQ),
      p6: scoreOpen(part6OpenGaps),
    }),
    [answers]
  );

  const score = breakdown.p1 + breakdown.p2 + breakdown.p3 + breakdown.p4 + breakdown.p5 + breakdown.p6;
  const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);

  const resultMessage =
    percentage >= 85
      ? "Excellent work. The result is very strong."
      : percentage >= 70
        ? "Good result. There are a few areas to review."
        : percentage >= 50
          ? "Acceptable result, but the student should revise the weaker parts."
          : "The student needs more practice before attempting the full exam again.";

  const detailedAnswers = useMemo(() => {
    const rows: Array<{
      questionId: number;
      part: string;
      studentAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
      points: number;
      maxPoints: number;
    }> = [];

    const pushMCQ = (questions: MCQQuestion[], partLabel: string) => {
      questions.forEach((q) => {
        const studentAnswer = answers.mcq[q.id] || "—";
        const ok = studentAnswer === q.correctLetter;
        rows.push({
          questionId: q.id,
          part: partLabel,
          studentAnswer,
          correctAnswer: q.correctLetter,
          isCorrect: ok,
          points: ok ? 1 : 0,
          maxPoints: 1,
        });
      });
    };

    const pushMatching = (questions: MatchingQuestion[], partLabel: string) => {
      questions.forEach((q) => {
        const studentAnswer = answers.matching[q.id] || "—";
        const ok = studentAnswer === q.correctLetter;
        rows.push({
          questionId: q.id,
          part: partLabel,
          studentAnswer,
          correctAnswer: q.correctLetter,
          isCorrect: ok,
          points: ok ? 1 : 0,
          maxPoints: 1,
        });
      });
    };

    pushMCQ(part1MCQ, "Part 1");
    pushMatching(part2People, "Part 2");
    pushMCQ(part3MCQ, "Part 3");
    pushMatching(part4Questions, "Part 4");
    pushMCQ(part5MCQ, "Part 5");

    part6OpenGaps.forEach((q) => {
      const studentAnswer = answers.text[q.id] || "—";
      const ok = q.answers.map(normalize).includes(normalize(studentAnswer));
      rows.push({
        questionId: q.id,
        part: "Part 6",
        studentAnswer,
        correctAnswer: q.answers.join(" / "),
        isCorrect: ok,
        points: ok ? 1 : 0,
        maxPoints: 1,
      });
    });

    return rows;
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

    const apiUrl = import.meta.env.VITE_PRELIMINARY_READING_RESULTS_API_URL || import.meta.env.VITE_READING_RESULTS_API_URL;

    if (!apiUrl) {
      setSendError("Missing VITE_PRELIMINARY_READING_RESULTS_API_URL or VITE_READING_RESULTS_API_URL. Please set the API URL in your .env file.");
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exam: "Preliminary Reading",
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

      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error || "The email could not be sent.");
      setSendSuccess(true);
    } catch (error) {
      console.error(error);
      setSendError("The email could not be sent. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const Header = () => (
    <div className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Pro Erudio" className="h-12 w-auto" />
          <div>
            <div className="text-lg font-bold text-gray-900">Pro Erudio</div>
            <div className="text-sm text-gray-600">B1 Preliminary Reading</div>
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

  const ExamInfo = () => {
    const info = preliminaryReadingPartInfo[part];

    return (
      <div className="border-b bg-primary/5 px-6 py-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            {info.exam}
          </span>
          <span className="rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary">
            {info.level}
          </span>
        </div>
        <div className="mt-3 text-2xl font-bold text-gray-900">{info.section}</div>
        <div className="mt-1 text-sm font-semibold text-gray-600">{info.task}</div>
      </div>
    );
  };

  const TopInstruction = () => (
    <>
      <ExamInfo />
      <div className="border-b px-6 py-5">
        <div className="text-sm font-semibold text-gray-900">{meta[part].range}</div>
        <div className="mt-1 text-sm text-gray-600">{meta[part].instruction}</div>
      </div>
    </>
  );

  const PartNav = () => (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs font-semibold text-gray-700">Part</span>
          {([1, 2, 3, 4, 5, 6] as Part[]).map((p) => (
            <button
              key={p}
              onClick={() => {
                setPart(p);
                setOpenPart4Gap(null);
                setOpenPart5Gap(null);
              }}
              className={[
                "rounded-md px-3 py-2 text-xs font-semibold transition duration-300 ease-in-out",
                part === p ? "bg-primary text-white" : "border text-gray-700 hover:bg-gray-50",
              ].join(" ")}
            >
              {p}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={resetAll}
              className="rounded-lg border px-3 py-2 text-sm font-semibold text-gray-900 transition duration-300 ease-in-out hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SelectLetter = ({ value, onChange, letters }: { value: Letter | null; onChange: (v: Letter) => void; letters: Letter[] }) => (
    <select
      value={value || ""}
      onChange={(event) => onChange(event.target.value as Letter)}
      className="rounded-lg border bg-white px-3 py-2 text-sm font-semibold outline-none transition duration-300 ease-in-out focus:border-primary"
    >
      <option value="">Choose</option>
      {letters.map((letter) => (
        <option key={letter} value={letter}>
          {letter}
        </option>
      ))}
    </select>
  );

  const MCQBlock = ({ questions }: { questions: MCQQuestion[] }) => (
    <div className="space-y-5">
      {questions.map((q) => (
        <article key={q.id} className="rounded-xl border bg-white p-5">
          {q.prompt && (
            <div className="mb-4 whitespace-pre-wrap rounded-lg border bg-gray-50 p-4 text-sm font-semibold leading-7 text-gray-900">
              {q.prompt}
            </div>
          )}
          <div className="text-sm font-bold text-gray-900">
            {q.id}. {q.question}
          </div>
          <div className="mt-4 grid gap-3">
            {q.options.map((option) => {
              const active = answers.mcq[q.id] === option.label;
              return (
                <button
                  type="button"
                  key={option.label}
                  onClick={() => setMCQ(q.id, option.label)}
                  className={[
                    "flex items-start gap-3 rounded-lg border px-4 py-3 text-left transition duration-300 ease-in-out",
                    active ? "border-primary bg-primary/5" : "bg-white hover:bg-gray-50",
                  ].join(" ")}
                >
                  <span className={[
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                    active ? "border-primary bg-primary text-white" : "bg-gray-50 text-gray-800",
                  ].join(" ")}
                  >
                    {option.label}
                  </span>
                  <span className="text-sm leading-6 text-gray-800">{option.text}</span>
                </button>
              );
            })}
          </div>
        </article>
      ))}
    </div>
  );

  const renderTextWithGaps = (text: string, kind: "mcq" | "matching" | "input") => {
    const tokens = text.split(/(\[\[\d+\]\])/g);

    return tokens.map((token, index) => {
      const match = token.match(/\[\[(\d+)\]\]/);
      if (!match) return <span key={index}>{token}</span>;

      const id = Number(match[1]);

      if (kind === "mcq") {
        const q = part5MCQ.find((item) => item.id === id);
        const selectedLetter = answers.mcq[id];
        const chosen = q && selectedLetter
          ? q.options.find((opt) => opt.label === selectedLetter)?.text
          : "";

        return (
          <span key={index} className="relative mx-1 inline-flex align-baseline">
            <button
              type="button"
              onClick={() => setOpenPart5Gap((prev) => (prev === id ? null : id))}
              className={[
                "inline-flex min-w-[94px] items-center justify-center rounded-xl border px-3 py-1 text-sm font-semibold transition duration-300 ease-in-out",
                selectedLetter
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-gray-200 bg-gray-50 text-gray-700 hover:border-primary/60",
              ].join(" ")}
            >
              <span className="mr-2 text-xs font-bold text-gray-500">{id}</span>
              {chosen || "—"}
            </button>

            {openPart5Gap === id && q && (
              <div className="absolute left-0 top-full z-50 mt-2 min-w-[260px] rounded-xl border bg-white p-2 shadow-xl">
                <div className="mb-2 px-2 text-xs font-bold text-gray-500">
                  Choose answer {id}
                </div>

                <div className="grid gap-2">
                  {q.options.map((option) => {
                    const active = selectedLetter === option.label;

                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => {
                          setMCQ(id, option.label);
                          setOpenPart5Gap(null);
                        }}
                        className={[
                          "flex items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition duration-300 ease-in-out",
                          active
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                            active
                              ? "border-primary bg-primary text-white"
                              : "bg-gray-50 text-gray-800",
                          ].join(" ")}
                        >
                          {option.label}
                        </span>

                        <span className="leading-5">{option.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </span>
        );
      }

      if (kind === "matching") {
        const selectedLetter = answers.matching[id] || "";

        const usedLetters = new Set(
          [16, 17, 18, 19, 20]
            .map((questionId) => answers.matching[questionId])
            .filter(Boolean)
        );

        const availableOptions = part4Options.filter((option) => {
          return option.label === selectedLetter || !usedLetters.has(option.label);
        });

        return (
          <span key={index} className="relative mx-1 inline-flex align-baseline">
            <button
              type="button"
              onClick={() => setOpenPart4Gap((prev) => (prev === id ? null : id))}
              className={[
                "inline-flex min-w-[74px] items-center justify-center rounded-xl border px-3 py-1 text-sm font-semibold transition duration-300 ease-in-out",
                selectedLetter
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-gray-200 bg-gray-50 text-gray-700 hover:border-primary/60",
              ].join(" ")}
            >
              <span className="mr-2 text-xs font-bold text-gray-500">{id}</span>
              {selectedLetter || "—"}
            </button>

            {openPart4Gap === id && (
              <div className="absolute left-0 top-full z-50 mt-2 w-[420px] max-w-[80vw] rounded-xl border bg-white p-2 shadow-xl">
                <div className="mb-2 px-2 text-xs font-bold text-gray-500">
                  Choose sentence {id}
                </div>

                <div className="grid max-h-[360px] gap-2 overflow-y-auto pr-1">
                  {availableOptions.map((option) => {
                    const active = selectedLetter === option.label;

                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => {
                          setMatching(id, option.label);
                          setOpenPart4Gap(null);
                        }}
                        className={[
                          "flex items-start gap-3 rounded-lg border px-3 py-2 text-left text-sm transition duration-300 ease-in-out",
                          active
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                            active
                              ? "border-primary bg-primary text-white"
                              : "bg-gray-50 text-gray-800",
                          ].join(" ")}
                        >
                          {option.label}
                        </span>

                        <span className="leading-5">{option.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </span>
        );
      }

      return (
        <span key={index} className="mx-1 inline-flex items-center gap-1 align-baseline">
          <span className="text-xs font-bold text-gray-500">{id}</span>
          <input
            value={answers.text[id] || ""}
            onChange={(event) => setText(id, event.target.value)}
            placeholder="one word"
            className="inline-flex min-w-[130px] rounded-md border px-3 py-2 text-sm font-semibold outline-none transition duration-300 ease-in-out focus:border-primary"
          />
        </span>
      );
    });
  };

  const Part1 = () => (
    <CardShell>
      {TopInstruction()}
      <div className="px-6 py-6">
        <MCQBlock questions={part1MCQ} />
      </div>
    </CardShell>
  );

  const Part2 = () => (
    <CardShell>
      {TopInstruction()}
      <div className="grid gap-5 px-6 py-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <div className="text-xl font-bold text-gray-900">People</div>
          {part2People.map((person) => (
            <article key={person.id} className="rounded-xl border bg-white p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="text-sm font-bold text-gray-900">{person.id}.</div>
                {SelectLetter({
                  value: answers.matching[person.id],
                  onChange: (value) => setMatching(person.id, value),
                  letters: ["A", "B", "C", "D", "E", "F", "G", "H"],
                })}
              </div>
              <p className="text-sm leading-6 text-gray-700">{person.text}</p>
            </article>
          ))}
        </div>

        <div>
          <div className="text-xl font-bold text-gray-900">TV Programmes</div>
          <div className="mt-4 space-y-3">
            {part2Programmes.map((programme) => (
              <article key={programme.label} className="rounded-xl border bg-gray-50 p-4">
                <div className="text-sm font-bold text-gray-900">
                  {programme.label}. {programme.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-gray-700">{programme.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </CardShell>
  );

  const Part3 = () => (
    <CardShell>
      {TopInstruction()}
      <div className="grid gap-5 px-6 py-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-xl border bg-white p-5">
          <div className="text-2xl font-bold text-gray-900">{part3Title}</div>
          <div className="mt-4 whitespace-pre-wrap text-base leading-8 text-gray-900">{part3Text}</div>
        </div>
        <MCQBlock questions={part3MCQ} />
      </div>
    </CardShell>
  );

  const Part4 = () => (
    <CardShell>
      {TopInstruction()}

      <div className="px-6 py-6">
        <div className="rounded-xl border bg-white p-5">
          <div className="text-2xl font-bold text-gray-900">{part4Title}</div>

          <div className="mt-2 text-sm text-gray-600">
            Click on a gap to choose the correct sentence. Each sentence can be used only once.
          </div>

          <div className="mt-5 space-y-5 text-base leading-9 text-gray-900">
            {part4Paragraphs.map((paragraph, index) => (
              <p key={index}>{renderTextWithGaps(paragraph, "matching")}</p>
            ))}
          </div>
        </div>
      </div>
    </CardShell>
  );

  const Part5 = () => (
    <CardShell>
      {TopInstruction()}

      <div className="px-6 py-6">
        <div className="rounded-xl border bg-white p-5">
          <div className="text-2xl font-bold text-gray-900">{part5Title}</div>

          <div className="mt-2 text-sm text-gray-600">
            Click on a gap to choose the correct answer.
          </div>

          <div className="mt-5 whitespace-pre-wrap text-base leading-9 text-gray-900">
            {renderTextWithGaps(part5Text, "mcq")}
          </div>
        </div>
      </div>
    </CardShell>
  );

  const Part6 = () => (
    <CardShell>
      {TopInstruction()}
      <div className="px-6 py-6">
        <div className="rounded-xl border bg-white p-5">
          <div className="text-2xl font-bold text-gray-900">{part6Title}</div>
          <div className="mt-4 whitespace-pre-wrap text-base leading-8 text-gray-900">
            {renderTextWithGaps(part6Text, "input")}
          </div>
        </div>
      </div>
    </CardShell>
  );

  const FinishScreen = () => (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-6">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xl font-bold text-gray-900">Test finished</div>
            <div className="mt-1 text-sm text-gray-600">Here is the student’s final result.</div>
          </div>

          <div className="rounded-xl bg-gray-50 px-4 py-3 text-right">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Final score</div>
            <div className="text-3xl font-bold text-gray-900">{score} / {TOTAL_QUESTIONS}</div>
            <div className="text-sm text-gray-600">{percentage}%</div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border bg-primary/5 px-4 py-3">
          <div className="text-sm font-semibold text-gray-900">{resultMessage}</div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border bg-gray-50 p-4"><div className="text-xs font-semibold text-gray-700">Part 1</div><div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p1}/5</div></div>
          <div className="rounded-xl border bg-gray-50 p-4"><div className="text-xs font-semibold text-gray-700">Part 2</div><div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p2}/5</div></div>
          <div className="rounded-xl border bg-gray-50 p-4"><div className="text-xs font-semibold text-gray-700">Part 3</div><div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p3}/5</div></div>
          <div className="rounded-xl border bg-gray-50 p-4"><div className="text-xs font-semibold text-gray-700">Part 4</div><div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p4}/5</div></div>
          <div className="rounded-xl border bg-gray-50 p-4"><div className="text-xs font-semibold text-gray-700">Part 5</div><div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p5}/6</div></div>
          <div className="rounded-xl border bg-gray-50 p-4"><div className="text-xs font-semibold text-gray-700">Part 6</div><div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p6}/6</div></div>
        </div>

        <div className="mt-8 rounded-xl border bg-gray-50 p-5">
          <div className="text-sm font-bold text-gray-900">Send result by email</div>
          <div className="mt-1 text-sm text-gray-600">Add the student details below and send the final result.</div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <input
              type="text"
              placeholder="Student name"
              value={studentName}
              onChange={(event) => setStudentName(event.target.value)}
              className="rounded-lg border bg-white px-4 py-3 text-sm outline-none transition duration-300 ease-in-out focus:border-primary"
            />
            <input
              type="email"
              placeholder="Student email"
              value={studentEmail}
              onChange={(event) => setStudentEmail(event.target.value)}
              className="rounded-lg border bg-white px-4 py-3 text-sm outline-none transition duration-300 ease-in-out focus:border-primary"
            />
          </div>

          {sendSuccess && (
            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                Result sent successfully.
              </div>

              <Link
                to={NEXT_WRITING_PATH}
                className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:brightness-110"
              >
                Continue to Writing
              </Link>
            </div>
          )}
          {sendError && <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{sendError}</div>}
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
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:brightness-110"
          >
            Reset test
          </button>
          <button
            onClick={sendResultEmail}
            disabled={isSending}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSending ? "Sending..." : "Send result"}
          </button>
        </div>
      </div>
    </div>
  );

  const renderCurrentPart = () => {
    if (part === 1) return Part1();
    if (part === 2) return Part2();
    if (part === 3) return Part3();
    if (part === 4) return Part4();
    if (part === 5) return Part5();
    return Part6();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      {showTimeWarning && !finished && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="text-xl font-bold text-gray-900">10 minutes left</div>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              You have 10 minutes remaining to complete this part of the B1 Preliminary test.
            </p>
            <button
              type="button"
              onClick={() => setShowTimeWarning(false)}
              className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:brightness-110"
            >
              Continue test
            </button>
          </div>
        </div>
      )}
      {finished ? <FinishScreen /> : renderCurrentPart()}
      {!finished && <PartNav />}
    </div>
  );
}
