import { useMemo, useState } from "react";
import { placementTests, Choice, Test } from "@/data/placementTests";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";


type StudentInfo = {
    firstName: string;
    lastName: string;
    age: number | "";
    email: string;
};

export default function TesteAmplasament() {
    const [step, setStep] = useState<"form" | "test" | "done">("form");
    const [student, setStudent] = useState<StudentInfo>({ firstName: "", lastName: "", age: "", email: "" });

    const [selectedTestId, setSelectedTestId] = useState<Test["id"]>("yle");
    const test = useMemo(() => placementTests.find(t => t.id === selectedTestId)!, [selectedTestId]);

    // răspunsuri elev (NU barem)
    const [answers, setAnswers] = useState<Record<number, Choice>>({});
    const [writing, setWriting] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>("");

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email.trim());
    const canStart =
        student.firstName.trim().length > 1 &&
        student.lastName.trim().length > 1 &&
        typeof student.age === "number" &&
        validEmail


    const answeredCount = Object.keys(answers).length;
    const total = test.questions.length;

    function startTest() {
        if (!canStart) return;
        setAnswers({});
        setWriting("");
        setError("");
        setStep("test");
    }

    async function submitTest() {
        setError("");

        if (!validEmail) {
            setError("Te rugăm să introduci un email valid pentru a primi confirmarea testului.");
            return;
        }

        const computedScore = test.questions.reduce((acc, q) => {
            return acc + (answers[q.id] === q.correct ? 1 : 0);
        }, 0);

        const percentage = Math.round((computedScore / test.questions.length) * 100);
        const resultMessage = computedScore >= Math.ceil(test.questions.length * 0.6)
            ? "Felicitări! Nivelul tău a fost evaluat și va fi analizat de echipa noastră."
            : "Testul a fost înregistrat. Echipa noastră va analiza răspunsurile și te va contacta cu recomandările potrivite.";

        setSubmitting(true);

        try {
            const endpoint = import.meta.env.VITE_PLACEMENT_RESULTS_API_URL || "/api/send-placement-result";
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: student.firstName.trim(),
                    lastName: student.lastName.trim(),
                    age: student.age,
                    email: student.email.trim(),
                    testTitle: test.title,
                    testId: test.id,
                    answersCount: Object.keys(answers).length,
                    totalCount: test.questions.length,
                    score: computedScore,
                    maxScore: test.questions.length,
                    percentage,
                    resultMessage,
                    writing,
                    answers: test.questions.map((q) => ({
                        questionId: q.id,
                        prompt: q.prompt,
                        studentAnswer: answers[q.id] || "—",
                        correctAnswer: q.correct || "—",
                        isCorrect: answers[q.id] === q.correct,
                    })),
                }),
            });

            const responseText = await response.text();
            let data: { error?: string; message?: string } | null = null;

            if (responseText) {
                try {
                    data = JSON.parse(responseText) as { error?: string; message?: string };
                } catch {
                    data = null;
                }
            }

            if (!response.ok) {
                const message = data?.error || data?.message || responseText || "The placement test email could not be sent.";
                throw new Error(message);
            }

            setStep("done");
        } catch (err: unknown) {
            const runtimeMessage = err instanceof Error ? err.message : "The placement test email could not be sent.";
            const friendlyMessage = runtimeMessage.includes("Unexpected end of JSON input")
                ? "Serviciul de email nu a răspuns cu un JSON valid. Verifică variabilele de mediu de pe serverul de deploy și apoi încearcă din nou."
                : runtimeMessage;

            setError(friendlyMessage);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
                <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10">
                    Test de plasare pentru cursul de limba engleză
                </h1>

                {step === "form" && (
                    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                        <h2 className="text-xl font-semibold text-foreground mb-6">Date elev</h2>

                        <div className="grid md:grid-cols-4 gap-4">
                            <input
                                className="h-11 rounded-xl border border-border bg-background px-4 text-foreground"
                                placeholder="Nume"
                                value={student.lastName}
                                onChange={(e) => setStudent(s => ({ ...s, lastName: e.target.value }))}
                            />

                            <input
                                className="h-11 rounded-xl border border-border bg-background px-4 text-foreground"
                                placeholder="Prenume"
                                value={student.firstName}
                                onChange={(e) => setStudent(s => ({ ...s, firstName: e.target.value }))}
                            />

                            {/* ✅ VÂRSTĂ */}
                            <input
                                type="number"
                                min={6}
                                max={18}
                                className="h-11 rounded-xl border border-border bg-background px-4 text-foreground"
                                placeholder="Vârstă"
                                value={student.age}
                                onChange={(e) =>
                                    setStudent(s => ({ ...s, age: e.target.value === "" ? "" : Number(e.target.value) }))
                                }
                            />

                            {/* ✅ EMAIL OBLIGATORIU */}
                            <div className="flex flex-col">
                                <input
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="h-11 rounded-xl border border-border bg-background px-4 text-foreground"
                                    placeholder="Email *"
                                    value={student.email}
                                    onChange={(e) => setStudent(s => ({ ...s, email: e.target.value }))}
                                />
                            </div>
                        </div>


                        <div className="mt-6">
                            <h3 className="text-sm font-semibold text-foreground mb-2">Alege testul</h3>
                            <div className="flex flex-col sm:flex-row gap-3">
                                {placementTests.map((t) => (
                                    <button
                                        key={t.id}
                                        type="button"
                                        onClick={() => setSelectedTestId(t.id)}
                                        className={`rounded-xl border px-4 py-3 text-left transition duration-300 ease-in-out ${selectedTestId === t.id
                                            ? "border-primary bg-primary/10"
                                            : "border-border bg-background hover:bg-secondary/40"
                                            }`}
                                    >
                                        <div className="font-semibold text-foreground">{t.title}</div>
                                        <div className="text-sm text-muted-foreground">{t.subtitle}</div>
                                        {t.image && (
                                            <img
                                                src={t.image}
                                                alt={t.title}
                                                className="mt-3 h-40 w-full rounded-xl object-cover border border-border"
                                                loading="lazy"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                type="button"
                                onClick={startTest}
                                disabled={!canStart}
                                className={`h-11 px-6 rounded-xl font-semibold transition duration-300 ease-in-out ${canStart ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed"
                                    }`}
                            >
                                Începe testul
                            </button>
                        </div>
                    </div>
                )}

                {step === "test" && (
                    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-foreground">{test.title}</h2>
                                <p className="text-sm text-muted-foreground">
                                    Progres: {answeredCount}/{total}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setStep("form")}
                                className="h-10 px-4 rounded-xl border border-border hover:bg-secondary/40 transition duration-300 ease-in-out"
                            >
                                Înapoi la formular
                            </button>
                        </div>

                        <div className="space-y-6">
                            {test.questions.map((q) => (
                                <div key={q.id} className="rounded-2xl border border-border p-5">
                                    <div className="font-semibold text-foreground mb-3">
                                        {q.id}. {q.prompt}
                                    </div>

                                    <div className="grid sm:grid-cols-3 gap-3">
                                        {q.options.map((opt) => {
                                            const selected = answers[q.id] === opt.key;
                                            return (
                                                <button
                                                    key={opt.key}
                                                    type="button"
                                                    onClick={() => setAnswers(a => ({ ...a, [q.id]: opt.key }))}
                                                    className={`rounded-xl border px-4 py-3 text-left transition duration-300 ease-in-out ${selected ? "border-primary bg-primary/10" : "border-border hover:bg-secondary/40"
                                                        }`}
                                                >
                                                    <div className="text-sm text-muted-foreground mb-1">{opt.key.toUpperCase()}</div>
                                                    <div className="text-foreground">{opt.text}</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {test.writingTask && (
                            <div className="mt-8 rounded-2xl border border-border p-5">
                                <div className="font-semibold text-foreground mb-2">{test.writingTask.title}</div>
                                <p className="text-sm text-muted-foreground mb-4">{test.writingTask.details}</p>
                                <p className="text-sm text-primary mb-4 ">{test.writingTask.task}</p>
                                <textarea
                                    className="w-full min-h-[160px] rounded-xl border border-border bg-background p-4 text-foreground"
                                    placeholder="Scrie aici (opțional)..."
                                    value={writing}
                                    onChange={(e) => setWriting(e.target.value)}
                                />
                            </div>
                        )}

                        {error && (
                            <div className="mt-6 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
                                {error}
                            </div>
                        )}

                        <div className="mt-8 flex justify-end">
                            <button
                                type="button"
                                onClick={submitTest}
                                disabled={submitting}
                                className="h-11 px-6 rounded-xl font-semibold bg-primary text-primary-foreground hover:opacity-90 transition duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {submitting ? "Se trimite..." : "Trimite testul"}
                            </button>
                        </div>
                    </div>
                )}

                {step === "done" && (
                    <div className="bg-card border border-border rounded-2xl p-8 text-center">
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                            Mulțumim!
                        </h2>

                        <p className="text-muted-foreground mb-6">
                            Testul a fost înregistrat. Vei primi rezultatul pe email după evaluare.
                        </p>

                        <div className="flex justify-center">
                            <Button
                                asChild
                                className="bg-primary text-primary-foreground px-6 rounded-full
                   transition duration-300 ease-in-out hover:opacity-90"
                            >
                                <Link to="/">
                                    Înapoi la pagina principală
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}
