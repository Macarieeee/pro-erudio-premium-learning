// src/pages/Preliminary/Listening/data/preliminaryListeningData.ts

export type PreliminaryPart = 1 | 2 | 3 | 4;

export type MCQOption = {
  label: "A" | "B" | "C";
  text: string;
  imageSrc?: string;
};

export type MCQ = {
  id: number;
  part: 1 | 2 | 4;
  questionHeader: string;
  question: string;
  options: MCQOption[];
  correctLetter: "A" | "B" | "C";
};

export type Gap = {
  id: number;
  prompt: string;
  correctAnswers: string[];
};

export const part1MCQ: MCQ[] = [
  {
    id: 1,
    part: 1,
    questionHeader: "For each question, choose the correct answer.",
    question: "How much will the girl pay to buy a new T-shirt?",
    options: [
      { label: "A", text: "£11.89" },
      { label: "B", text: "£10.50" },
      { label: "C", text: "£16.89" },
    ],
    correctLetter: "A",
  },
  {
    id: 2,
    part: 1,
    questionHeader: "For each question, choose the correct answer.",
    question: "What food will the boy have?",
    options: [
      { label: "A", text: "Picture A", imageSrc: "/preliminary/listening/part1/q2-a.png" },
      { label: "B", text: "Picture B", imageSrc: "/preliminary/listening/part1/q2-b.jpg" },
      { label: "C", text: "Picture C", imageSrc: "/preliminary/listening/part1/q2-c.png" },
    ],
    correctLetter: "B",
  },
  {
    id: 3,
    part: 1,
    questionHeader: "For each question, choose the correct answer.",
    question: "How will they get to the park?",
    options: [
      { label: "A", text: "Picture A", imageSrc: "/preliminary/listening/part1/q3-a.jpg" },
      { label: "B", text: "Picture B", imageSrc: "/preliminary/listening/part1/q3-b.jpg" },
      { label: "C", text: "Picture C", imageSrc: "/preliminary/listening/part1/q3-c.jpg" },
    ],
    correctLetter: "A",
  },
  {
    id: 4,
    part: 1,
    questionHeader: "For each question, choose the correct answer.",
    question: "Where did the boy go on holiday last summer?",
    options: [
      { label: "A", text: "Picture A", imageSrc: "/preliminary/listening/part1/q4-a.png" },
      { label: "B", text: "Picture B", imageSrc: "/preliminary/listening/part1/q4-b.png" },
      { label: "C", text: "Picture C", imageSrc: "/preliminary/listening/part1/q4-c.png" },
    ],
    correctLetter: "B",
  },
  {
    id: 5,
    part: 1,
    questionHeader: "For each question, choose the correct answer.",
    question: "What did the girl collect from the shop today?",
    options: [
      { label: "A", text: "Picture A", imageSrc: "/preliminary/listening/part1/q5-a.png" },
      { label: "B", text: "Picture B", imageSrc: "/preliminary/listening/part1/q5-b.jpg" },
      { label: "C", text: "Picture C", imageSrc: "/preliminary/listening/part1/q5-c.jpg" },
    ],
    correctLetter: "C",
  },
  {
    id: 6,
    part: 1,
    questionHeader: "For each question, choose the correct answer.",
    question: "What will the weather be like on Saturday evening?",
    options: [
      { label: "A", text: "Picture A", imageSrc: "/preliminary/listening/part1/q6-a.png" },
      { label: "B", text: "Picture B", imageSrc: "/preliminary/listening/part1/q6-b.jpg" },
      { label: "C", text: "Picture C", imageSrc: "/preliminary/listening/part1/q6-c.jpg" },
    ],
    correctLetter: "A",
  },
  {
    id: 7,
    part: 1,
    questionHeader: "For each question, choose the correct answer.",
    question: "What sport will the girl learn?",
    options: [
      { label: "A", text: "Picture A", imageSrc: "/preliminary/listening/part1/q7-a.jpg" },
      { label: "B", text: "Picture B", imageSrc: "/preliminary/listening/part1/q7-b.jpg" },
      { label: "C", text: "Picture C", imageSrc: "/preliminary/listening/part1/q7-c.jpg" },
    ],
    correctLetter: "B",
  },
];

