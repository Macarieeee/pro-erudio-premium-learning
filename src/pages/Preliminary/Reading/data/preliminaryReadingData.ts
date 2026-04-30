export type Letter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";

export type MCQOption = {
  label: Letter;
  text: string;
};

export type MCQQuestion = {
  id: number;
  part: 1 | 3 | 5;
  prompt?: string;
  question: string;
  options: MCQOption[];
  correctLetter: Letter;
};

export type MatchingQuestion = {
  id: number;
  part: 2 | 4;
  text?: string;
  correctLetter: Letter;
};

export type OpenGapQuestion = {
  id: number;
  answers: string[];
};

export const TOTAL_QUESTIONS = 32;

export const part1MCQ: MCQQuestion[] = [
  {
    id: 1,
    part: 1,
    prompt: "After opening keep in a refrigerator and use within two days.",
    question: "What does this mean?",
    options: [
      { label: "A", text: "This product doesn’t need to be kept cool." },
      { label: "B", text: "This product can last for two days after you open it." },
      { label: "C", text: "This product must be put in a refrigerator immediately." },
    ],
    correctLetter: "B",
  },
  {
    id: 2,
    part: 1,
    prompt: "The summer swimming timetable has changed. Please ask at reception for details.",
    question: "What does this mean?",
    options: [
      { label: "A", text: "You can get information about new times from the receptionist." },
      { label: "B", text: "Tell the receptionist about any changes in your details." },
      { label: "C", text: "The swimming pool is open at the usual times." },
    ],
    correctLetter: "A",
  },
  {
    id: 3,
    part: 1,
    prompt: "The hotel dining room is available for private parties on Sundays.",
    question: "What does this mean?",
    options: [
      { label: "A", text: "You cannot eat here at the weekends." },
      { label: "B", text: "Hotel guests can have parties in their rooms." },
      { label: "C", text: "It is possible to hire the dining room." },
    ],
    correctLetter: "C",
  },
  {
    id: 4,
    part: 1,
    prompt: "To: Jack\nFrom: Emma\n\nDid you phone the travel agent?\nCan I get an earlier plane? This is the worst holiday I’ve ever had!",
    question: "What does this message mean?",
    options: [
      { label: "A", text: "Emma wants Jack to arrange another holiday." },
      { label: "B", text: "Jack wants to be on holiday with Emma." },
      { label: "C", text: "Emma had asked Jack to find out about flight times." },
    ],
    correctLetter: "C",
  },
  {
    id: 5,
    part: 1,
    prompt: "NOTICE\n\nDiscount day next Friday!\nHundreds of our most popular products will be reduced for one day only. Don’t miss it!",
    question: "What does this mean?",
    options: [
      { label: "A", text: "Everything in this shop will be cheaper on Friday." },
      { label: "B", text: "There will be a discount on many items on Friday." },
      { label: "C", text: "The shop’s most popular products will cost less after Friday." },
    ],
    correctLetter: "B",
  },
];

export const part2People: MatchingQuestion[] = [
  {
    id: 6,
    part: 2,
    text: "Rita and Tania are interested in dance. They both like modern and traditional ballet and enjoy learning about the dancers' experiences and ideas. They often go out in the evening.",
    correctLetter: "D",
  },
  {
    id: 7,
    part: 2,
    text: "Charlie and Petra are very keen on nature, particularly wildlife and the Antarctic. They enjoy experts discussing environmental issues, but they don't like phone-in programmes.",
    correctLetter: "F",
  },
  {
    id: 8,
    part: 2,
    text: "Roger and Martin both go cycling every weekend, entering short and long distance races. They want to be as fit as possible and also learn about the history of cycle racing.",
    correctLetter: "E",
  },
  {
    id: 9,
    part: 2,
    text: "Penny and Paul enjoy live arts, especially theater and classical music concerts. They live in the countryside and cannot go to the city very often.",
    correctLetter: "G",
  },
  {
    id: 10,
    part: 2,
    text: "Danny and Fred are interested in exploration, especially people who go on trips for the first time or in unusual ways. They would like to plan a trip themselves one day.",
    correctLetter: "B",
  },
];

