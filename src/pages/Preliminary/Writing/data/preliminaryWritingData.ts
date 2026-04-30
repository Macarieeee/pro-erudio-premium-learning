// src/pages/Preliminary/Writing/data/preliminaryWritingData.ts

export type WritingTask = {
  id: number;
  part: 1 | 2;
  title: string;
  instructionTop: string;
  context: string[];
  mainPrompt: string;
  notesTitle?: string;
  notes?: string[];
  extraBoxTitle?: string;
  extraBoxLines?: string[];
  constraints?: {
    minWords: number;
    maxWords: number;
    styleHint?: string;
  };
};

export const tasks: WritingTask[] = [
  {
    id: 1,
    part: 1,
    title: "Question 1",
    instructionTop: "You must answer this question. Write your answer in about 100 words.",
    context: [
      "Read this email from your English-speaking friend Sonia and the notes you have made.",
      "Write your email to Sonia using all the notes.",
    ],
    mainPrompt: "Email from Sonia — Subject: School exchange",
    extraBoxLines: [
      "From: Sonia",
      "Subject: School exchange",
      "",
      "Hi David!",
      "",
      "I remember you mentioned you were going on a school exchange this year. Where are you going? I hope it's somewhere interesting so that you will have lots to do. [Describe...]",
      "",
      "Are you going to practise your English or another language? It's really the best way to improve your speaking skills. [Explain...]",
      "",
      "Have you got information about the family you are staying with? [Yes...]",
      "",
      "When are you coming back? I'd love to come for a visit. [Tell Sonia...]",
      "",
      "Write soon.",
      "",
      "Sonia",
    ],
    constraints: { minWords: 80, maxWords: 120, styleHint: "email" },
  },
  {
    id: 2,
    part: 2,
    title: "Question 2",
    instructionTop: "Answer one of the questions 2–3. Write your answer in about 100 words.",
    context: ["You see this notice on an English-language website for students."],
    mainPrompt: "Articles wanted!",
    extraBoxLines: [
      "Write an article telling us about the most interesting place you have ever been to.",
      "",
      "Why did you like it?",
      "What did you do there?",
      "Would you recommend it?",
      "",
      "The best articles answering these questions will be published next month.",
      "",
      "Write your article.",
    ],
    constraints: { minWords: 80, maxWords: 120, styleHint: "article" },
  },
  {
    id: 3,
    part: 2,
    title: "Question 3",
    instructionTop: "Answer one of the questions 2–3. Write your answer in about 100 words.",
    context: ["Your English teacher has asked you to write a story."],
    mainPrompt: "Your story must begin with this sentence:",
    extraBoxLines: [
      "Late in the evening I heard a loud knock on the door.",
      "",
      "Write your story.",
    ],
    constraints: { minWords: 80, maxWords: 120, styleHint: "story" },
  },
];

export const getTasksForPart = (part: 1 | 2) => tasks.filter((task) => task.part === part);
