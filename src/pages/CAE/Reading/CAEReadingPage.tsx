import React, { useEffect, useMemo, useRef, useState } from "react";
import logo from "@/assets/logo.svg";
import { caeReadingData, type MCQOption, type ParagraphOption, type SectionOption, type WriterOption } from "./data/caeReadingData";

type Part = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type LetterOption = MCQOption | ParagraphOption;

type AnswersState = {
  mcq: Record<number, MCQOption | null>;
  text: Record<number, string>;
  letter: Record<number, string | null>;
};

const LS_KEY = "proerudio_cae_reading_v1";
const STUDENT_INFO_KEY = "proerudio_cae_student_info";
const NEXT_WRITING_PATH = "/cae/writing";

// Modify this value when you need a different duration for another test.
// Examples:
// 60 * 60 = 1h
// 75 * 60 = 1h 15min
// 90 * 60 = 1h 30min
const TIMER_DURATION_SECONDS = 90 * 60;
const TIMER_WARNING_SECONDS = 10 * 60; // Warning appears when 10 minutes are left

const formatCountdown = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ");

const formatTimeSpent = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

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
  const text: AnswersState["text"] = {};
  const letter: AnswersState["letter"] = {};

  for (let i = 1; i <= 8; i++) mcq[i] = null;
  for (let i = 9; i <= 30; i++) text[i] = "";
  for (let i = 31; i <= 36; i++) mcq[i] = null;
  for (let i = 37; i <= 56; i++) letter[i] = null;

  return { mcq, text, letter };
}

function tokenizeGaps(input: string) {
  const output: Array<{ type: "text"; value: string } | { type: "gap"; id: number }> = [];
  const re = /\((\d+)\)\s*_{2,}/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(input)) !== null) {
    if (match.index > last) output.push({ type: "text", value: input.slice(last, match.index) });
    output.push({ type: "gap", id: Number(match[1]) });
    last = re.lastIndex;
  }

  if (last < input.length) output.push({ type: "text", value: input.slice(last) });
  return output;
}

const CardShell = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6">
    <div className="rounded-xl border bg-white shadow-sm">{children}</div>
  </div>
);

const getPart4Points = (typedRaw: string, correctAnswers: readonly string[], partialAnswers?: readonly string[]) => {
  const typed = normalize(typedRaw || "");
  if (!typed) return 0;

  if (correctAnswers.some((answer) => normalize(answer) === typed)) return 2;
  if (partialAnswers?.some((answer) => normalize(answer) === typed)) return 1;

  return 0;
};