export const part2Programmes = [
  {
    label: "A",
    title: "Stage Sensational",
    text: "Three young actors play in this new evening series about a drama club. Keen to escape from the traditional approach of the school, they develop their own modern style, but can they manage to show it in public performances?",
  },
  {
    label: "B",
    title: "One Man and his Bike",
    text: "The longest journey. Whether this is your first viewing or you are returning to keep up to date, you'll be entertained by Harry Lomas' self-recorded commentary. Harry describes his strange experiences as he rides around the world on his old red bike, following routes nobody's tried before. Tonight, he meets a bear.",
  },
  {
    label: "C",
    title: "Animal Access",
    text: "If you're concerned about green issues, if you care about wild animals, here's the programme for you. Join our panel discussion by phoning in with your own questions or suggestions for keeping our planet safe for animals, and you could even win the top prize, a trip to Antarctica.",
  },
  {
    label: "D",
    title: "Moving Story",
    text: "Follow the joys and heartaches of a junior dance school's attempt to reach the national final championships in different styles. Every afternoon, you can see an update of their progress, and you can phone in your vote on individual performances.",
  },
  {
    label: "E",
    title: "The Road to Success",
    text: "An enjoyable biography of one of the fastest cyclists of all time. Mixing old sections of film with current interviews and even the chance to phone in with your own questions about technique and so on. This program will inspire you to ride faster yourself.",
  },
  {
    label: "F",
    title: "The Last Paradise",
    text: "The white frozen landscape of the South Pole is said to be the last place man hasn't damaged beyond repair. Watch the fascinating film of native animals and birds and you'll feel you're there yourself with some of the never-before-used camera techniques.",
  },
  {
    label: "G",
    title: "Perfect Performances",
    text: "Whether your tastes are traditional or more modern, you'll love this celebration of plays and operas, each one performed to the highest standards and broadcast to your living room. Additional material about history and background is available interactively.",
  },
  {
    label: "H",
    title: "Routes and Riding",
    text: "For children and parents alike, this programme is designed to get children riding bikes, exploring the countryside, getting fitter and healthier and learning more about the natural world around them. Special routes are shown for first-time riders.",
  },
] as const;

export const part3Title = "Night work";
export const part3Text = `Can you imagine what it would be like working at night? You would start your day when everyone else was going to bed, and you would go to bed when everyone else was getting up. Is that really a natural way to live?

These days, more and more jobs need to be done at night. Most big hotels offer 24-hour room service and need staff at reception and working in the bars. Many companies have 24-hour call centers to deal with emergency enquiries. There are 24-hour supermarkets, and of course, there are the workers of the emergency services, such as firefighters, the police, and hospital workers.

However, few people can work well at night. This is partly because we cannot easily change our sleeping habits. Some people can manage on as little as three hours' sleep, while others need as many as 11 hours. You're either a short sleeper or a long sleeper. If working at night stops you from getting the amount of sleep you need, you will damage your health.

The best part of the day for the human is around lunchtime, and the worst point is between 2 a.m. and 4 a.m. So if you're driving home at this time or doing something important at work, things are far more likely to go wrong.

Humans are used to sleeping at night and being awake during the day, and they will never be able to do these things the other way around. The problem is that today's 24-hour society isn't going to slow down, which means that night workers will remain.`;

