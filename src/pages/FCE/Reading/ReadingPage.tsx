import React, { useEffect, useMemo, useRef, useState } from "react";
import logo from "@/assets/logo.svg"; // <-- ajustează path-ul dacă e altul

type Part = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const LS_KEY = "proerudio_fce_reading_v1";

type AnswersState = {
  // Part 1 & 5: A-D
  mcq: Record<number, "A" | "B" | "C" | "D" | null>;
  // Part 2/3/4: text
  text: Record<number, string>;
  // Part 6/7: letters (A-G / A-E)
  letter: Record<number, string | null>;
};

const normalize = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[’']/g, "'");

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function buildInitialState(): AnswersState {
  const mcq: AnswersState["mcq"] = {};
  const text: AnswersState["text"] = {};
  const letter: AnswersState["letter"] = {};

  // Part 1 (1-8)
  for (let i = 1; i <= 8; i++) mcq[i] = null;

  // Part 2 (9-16)
  for (let i = 9; i <= 16; i++) text[i] = "";

  // Part 3 (17-24)
  for (let i = 17; i <= 24; i++) text[i] = "";

  // Part 4 (25-30)
  for (let i = 25; i <= 30; i++) text[i] = "";

  // Part 5 (31-36)
  for (let i = 31; i <= 36; i++) mcq[i] = null;

  // Part 6 (37-42)
  for (let i = 37; i <= 42; i++) letter[i] = null;

  // Part 7 (43-52)
  for (let i = 43; i <= 52; i++) letter[i] = null;

  return { mcq, text, letter };
}

/** Parsează text cu gap-uri de forma: (12) ……….. */
function tokenizeGaps(input: string) {
  const out: Array<{ type: "text"; value: string } | { type: "gap"; id: number }> = [];
  const re = /\((\d+)\)\s*…+\.*/g; // (12) ………..
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(input)) !== null) {
    const start = m.index;
    const end = re.lastIndex;
    if (start > last) out.push({ type: "text", value: input.slice(last, start) });
    out.push({ type: "gap", id: Number(m[1]) });
    last = end;
  }
  if (last < input.length) out.push({ type: "text", value: input.slice(last) });
  return out;
}