export default function CAEReadingPage() {
  const [part, setPart] = useState<Part>(1);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION_SECONDS);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [answers, setAnswers] = useState<AnswersState>(() => buildInitialState());
  const [openGap, setOpenGap] = useState<number | null>(null);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState("");
  const testStartTimeRef = useRef<number>(Date.now());
  const timeWarningShownRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const parsed = safeParse<AnswersState>(window.localStorage.getItem(LS_KEY));
    if (parsed) setAnswers({ ...buildInitialState(), ...parsed });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STUDENT_INFO_KEY);
    const parsed = safeParse<{ studentName?: string; studentEmail?: string }>(raw);
    if (!parsed) return;
    setStudentName(parsed.studentName || "");
    setStudentEmail(parsed.studentEmail || "");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LS_KEY, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenGap(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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

  const getTimeSpent = () => {
    const totalSeconds = Math.round((Date.now() - testStartTimeRef.current) / 1000);
    return {
      timeSpentSeconds: totalSeconds,
      timeSpentFormatted: formatTimeSpent(totalSeconds),
    };
  };

  const meta = useMemo(
    () =>
      ({
        1: {
          exam: "C1 Advanced (CAE)",
          paper: "Reading & Use of English",
          partLabel: "Part 1",
          taskType: "Multiple-choice cloze",
          range: "Questions 1–8",
          instruction: "For each question, choose the correct answer for each gap.",
        },
        2: {
          exam: "C1 Advanced (CAE)",
          paper: "Reading & Use of English",
          partLabel: "Part 2",
          taskType: "Open cloze",
          range: "Questions 9–16",
          instruction: "For each question, write one word in each gap.",
        },
        3: {
          exam: "C1 Advanced (CAE)",
          paper: "Reading & Use of English",
          partLabel: "Part 3",
          taskType: "Word formation",
          range: "Questions 17–24",
          instruction: "Use the word in capitals to form a word that fits in the gap.",
        },
        4: {
          exam: "C1 Advanced (CAE)",
          paper: "Reading & Use of English",
          partLabel: "Part 4",
          taskType: "Key word transformations",
          range: "Questions 25–30",
          instruction: "Use between three and six words, including the word given. Do not change the word given.",
        },
        5: {
          exam: "C1 Advanced (CAE)",
          paper: "Reading & Use of English",
          partLabel: "Part 5",
          taskType: "Multiple choice",
          range: "Questions 31–36",
          instruction: "Read the article and choose the correct answer.",
        },
        6: {
          exam: "C1 Advanced (CAE)",
          paper: "Reading & Use of English",
          partLabel: "Part 6",
          taskType: "Cross-text multiple matching",
          range: "Questions 37–40",
          instruction: "Read the four extracts. Each writer may be chosen more than once.",
        },
        7: {
          exam: "C1 Advanced (CAE)",
          paper: "Reading & Use of English",
          partLabel: "Part 7",
          taskType: "Gapped text",
          range: "Questions 41–46",
          instruction: "Choose from paragraphs A–G. There is one extra paragraph which you do not need to use.",
        },
        8: {
          exam: "C1 Advanced (CAE)",
          paper: "Reading & Use of English",
          partLabel: "Part 8",
          taskType: "Multiple matching",
          range: "Questions 47–56",
          instruction: "Choose the correct section. Each section may be chosen more than once.",
        },
      }) as const,
    []
  );

  const setMCQ = (id: number, value: MCQOption) => {
    setAnswers((prev) => ({ ...prev, mcq: { ...prev.mcq, [id]: value } }));
  };

  const setText = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, text: { ...prev.text, [id]: value } }));
  };

  const setLetter = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, letter: { ...prev.letter, [id]: value.toUpperCase() } }));
  };

  const score = useMemo(() => {
    let total = 0;

    caeReadingData.part1.questions.forEach((question) => {
      if (answers.mcq[question.id] === question.correct) total += question.points;
    });

    caeReadingData.part2.questions.forEach((question) => {
      const typed = normalize(answers.text[question.id] || "");
      if (typed && question.answers.some((answer) => normalize(answer) === typed)) total += question.points;
    });

    caeReadingData.part3.questions.forEach((question) => {
      const typed = normalize(answers.text[question.id] || "");
      if (typed && typed === normalize(question.correct)) total += question.points;
    });

    caeReadingData.part4.questions.forEach((question) => {
      total += getPart4Points(answers.text[question.id] || "", question.answers, question.partialAnswers);
    });

    caeReadingData.part5.questions.forEach((question) => {
      if (answers.mcq[question.id] === question.correct) total += question.points;
    });

    caeReadingData.part6.questions.forEach((question) => {
      if ((answers.letter[question.id] || "").toUpperCase() === question.correct) total += question.points;
    });

    caeReadingData.part7.questions.forEach((question) => {
      if ((answers.letter[question.id] || "").toUpperCase() === question.correct) total += question.points;
    });

    caeReadingData.part8.questions.forEach((question) => {
      if ((answers.letter[question.id] || "").toUpperCase() === question.correct) total += question.points;
    });

    return total;
  }, [answers]);

  const breakdown = useMemo(() => {
    const p1 = caeReadingData.part1.questions.reduce((sum, q) => sum + (answers.mcq[q.id] === q.correct ? q.points : 0), 0);
    const p2 = caeReadingData.part2.questions.reduce((sum, q) => {
      const typed = normalize(answers.text[q.id] || "");
      return sum + (typed && q.answers.some((a) => normalize(a) === typed) ? q.points : 0);
    }, 0);
    const p3 = caeReadingData.part3.questions.reduce((sum, q) => sum + (normalize(answers.text[q.id] || "") === normalize(q.correct) ? q.points : 0), 0);
    const p4 = caeReadingData.part4.questions.reduce((sum, q) => sum + getPart4Points(answers.text[q.id] || "", q.answers, q.partialAnswers), 0);
    const p5 = caeReadingData.part5.questions.reduce((sum, q) => sum + (answers.mcq[q.id] === q.correct ? q.points : 0), 0);
    const p6 = caeReadingData.part6.questions.reduce((sum, q) => sum + ((answers.letter[q.id] || "").toUpperCase() === q.correct ? q.points : 0), 0);
    const p7 = caeReadingData.part7.questions.reduce((sum, q) => sum + ((answers.letter[q.id] || "").toUpperCase() === q.correct ? q.points : 0), 0);
    const p8 = caeReadingData.part8.questions.reduce((sum, q) => sum + ((answers.letter[q.id] || "").toUpperCase() === q.correct ? q.points : 0), 0);
    return { p1, p2, p3, p4, p5, p6, p7, p8 };
  }, [answers]);

  const percentage = Math.round((score / caeReadingData.totalPoints) * 100);
  const resultMessage =
    score >= 62
      ? "Rezultat foarte bun pentru nivelul CAE."
      : score >= 47
      ? "Rezultat bun, dar mai există loc de îmbunătățire."
      : "Rezultat care indică nevoia de mai mult exercițiu.";

  const detailedAnswers = useMemo(() => {
    const rows: Array<{ questionId: number; part: string; studentAnswer: string; correctAnswer: string; points: number; maxPoints: number }> = [];

    caeReadingData.part1.questions.forEach((q) => {
      const studentAnswer = answers.mcq[q.id] || "—";
      rows.push({ questionId: q.id, part: "Part 1", studentAnswer, correctAnswer: q.correct, points: studentAnswer === q.correct ? q.points : 0, maxPoints: q.points });
    });

    caeReadingData.part2.questions.forEach((q) => {
      const studentAnswer = answers.text[q.id] || "—";
      const ok = q.answers.some((a) => normalize(a) === normalize(studentAnswer));
      rows.push({ questionId: q.id, part: "Part 2", studentAnswer, correctAnswer: q.answers.join(" / "), points: ok ? q.points : 0, maxPoints: q.points });
    });

    caeReadingData.part3.questions.forEach((q) => {
      const studentAnswer = answers.text[q.id] || "—";
      const ok = normalize(studentAnswer) === normalize(q.correct);
      rows.push({ questionId: q.id, part: "Part 3", studentAnswer, correctAnswer: q.correct, points: ok ? q.points : 0, maxPoints: q.points });
    });

    caeReadingData.part4.questions.forEach((q) => {
      const studentAnswer = answers.text[q.id] || "—";
      const points = getPart4Points(studentAnswer, q.answers, q.partialAnswers);
      rows.push({ questionId: q.id, part: "Part 4", studentAnswer, correctAnswer: q.answers.join(" / "), points, maxPoints: q.points });
    });

    caeReadingData.part5.questions.forEach((q) => {
      const studentAnswer = answers.mcq[q.id] || "—";
      rows.push({ questionId: q.id, part: "Part 5", studentAnswer, correctAnswer: q.correct, points: studentAnswer === q.correct ? q.points : 0, maxPoints: q.points });
    });

    [...caeReadingData.part6.questions, ...caeReadingData.part7.questions, ...caeReadingData.part8.questions].forEach((q) => {
      const studentAnswer = (answers.letter[q.id] || "—").toUpperCase();
      const partName = q.id <= 40 ? "Part 6" : q.id <= 46 ? "Part 7" : "Part 8";
      rows.push({ questionId: q.id, part: partName, studentAnswer, correctAnswer: q.correct, points: studentAnswer === q.correct ? q.points : 0, maxPoints: q.points });
    });

    return rows;
  }, [answers]);

  const resetAll = () => {
    if (typeof window !== "undefined") window.localStorage.removeItem(LS_KEY);
    setAnswers(buildInitialState());
    setFinished(false);
    setTimeLeft(TIMER_DURATION_SECONDS);
    setShowTimeWarning(false);
    timeWarningShownRef.current = false;
    setPart(1);
    setOpenGap(null);
    testStartTimeRef.current = Date.now();
  };

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

    const apiUrl = import.meta.env.VITE_CAE_READING_RESULTS_API_URL || import.meta.env.VITE_READING_RESULTS_API_URL;
    if (!apiUrl) {
      setSendError("Missing VITE_CAE_READING_RESULTS_API_URL or VITE_READING_RESULTS_API_URL in your .env file.");
      return;
    }

    const timeSpent = getTimeSpent();

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STUDENT_INFO_KEY, JSON.stringify({ studentName: studentName.trim(), studentEmail: studentEmail.trim() }));
    }

    setIsSending(true);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exam: caeReadingData.examTitle,
          studentName: studentName.trim(),
          studentEmail: studentEmail.trim(),
          totalScore: score,
          maxScore: caeReadingData.totalPoints,
          percentage,
          resultMessage,
          breakdown,
          detailedAnswers,
          submittedAnswers: answers,
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
    <div className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Pro Erudio Logo" className="h-9 w-auto object-contain" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-gray-900">Pro Erudio</div>
            <div className="text-xs text-gray-500">{caeReadingData.examTitle}</div>
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

  const TopInstruction = () => (
    <div className="border-b px-6 py-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-wide text-primary">{meta[part].exam}</div>
          <div className="mt-1 text-lg font-bold text-gray-900">
            {meta[part].paper} — {meta[part].partLabel}
          </div>
          <div className="mt-1 text-sm font-semibold text-gray-700">{meta[part].taskType}</div>
        </div>

        <div className="inline-flex w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          Level C1
        </div>
      </div>

      <div className="mt-5 text-sm font-semibold text-gray-900">{meta[part].range}</div>
      <div className="mt-1 text-sm text-gray-600">{meta[part].instruction}</div>
    </div>
  );

  const PartNav = () => (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs font-semibold text-gray-700">Part</span>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <button
              key={item}
              onClick={() => {
                setPart(item as Part);
                setOpenGap(null);
              }}
              className={[
                "rounded-md px-3 py-2 text-xs font-semibold transition duration-300 ease-in-out",
                part === item ? "bg-primary text-white" : "border text-gray-700 hover:bg-gray-50",
              ].join(" ")}
            >
              {item}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <button onClick={resetAll} className="rounded-lg border px-3 py-2 text-sm font-semibold text-gray-900 transition duration-300 ease-in-out hover:bg-gray-50">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const GapBox = ({ id, value, onClick, disabled }: { id: number; value: string; onClick?: React.MouseEventHandler<HTMLButtonElement>; disabled?: boolean }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "inline-flex min-w-[90px] items-center justify-center rounded-md border px-2 py-1 text-sm font-semibold align-baseline",
        disabled ? "bg-gray-100 text-gray-600" : "bg-white hover:bg-gray-50",
      ].join(" ")}
    >
      <span className="mr-2 text-xs font-bold text-gray-500">{id}</span>
      <span className="text-gray-900">{value || "—"}</span>
    </button>
  );

  const renderInlineInput = (id: number, placeholder = "...") => (
    <input
      value={answers.text[id] ?? ""}
      onChange={(event) => setText(id, event.target.value)}
      placeholder={placeholder}
      className="inline-flex min-w-[150px] rounded-md border px-3 py-2 text-sm font-semibold outline-none transition duration-300 ease-in-out focus:border-primary"
    />
  );

  const LetterButtons = <T extends string>({ id, options }: { id: number; options: readonly T[] }) => (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLetter(id, option)}
          className={[
            "rounded-md border px-3 py-2 text-sm font-bold transition duration-300 ease-in-out",
            (answers.letter[id] || "").toUpperCase() === option ? "border-primary bg-primary text-white" : "bg-white text-gray-800 hover:bg-gray-50",
          ].join(" ")}
        >
          {option}
        </button>
      ))}
    </div>
  );

  const Part1 = () => {
    const tokens = tokenizeGaps(caeReadingData.part1.passage);

    return (
      <CardShell>
        {TopInstruction()}
        <div className="px-6 py-6">
          <div className="mb-4">
            <div className="text-2xl font-bold text-gray-900">{caeReadingData.part1.title}</div>
            <div className="mt-2 text-sm text-gray-600">Click on a gap to choose A, B, C or D.</div>
          </div>

          <div className="relative rounded-xl border bg-white p-5">
            <div className="whitespace-pre-wrap text-base leading-8 text-gray-900">
              {tokens.map((token, index) => {
                if (token.type === "text") return <span key={index}>{token.value}</span>;
                const question = caeReadingData.part1.questions.find((item) => item.id === token.id);
                if (!question) return null;
                const chosen = answers.mcq[token.id] ? question.options[answers.mcq[token.id]!] : "";
                return (
                  <span key={index} className="relative mx-1 inline-flex">
                    <GapBox id={token.id} value={chosen} onClick={(event) => { event.stopPropagation(); setOpenGap((cur) => (cur === token.id ? null : token.id)); }} />
                    {openGap === token.id && (
                      <div className="absolute left-0 top-10 z-30 w-64 rounded-xl border bg-white p-2 shadow-lg">
                        {(["A", "B", "C", "D"] as const).map((letter) => (
                          <button
                            key={letter}
                            type="button"
                            onClick={(event) => { event.stopPropagation(); setMCQ(token.id, letter); setOpenGap(null); }}
                            className="block w-full rounded-lg px-3 py-2 text-left text-sm transition duration-300 ease-in-out hover:bg-gray-50"
                          >
                            <span className="font-bold">{letter}.</span> {question.options[letter]}
                          </button>
                        ))}
                      </div>
                    )}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {caeReadingData.part1.questions.map((question) => (
              <div key={question.id} className="rounded-lg border bg-gray-50 p-3 text-sm">
                <div className="font-bold text-gray-900">{question.id}</div>
                <div className="mt-1 text-gray-600">{answers.mcq[question.id] ? `${answers.mcq[question.id]} (${question.options[answers.mcq[question.id]!]})` : "—"}</div>
              </div>
            ))}
          </div>
        </div>
      </CardShell>
    );
  };

  const Part2 = () => {
    const tokens = tokenizeGaps(caeReadingData.part2.passage);

    return (
      <CardShell>
        {TopInstruction()}
        <div className="px-6 py-6">
          <div className="text-2xl font-bold text-gray-900">{caeReadingData.part2.title}</div>
          <div className="mt-5 rounded-xl border bg-white p-5">
            <div className="whitespace-pre-wrap text-base leading-9 text-gray-900">
              {tokens.map((token, index) => token.type === "text" ? <span key={index}>{token.value}</span> : <span key={index} className="mx-1 inline-flex items-center gap-2"><span className="text-xs font-bold text-gray-500">{token.id}</span>{renderInlineInput(token.id, "one word")}</span>)}
            </div>
          </div>
        </div>
      </CardShell>
    );
  };

  const Part3 = () => {
    const tokens = tokenizeGaps(caeReadingData.part3.passage);

    return (
      <CardShell>
        {TopInstruction()}
        <div className="px-6 py-6">
          <div className="text-2xl font-bold text-gray-900">{caeReadingData.part3.title}</div>
          <div className="mt-5 rounded-xl border bg-white p-5">
            <div className="whitespace-pre-wrap text-base leading-9 text-gray-900">
              {tokens.map((token, index) => token.type === "text" ? <span key={index}>{token.value}</span> : <span key={index} className="mx-1 inline-flex items-center gap-2"><span className="text-xs font-bold text-gray-500">{token.id}</span>{renderInlineInput(token.id, "word")}</span>)}
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {caeReadingData.part3.questions.map((question) => (
              <div key={question.id} className="rounded-xl border bg-gray-50 p-4">
                <div className="text-xs font-bold text-gray-500">{question.id}</div>
                <div className="mt-1 text-lg font-bold text-gray-900">{question.word}</div>
              </div>
            ))}
          </div>
        </div>
      </CardShell>
    );
  };

  const Part4 = () => (
    <CardShell>
      {TopInstruction()}
      <div className="space-y-4 px-6 py-6">
        {caeReadingData.part4.questions.map((question) => (
          <div key={question.id} className="rounded-xl border bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="text-sm font-bold text-gray-500">Question {question.id}</div>
              <div className="rounded-md bg-gray-100 px-3 py-1 text-sm font-bold text-gray-900">{question.keyword}</div>
            </div>
            <p className="mt-3 text-base text-gray-900">{question.firstSentence}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-base text-gray-900">
              <span>{question.secondSentenceBefore}</span>
              <input
                value={answers.text[question.id] ?? ""}
                onChange={(event) => setText(question.id, event.target.value)}
                className="min-w-[280px] flex-1 rounded-lg border px-4 py-3 text-sm font-semibold outline-none transition duration-300 ease-in-out focus:border-primary"
                placeholder="3–6 words"
              />
              <span>{question.secondSentenceAfter}</span>
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );

  const MCQQuestionBlock = ({ question }: { question: typeof caeReadingData.part5.questions[number] }) => (
    <div className="rounded-xl border bg-white p-5">
      <div className="text-sm font-bold text-gray-500">Question {question.id}</div>
      <div className="mt-2 font-semibold text-gray-900">{question.text}</div>
      <div className="mt-4 grid gap-2">
        {(["A", "B", "C", "D"] as const).map((letter) => (
          <button
            key={letter}
            type="button"
            onClick={() => setMCQ(question.id, letter)}
            className={[
              "rounded-lg border px-4 py-3 text-left text-sm transition duration-300 ease-in-out",
              answers.mcq[question.id] === letter ? "border-primary bg-primary text-white" : "bg-white text-gray-800 hover:bg-gray-50",
            ].join(" ")}
          >
            <span className="font-bold">{letter}.</span> {question.options[letter]}
          </button>
        ))}
      </div>
    </div>
  );

  const Part5 = () => (
    <CardShell>
      {TopInstruction()}
      <div className="px-6 py-6">
        <div className="text-2xl font-bold text-gray-900">{caeReadingData.part5.title}</div>
        <div className="mt-5 grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
          <div className="rounded-xl border bg-white p-5">
            <div className="whitespace-pre-wrap text-base leading-7 text-gray-900">{caeReadingData.part5.passage}</div>
          </div>
          <div className="space-y-4">
            {caeReadingData.part5.questions.map((question) => <MCQQuestionBlock key={question.id} question={question} />)}
          </div>
        </div>
      </div>
    </CardShell>
  );

  const Part6 = () => (
    <CardShell>
      {TopInstruction()}
      <div className="px-6 py-6">
        <div className="text-2xl font-bold text-gray-900">{caeReadingData.part6.title}</div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {caeReadingData.part6.extracts.map((extract) => (
            <div key={extract.letter} className="rounded-xl border bg-white p-5">
              <div className="text-lg font-bold text-primary">{extract.letter}</div>
              <p className="mt-2 text-sm leading-7 text-gray-900">{extract.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-4">
          <div className="text-sm font-semibold text-gray-700">Which writer:</div>
          {caeReadingData.part6.questions.map((question) => (
            <div key={question.id} className="rounded-xl border bg-gray-50 p-4">
              <div className="mb-3 text-sm text-gray-900"><span className="font-bold">{question.id}.</span> {question.text}</div>
              <LetterButtons<WriterOption> id={question.id} options={["A", "B", "C", "D"]} />
            </div>
          ))}
        </div>
      </div>
    </CardShell>
  );

  const renderPassageWithParagraphGaps = () => {
    const parts = caeReadingData.part7.passage.split(/\((4[1-6])\)/g);
    return parts.map((chunk, index) => {
      const id = Number(chunk);
      if (id >= 41 && id <= 46) {
        return (
          <span key={index} className="my-4 block rounded-xl border-2 border-dashed bg-gray-50 p-4">
            <div className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">Gap {id}</div>
            <LetterButtons<ParagraphOption> id={id} options={["A", "B", "C", "D", "E", "F", "G"]} />
          </span>
        );
      }
      return <span key={index}>{chunk}</span>;
    });
  };

  const Part7 = () => (
    <CardShell>
      {TopInstruction()}
      <div className="px-6 py-6">
        <div className="text-2xl font-bold text-gray-900">{caeReadingData.part7.title}</div>
        <div className="mt-1 text-sm text-gray-600">{caeReadingData.part7.subtitle}</div>
        <div className="mt-5 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-xl border bg-white p-5">
            <div className="whitespace-pre-wrap text-base leading-7 text-gray-900">{renderPassageWithParagraphGaps()}</div>
          </div>
          <div className="space-y-3">
            {Object.entries(caeReadingData.part7.options).map(([letter, text]) => (
              <div key={letter} className="rounded-xl border bg-gray-50 p-4">
                <div className="text-sm font-bold text-primary">{letter}</div>
                <p className="mt-2 text-sm leading-6 text-gray-900">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardShell>
  );

  const Part8 = () => (
    <CardShell>
      {TopInstruction()}
      <div className="px-6 py-6">
        <div className="text-2xl font-bold text-gray-900">{caeReadingData.part8.title}</div>
        <div className="mt-1 text-sm text-gray-600">{caeReadingData.part8.subtitle}</div>
        <div className="mt-5 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            {caeReadingData.part8.sections.map((section) => (
              <div key={section.letter} className="rounded-xl border bg-white p-5">
                <div className="text-lg font-bold text-primary">{section.letter}</div>
                <p className="mt-2 text-sm leading-7 text-gray-900">{section.body}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {caeReadingData.part8.questions.map((question) => (
              <div key={question.id} className="rounded-xl border bg-gray-50 p-4">
                <div className="mb-3 text-sm text-gray-900"><span className="font-bold">{question.id}.</span> {question.text}</div>
                <LetterButtons<SectionOption> id={question.id} options={["A", "B", "C", "D"]} />
              </div>
            ))}
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
            <div className="text-3xl font-bold text-gray-900">{score} / {caeReadingData.totalPoints}</div>
            <div className="text-sm text-gray-600">{percentage}%</div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border bg-primary/5 px-4 py-3">
          <div className="text-sm font-semibold text-gray-900">{resultMessage}</div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {[
            ["Part 1", breakdown.p1, 8],
            ["Part 2", breakdown.p2, 8],
            ["Part 3", breakdown.p3, 8],
            ["Part 4", breakdown.p4, 12],
            ["Part 5", breakdown.p5, 12],
            ["Part 6", breakdown.p6, 8],
            ["Part 7", breakdown.p7, 12],
            ["Part 8", breakdown.p8, 10],
          ].map(([label, value, max]) => (
            <div key={String(label)} className="rounded-xl border bg-gray-50 p-4">
              <div className="text-xs font-semibold text-gray-700">{label}</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">{value}/{max}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border bg-gray-50 p-5">
          <div className="text-sm font-bold text-gray-900">Send result by email</div>
          <div className="mt-1 text-sm text-gray-600">Add the student details below and send the final result.</div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <input type="text" placeholder="Student name" value={studentName} onChange={(event) => setStudentName(event.target.value)} className="rounded-lg border bg-white px-4 py-3 text-sm outline-none transition duration-300 ease-in-out focus:border-primary" />
            <input type="email" placeholder="Student email" value={studentEmail} onChange={(event) => setStudentEmail(event.target.value)} className="rounded-lg border bg-white px-4 py-3 text-sm outline-none transition duration-300 ease-in-out focus:border-primary" />
          </div>
          {sendSuccess && (
            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">Result sent successfully. You can now continue to the Writing test.</div>
              <a href={NEXT_WRITING_PATH} className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:brightness-110">Continue to Writing</a>
            </div>
          )}
          {sendError && <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{sendError}</div>}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button onClick={() => setFinished(false)} className="rounded-lg border px-4 py-2 text-sm font-semibold text-gray-900 transition duration-300 ease-in-out hover:bg-gray-50">Back to test</button>
          <button onClick={resetAll} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:brightness-110">Reset test</button>
          <button onClick={sendResultEmail} disabled={isSending} className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">{isSending ? "Sending..." : "Send result"}</button>
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
          Please check your answers and make sure you submit the test in time.
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

const renderCurrentPart = () => {
  if (part === 1) return Part1();
  if (part === 2) return Part2();
  if (part === 3) return Part3();
  if (part === 4) return Part4();
  if (part === 5) return Part5();
  if (part === 6) return Part6();
  if (part === 7) return Part7();
  return Part8();
};

  return (
    <div className="min-h-screen bg-gray-50" onClick={() => openGap && setOpenGap(null)}>
      <Header />
      {showTimeWarning && !finished && <TimeWarningModal />}
      {finished ? <FinishScreen /> : renderCurrentPart()}
      <PartNav />
    </div>
  );
}
