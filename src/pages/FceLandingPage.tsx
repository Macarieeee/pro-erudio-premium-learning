import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Headphones,
  PenLine,
  UserCheck,
} from "lucide-react";
import logo from "@/assets/logo.svg";
import fceMockImage from "@/assets/FCE-Mock-Test-ProErudio.jpg";
const FCE_LISTENING_PATH = "/fce/listening";
const FCE_READING_PATH = "/fce/reading";
const FCE_WRITING_PATH = "/fce/writing";

const examParts = [
  {
    title: "Listening",
    subtitle: "Proba de ascultare",
    description:
      "Elevul ascultă materialul audio și răspunde la întrebările specifice probei de Listening.",
    icon: Headphones,
    status: "Prima probă",
    path: FCE_LISTENING_PATH,
  },
  {
    title: "Reading & Use of English",
    subtitle: "Citire, vocabular și gramatică",
    description:
      "Elevul parcurge exerciții de înțelegere a textului, vocabular și structuri gramaticale.",
    icon: BookOpen,
    status: "A doua probă",
    path: FCE_READING_PATH,
  },
  {
    title: "Writing",
    subtitle: "Proba scrisă",
    description:
      "Elevul redactează răspunsurile pentru task-urile de Writing, care vor fi trimise profesorului.",
    icon: PenLine,
    status: "A treia probă",
    path: FCE_WRITING_PATH,
  },
];

export default function FceLandingPage() {
  const renderHeader = () => (
    <div className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Pro Erudio Logo"
            className="h-9 w-auto object-contain"
          />

          <div className="leading-tight">
            <div className="text-sm font-semibold text-gray-900">
              Pro Erudio
            </div>
            <div className="text-xs text-gray-500">
              FCE / B2 First Mock Test
            </div>
          </div>
        </div>

        <Link
          to={FCE_LISTENING_PATH}
          className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition duration-300 ease-in-out hover:brightness-110"
        >
          Start examen
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}

      <main className="mx-auto w-full max-w-6xl px-4 pb-14 pt-6">
        <section className="rounded-xl border bg-white shadow-sm">
          <div className="border-b px-6 py-8 sm:px-8 sm:py-10">
  <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-white via-cyan-50 to-white shadow-sm ring-1 ring-gray-100">
    <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div>
        <div className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary">
          Cambridge Mock Test
        </div>

        <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
          FCE / B2 First Mock Test
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
          Parcurge o simulare digitală pentru examenul FCE / B2 First,
          organizată pe probele principale: Listening, Reading & Use of English
          și Writing.
        </p>

        <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
          Testul ajută elevul să se familiarizeze cu structura examenului, să
          lucreze organizat și să trimită rezultatele către profesor pentru
          verificare și feedback.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            to={FCE_LISTENING_PATH}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 ease-in-out hover:brightness-110"
          >
            Start examen
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>

          <a
            href="#probe"
            className="inline-flex items-center justify-center rounded-xl border bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition duration-300 ease-in-out hover:bg-gray-50"
          >
            Vezi probele incluse
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="overflow-hidden rounded-2xl shadow-md ring-1 ring-gray-200">
          <img
            src={fceMockImage}
            alt="FCE B2 First Mock Test"
            className="h-[300px] w-full object-cover sm:h-[360px]"
          />
        </div>

        {/* <div className="mt-4 rounded-2xl border bg-white/95 p-5 shadow-sm backdrop-blur lg:absolute lg:-bottom-6 lg:left-6 lg:right-6 lg:mt-0">
          <div className="text-sm font-bold text-gray-900">
            Ordinea recomandată
          </div>

          <div className="mt-4 grid gap-3 text-sm text-gray-700 sm:grid-cols-3 lg:grid-cols-1">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                1
              </span>
              <span>Listening</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                2
              </span>
              <span>Reading & Use of English</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                3
              </span>
              <span>Writing</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  </div>
</div>

          <div className="grid gap-4 border-b px-6 py-6 sm:px-8 md:grid-cols-3">
            <div className="rounded-xl border bg-white p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-primary">
                <UserCheck className="h-5 w-5" />
              </div>

              <h2 className="text-sm font-semibold text-gray-900">
                Datele elevului
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Elevul completează numele și emailul la finalul primei probe,
                iar datele se păstrează pentru următoarele etape.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-primary">
                <Clock className="h-5 w-5" />
              </div>

              <h2 className="text-sm font-semibold text-gray-900">
                Timp monitorizat
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Timpul petrecut pe fiecare probă este calculat în fundal și
                trimis profesorului împreună cu rezultatul.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <h2 className="text-sm font-semibold text-gray-900">
                Parcurs conectat
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                După fiecare probă, elevul poate continua automat către
                următoarea etapă a simulării.
              </p>
            </div>
          </div>

          <div id="probe" className="px-6 py-8 sm:px-8 sm:py-10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Probele incluse în simulare
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                Elevul poate începe testul complet de la Listening sau poate
                accesa individual fiecare probă, dacă profesorul recomandă acest
                lucru.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {examParts.map((part) => {
                const Icon = part.icon;

                return (
                  <article
                    key={part.title}
                    className="flex h-full flex-col rounded-xl border bg-white p-5 shadow-sm"
                  >
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>

                      <span className="rounded-full border bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
                        {part.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900">
                      {part.title}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-gray-500">
                      {part.subtitle}
                    </p>

                    <p className="mt-4 flex-1 text-sm leading-6 text-gray-600">
                      {part.description}
                    </p>

                    <Link
                      to={part.path}
                      className="mt-6 inline-flex items-center justify-center rounded-lg border px-4 py-3 text-sm font-semibold text-gray-900 transition duration-300 ease-in-out hover:bg-gray-50"
                    >
                      Deschide proba
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="border-t bg-gray-50 px-6 py-8 text-center sm:px-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Recomandare înainte de începere
            </h2>

            <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-gray-600">
              Pentru o experiență cât mai apropiată de examen, recomandăm ca
              elevul să lucreze într-un mediu liniștit, fără întreruperi, și să
              parcurgă probele în ordinea recomandată.
            </p>

            <Link
              to={FCE_LISTENING_PATH}
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition duration-300 ease-in-out hover:brightness-110"
            >
              Start examen FCE / B2 First
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}