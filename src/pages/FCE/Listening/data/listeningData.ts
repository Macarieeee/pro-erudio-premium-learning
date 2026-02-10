// src/pages/fce/listening/data/listeningData.ts

export type MCQ = {
  id: number;
  part: 1 | 4;
  questionHeader: string; // ex: "You hear a message..."
  question: string; // ex: "Why is the speaker calling?"
  options: string[];
  correctIndex: number; // 0-based
};

export type Gap = {
  id: number; // 9-18
  prompt: string; // sentence with missing info (we show as prompt + input)
  correctAnswers: string[]; // accept multiple variants
};

export type Match = {
  id: number; // 19-23
  speakerLabel: string; // "Speaker 1"
  correctLetter: string; // A-H
};

export const part1MCQ: MCQ[] = [
  {
    id: 1,
    part: 1,
    questionHeader: "You hear a TV presenter talking about making travel documentaries for TV.",
    question: "What does he appreciate most about his job?",
    options: [
      "It allows him plenty of free time.",
      "It doesn’t feel like work.",
      "It provides him with a good salary.",
    ],
    correctIndex: 1,
  },
  {
    id: 2,
    part: 1,
    questionHeader: "You hear an interview with a woman talking about rowing across the Atlantic Ocean.",
    question: "How did she and her team feel before they set out?",
    options: [
      "concerned that their age would be a problem",
      "worried about the weather conditions at sea",
      "unsure that they complete the journey",
    ],
    correctIndex: 2,
  },
  {
    id: 3,
    part: 1,
    questionHeader: "You hear two colleagues talking about what they did at the weekend.",
    question: "How did the woman spend her time?",
    options: [
      "applying for a new position",
      "catching up on her work",
      "improving her job prospects",
    ],
    correctIndex: 2,
  },
  {
    id: 4,
    part: 1,
    questionHeader: "You hear an interview with a musician who is talking about being famous.",
    question: "What does he enjoy?",
    options: [
      "being recognised by the public",
      "performing in front of an audience",
      "pretending to be someone he’s not",
    ],
    correctIndex: 1,
  },
  {
    id: 5,
    part: 1,
    questionHeader: "You hear part of an interview with a writer in which he talks about the novel he has written.",
    question: "What does he say about the novel?",
    options: [
      "It would make a good film.",
      "It is a different type of book for him.",
      "It took him a long time to write.",
    ],
    correctIndex: 0,
  },
  {
    id: 6,
    part: 1,
    questionHeader: "You hear a hotel owner talking about her hotel.",
    question: "What does she say about the customer service there?",
    options: [
      "There is still a lot of room for improvement.",
      "She researched the subject thoroughly in advance.",
      "It is typical of the standards she is trying to achieve.",
    ],
    correctIndex: 2,
  },
  {
    id: 7,
    part: 1,
    questionHeader: "You hear two friends talking about a housing development scheme in their town.",
    question: "The man says that the scheme fails to",
    options: [
      "satisfy current housing needs.",
      "contribute to the local area.",
      "use all the space available.",
    ],
    correctIndex: 0,
  },
  {
    id: 8,
    part: 1,
    questionHeader: "You hear two people on a discussion programme talking about the way employees dress for work.",
    question: "What do they agree about?",
    options: [
      "A company’s image suffers if informal clothes are worn.",
      "Employers are less concerned about appearance than previously.",
      "Employees produce better work if they feel more relaxed.",
    ],
    correctIndex: 1,
  },
];

