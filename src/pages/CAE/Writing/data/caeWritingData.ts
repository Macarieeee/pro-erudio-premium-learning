// src/pages/cae/writing/data/caeWritingData.ts

export type WritingTask = {
  id: number;
  part: 1 | 2;
  title: string;
  instructionTop: string;
  context: string[];
  mainPrompt: string;
  notesTitle?: string;
  notes?: string[];
  opinionsTitle?: string;
  opinions?: string[];
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
    instructionTop: "You must answer this question. Write your answer in 220–260 words in an appropriate style.",
    context: [
      "You attended a philosophy seminar in which the tutor suggested that all exams in schools and colleges be abolished. You have made the notes below.",
    ],
    mainPrompt: "Write an essay for your tutor discussing two points from your notes. You should explain whether you think abolishing exams is a good idea and provide reasons to support your opinions.",
    notesTitle: "Abolish exams",
    notes: [
      "Students are denied the enriching experience of learning because they are under too much pressure to pass the exam.",
      "Exams are not effective because they test memory rather than intelligence.",
      "It’s not a fair process; exam stress affects some students more than others. Not everyone performs well in exams.",
    ],
    opinionsTitle: "Other students in the seminar expressed their opinions:",
    opinions: [
      "But working towards the final exam often gives us the motivation we need in order to study.",
      "Exam-based assessment is a good way of figuring out whether students have really understood what they have been taught.",
      "Taking exams at school and university is actually a good life skill because it trains us to plan, prepare and deliver.",
    ],
    extraBoxLines: [
      "You may, if you wish, make use of the opinions expressed in the seminar, but you should use your own words as far as possible.",
    ],
    constraints: { minWords: 220, maxWords: 260, styleHint: "essay" },
  },
  {
    id: 2,
    part: 2,
    title: "Question 2",
    instructionTop: "Write an answer to one of the questions 2–4 in this part. Write your answer in 220–260 words in an appropriate style. Put the number in the box at the top of the page.",
    context: [
      "You see a poster at the train station announcing the arrival of a large circus in your town.",
      "As you are opposed to wild animals being kept in captivity, especially being confined and constantly transported, you decide to state your objections and lobby the local council to have the event cancelled.",
    ],
    mainPrompt: "Write the letter.",
    constraints: { minWords: 220, maxWords: 260, styleHint: "letter" },
  },
  {
    id: 3,
    part: 2,
    title: "Question 3",
    instructionTop: "Write an answer to one of the questions 2–4 in this part. Write your answer in 220–260 words in an appropriate style. Put the number in the box at the top of the page.",
    context: [
      "The company you work for moved to new offices six months ago, and the HR director would like to understand how staff are finding their new working environment.",
      "You have been asked to write a report on the part of the staff, assessing the adequacy of the new working environment in terms of location, building design and facilities.",
      "You are expected to make recommendations for improvement.",
    ],
    mainPrompt: "Write your report.",
    constraints: { minWords: 220, maxWords: 260, styleHint: "report" },
  },
  {
    id: 4,
    part: 2,
    title: "Question 4",
    instructionTop: "Write an answer to one of the questions 2–4 in this part. Write your answer in 220–260 words in an appropriate style. Put the number in the box at the top of the page.",
    context: [
      "You see the following in an online magazine.",
    ],
    mainPrompt: "Write your review.",
    extraBoxTitle: "The book that changed you",
    extraBoxLines: [
      "Our next magazine issue will feature reviews of books that changed the way you look at the world.",
      "In your review, you should briefly describe the plot, what it was that the book changed for you and what kind of reader you would recommend the book to.",
    ],
    constraints: { minWords: 220, maxWords: 260, styleHint: "review" },
  },
];

export const getTasksForPart = (part: 1 | 2) => tasks.filter((task) => task.part === part);