export default function ReadingPage() {
  const [part, setPart] = useState<Part>(1);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<AnswersState>(() => buildInitialState());

  // Part 1 dropdown (gap menu)
  const [openGap, setOpenGap] = useState<number | null>(null);

  // SSR-safe load
  useEffect(() => {
    if (typeof window === "undefined") return;
    const parsed = safeParse<AnswersState>(window.localStorage.getItem(LS_KEY));
    if (parsed) setAnswers({ ...buildInitialState(), ...parsed });
  }, []);

  // SSR-safe save
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LS_KEY, JSON.stringify(answers));
  }, [answers]);

  // ---------------------------
  // DATA (100% din Word)
  // ---------------------------

  // PART 1
  const part1Title = "Royal Residences";
  const part1Passage = `Buckingham Palace, Windsor Castle (0) ……….. the Palace of Holyroodhouse are these (1) ……….. of the Sovereign and, as such, serve as both home and office for the Queen, whose personal flag flies (2)……….. her Majesty is in residence.

These buildings are used extensively for State ceremonies and official entertaining and are opened to the (3) ……….. as much as these commitments allow. They are furnished with fine pictures and works of art from the Royal Collection, assembled over four centuries by successive sovereigns. Many of the State Apartments and rooms at the official residences have been in continuous use since their conception and many of the paintings are (4) ……….. in the rooms for which they were originally (5) ……….. .

The official residences are in regular use and the style and manner in which they are shown to visitors reflects their working status. Rooms are kept as close to their normal (6) ……….. as possible. Inevitably, opening times are subject to change at short notice depending on circumstances.

The Royal Collection, which is owned by the Queen as Sovereign in trust for her successors and the Nation, is administered by the Royal Collection Trust to which a proportion of the admission fee and other (7) ……….. from visitors is directed. The remainder of this money funds the majority of the cost of restoring Windsor Castle which was badly (8) ……….. by fire in November 1992.`;

  // Example (0) – corect: AND
  const part1Example = { id: 0, correctWord: "and" };

  // Opțiuni Part 1 (1-8)
  const part1Options: Record<number, { A: string; B: string; C: string; D: string }> = {
    1: { A: "venues", B: "residences", C: "situations", D: "occupation" },
    2: { A: "whatever", B: "however", C: "whoever", D: "whenever" },
    3: { A: "humans", B: "public", C: "peoples", D: "strangers" },
    4: { A: "created", B: "explored", C: "produced", D: "displayed" },
    5: { A: "instructed", B: "intended", C: "performed", D: "guarded" },
    6: { A: "feature", B: "location", C: "destination", D: "appearance" },
    7: { A: "salary", B: "budget", C: "income", D: "wages" },
    8: { A: "destroyed", B: "ruined", C: "damaged", D: "collapsed" },
  };

  const part1Correct: Record<number, "A" | "B" | "C" | "D"> = {
    1: "B",
    2: "D",
    3: "B",
    4: "D",
    5: "B",
    6: "D",
    7: "C",
    8: "C",
  };

  // PART 2
  const part2Title = "Swimming with seals";
  const part2ExampleWord = "are";
  const part2Passage = `The UK is home to half the world’s population of grey seals and there (0)  ……….. many local boat trips offering sightseeing tours out to the islands and sandbanks (9) ……….. the animals are most regularly found.

But if you really want to get close (10) ……….. the seals and understand something about their way of life, then you need to go on an underwater seal-watching trip. On these trips, you have the chance to go over the side of the boat and, equipped (11) ……….. a wetsuit, mask and snorkel, spend time in the water alongside the animals.

Seals are extremely inquisitive creatures and, once you’re in the water, they will swim past you trying to work (12) ……….. who you are and (13) ……….. you’re doing there. (14) ……….. they can appear shy at first, seals soon (15) ……….. used to you being In the water, and will come and play around you. Young pups especially like to (16) ……….. contact with divers, and often use their teeth, gently biting masks, fins and cameras out of curiosity. It can be a thrilling experience.`;

  const part2Correct: Record<number, string[]> = {
    9: ["where"],
    10: ["to"],
    11: ["with"],
    12: ["out"],
    13: ["what"],
    14: ["although", "though", "while", "whilst"],
    15: ["get"],
    16: ["make", "have"],
  };

  // PART 3
  const part3Title = "Mobile library’s a winner";
  const part3Passage = `The city’s new mobile library has won an award at a (0) ……….. meeting of mobile library providers. The award is for the (17) ……….. design of this new vehicle.
The stunning external design, which features photographs of people using libraries, uses the catchphrase ‘The Book Stops Here’, and co-ordinates with the attractive (18) ……….. leaflets, postcards and posters which give details about the library routes and stops.
The new library went into (19) ……….. in April and has been very well received by the public. Both visits and loans of books have increased (20) ……….. since the new vehicle began operating. Comments have included ‘It’s such a friendly-looking library’, ‘I couldn’t wait to look inside!’ and ‘Thanks for all the (21) ……….. new books’.
The mobile library is an air-conditioned, state-of-the-art vehicle, which is fully networked for using information technology if (22) ……….. . The air suspension allows the vehicle to be (23) ……….. for easy access and ensures (24) ……….. when parked.`;

  // Example Part 3 (0): NATIONAL (nu îl cerem userului, îl arătăm fix)
  const part3ExampleWord = "national";

  const part3Caps = [
    { id: 17, word: "STAND" },
    { id: 18, word: "PUBLIC" },
    { id: 19, word: "SERVE" },
    { id: 20, word: "CONSIDER" },
    { id: 21, word: "WONDER" },
    { id: 22, word: "REQUIRE" },
    { id: 23, word: "LOW" },
    { id: 24, word: "STABLE" },
  ];

  const part3Correct: Record<number, string> = {
    17: "outstanding",
    18: "publicity",
    19: "service",
    20: "considerably",
    21: "wonderful",
    22: "required",
    23: "lowered",
    24: "stability",
  };

  // PART 4
  const part4Items = [
    {
      id: 25,
      first: "Tania hasn’t played volleyball for three years.",
      key: "SINCE",
      secondStart: "It",
      secondEnd: "Tania last played volleyball.",
      correct: ["has been three years since", "is three years since"],
    },
    {
      id: 26,
      first: "The only thing Carl forgot to buy was a new battery for his watch.",
      key: "EVERYTHING",
      secondStart: "Carl remembered to",
      secondEnd: "a new battery for his watch.",
      correct: ["buy everything except"],
    },
    {
      id: 27,
      first: "Declan was angry because Claire arrived late.",
      key: "TIME",
      secondStart: "If Claire",
      secondEnd: ", Declan would not have been angry.",
      correct: ["had arrived on time"],
    },
    {
      id: 28,
      first: "I don’t usually wear a hat so it feels strange.",
      key: "USED",
      secondStart: "I am",
      secondEnd: "a hat so it feels strange.",
      correct: ["not used to wearing"],
    },
    {
      id: 29,
      first: "Rob said to Jennifer: ‘You broke the strap on my new camera.’",
      key: "ACCUSED",
      secondStart: "Rob",
      secondEnd: "the strap on his new camera.",
      correct: ["accused jennifer of breaking"],
    },
    {
      id: 30,
      first: "Mark can’t wait to use his new computer-games console.",
      key: "FORWARD",
      secondStart: "Mark is",
      secondEnd: "his new computer-games console.",
      correct: ["looking forward to using", "really looking forward to using"],
    },
  ] as const;

  // PART 5
  const part5Title = "Extract: The Fulton Chain Floating Library";
  const part5Passage = `‚Afternoon, Mattie!’ Mr Eckler called from the bow of his boat. ‚Got a new one. Brand new. Just come in. By a Mrs Wharton. House of Mirth, it's called. I tucked it in behind the coffee beans, under W. You'll see it.’
‚Thank you, Mr. Ekler!’ I said, excited at the prospect of a new book. ‚Did you read it?’
‚Yup, read it whole.’
‚What's it about?’
‚Can't hardly say. Some flighty city girl. Don't you know why it's called House of Mirth. It ain't funny in the least.’

The Fulton Chain Floating Library is only a tiny room, a closet, really, below decks in Charlie Ekler's pickle boat. It is nothing like the proper library they have in Old Forge, but it has its own element of surprise. Mr Ekler uses the room to store his wares, and when he finally gets around to moving a chest of tea or a sack of cornmeal, you never know what you might find. And once in a while, the main library in Herkimer sends up a new book or two. It's nice to get your hands on a new book before everyone else does. While the pages are still clean and white and the spine hasn't been snapped.

I stepped onto the boat and went below decks. The House of Mirth was under W, like Mr Eckler said it would be, only it was wedged next to Mrs Wiggs of the Cabbage Patch. Mr Eckler sometimes gets authors and titles confused. I signed it out in a ledger he kept on top of a molasses barrel, then rooted around behind a crate of eggs, a jar of marbles, and a box of dried dates, but found nothing I hadn't already read. I remembered to get the bag of cornmeal we needed. I wished I could buy oatmeal or white flour instead, but cornmeal cost less and went further. I was to get a ten-pound bag. The fifty-pound bag cost more to buy but was cheaper per pound, and I'd told Pa so, but he said only rich people can afford to be thrifty.

Just as I was about to climb back upstairs, something caught my eye - a box of composition books. Real pretty ones with hard covers on them, and swirly paint designs, and a ribbon to mark your place. I put the cornmeal down and Mrs. Wharton too, and picked one up. Its pages were smooth and white. I thought it would be a fine thing to write on paper that nice. The pages in my old composition book were rough and had blurry blue lines printed on them, and were made with so little care that there were slivers of wood visible in them.

I handed Mr Eckler fifty cents of my father's money for the cornmeal. ‚How much is this?’ I asked, holding up one of the pretty composition books. I had sixty cents from all the fiddleheads Weaver and I had sold to the Eagle Bay Hotel. It was money I knew I should have given to my pa. I'd meant to, really. I just hadn't gotten around to it.

‚Those notebooks? They're expensive, Mattie. Italians made them. I've got to get forty-five cents apiece’, he said. ‚I've got some other coming in for fifteen cents in a week or so if you can wait.’`;

  const part5Questions = [
    {
      id: 31,
      q: "When Mr Eckler told Mattie about the new book,",
      options: {
        A: "Mattie felt that it sounded familiar to her.",
        B: "he said that he thought its title was inappropriate.",
        C: "he said that it was a book Mattie would enjoy.",
        D: "Mattie suspected that he hadn’t really read it.",
      },
      correct: "B",
    },
    {
      id: 32,
      q: "What does Mattie say about the library in Mr Eckler’s boat?",
      options: {
        A: "New books are frequently added to it.",
        B: "All the books in it are in excellent condition.",
        C: "It contains books that are hidden from view.",
        D: "Mr Eckler doesn’t know exactly what is in it.",
      },
      correct: "C",
    },
    {
      id: 33,
      q: "When Mattie found the new book, she",
      options: {
        A: "discovered that there were other new books nearby.",
        B: "saw that it had been put in the wrong place.",
        C: "followed Mr Eckler’s system for borrowing books.",
        D: "had to move something so that she could find it.",
      },
      correct: "C",
    },
    {
      id: 34,
      q: "What was the situation concerning the cornmeal?",
      options: {
        A: "Her father was unable to save money by buying the bigger bag.",
        B: "Her father could not see the point of buying the bigger bag.",
        C: "Her father felt that cornmeal was better than oatmeal or white flour.",
        D: "Her father had decided to stop buying what he usually bought.",
      },
      correct: "A",
    },
    {
      id: 35,
      q: "One reason why Mattie liked the look of the composition books was that",
      options: {
        A: "the covers were shiny.",
        B: "the pages were completely clear.",
        C: "the pages were thicker than in her old book.",
        D: "they had better ribbons than her old book.",
      },
      correct: "B",
    },
    {
      id: 36,
      q: "When Mattie asked Mr Eckler how much the composition books cost, he said that",
      options: {
        A: "they weren’t really worth the money.",
        B: "they were not the books he had been expecting to receive.",
        C: "he did not expect many people to buy them.",
        D: "he had no choice about how much to charge for them.",
      },
      correct: "D",
    },
  ] as const;

  // PART 6
  const part6Title = "The airport photographer";
  const part6Options = {
    A: "You get the impression that they enjoy the attention.",
    B: "I was lucky enough to get some lovely shots of them.",
    C: "Often it’s one of them who tips me off that a big star has just come through passport control.",
    D: "That’s where you generally find the celebrities.",
    E: "They could be appearing in the arrivals hall at any time, night or day, of course.",
    F: "When that happens, they have to do what we call ‚duck and dive’ to get a shot.",
    G: "With some stars, however, you’re never quite sure what you’re going to get.",
  } as const;

  const part6Passage = `I'm a photographer based at Heathrow Airport in London. Airlines often commission me to take photos of aircraft or their staff. But mostly I concentrate on getting shots of celebrities as they come through the arrivals hall. I sell some photos direct to the daily newspapers and celebrity magazines, and the rest go to a picture agency.

On a typical day, I look out for the flights arriving from Los Angeles on the major airlines. (37) ……….. Most of them fly either with British Airways because it's such an established company, or with Virgin Atlantic because the owner, Richard Branson, moves in those celebrity circles.

You've got to cover all the incoming flights though - Victoria Beckham took to flying with Air New Zealand at one time. I know the ground and security staff here very well. (38) ……….. That can really make all the difference to being in the right place at the right time.

I've been working here for many years now, so I've seen thousands of celebrities throughout the decades. In my experience, the old stars are the best. Joan Collins is my favorite - she sends me a Christmas card every year. Mick Jagger also knows me and always says hello. People like Paul McCartney and Rod Stewart are lots of fun too. (39) ……….. I guess that's because they can see the value of it.

Today's big stars are generally okay and give you a polite smile. I won't mention names, but there are some who wave me away rudely, whilst others even have their managers popping up from nowhere, saying: ‚no pictures’ to the waiting photographers. (40) ……….. You've probably seen photographers leaping around in this manner on TV footage of celebrities arriving at airports and wonder why they do it - well often that's why.

(41) ……….. One time, Naomi Campbell refused to come out from behind a pillar. She called up for a buggy and hopped on the back, so there I was chasing it, trying to get a shot of her. But the next time I saw her, she'd just got engaged and came up to me to show me the ring.

But if today's stars don't make my job as easy as it was, today's technology more than makes up for it. When I started out it was much less sophisticated. I remember when the British Queen's granddaughters, Princesses Beatrice and Eugenie, were just babies. I heard that their mother, the Duchess of York, was coming through Heathrow with them. She was carrying both babies in her arms. (42) ……….. I realised I had a good chance of getting one of them onto the front page of the newspaper, which is always the photographer's aim.

So I called my editor to warn him, took the shots, then rolled up the film, labeled it, put it in an envelope and organised for a motorbike dispatch rider to pick it up, take it back to the newspaper offices and have it developed. It had taken three hours. Today, using digital cameras and a laptop, the office gets images in three minutes.`;

  const part6Correct: Record<number, keyof typeof part6Options> = {
    37: "D",
    38: "C",
    39: "A",
    40: "F",
    41: "G",
    42: "B",
  };

  // PART 7
  const part7Title = "Advertising in public places: like it or love it?";
  const part7People = [
    {
      letter: "A",
      heading: "Rob Stevenson, lorry driver",
      body:
        "The main problem is that the location of posters can be a safety hazard if they block your view of junctions or road signs. I'm not distracted from driving by the content so much, just by the fact that a poster is there. I've no time to read them or study them, though the names of products might stick in your memory. Posters in fields get a lot of attention because you certainly notice them as you drive down the motorway. They must be a bonus for the farmer who gets an income from them, but I suppose they do make a bit of a mess of the rural environment. On the whole, there aren't too many posters on the roads - not compared with some countries I've driven through.",
    },
    {
      letter: "B",
      heading: "Josie Pelham, cabin crew",
      body:
        "Walking through airports in uniform, I tend not to look around too much. That’s because I run the risk of being asked questions by confused passengers who mistake me for ground crew, but helping them is not my job. But adverts in airports have a captive audience because people end up hanging around waiting for delayed flights in lounges or at boarding gates, so in those places they must work well for the advertisers. When travelling, an amusing advert can brighten up my day., but I do tend to see endless dull adverts for banks around the airport and they don't fit into that category! Planes are even being painted externally to carry advertising. I saw one decorated to advertise house music in Ibiza. How cool is that?",
    },
    {
      letter: "C",
      heading: "Damian Stenton, lawyer",
      body:
        "To be honest, I can take or leave street advertising - I don't pay it much attention and posters aren't that obtrusive. I don't even mind posters in the countryside, though I know that's an issue for some groups in society. Some of the paper posters are being replaced by TV screens. I guess that enables the company to make more money, as they can switch adverts easily - and it also saves paper. But it's rather environmentally unfriendly as each advertising screen obviously has to be powered by electricity. At a time when we're all being urged to cut down on consumption of precious resources, putting up TV screens everywhere seems rather counterproductive.",
    },
    {
      letter: "D",
      heading: "Danni Rochas, interior designer",
      body:
        "I often feel surrounded by posters and advertising, it seems to be taking over our city. I am reminded of an episode of The Simpsons where the town's outdoor advertising comes to life and hunts down the residents. I'm resigned to the fact that posters are a ‚necessary’ commercialisation, but I find them less annoying when they ‚give’ something positive in exchange for being such an intrusive presence on the urban landscape. Occasionally, though, advertisers find a new angle on an issue that's really thought-provoking and that must be positive. So maybe I’d prefer it to exist rather than not.",
    },
    {
      letter: "E",
      heading: "Naomi Hesketh, student",
      body:
        "I try to walk straight past most posters as if they weren't there, but some do manage to grab your attention nonetheless. I really like those that are colorful and imaginative. I think advertising allows lots of clever people to reach a wide public with their ideas, and we all benefit from that. Why would you even look at a boring poster? I think production values are important, too, in making you trust the advertiser. I agree with banning posters from parks and on historic buildings, but there's nothing wrong with them in shopping streets and main roads. They make the environment brighter.",
    },
  ] as const;

  const part7Questions = [
    { id: 43, text: "Can be uninteresting if there’s a lack of variety?" },
    { id: 44, text: "Has a mostly negative impact on the urban landscape?" },
    { id: 45, text: "Can create a safety risk?" },
    { id: 46, text: "Can make people behave in a more environmentally friendly way?" },
    { id: 47, text: "Can make places look better?" },
    { id: 48, text: "Could be made in a more environmentally friendly way?" },
    { id: 49, text: "Sometimes has a good influence?" },
    { id: 50, text: "Works well because people are waiting for something?" },
    { id: 51, text: "May provide financial benefit for someone?" },
    { id: 52, text: "Is useful in providing work for talented and creative people?" },
  ] as const;

  const part7Correct: Record<number, "A" | "B" | "C" | "D" | "E"> = {
    43: "B",
    44: "D",
    45: "A",
    46: "C",
    47: "A",
    48: "E",
    49: "A",
    50: "B",
    51: "D",
    52: "E",
  };

  // ---------------------------
  // META / NAV
  // ---------------------------

  const meta = useMemo(() => {
    return {
      1: { range: "Questions 1–8", instruction: "For each question, choose the correct answer for each gap." },
      2: { range: "Questions 9–16", instruction: "Use only one word in each gap." },
      3: { range: "Questions 17–24", instruction: "Use the words in capitals to form a word that fits in the gap." },
      4: { range: "Questions 25–30", instruction: "Use 2–5 words, including the given word. Do not change it." },
      5: { range: "Questions 31–36", instruction: "Choose the best answer (A, B, C or D)." },
      6: { range: "Questions 37–42", instruction: "Choose from sentences A–G the one which fits each gap." },
      7: { range: "Questions 43–52", instruction: "Choose from people (A–E). People may be chosen more than once." },
    } as const;
  }, []);

  const TOTAL = 52;

  // ---------------------------
  // SETTERS
  // ---------------------------

  const setMCQ = (id: number, val: "A" | "B" | "C" | "D") => {
    setAnswers((prev) => ({ ...prev, mcq: { ...prev.mcq, [id]: val } }));
  };

  const setText = (id: number, val: string) => {
    setAnswers((prev) => ({ ...prev, text: { ...prev.text, [id]: val } }));
  };

  const setLetter = (id: number, val: string) => {
    setAnswers((prev) => ({ ...prev, letter: { ...prev.letter, [id]: val.toUpperCase() } }));
  };

  // ---------------------------
  // SCORE
  // ---------------------------

  const score = useMemo(() => {
    let s = 0;

    // Part1
    for (let i = 1; i <= 8; i++) {
      if (answers.mcq[i] && answers.mcq[i] === part1Correct[i]) s++;
    }

    // Part2
    for (let i = 9; i <= 16; i++) {
      const typed = normalize(answers.text[i] || "");
      const ok = part2Correct[i].some((a) => normalize(a) === typed);
      if (typed && ok) s++;
    }

    // Part3
    for (let i = 17; i <= 24; i++) {
      const typed = normalize(answers.text[i] || "");
      if (typed && typed === normalize(part3Correct[i])) s++;
    }

    // Part4
    for (const item of part4Items) {
      const typed = normalize(answers.text[item.id] || "");
      const ok = item.correct.some((v) => normalize(v) === typed);
      if (typed && ok) s++;
    }

    // Part5
    for (const q of part5Questions) {
      if (answers.mcq[q.id] && answers.mcq[q.id] === q.correct) s++;
    }

    // Part6
    for (let i = 37; i <= 42; i++) {
      const chosen = (answers.letter[i] || "").toUpperCase();
      if (chosen && chosen === part6Correct[i]) s++;
    }

    // Part7
    for (let i = 43; i <= 52; i++) {
      const chosen = (answers.letter[i] || "").toUpperCase();
      if (chosen && chosen === part7Correct[i]) s++;
    }

    return s;
  }, [answers, part1Correct, part2Correct, part3Correct, part4Items, part5Questions, part6Correct, part7Correct]);

  const breakdown = useMemo(() => {
    const p1 = Array.from({ length: 8 }, (_, k) => k + 1).reduce((acc, i) => acc + (answers.mcq[i] === part1Correct[i] ? 1 : 0), 0);
    const p2 = Array.from({ length: 8 }, (_, k) => k + 9).reduce((acc, i) => {
      const typed = normalize(answers.text[i] || "");
      const ok = part2Correct[i].some((a) => normalize(a) === typed);
      return acc + (typed && ok ? 1 : 0);
    }, 0);
    const p3 = Array.from({ length: 8 }, (_, k) => k + 17).reduce((acc, i) => acc + (normalize(answers.text[i] || "") === normalize(part3Correct[i]) ? 1 : 0), 0);
    const p4 = part4Items.reduce((acc, it) => {
      const typed = normalize(answers.text[it.id] || "");
      const ok = it.correct.some((v) => normalize(v) === typed);
      return acc + (typed && ok ? 1 : 0);
    }, 0);
    const p5 = part5Questions.reduce((acc, q) => acc + (answers.mcq[q.id] === q.correct ? 1 : 0), 0);
    const p6 = Array.from({ length: 6 }, (_, k) => k + 37).reduce(
      (acc, i) => acc + (((answers.letter[i] || "").toUpperCase() === part6Correct[i]) ? 1 : 0),
      0
    );
    const p7 = Array.from({ length: 10 }, (_, k) => k + 43).reduce(
      (acc, i) => acc + (((answers.letter[i] || "").toUpperCase() === part7Correct[i]) ? 1 : 0),
      0
    );
    return { p1, p2, p3, p4, p5, p6, p7 };
  }, [answers, part1Correct, part2Correct, part3Correct, part4Items, part5Questions, part6Correct, part7Correct]);

  const resetAll = () => {
    if (typeof window !== "undefined") window.localStorage.removeItem(LS_KEY);
    setAnswers(buildInitialState());
    setFinished(false);
    setPart(1);
    setOpenGap(null);
  };

  // ---------------------------
  // UI Helpers
  // ---------------------------

  const CardShell = ({ children }: { children: React.ReactNode }) => (
    <div className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6">
      <div className="rounded-xl border bg-white shadow-sm">{children}</div>
    </div>
  );

  const Header = () => (
    <div className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Pro Erudio Logo" className="h-9 w-auto object-contain" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-gray-900">Pro Erudio</div>
            <div className="text-xs text-gray-500">FCE Reading & Use of English</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFinished(true)}
            className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition duration-300 ease-in-out hover:brightness-110"
          >
            Finish test
          </button>
        </div>
      </div>
    </div>
  );

  const TopInstruction = () => (
    <div className="border-b px-6 py-5">
      <div className="text-sm font-semibold text-gray-900">{meta[part].range}</div>
      <div className="mt-1 text-sm text-gray-600">{meta[part].instruction}</div>
    </div>
  );

  const PartNav = () => (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs font-semibold text-gray-700">Part</span>
          {[1, 2, 3, 4, 5, 6, 7].map((p) => (
            <button
              key={p}
              onClick={() => {
                setPart(p as Part);
                setOpenGap(null);
              }}
              className={[
                "rounded-md px-3 py-2 text-xs font-semibold transition duration-300 ease-in-out",
                part === p ? "bg-primary text-white" : "border text-gray-700 hover:bg-gray-50",
              ].join(" ")}
            >
              {p}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={resetAll}
              className="rounded-lg border px-3 py-2 text-sm font-semibold text-gray-900 transition duration-300 ease-in-out hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const GapBox = ({
    id,
    value,
    onClick,
    disabled,
  }: {
    id: number;
    value: string;
    onClick?: () => void;
    disabled?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "inline-flex min-w-[90px] items-center justify-center rounded-md border px-2 py-1 text-sm font-semibold align-baseline",
        disabled ? "bg-gray-100 text-gray-600" : "bg-white hover:bg-gray-50",
      ].join(" ")}
    >
      <span className="mr-2 text-xs font-bold text-gray-500">{id}</span>
      <span className="text-gray-900">{value || "—"}</span>
    </button>
  );

  const InlineInput = ({ id, placeholder = "..." }: { id: number; placeholder?: string }) => (
    <input
      value={answers.text[id] ?? ""}
      onChange={(e) => setText(id, e.target.value)}
      placeholder={placeholder}
      className="inline-flex min-w-[140px] rounded-md border px-3 py-2 text-sm font-semibold outline-none transition duration-300 ease-in-out focus:border-primary"
    />
  );

  // ---------------------------
  // PART RENDERS
  // ---------------------------

  const Part1 = () => {
    const tokens = tokenizeGaps(part1Passage);

    return (
      <CardShell>
        <TopInstruction />
        <div className="px-6 py-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <div className="text-2xl font-bold text-gray-900">{part1Title}</div>
              <div className="mt-2 text-sm text-gray-600">
                Click on a gap (1–8) to choose A, B, C or D.
              </div>
            </div>
          </div>

          <div className="relative rounded-xl border bg-white p-5">
            <div className="whitespace-pre-wrap text-base leading-8 text-gray-900">
              {tokens.map((t, idx) => {
                if (t.type === "text") return <span key={idx}>{t.value}</span>;

                // gap
                const id = t.id;
                if (id === 0) {
                  return (
                    <span key={idx} className="mx-1">
                      <GapBox id={0} value={part1Example.correctWord} disabled />
                    </span>
                  );
                }

                const chosen = answers.mcq[id] ? part1Options[id][answers.mcq[id]!] : "";
                return (
                  <span key={idx} className="mx-1 inline-flex relative">
                    <GapBox
                      id={id}
                      value={chosen}
                      onClick={() => setOpenGap((cur) => (cur === id ? null : id))}
                    />

                    {openGap === id && (
                      <div className="absolute -top-14 left-0 z-20 flex overflow-hidden rounded-md border bg-gray-900 text-white shadow-lg">
                        {(["A", "B", "C", "D"] as const).map((L) => (
                          <button
                            key={L}
                            onClick={() => {
                              setMCQ(id, L);
                              setOpenGap(null);
                            }}
                            className="px-3 py-2 text-sm font-semibold hover:bg-gray-800"
                            title={`${L}. ${part1Options[id][L]}`}
                          >
                            {part1Options[id][L]}
                          </button>
                        ))}
                        <button
                          onClick={() => setOpenGap(null)}
                          className="px-3 py-2 text-sm font-semibold hover:bg-gray-800"
                          aria-label="Close"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </span>
                );
              })}
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-4">
              {Array.from({ length: 8 }, (_, k) => k + 1).map((qid) => (
                <div key={qid} className="rounded-lg border bg-gray-50 p-3">
                  <div className="text-xs font-semibold text-gray-600">Question {qid}</div>
                  <div className="mt-2 text-sm text-gray-900">
                    Answer:{" "}
                    <span className="font-bold">
                      {answers.mcq[qid] ? `${answers.mcq[qid]} (${part1Options[qid][answers.mcq[qid]!]})` : "—"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardShell>
    );
  };

  const Part2 = () => {
    const tokens = tokenizeGaps(part2Passage);

    return (
      <CardShell>
        <TopInstruction />
        <div className="px-6 py-6">
          <div className="text-2xl font-bold text-gray-900">{part2Title}</div>
          <div className="mt-2 text-sm text-gray-600">Use only one word in each gap.</div>

          <div className="mt-5 rounded-xl border bg-white p-5">
            <div className="whitespace-pre-wrap text-base leading-8 text-gray-900">
              {tokens.map((t, idx) => {
                if (t.type === "text") return <span key={idx}>{t.value}</span>;
                const id = t.id;

                if (id === 0) {
                  return (
                    <span key={idx} className="mx-1">
                      <GapBox id={0} value={part2ExampleWord} disabled />
                    </span>
                  );
                }

                return (
                  <span key={idx} className="mx-1">
                    <span className="mr-1 text-xs font-bold text-gray-500 align-middle">{id}</span>
                    <InlineInput id={id} placeholder="one word" />
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </CardShell>
    );
  };

  const Part3 = () => {
    const tokens = tokenizeGaps(part3Passage);

    return (
      <CardShell>
        <TopInstruction />
        <div className="px-6 py-6">
          <div className="text-2xl font-bold text-gray-900">{part3Title}</div>
          <div className="mt-2 text-sm text-gray-600">
            Use the words in capitals to form a word that fits in the gap.
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_260px]">
            <div className="rounded-xl border bg-white p-5">
              <div className="whitespace-pre-wrap text-base leading-8 text-gray-900">
                {tokens.map((t, idx) => {
                  if (t.type === "text") return <span key={idx}>{t.value}</span>;
                  const id = t.id;

                  if (id === 0) {
                    return (
                      <span key={idx} className="mx-1">
                        <GapBox id={0} value={part3ExampleWord} disabled />
                      </span>
                    );
                  }

                  return (
                    <span key={idx} className="mx-1">
                      <span className="mr-1 text-xs font-bold text-gray-500 align-middle">{id}</span>
                      <InlineInput id={id} placeholder="word" />
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border bg-gray-50 p-5">
              <div className="text-sm font-bold text-gray-900">Words given</div>
              <div className="mt-3 space-y-2">
                {part3Caps.map((x) => (
                  <div key={x.id} className="flex items-center justify-between rounded-lg border bg-white px-3 py-2">
                    <div className="text-xs font-semibold text-gray-600">{x.id}</div>
                    <div className="text-sm font-bold text-gray-900">{x.word}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardShell>
    );
  };

const Part4 = () => {
  return (
    <CardShell>
      <TopInstruction />
      <div className="px-6 py-6">
        <div className="text-2xl font-bold text-gray-900">Key word transformations</div>
        <div className="mt-2 text-sm text-gray-600">
          Use 2–5 words, including the word given. Do not change the word given.
        </div>

        {/* ✅ Example din Word */}
        <div className="mt-6 rounded-xl border bg-white p-5">
          <div className="text-xs font-semibold text-gray-600">Example (0)</div>

          <div className="mt-3 text-sm font-semibold text-gray-900">
            0&nbsp;&nbsp;What type of music do you like best?
          </div>

          <div className="mt-3 inline-flex rounded-lg border bg-gray-50 px-3 py-2 text-xs font-bold text-gray-700">
            FAVOURITE
          </div>

          <div className="mt-4 text-sm text-gray-900 leading-7">
            What <span className="inline-flex min-w-[180px] items-center justify-center rounded-md border bg-gray-50 px-3 py-2 text-sm font-bold text-gray-900">
              is your favourite
            </span>{" "}
            type of music?
          </div>

          <div className="mt-3 text-xs text-gray-500">(This is an example. Do not write anything here.)</div>
        </div>

        {/* Questions 25–30 */}
        <div className="mt-6 space-y-4">
          {part4Items.map((it) => (
            <div key={it.id} className="rounded-xl border bg-white p-5">
              <div className="text-sm font-semibold text-gray-900">
                {it.id}. {it.first}
              </div>

              <div className="mt-3 inline-flex rounded-lg border bg-gray-50 px-3 py-2 text-xs font-bold text-gray-700">
                {it.key}
              </div>

              <div className="mt-4 text-sm text-gray-900 leading-7">
                <span className="font-semibold">{it.secondStart} </span>
                <InlineInput id={it.id} placeholder="2–5 words" />
                <span className="font-semibold"> {it.secondEnd}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardShell>
  );
};



  const Part5 = () => {
    return (
      <CardShell>
        <TopInstruction />
        <div className="px-6 py-6">
          <div className="text-2xl font-bold text-gray-900">{part5Title}</div>

          <div className="mt-4 rounded-xl border bg-white p-5">
            <div className="whitespace-pre-wrap text-sm leading-7 text-gray-900">{part5Passage}</div>
          </div>

          <div className="mt-6 space-y-4">
            {part5Questions.map((q) => (
              <div key={q.id} className="rounded-xl border bg-gray-50 p-5">
                <div className="text-sm font-bold text-gray-900">
                  {q.id}. {q.q}
                </div>

                <div className="mt-3 grid gap-2">
                  {(["A", "B", "C", "D"] as const).map((L) => (
                    <button
                      key={L}
                      onClick={() => setMCQ(q.id, L)}
                      className={[
                        "rounded-lg border px-4 py-3 text-left text-sm transition duration-300 ease-in-out hover:bg-white",
                        answers.mcq[q.id] === L ? "border-primary bg-white" : "bg-gray-50",
                      ].join(" ")}
                    >
                      <span className="mr-2 font-bold">{L}.</span> {q.options[L]}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardShell>
    );
  };

  const Part6 = () => {
    const tokens = tokenizeGaps(part6Passage);
    const letters = ["A", "B", "C", "D", "E", "F", "G"];

    return (
      <CardShell>
        <TopInstruction />
        <div className="px-6 py-6">
          <div className="text-2xl font-bold text-gray-900">{part6Title}</div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_340px]">
            <div className="rounded-xl border bg-white p-5">
              <div className="whitespace-pre-wrap text-sm leading-7 text-gray-900">
                {tokens.map((t, idx) => {
                  if (t.type === "text") return <span key={idx}>{t.value}</span>;
                  const id = t.id;

                  if (id < 37 || id > 42) return <span key={idx} />;

                  return (
                    <span key={idx} className="mx-1 inline-flex items-center gap-2 align-baseline">
                      <span className="text-xs font-bold text-gray-500">{id}</span>
                      <select
                        value={(answers.letter[id] || "").toUpperCase()}
                        onChange={(e) => setLetter(id, e.target.value)}
                        className="rounded-md border px-3 py-2 text-sm font-semibold outline-none transition duration-300 ease-in-out focus:border-primary"
                      >
                        <option value="">—</option>
                        {letters.map((l) => (
                          <option key={l} value={l}>
                            {l}
                          </option>
                        ))}
                      </select>
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border bg-gray-50 p-5">
              <div className="text-sm font-bold text-gray-900">Sentences A–G</div>
              <div className="mt-3 space-y-2">
                {letters.map((L) => (
                  <div key={L} className="rounded-lg border bg-white p-3">
                    <div className="text-xs font-bold text-gray-700">{L}</div>
                    <div className="mt-1 text-sm text-gray-900">{part6Options[L as keyof typeof part6Options]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardShell>
    );
  };

  const Part7 = () => {
    const letters = ["A", "B", "C", "D", "E"];

    return (
      <CardShell>
        <TopInstruction />
        <div className="px-6 py-6">
          <div className="text-2xl font-bold text-gray-900">{part7Title}</div>
          <div className="mt-2 text-sm text-gray-600">We asked five people for their opinions.</div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_420px]">
            <div className="rounded-xl border bg-white p-5">
              <div className="text-sm font-bold text-gray-900">Which person says that advertising…</div>
              <div className="mt-4 space-y-3">
                {part7Questions.map((q) => (
                  <div key={q.id} className="rounded-xl border bg-gray-50 p-4">
                    <div className="text-sm font-semibold text-gray-900">
                      {q.id}. {q.text}
                    </div>
                    <div className="mt-3 grid grid-cols-5 gap-2">
                      {letters.map((L) => (
                        <button
                          key={L}
                          onClick={() => setLetter(q.id, L)}
                          className={[
                            "rounded-lg border px-3 py-2 text-sm font-bold transition duration-300 ease-in-out hover:bg-white",
                            (answers.letter[q.id] || "").toUpperCase() === L ? "border-primary bg-white" : "bg-gray-50",
                          ].join(" ")}
                        >
                          {L}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border bg-gray-50 p-5">
              <div className="text-sm font-bold text-gray-900">People A–E</div>
              <div className="mt-3 space-y-3">
                {part7People.map((p) => (
                  <div key={p.letter} className="rounded-xl border bg-white p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md border bg-gray-50 text-sm font-black text-gray-900">
                        {p.letter}
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{p.heading}</div>
                    </div>
                    <div className="mt-2 text-sm leading-6 text-gray-800">{p.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardShell>
    );
  };

  const FinishScreen = () => (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-6">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="text-xl font-bold text-gray-900">Test finished</div>
        <div className="mt-1 text-sm text-gray-600">
          Your score: <span className="font-semibold text-gray-900">{score}</span> / {TOTAL}
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <div className="rounded-xl border bg-gray-50 p-4">
            <div className="text-xs font-semibold text-gray-700">Part 1</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p1}/8</div>
          </div>
          <div className="rounded-xl border bg-gray-50 p-4">
            <div className="text-xs font-semibold text-gray-700">Part 2</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p2}/8</div>
          </div>
          <div className="rounded-xl border bg-gray-50 p-4">
            <div className="text-xs font-semibold text-gray-700">Part 3</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p3}/8</div>
          </div>
          <div className="rounded-xl border bg-gray-50 p-4">
            <div className="text-xs font-semibold text-gray-700">Part 4</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p4}/6</div>
          </div>
          <div className="rounded-xl border bg-gray-50 p-4">
            <div className="text-xs font-semibold text-gray-700">Part 5</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p5}/6</div>
          </div>
          <div className="rounded-xl border bg-gray-50 p-4">
            <div className="text-xs font-semibold text-gray-700">Part 6</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p6}/6</div>
          </div>
          <div className="rounded-xl border bg-gray-50 p-4">
            <div className="text-xs font-semibold text-gray-700">Part 7</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{breakdown.p7}/10</div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFinished(false)}
            className="rounded-lg border px-4 py-2 text-sm font-semibold text-gray-900 transition duration-300 ease-in-out hover:bg-gray-50"
          >
            Back to test
          </button>
          <button
            onClick={resetAll}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:brightness-110"
          >
            Reset test
          </button>
        </div>
      </div>
    </div>
  );

  const RenderCurrentPart = () => {
    if (part === 1) return <Part1 />;
    if (part === 2) return <Part2 />;
    if (part === 3) return <Part3 />;
    if (part === 4) return <Part4 />;
    if (part === 5) return <Part5 />;
    if (part === 6) return <Part6 />;
    return <Part7 />;
  };

  // Close gap menu on outside click / Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenGap(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50" onClick={() => openGap && setOpenGap(null)}>
      <Header />
      {finished ? <FinishScreen /> : <RenderCurrentPart />}
      <PartNav />
    </div>
  );
}