export const part2Gaps: Gap[] = [
  { id: 9, prompt: "Mark says ______ was the month when the Albuquerque Balloon Festival was first held.", correctAnswers: ["february"] },
  { id: 10, prompt: "Mark found out that the organiser had first used a balloon to promote his ______ firm.", correctAnswers: ["transport"] },
  { id: 11, prompt: "Mark liked the theme of the event this year, which was called ‘______’.", correctAnswers: ["dreams"] },
  { id: 12, prompt: "Mark says the balloons that have unusual ______ are the most popular with visitors.", correctAnswers: ["shapes"] },
  { id: 13, prompt: "When Mark saw the Flight of Nations balloons, he particularly enjoyed the ______ of different nationalities.", correctAnswers: ["music"] },
  { id: 14, prompt: "Mark learned that pilots try to find the ‘Albuquerque ______’ so they can land in the same place they took off.", correctAnswers: ["box"] },
  { id: 15, prompt: "Mark says that a balloon is attached by ______ to the basket.", correctAnswers: ["ropes"] },
  { id: 16, prompt: "Mark was surprised to find out that a pilot sometimes needs to get rid of ______ in order to maintain height.", correctAnswers: ["water"] },
  { id: 17, prompt: "Mark says that in the bigger balloons, there is a ______ to protect passengers from the rain.", correctAnswers: ["rain curtain", "curtain", "(rain) curtain"] },
  { id: 18, prompt: "On the second day of the festival, Mark saw the balloons take off at ______.", correctAnswers: ["sunrise", "dawn"] },
];

export const part3Options = [
  { letter: "A", text: "I missed my school friends." },
  { letter: "B", text: "I was anxious that I might get lost." },
  { letter: "C", text: "I was excited about meeting new people." },
  { letter: "D", text: "I felt relieved that I understood the lectures." },
  { letter: "E", text: "I worried that I’d find the work too difficult." },
  { letter: "F", text: "I felt confident that I’d chosen the right course." },
  { letter: "G", text: "I was disappointed by the number of people on my course." },
  { letter: "H", text: "I was impatient to start my course." },
] as const;

export const part3Matches: Match[] = [
  { id: 19, speakerLabel: "Speaker 1", correctLetter: "F" },
  { id: 20, speakerLabel: "Speaker 2", correctLetter: "H" },
  { id: 21, speakerLabel: "Speaker 3", correctLetter: "E" },
  { id: 22, speakerLabel: "Speaker 4", correctLetter: "A" },
  { id: 23, speakerLabel: "Speaker 5", correctLetter: "G" },
];

export const part4MCQ: MCQ[] = [
  {
    id: 24,
    part: 4,
    questionHeader:
      "You will hear part of an interview with a marine biologist called Ed Shapiro, who is talking about a diving project in the Pitcairn Islands in the South Pacific.",
    question: "Ed says that the area his team are currently working in has",
    options: [
      "made him feel optimistic about the future.",
      "escaped the effects of climate change so far.",
      "exhibited a more limited range of marine life than expected.",
    ],
    correctIndex: 1,
  },
  {
    id: 25,
    part: 4,
    questionHeader: "What happened on Ed’s most recent dive?",
    question: "",
    options: [
      "He gained further understanding of the reef ecosystem.",
      "He carried out some different research activities from his colleagues.",
      "He spent longer than he normally does under water.",
    ],
    correctIndex: 0,
  },
  {
    id: 26,
    part: 4,
    questionHeader: "What does Ed say about using cameras to photograph marine life?",
    question: "",
    options: [
      "He is constantly amazed by what photos can reveal.",
      "He thinks underwater equipment could be improved.",
      "He believes images are a good way to provide information.",
    ],
    correctIndex: 2,
  },
  {
    id: 27,
    part: 4,
    questionHeader: "What frightening experience did Ed have recently?",
    question: "",
    options: [
      "He went diving in dangerous seas.",
      "He lost one of his safety instruments.",
      "He came very close to some sharks.",
    ],
    correctIndex: 0,
  },
  {
    id: 28,
    part: 4,
    questionHeader: "What does Ed think about his career as a marine biologist?",
    question: "",
    options: [
      "He regrets not taking more risks.",
      "He’s glad that he followed the traditional path.",
      "He wonders if he made the decision too early in life.",
    ],
    correctIndex: 1,
  },
  {
    id: 29,
    part: 4,
    questionHeader: "How do the expedition members avoid homesickness?",
    question: "",
    options: [
      "by having regular contact with friends and family",
      "by planning group activities for quiet times",
      "by keeping themselves occupied",
    ],
    correctIndex: 2,
  },
  {
    id: 30,
    part: 4,
    questionHeader: "Ed says that he is happiest in his work when",
    question: "",
    options: [
      "he spends time in the deepest areas of the sea.",
      "he discovers previously unknown species.",
      "he feels his team’s reports are getting the publicity they deserve.",
    ],
    correctIndex: 1,
  },
];

export const TOTAL_QUESTIONS = 30;