export const part3MCQ: MCQQuestion[] = [
  {
    id: 11,
    part: 3,
    question: "What’s the writer’s main aim in writing the text?",
    options: [
      { label: "A", text: "to describe the importance of work" },
      { label: "B", text: "to say how working at night can be bad for you" },
      { label: "C", text: "to suggest how people can change their way of life" },
      { label: "D", text: "to recommend people spend more time sleeping" },
    ],
    correctLetter: "B",
  },
  {
    id: 12,
    part: 3,
    question: "What does the writer say about night jobs?",
    options: [
      { label: "A", text: "Many people refuse to work at night." },
      { label: "B", text: "It is easier than working during the day." },
      { label: "C", text: "It is easier to demand better working conditions." },
      { label: "D", text: "There is a variety of them." },
    ],
    correctLetter: "D",
  },
  {
    id: 13,
    part: 3,
    question: "What would a reader learn about sleep from the text?",
    options: [
      { label: "A", text: "Everybody needs the same amount." },
      { label: "B", text: "It’s difficult to change your sleeping needs." },
      { label: "C", text: "People sleep better in the early morning." },
      { label: "D", text: "Many people need more than 11 hours’ sleep." },
    ],
    correctLetter: "B",
  },
  {
    id: 14,
    part: 3,
    question: "What does the writer say about the future?",
    options: [
      { label: "A", text: "Fewer people will work during the day." },
      { label: "B", text: "Some jobs will always be done at night." },
      { label: "C", text: "People will demand fewer services." },
      { label: "D", text: "People will work longer hours." },
    ],
    correctLetter: "B",
  },
  {
    id: 15,
    part: 3,
    question: "Which of the following could be a title for this text?",
    options: [
      { label: "A", text: "A good night’s sleep can change your life!" },
      { label: "B", text: "A worker that sleeps more, works more!" },
      { label: "C", text: "Society is changing, but our bodies are not!" },
      { label: "D", text: "The loneliest job in the world!" },
    ],
    correctLetter: "C",
  },
];

export const part4Title = "Creating a youth club";
export const part4Paragraphs = [
  "Last summer, our town achieved something quite special. We created a youth club in the town centre. Before that, there was absolutely nothing for the young people to do after school and at the weekends. [[16]] It took a long time to finally open the youth club. First of all, we had to find a building that we could use. We put up posters all over the town, asking people to help us find a place. We were very lucky because after a couple of weeks, someone said we could have an old shop that had been closed for a year. [[17]] Best of all, he said, we did not have to pay anything to use it. The only thing we had to promise to do was to keep it in good condition.",
  "Once we had a building, lots of people came to help us paint the rather dirty rooms and put furniture in it. [[18]] Then, a big business in the town gave us three computers and a large TV. The local football team gave us some sport and fitness equipment, and they send a coach twice a week to do health and fitness classes with us. [[19]] There, we can buy drinks and snacks. My mother often bakes cakes for the cafe. We also do lots of art at the youth club. We put our pictures on the walls to make the place look really interesting and colourful.",
  "I think the most important thing about our youth club, though, is that it is a place that young people can go to if they are feeling lonely and want someone to talk to. Also, there is a homework room where we can sit quietly and study. This is useful to me because I have to share a room with my little sister at home. [[20]] Obviously, that makes it hard for me to concentrate on my schoolwork.",
  "Creating the youth club, in my opinion, is the best thing that has happened in our town recently.",
];

export const part4Questions: MatchingQuestion[] = [
  { id: 16, part: 4, correctLetter: "D" },
  { id: 17, part: 4, correctLetter: "G" },
  { id: 18, part: 4, correctLetter: "A" },
  { id: 19, part: 4, correctLetter: "H" },
  { id: 20, part: 4, correctLetter: "C" },
];

export const part4Options = [
  { label: "A", text: "We didn’t have to buy anything as many people gave us chairs, tables, desks, etc." },
  { label: "B", text: "However, the shop wasn’t suitable for what we needed." },
  { label: "C", text: "I love her very much, but she talks all the time and makes a lot of noise." },
  { label: "D", text: "As a result, people were very bored and it was difficult to make new friends." },
  { label: "E", text: "The building was clean and bright so we didn’t have to do anything to it." },
  { label: "F", text: "She always behaves very well because she is shy and quiet." },
  { label: "G", text: "The owner did not want to rent it to anyone and that’s why he said we could use it permanently." },
  { label: "H", text: "Some of the parents run a small cafe in the youth club, too." },
] as const;

