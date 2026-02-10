// src/pages/fce/writing/data/writingData.ts

export type WritingTask = {
  id: number;            // 1..4 (la Cambridge)
  part: 1 | 2;
  title: string;         // "Question 1" / "Question 2" etc
  instructionTop: string; // ex: "You must answer..."
  context: string[];     // paragrafe de context
  mainPrompt: string;    // întrebarea principală / cerința
  notesTitle?: string;   // "Notes"
  notes?: string[];      // bullets
  extraBoxTitle?: string; // ex: "We want to know:"
  extraBoxLines?: string[];
  constraints?: {
    minWords: number;
    maxWords: number;
    styleHint?: string;  // "email" / "article" / "story"
  };
};

export const tasks: WritingTask[] = [
  {
    id: 1,
    part: 1,
    title: "Question 1",
    instructionTop: "You must answer this question. Write your answer in 140–190 words in an appropriate style.",
    context: [
      "In your English class you have been talking about the advantages and disadvantages of using social media websites. Now your English teacher has asked you to write an essay.",
      "Write an essay using all the notes and give reasons for your point of view.",
    ],
    mainPrompt: "Do we share too much personal information on social media websites?",
    notesTitle: "Notes",
    notes: ["uploading images", "posting comments", "............................ (your own idea)"],
    constraints: { minWords: 140, maxWords: 190, styleHint: "essay" },
  },

  // Part 2: user chooses ONE of Q2–Q4 (but we can still show all three)
  {
    id: 2,
    part: 2,
    title: "Question 2",
    instructionTop: "Write an answer to one of the questions 2–4 in this part. Write an answer in 140–190 words in an appropriate style.",
    context: [
      "You want to do some volunteer work with your English-speaking friend. You have found this leaflet.",
      "Write an email to the Young Volunteers Group giving the information requested and asking about accommodation, food and transport.",
    ],
    mainPrompt: "Young Volunteers Group",
    extraBoxLines: [
      "Volunteering is about doing something useful without getting paid.",
      "",
      "We need:",
      "• Events assistants",
      "• Environmental workers",
      "• Children’s activities coordinators",
      "",
      "Tell us what skills you have and when you are available.",
    ],
    constraints: { minWords: 140, maxWords: 190, styleHint: "email" },
  },
  {
    id: 3,
    part: 2,
    title: "Question 3",
    instructionTop: "Write an answer to one of the questions 2–4 in this part. Write an answer in 140–190 words in an appropriate style.",
    context: [
      "You have seen this advertisment in an international travel magazine.",
      "Can you write an article recommending a great destination in your country to our readers?",
    ],
    mainPrompt: "We want to know:",
    extraBoxLines: [
      "• Good destinations for young and energetic travellers.",
      "• The scenery, wildlife and adventure opportunities the place has.",
      "• The best time of the year to go.",
    ],
    constraints: { minWords: 140, maxWords: 190, styleHint: "article" },
  },
  {
    id: 4,
    part: 2,
    title: "Question 4",
    instructionTop: "Write an answer to one of the questions 2–4 in this part. Write an answer in 140–190 words in an appropriate style.",
    context: [
      "Your teacher has asked you to write a story for an international magazine. The story must begin with these words:",
    ],
    mainPrompt: "As soon as I saw the danger they were in, I knew I had to do something.",
    extraBoxLines: [
      "Your story must include:",
      "• a river",
      "• a mobile phone",
    ],
    constraints: { minWords: 140, maxWords: 190, styleHint: "story" },
  },
];

export const getTasksForPart = (part: 1 | 2) => tasks.filter((t) => t.part === part);
