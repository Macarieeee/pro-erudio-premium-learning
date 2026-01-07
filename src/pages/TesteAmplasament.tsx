import { useMemo, useState } from "react";
import { placementTests, Choice, Test } from "@/data/placementTests";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";


type StudentInfo = {
    firstName: string;
    lastName: string;
    age: number | "";
    email?: string;
};

export default function TesteAmplasament() {
    const [step, setStep] = useState<"form" | "test" | "done">("form");
    const [student, setStudent] = useState<StudentInfo>({ firstName: "", lastName: "", age: "", email: "" });

    const [selectedTestId, setSelectedTestId] = useState<Test["id"]>("yle");
    const test = useMemo(() => placementTests.find(t => t.id === selectedTestId)!, [selectedTestId]);

    // răspunsuri elev (NU barem)
    const [answers, setAnswers] = useState<Record<number, Choice>>({});
    const [writing, setWriting] = useState("");

    const canStart =
        student.firstName.trim().length > 1 &&
        student.lastName.trim().length > 1 &&
        typeof student.age === "number"


    const answeredCount = Object.keys(answers).length;
    const total = test.questions.length;

    function startTest() {
        if (!canStart) return;
        setAnswers({});
        setWriting("");
        setStep("test");
    }

    function submitTest() {
        // AICI (mai târziu) vei:
        // 1) trimite răspunsurile + student pe server
        // 2) serverul calculează scorul cu baremul (safe)
        // 3) serverul trimite email cu rezultatul
        setStep("done");
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

                            {/* ✅ EMAIL OPȚIONAL */}
                            <div className="flex flex-col">
                                <input
                                    className="h-11 rounded-xl border border-border bg-background px-4 text-foreground"
                                    placeholder="Email (opțional)"
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

                        <div className="mt-8 flex justify-end">
                            <button
                                type="button"
                                onClick={submitTest}
                                className="h-11 px-6 rounded-xl font-semibold bg-primary text-primary-foreground hover:opacity-90 transition duration-300 ease-in-out"
                            >
                                Trimite testul
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
