// src/pages/cae/listening/data/caeListeningData.ts

export type Part = 1 | 2 | 3 | 4;

export type MCQ = {
  id: number;
  part: 1 | 3;
  extract?: string;
  questionHeader: string;
  question: string;
  options: string[];
  correctIndex: number;
};

export type Gap = {
  id: number;
  prompt: string;
  correctAnswers: string[];
};

export type MatchOption = {
  letter: string;
  text: string;
};

export type MatchQuestion = {
  id: number;
  task: 1 | 2;
  speakerNumber: number;
  speakerLabel: string;
  correctLetter: string;
};

export type AudioTrack = {
  label: string;
  src: string;
};

export const audioTracks: Record<Part, AudioTrack[]> = {
  1: [
    { label: "Part 1 audio 1", src: "/audio/cae/Part 1 (0).mp3" },
    { label: "Part 1 audio 2", src: "/audio/cae/Part 1 (1).mp3" },
    { label: "Part 1 audio 3", src: "/audio/cae/Part 1 (2).mp3" },
    { label: "Part 1 audio 4", src: "/audio/cae/Part 1 (3).mp3" },
    { label: "Part 1 audio 5", src: "/audio/cae/Part 1 (4).mp3" },
    { label: "Part 1 audio 6", src: "/audio/cae/Part 1 (5).mp3" },
    { label: "Part 1 audio 7", src: "/audio/cae/Part 1 (6).mp3" },
  ],
  2: [
    { label: "Part 2 audio 1", src: "/audio/cae/Part 2 (1).mp3" },
    { label: "Part 2 audio 2", src: "/audio/cae/Part 2 (2).mp3" },
  ],
  3: [
    { label: "Part 3 audio 1", src: "/audio/cae/Part 3 (1).mp3" },
    { label: "Part 3 audio 2", src: "/audio/cae/Part 3 (2).mp3" },
  ],
  4: [
    { label: "Part 4 audio 1", src: "/audio/cae/Part 4 (1).mp3" },
    { label: "Part 4 audio 2", src: "/audio/cae/Part 4 (2).mp3" },
  ],
};

export const part1MCQ: MCQ[] = [
  {
    id: 1,
    part: 1,
    extract: "Extract One",
    questionHeader: "You hear two students talking about shopping for clothes.",
    question: "What do they agree about?",
    options: [
      "It’s better to buy inexpensive clothes.",
      "Shopping for clothes is to be avoided.",
      "People should respect your taste in clothes.",
    ],
    correctIndex: 1,
  },
  {
    id: 2,
    part: 1,
    extract: "Extract One",
    questionHeader: "You hear two students talking about shopping for clothes.",
    question: "According to the man, many people see shopping as a way of",
    options: [
      "achieving social status.",
      "making a comment on society.",
      "identifying with a particular group.",
    ],
    correctIndex: 0,
  },
  {
    id: 3,
    part: 1,
    extract: "Extract Two",
    questionHeader: "You hear part of an interview with a musician called Max.",
    question: "What does he say about his music in his teenage years?",
    options: [
      "He wanted to keep it to himself.",
      "He felt quite self-confident about it.",
      "He was reluctant to ask for help with it.",
    ],
    correctIndex: 1,
  },
  {
    id: 4,
    part: 1,
    extract: "Extract Two",
    questionHeader: "You hear part of an interview with a musician called Max.",
    question: "What does he suggest about his recording contract?",
    options: [
      "It didn’t guarantee him ongoing success.",
      "It didn’t mean he could give up other work.",
      "It didn’t have very good terms and conditions.",
    ],
    correctIndex: 0,
  },
  {
    id: 5,
    part: 1,
    extract: "Extract Three",
    questionHeader: "You hear part of a discussion programme in which two dancers are talking about their careers.",
    question: "The man was inspired to train as a dancer by",
    options: [
      "one reaction to a performance he gave.",
      "some encouragement from his friends.",
      "the athletic nature of the activity.",
    ],
    correctIndex: 0,
  },
  {
    id: 6,
    part: 1,
    extract: "Extract Three",
    questionHeader: "You hear part of a discussion programme in which two dancers are talking about their careers.",
    question: "The woman admits that as a teenager, she",
    options: [
      "behaved unreasonably at times.",
      "resented her parents’ ambitions for her.",
      "managed to keep certain feelings to herself.",
    ],
    correctIndex: 2,
  },
];

export const part2Title = "Computer game designer";

export const part2Gaps: Gap[] = [
  {
    id: 7,
    prompt: "Paul says that people often think that he’s a game ______ rather than a designer.",
    correctAnswers: ["developer"],
  },
  {
    id: 8,
    prompt: "As part of his degree, Paul did a course in ______ which has proved most useful in his career.",
    correctAnswers: ["animation"],
  },
  {
    id: 9,
    prompt: "In his first job, Paul was designing ______ most of the time.",
    correctAnswers: ["book covers", "book-cover designs", "book cover designs"],
  },
  {
    id: 10,
    prompt: "Paul worked on what are known as ______ in his first job.",
    correctAnswers: ["user interfaces", "user interface"],
  },
  {
    id: 11,
    prompt: "Paul mentions a game with the name ______ as the one he’s enjoyed working on the most.",
    correctAnswers: ["star city"],
  },
  {
    id: 12,
    prompt: "Paul uses the word ______ to describe what multi-players in a game can create for themselves.",
    correctAnswers: ["narrative"],
  },
  {
    id: 13,
    prompt: "Paul says that achieving the correct ______ is the biggest challenge when designing a game.",
    correctAnswers: ["difficulty level"],
  },
  {
    id: 14,
    prompt: "Paul feels that ______ is the most important personal quality that a game designer needs.",
    correctAnswers: ["dedication"],
  },
];