export const part5Title = "The skies above";
export const part5Text = `The weather has a big effect on our lives. Consider the difference [[21]] waking up on a bright sunny morning and waking up on a dark, wet, and cold morning. Don't you feel positive in the first case and maybe sad in the second? We use weather words to [[22]] about the way we feel. For example, if somebody [[23]] angry, their face 'clouds over'.

We do different things [[24]] to what the weather is like. How [[25]] are you on walking in the park on a rainy day? We think about the weather before we choose what clothes to [[26]] on each morning.`;

export const part5MCQ: MCQQuestion[] = [
  {
    id: 21,
    part: 5,
    question: "21",
    options: [
      { label: "A", text: "with" },
      { label: "B", text: "between" },
      { label: "C", text: "of" },
      { label: "D", text: "among" },
    ],
    correctLetter: "B",
  },
  {
    id: 22,
    part: 5,
    question: "22",
    options: [
      { label: "A", text: "inform" },
      { label: "B", text: "tell" },
      { label: "C", text: "describe" },
      { label: "D", text: "talk" },
    ],
    correctLetter: "D",
  },
  {
    id: 23,
    part: 5,
    question: "23",
    options: [
      { label: "A", text: "becomes" },
      { label: "B", text: "goes" },
      { label: "C", text: "makes" },
      { label: "D", text: "runs" },
    ],
    correctLetter: "A",
  },
  {
    id: 24,
    part: 5,
    question: "24",
    options: [
      { label: "A", text: "allowing" },
      { label: "B", text: "depending" },
      { label: "C", text: "following" },
      { label: "D", text: "according" },
    ],
    correctLetter: "D",
  },
  {
    id: 25,
    part: 5,
    question: "25",
    options: [
      { label: "A", text: "keen" },
      { label: "B", text: "enjoyable" },
      { label: "C", text: "happy" },
      { label: "D", text: "popular" },
    ],
    correctLetter: "A",
  },
  {
    id: 26,
    part: 5,
    question: "26",
    options: [
      { label: "A", text: "take" },
      { label: "B", text: "get" },
      { label: "C", text: "put" },
      { label: "D", text: "set" },
    ],
    correctLetter: "C",
  },
];

export const part6Title = "Staying in on a Saturday night";
export const part6Text = `Most teenagers look forward to Saturday night, as it is normally the time to go [[27]] and have fun with friends. But occasionally, as I am exhausted from all the studying for school, I just need to relax and [[28]] at home.

Tonight, two of my friends are coming round to my house and we are [[29]] to watch a film on Netflix together. We are going to watch an action film, which is great, because my audio system has four speakers around the living room. The sound effects will be great.

We have decided to order some pizza, because my mom has to work late and none of us wanted to cook tonight. [[30]] is also a lot of ice cream in the freezer for dessert. I guess we won't be eating healthy food tonight.

My sister [[31]] already gone to the cinema with her friends, so she won't be bothering us [[32]] she comes home early.`;

export const part6OpenGaps: OpenGapQuestion[] = [
  { id: 27, answers: ["out"] },
  { id: 28, answers: ["stay", "be"] },
  { id: 29, answers: ["going"] },
  { id: 30, answers: ["there"] },
  { id: 31, answers: ["has"] },
  { id: 32, answers: ["unless"] },
];

export const meta = {
  1: {
    range: "Questions 1–5",
    instruction: "Read the notices and messages. For each question, choose the correct answer.",
  },
  2: {
    range: "Questions 6–10",
    instruction: "The people below all want to watch a TV programme. Choose the most suitable programme for each person.",
  },
  3: {
    range: "Questions 11–15",
    instruction: "Read the text. For each question, choose the correct answer.",
  },
  4: {
    range: "Questions 16–20",
    instruction: "Five sentences have been removed from the text. Choose the correct sentence for each gap. There are three extra sentences.",
  },
  5: {
    range: "Questions 21–26",
    instruction: "Read the text. For each question, choose the correct answer.",
  },
  6: {
    range: "Questions 27–32",
    instruction: "For each question, write the correct answer. Write one word for each gap.",
  },
} as const;
