import PlacementTest1 from "@/assets/Placement-Test1.webp";
import PlacementTest2 from "@/assets/Placement-Test2.jpg";

export type Choice = "a" | "b" | "c";

export type Question = {
  id: number;
  prompt: string;
  options: { key: Choice; text: string }[];
  correct?: Choice; // NU afișăm în UI; îl folosim mai târziu la scor
};

export type Test = {
  id: "yle" | "a2b2";
  title: string;
  subtitle: string;
  image?: string;
  questions: Question[];
  writingTask?: { title: string; details: string; task:string; minWords?: number; maxWords?: number };
};

export const placementTests: Test[] = [
  {
    id: "yle",
    title: "Test de plasare YLE",
    subtitle: "Pentru copii 8–10 ani (30 întrebări grilă + compunere opțională)",
    image: PlacementTest1,
    questions: [
      { id: 1, prompt: 'Choose the correct word: “This is my ___.”', options: [{ key: "a", text: "dog" }, { key: "b", text: "run" }, { key: "c", text: "happy" }], correct: "a" },
      { id: 2, prompt: 'Choose the correct form: “She ___ 10 years old.”', options: [{ key: "a", text: "are" }, { key: "b", text: "is" }, { key: "c", text: "am" }], correct: "b" },
      { id: 3, prompt: 'What is the correct plural? “Two ___.”', options: [{ key: "a", text: "cat" }, { key: "b", text: "cats" }, { key: "c", text: "cates" }], correct: "b" },
      { id: 4, prompt: 'Choose the correct word: “___ apple.”', options: [{ key: "a", text: "A" }, { key: "b", text: "An" }, { key: "c", text: "The" }], correct: "b" },
      { id: 5, prompt: 'Choose the correct option: “I ___ football.”', options: [{ key: "a", text: "play" }, { key: "b", text: "plays" }, { key: "c", text: "playing" }], correct: "a" },
      { id: 6, prompt: 'Choose the correct word: “It is ___ today.”', options: [{ key: "a", text: "sun" }, { key: "b", text: "sunny" }, { key: "c", text: "sunning" }], correct: "b" },
      { id: 7, prompt: '“Where ___ you from?”', options: [{ key: "a", text: "is" }, { key: "b", text: "are" }, { key: "c", text: "be" }], correct: "b" },
      { id: 8, prompt: 'Choose the correct option: “This is ___ book.”', options: [{ key: "a", text: "me" }, { key: "b", text: "my" }, { key: "c", text: "mine" }], correct: "b" },
      { id: 9, prompt: 'Choose the correct answer: “The opposite of big is ___.”', options: [{ key: "a", text: "small" }, { key: "b", text: "long" }, { key: "c", text: "tall" }], correct: "a" },
      { id: 10, prompt: 'Choose the correct form: “They ___ at school.”', options: [{ key: "a", text: "am" }, { key: "b", text: "is" }, { key: "c", text: "are" }], correct: "c" },
      { id: 11, prompt: 'Choose the correct preposition: “The cat is ___ the table.”', options: [{ key: "a", text: "under" }, { key: "b", text: "fast" }, { key: "c", text: "open" }], correct: "a" },
      { id: 12, prompt: '“Can you ___ this word?”', options: [{ key: "a", text: "read" }, { key: "b", text: "red" }, { key: "c", text: "reading" }], correct: "a" },
      { id: 13, prompt: 'Choose the correct answer: “Monday is a ___.”', options: [{ key: "a", text: "place" }, { key: "b", text: "color" }, { key: "c", text: "day" }], correct: "c" },
      { id: 14, prompt: 'Choose the correct option: “He has two ___.”', options: [{ key: "a", text: "foot" }, { key: "b", text: "feet" }, { key: "c", text: "feets" }], correct: "b" },
      { id: 15, prompt: 'Choose the correct word: “I have a ___ bike.”', options: [{ key: "a", text: "blue" }, { key: "b", text: "blues" }, { key: "c", text: "bluing" }], correct: "a" },
      { id: 16, prompt: "Choose the correct sentence:", options: [{ key: "a", text: "She like pizza." }, { key: "b", text: "She likes pizza." }, { key: "c", text: "She liking pizza." }], correct: "b" },
      { id: 17, prompt: 'Choose the correct verb: “Birds ___.”', options: [{ key: "a", text: "swim" }, { key: "b", text: "fly" }, { key: "c", text: "drive" }], correct: "b" },
      { id: 18, prompt: 'Choose the correct form: “We ___ English.”', options: [{ key: "a", text: "speak" }, { key: "b", text: "speaks" }, { key: "c", text: "speaking" }], correct: "a" },
      { id: 19, prompt: 'Choose the correct word: “It is very ___ outside.”', options: [{ key: "a", text: "cold" }, { key: "b", text: "colder" }, { key: "c", text: "coldest" }], correct: "a" },
      { id: 20, prompt: "“This is my mother and that is my ___.”", options: [{ key: "a", text: "sister" }, { key: "b", text: "door" }, { key: "c", text: "table" }], correct: "a" },
      { id: 21, prompt: 'Choose the correct option: “Open the ___.”', options: [{ key: "a", text: "window" }, { key: "b", text: "happy" }, { key: "c", text: "slow" }], correct: "a" },
      { id: 22, prompt: 'Choose the correct answer: “A cow is an ___.”', options: [{ key: "a", text: "animal" }, { key: "b", text: "color" }, { key: "c", text: "action" }], correct: "a" },
      { id: 23, prompt: 'Choose the correct question word: “___ is your name?”', options: [{ key: "a", text: "What" }, { key: "b", text: "Where" }, { key: "c", text: "Who" }], correct: "a" },
      { id: 24, prompt: 'Choose the correct answer: “Three plus two is ___.”', options: [{ key: "a", text: "four" }, { key: "b", text: "five" }, { key: "c", text: "six" }], correct: "b" },
      { id: 25, prompt: 'Choose the correct verb: “I ___ water.”', options: [{ key: "a", text: "drink" }, { key: "b", text: "drinks" }, { key: "c", text: "drinking" }], correct: "a" },
      { id: 26, prompt: 'Choose the correct option: “He ___ a red car.”', options: [{ key: "a", text: "have" }, { key: "b", text: "has" }, { key: "c", text: "haves" }], correct: "b" },
      { id: 27, prompt: 'Choose the correct word: “The sky is ___.”', options: [{ key: "a", text: "blue" }, { key: "b", text: "bread" }, { key: "c", text: "write" }], correct: "a" },
      { id: 28, prompt: "Choose the correct sentence:", options: [{ key: "a", text: "They is happy." }, { key: "b", text: "They are happy." }, { key: "c", text: "They am happy." }], correct: "b" },
      { id: 29, prompt: 'Choose the correct option: “This is a ___.” 🍎', options: [{ key: "a", text: "banana" }, { key: "b", text: "apple" }, { key: "c", text: "orange" }], correct: "b" },
      { id: 30, prompt: 'Choose the correct verb: “Cats ___ milk.”', options: [{ key: "a", text: "like" }, { key: "b", text: "likes" }, { key: "c", text: "liking" }], correct: "a" },
    ],
    writingTask: {
      title: "Sarcină de lucru suplimentară (opțional)",
      details:
        "Simți că întrebările au fost ușoare și nu evalueaza exact nivelul tău de cunoștință în limba engleză? Ai aici ocazia să ne arăți ce poți prin redactarea unei scurte compuneri.",
      task: "Write a short composition (50–100 words) about your favourite animal. What does it look like? What can it do? Where does it live? What does it eat? Why do you like it?",
        
      minWords: 50,
      maxWords: 100,
    },
  },

  {
    id: "a2b2",
    title: "Test de plasare A2–B2",
    subtitle: "Pentru copii 11–14 ani (30 întrebări grilă + story task opțional)",
    image: PlacementTest2,
    questions: [
      { id: 1, prompt: "If it ___ tomorrow, we’ll stay at home.", options: [{ key: "a", text: "will rain" }, { key: "b", text: "rains" }, { key: "c", text: "rained" }], correct: "b" },
      { id: 2, prompt: "He speaks English ___ than me.", options: [{ key: "a", text: "good" }, { key: "b", text: "well" }, { key: "c", text: "better" }], correct: "c" },
      { id: 3, prompt: "Choose the correct sentence:", options: [{ key: "a", text: "I didn’t used to like coffee." }, { key: "b", text: "I didn’t use to like coffee." }, { key: "c", text: "I didn’t use to liked coffee." }], correct: "b" },
      { id: 4, prompt: "She ___ to the gym every day.", options: [{ key: "a", text: "go" }, { key: "b", text: "goes" }, { key: "c", text: "going" }], correct: "b" },
      { id: 5, prompt: "I haven’t seen him ___ Monday.", options: [{ key: "a", text: "since" }, { key: "b", text: "for" }, { key: "c", text: "from" }], correct: "a" },
      { id: 6, prompt: "The film was ___ than I expected.", options: [{ key: "a", text: "more interesting" }, { key: "b", text: "most interesting" }, { key: "c", text: "interestingest" }], correct: "a" },
      { id: 7, prompt: "They ___ the project by next week.", options: [{ key: "a", text: "will finish" }, { key: "b", text: "will have finished" }, { key: "c", text: "have finished" }], correct: "b" },
      { id: 8, prompt: "___ you ever been to London?", options: [{ key: "a", text: "Did" }, { key: "b", text: "Do" }, { key: "c", text: "Have" }], correct: "c" },
      { id: 9, prompt: "I’m looking forward ___ you again.", options: [{ key: "a", text: "see" }, { key: "b", text: "to see" }, { key: "c", text: "to seeing" }], correct: "c" },
      { id: 10, prompt: "If I ___ more time, I would start a new hobby.", options: [{ key: "a", text: "have" }, { key: "b", text: "had" }, { key: "c", text: "would have" }], correct: "b" },
      { id: 11, prompt: 'The opposite of “polite” is ___.', options: [{ key: "a", text: "rude" }, { key: "b", text: "rough" }, { key: "c", text: "wild" }], correct: "a" },
      { id: 12, prompt: "My brother ___ drive when he was 18.", options: [{ key: "a", text: "can" }, { key: "b", text: "could" }, { key: "c", text: "is able" }], correct: "b" },
      { id: 13, prompt: "She asked me ___ I could help her.", options: [{ key: "a", text: "if" }, { key: "b", text: "that" }, { key: "c", text: "what" }], correct: "a" },
      { id: 14, prompt: "Choose the correct sentence:", options: [{ key: "a", text: "The book who I read was great." }, { key: "b", text: "The book which I read was great." }, { key: "c", text: "The book where I read was great." }], correct: "b" },
      { id: 15, prompt: "I don’t have ___ money left.", options: [{ key: "a", text: "some" }, { key: "b", text: "any" }, { key: "c", text: "a" }], correct: "b" },
      { id: 16, prompt: "I promise I ___ you as soon as I arrive.", options: [{ key: "a", text: "call" }, { key: "b", text: "will call" }, { key: "c", text: "am calling" }], correct: "b" },
      { id: 17, prompt: "This exercise is ___ difficult for me.", options: [{ key: "a", text: "enough" }, { key: "b", text: "too" }, { key: "c", text: "very" }], correct: "b" },
      { id: 18, prompt: "The meeting was cancelled, ___ everyone went home early.", options: [{ key: "a", text: "because" }, { key: "b", text: "so" }, { key: "c", text: "although" }], correct: "b" },
      { id: 19, prompt: "He ___ his leg while he was skiing.", options: [{ key: "a", text: "broke" }, { key: "b", text: "has broken" }, { key: "c", text: "was broken" }], correct: "a" },
      { id: 20, prompt: "Choose the correct sentence:", options: [{ key: "a", text: "I’m used to wake up early." }, { key: "b", text: "I’m used to waking up early." }, { key: "c", text: "I used to waking up early." }], correct: "b" },
      { id: 21, prompt: "She told me she ___ late.", options: [{ key: "a", text: "will be" }, { key: "b", text: "would be" }, { key: "c", text: "is" }], correct: "b" },
      { id: 22, prompt: "You must ___ quiet in the library.", options: [{ key: "a", text: "be" }, { key: "b", text: "being" }, { key: "c", text: "to be" }], correct: "a" },
      { id: 23, prompt: "I prefer tea ___ coffee.", options: [{ key: "a", text: "than" }, { key: "b", text: "to" }, { key: "c", text: "with" }], correct: "b" },
      { id: 24, prompt: "By the time we arrived, the film ___.", options: [{ key: "a", text: "started" }, { key: "b", text: "had started" }, { key: "c", text: "has started" }], correct: "b" },
      { id: 25, prompt: "He was very tired, but he kept ___ to finish the work.", options: [{ key: "a", text: "try" }, { key: "b", text: "to trying" }, { key: "c", text: "trying" }], correct: "c" },
      { id: 26, prompt: "If you study harder, you ___ the exam.", options: [{ key: "a", text: "pass" }, { key: "b", text: "passed" }, { key: "c", text: "will pass" }], correct: "c" },
      { id: 27, prompt: "She ___ in Paris for three years.", options: [{ key: "a", text: "lives" }, { key: "b", text: "has lived" }, { key: "c", text: "is living" }], correct: "b" },
      { id: 28, prompt: "It’s the ___ book I’ve ever read.", options: [{ key: "a", text: "more boring" }, { key: "b", text: "most boring" }, { key: "c", text: "boringest" }], correct: "b" },
      { id: 29, prompt: "Choose the correct sentence:", options: [{ key: "a", text: "He told that he was busy." }, { key: "b", text: "He told me that he was busy." }, { key: "c", text: "He said me that he was busy." }], correct: "b" },
      { id: 30, prompt: "I’ll go to the party if I ___ free.", options: [{ key: "a", text: "am" }, { key: "b", text: "will be" }, { key: "c", text: "would be" }], correct: "a" },
    ],
        writingTask: {
      title: "Sarcină de lucru suplimentară (opțional)",
      details:
        "Simți că întrebările au fost ușoare și nu evalueaza exact nivelul tău de cunoștință în limba engleză? Ai aici ocazia să ne arăți ce poți prin redactarea unei scurte compuneri.",

  task: "Write a story (120–180 words) beginning with: “It was a cold October evening when I heard a strange noise coming from behind the kitchen door…” Include a clear sequence of events, descriptive details, and a surprising ending.",

      minWords: 50,
      maxWords: 100,
    },
  },

];