export const part3MCQ: MCQ[] = [
  {
    id: 15,
    part: 3,
    questionHeader: "You will hear an interview with a young film director, Lauren Casio, who is talking about her life and work.",
    question: "Lauren was encouraged to follow a career as a film-maker because her teachers",
    options: [
      "could see that she had potential.",
      "found her early attempts highly original.",
      "were impressed by her level of motivation.",
      "appreciated her ability to work within a budget.",
    ],
    correctIndex: 0,
  },
  {
    id: 16,
    part: 3,
    questionHeader: "You will hear an interview with a young film director, Lauren Casio, who is talking about her life and work.",
    question: "How does Lauren respond when asked about critics of film school?",
    options: [
      "She thinks they would benefit from going to one.",
      "She defends the record of the one that she attended.",
      "She agrees that it’s less useful for certain types of work.",
      "She regrets that it is the only option for poorer students.",
    ],
    correctIndex: 1,
  },
  {
    id: 17,
    part: 3,
    questionHeader: "You will hear an interview with a young film director, Lauren Casio, who is talking about her life and work.",
    question: "Lauren didn’t start making full-length feature films sooner because",
    options: [
      "she wanted to be sure of her ability first.",
      "she had a bad experience with an early attempt.",
      "she wasn’t lucky enough to have the opportunity.",
      "she didn’t manage to find the financial backing she needed.",
    ],
    correctIndex: 0,
  },
  {
    id: 18,
    part: 3,
    questionHeader: "You will hear an interview with a young film director, Lauren Casio, who is talking about her life and work.",
    question: "What does Lauren say about the characters in her films?",
    options: [
      "She tries to surprise her audience with them.",
      "She likes them to fit into well defined types.",
      "She accepts that the men may be more interesting.",
      "She sets out to make them as complicated as possible.",
    ],
    correctIndex: 3,
  },
  {
    id: 19,
    part: 3,
    questionHeader: "You will hear an interview with a young film director, Lauren Casio, who is talking about her life and work.",
    question: "How does Lauren feel now about the film Hidden Valley Dreams?",
    options: [
      "She regrets the setting she chose for it.",
      "She regards it as being far from perfect.",
      "She’s surprised that it’s proved so popular.",
      "She wishes she’d spent more time on the plot.",
    ],
    correctIndex: 1,
  },
  {
    id: 20,
    part: 3,
    questionHeader: "You will hear an interview with a young film director, Lauren Casio, who is talking about her life and work.",
    question: "How does Lauren feel when she goes to give talks in schools?",
    options: [
      "Unsure whether to reveal her humble background.",
      "Worried that she might give the kids unrealistic ambitions.",
      "Slightly uncomfortable with the idea of being a role model.",
      "Concerned that she may not command the respect of the students.",
    ],
    correctIndex: 2,
  },
];

export const part4Task1Options: MatchOption[] = [
  { letter: "A", text: "gets some fresh air" },
  { letter: "B", text: "puts flowers in the dressing room" },
  { letter: "C", text: "focuses on personal souvenirs" },
  { letter: "D", text: "does some exercises" },
  { letter: "E", text: "chats to the audience" },
  { letter: "F", text: "leaves gifts for the other cast members" },
  { letter: "G", text: "has a rest" },
  { letter: "H", text: "checks everything is in place" },
];

export const part4Task2Options: MatchOption[] = [
  { letter: "A", text: "being affected by illness" },
  { letter: "B", text: "getting a negative audience reaction" },
  { letter: "C", text: "receiving poor reviews" },
  { letter: "D", text: "being disturbed by noise" },
  { letter: "E", text: "having an accident" },
  { letter: "F", text: "finding something unexpected on stage" },
  { letter: "G", text: "attracting a very small audience" },
  { letter: "H", text: "getting the words wrong" },
];

export const part4Task1Matches: MatchQuestion[] = [
  { id: 21, task: 1, speakerNumber: 1, speakerLabel: "Speaker 1", correctLetter: "C" },
  { id: 22, task: 1, speakerNumber: 2, speakerLabel: "Speaker 2", correctLetter: "D" },
  { id: 23, task: 1, speakerNumber: 3, speakerLabel: "Speaker 3", correctLetter: "F" },
  { id: 24, task: 1, speakerNumber: 4, speakerLabel: "Speaker 4", correctLetter: "H" },
  { id: 25, task: 1, speakerNumber: 5, speakerLabel: "Speaker 5", correctLetter: "A" },
];

export const part4Task2Matches: MatchQuestion[] = [
  { id: 26, task: 2, speakerNumber: 1, speakerLabel: "Speaker 1", correctLetter: "A" },
  { id: 27, task: 2, speakerNumber: 2, speakerLabel: "Speaker 2", correctLetter: "H" },
  { id: 28, task: 2, speakerNumber: 3, speakerLabel: "Speaker 3", correctLetter: "C" },
  { id: 29, task: 2, speakerNumber: 4, speakerLabel: "Speaker 4", correctLetter: "E" },
  { id: 30, task: 2, speakerNumber: 5, speakerLabel: "Speaker 5", correctLetter: "F" },
];

export const TOTAL_QUESTIONS = 30;