export const part2MCQ: MCQ[] = [
  {
    id: 8,
    part: 2,
    questionHeader: "You will hear two friends talking about a neighbour’s dog.",
    question: "The boy thinks the dog",
    options: [
      { label: "A", text: "needs more walks." },
      { label: "B", text: "is left alone for too long." },
      { label: "C", text: "is unfriendly." },
    ],
    correctLetter: "B",
  },
  {
    id: 9,
    part: 2,
    questionHeader: "You will hear two friends talking about a film.",
    question: "Why did the girl leave the cinema early?",
    options: [
      { label: "A", text: "She had an appointment with her dad." },
      { label: "B", text: "She didn’t like the film." },
      { label: "C", text: "She felt unwell." },
    ],
    correctLetter: "C",
  },
  {
    id: 10,
    part: 2,
    questionHeader: "You will hear two friends talking about the maths lesson.",
    question: "What do they agree on?",
    options: [
      { label: "A", text: "They don’t like the teacher." },
      { label: "B", text: "The work is getting harder." },
      { label: "C", text: "They won’t pass the exam." },
    ],
    correctLetter: "B",
  },
  {
    id: 11,
    part: 2,
    questionHeader: "You will hear two friends talking about a school trip they went on.",
    question: "What happened?",
    options: [
      { label: "A", text: "There was a change of plans." },
      { label: "B", text: "Their teacher got angry." },
      { label: "C", text: "The students were disappointed." },
    ],
    correctLetter: "A",
  },
  {
    id: 12,
    part: 2,
    questionHeader: "You will hear two friends talking about a football match.",
    question: "Who was the boy angry with?",
    options: [
      { label: "A", text: "the coach" },
      { label: "B", text: "the players" },
      { label: "C", text: "the fans" },
    ],
    correctLetter: "C",
  },
  {
    id: 13,
    part: 2,
    questionHeader: "You will hear two friends talking about a new leisure centre.",
    question: "What did the boy like most about it?",
    options: [
      { label: "A", text: "the design of the building" },
      { label: "B", text: "the gym’s equipment" },
      { label: "C", text: "the swimming pool" },
    ],
    correctLetter: "A",
  },
];

export const part3Gaps: Gap[] = [
  { id: 14, prompt: "Closing date for entries: ______", correctAnswers: ["13 july", "july 13", "july 13th", "13th july"] },
  { id: 15, prompt: "Aims: to raise money for new ______", correctAnswers: ["library", "a library"] },
  { id: 16, prompt: "First event starts: ______", correctAnswers: ["10.15", "10:15", "10 15"] },
  { id: 17, prompt: "Parents to ensure children have enough ______ on the day.", correctAnswers: ["food"] },
  { id: 18, prompt: "Most popular event expected to be the ______.", correctAnswers: ["football match", "football"] },
  { id: 19, prompt: "More children needed for the ______ event.", correctAnswers: ["high jump", "high-jump"] },
];

export const part4MCQ: MCQ[] = [
  {
    id: 20,
    part: 4,
    questionHeader: "You will hear a man on the radio reviewing last weekend’s television programmes.",
    question: "What does the reviewer say about Street Dancing?",
    options: [
      { label: "A", text: "It started late." },
      { label: "B", text: "It was cancelled." },
      { label: "C", text: "It was shorter than usual." },
    ],
    correctLetter: "B",
  },
  {
    id: 21,
    part: 4,
    questionHeader: "You will hear a man on the radio reviewing last weekend’s television programmes.",
    question: "What did the reviewer particularly like about Plants of Australia?",
    options: [
      { label: "A", text: "It was beautiful to look at." },
      { label: "B", text: "It gave a lot of information." },
      { label: "C", text: "It was filmed in unusual locations." },
    ],
    correctLetter: "C",
  },
  {
    id: 22,
    part: 4,
    questionHeader: "You will hear a man on the radio reviewing last weekend’s television programmes.",
    question: "The reviewer says the series Jojo’s party",
    options: [
      { label: "A", text: "ended at the weekend." },
      { label: "B", text: "will continue until October." },
      { label: "C", text: "started six months ago." },
    ],
    correctLetter: "A",
  },
  {
    id: 23,
    part: 4,
    questionHeader: "You will hear a man on the radio reviewing last weekend’s television programmes.",
    question: "Who knows? was different from usual because it",
    options: [
      { label: "A", text: "was mostly about sports." },
      { label: "B", text: "had a new group of experts." },
      { label: "C", text: "included questions from the audience." },
    ],
    correctLetter: "C",
  },
  {
    id: 24,
    part: 4,
    questionHeader: "You will hear a man on the radio reviewing last weekend’s television programmes.",
    question: "The reviewer thinks that Sunday’s Police Officer Briggs was",
    options: [
      { label: "A", text: "surprisingly good." },
      { label: "B", text: "the worst in the series." },
      { label: "C", text: "of its usual standard." },
    ],
    correctLetter: "A",
  },
  {
    id: 25,
    part: 4,
    questionHeader: "You will hear a man on the radio reviewing last weekend’s television programmes.",
    question: "Vanessa Cosgrave wasn’t in It’s Comedy Time! on Sunday because",
    options: [
      { label: "A", text: "she was away on holiday." },
      { label: "B", text: "she arrived late at the studio." },
      { label: "C", text: "she has left the programme." },
    ],
    correctLetter: "B",
  },
];

export const TOTAL_QUESTIONS = 25;

export const audioByPart: Record<PreliminaryPart, string> = {
  1: "/audio/preliminary-listening/part-1.mp3",
  2: "/audio/preliminary-listening/part-2.mp3",
  3: "/audio/preliminary-listening/part-3.mp3",
  4: "/audio/preliminary-listening/part-4.mp3",
};
