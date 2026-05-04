export type MCQOption = "A" | "B" | "C" | "D";
export type WriterOption = "A" | "B" | "C" | "D";
export type ParagraphOption = "A" | "B" | "C" | "D" | "E" | "F" | "G";
export type SectionOption = "A" | "B" | "C" | "D";

export const caeReadingData = {
  examTitle: "CAE Reading & Use of English",
  totalPoints: 78,
  part1: {
    title: "The Mysterious Isle",
    passage: `In the early morning of 23 January, 2009, the most powerful storm for a decade hit western France. With wind speeds in (1) _____ of 120 miles per hour, it flattened forests, (2) _____ down power lines and caused massive destruction to buildings and roads, but it also left behind an extraordinary creation, seven miles out to sea, at the (3) _____ where the Atlantic Ocean meets the estuary of the River Gironde, a small island had (4) _____ out of the water. Locals soon gave it the name, the Mysterious Isle. What was so remarkable, (5) _____ its sudden apparition, was the fact that the island (6) _____ intact in what is often quite a hostile environment. It could well become a permanent (7) _____.

Scientists (8) _____ realised that the island's appearance offered a unique opportunity to study the creation and development of a new ecosystem. Within months, it had been colonised by seabirds, insects and vegetation.`,
    questions: [
      { id: 1, options: { A: "Surplus", B: "advance", C: "excess", D: "put" }, correct: "C", points: 1 },
      { id: 2, options: { A: "Fetched", B: "brought", C: "carried", D: "sent" }, correct: "B", points: 1 },
      { id: 3, options: { A: "Scene", B: "mark", C: "stage", D: "point" }, correct: "D", points: 1 },
      { id: 4, options: { A: "Risen", B: "grown", C: "lifted", D: "surfaced" }, correct: "A", points: 1 },
      { id: 5, options: { A: "In spite of", B: "instead of", C: "apart from", D: "on account of" }, correct: "C", points: 1 },
      { id: 6, options: { A: "Prolonged", B: "remained", C: "resided", D: "persevered" }, correct: "B", points: 1 },
      { id: 7, options: { A: "Item", B: "issue", C: "matter", D: "feature" }, correct: "D", points: 1 },
      { id: 8, options: { A: "Quickly", B: "briskly", C: "hastily", D: "speedily" }, correct: "A", points: 1 },
    ],
  },
  part2: {
    title: "Early stone tools",
    passage: `A recent discovery has led scientists to revise their ideas about the ancestors of modern humans. It seems they started to (9) _____ use of stone tools nearly one million years earlier (10) _____ had previously been thought. Archaeologists revised the date (11) _____ spotting distinctive marks made by stone tools on animal bones dating (12) _____ nearly three and a half million years. Bones including the femur of a camel creature and the thigh bone from an animal similar in size (13) _____ a goat were recovered from an old riverbed which was being excavated in Ethiopia.

The use of super stone tools to remove food from bones represents a crucial moment in human history. (14) _____ a result of turning to meat for sustenance, the early humans developed larger brains, which (15) _____ turn enabled them to make more sophisticated tools. The bones unearthed in Ethiopia may (16) _____ represent the very beginning of that process.`,
    questions: [
      { id: 9, answers: ["make"], points: 1 },
      { id: 10, answers: ["than"], points: 1 },
      { id: 11, answers: ["after"], points: 1 },
      { id: 12, answers: ["back"], points: 1 },
      { id: 13, answers: ["to"], points: 1 },
      { id: 14, answers: ["as"], points: 1 },
      { id: 15, answers: ["in"], points: 1 },
      { id: 16, answers: ["well"], points: 1 },
    ],
  },
  part3: {
    title: "Trolley Bags",
    passage: `Wheeled trolley bags have become an (17) _____ item of luggage amongst frequent travellers. The compact version proves particularly (18) _____ as a piece of hand luggage. Carried on board airplanes, it allows you to avoid the queues at the baggage check-in counters on your (19) _____ journey and waiting at the baggage (20) _____ carousel on your way home. These days, there are (21) _____ guidelines regarding the maximum size for hand luggage on flights, and these stipulated (22) _____ are continuously subject to change. Policies also vary between airlines and airports, as well as being influenced by your (23) _____ destination. The outcome of all this is that travelers are recommended to check out the latest luggage (24) _____ before setting out for the airport.`,
    questions: [
      { id: 17, word: "ESSENCE", correct: "essential", points: 1 },
      { id: 18, word: "USE", correct: "useful", points: 1 },
      { id: 19, word: "OUT", correct: "outward", points: 1 },
      { id: 20, word: "RECLAIM", correct: "reclaim", points: 1 },
      { id: 21, word: "OFFICE", correct: "official", points: 1 },
      { id: 22, word: "MEASURE", correct: "measurements", points: 1 },
      { id: 23, word: "EVENT", correct: "eventual", points: 1 },
      { id: 24, word: "RESTRICT", correct: "restrictions", points: 1 },
    ],
  },
  part4: {
    questions: [
      {
        id: 25,
        firstSentence: "The village shop is now being managed by a national supermarket chain.",
        keyword: "TAKEN",
        secondSentenceBefore: "A national supermarket chain",
        secondSentenceAfter: "of the village shop.",
        answers: ["has taken over the management"],
        partialAnswers: ["taken over the management", "has taken over"],
        points: 2,
      },
      {
        id: 26,
        firstSentence: "This door is an emergency exit and must never be locked for any reason.",
        keyword: "ACCOUNT",
        secondSentenceBefore: "On",
        secondSentenceAfter: "be locked because it is an emergency exit.",
        answers: ["no account must this door ever"],
        partialAnswers: ["no account must this door", "account must this door ever"],
        points: 2,
      },
      {
        id: 27,
        firstSentence: "Melvin’s friend recommended that website where he bought the camping equipment.",
        keyword: "ON",
        secondSentenceBefore: "Melvin bought equipment from the website",
        secondSentenceAfter: "a friend.",
        answers: ["on the recommendation of"],
        partialAnswers: ["recommendation of"],
        points: 2,
      },
      {
        id: 28,
        firstSentence: "We never imagined that Julian might be planning to resign from his job.",
        keyword: "OCCURRED",
        secondSentenceBefore: "It never",
        secondSentenceAfter: "Julian might be planning to resign from his job.",
        answers: ["occurred to us that"],
        partialAnswers: ["occurred to us", "to us that"],
        points: 2,
      },
      {
        id: 29,
        firstSentence: "As long as he could see, Kevin really didn’t mind where he sat in the stadium.",
        keyword: "DIFFERENCE",
        secondSentenceBefore: "As long as he could see,",
        secondSentenceAfter: "where he sat in the stadium.",
        answers: ["it made no difference to Kevin"],
        partialAnswers: ["made no difference to Kevin", "no difference to Kevin"],
        points: 2,
      },
      {
        id: 30,
        firstSentence: "Unfortunately, I don’t have enough time to visit the gym regularly.",
        keyword: "ABLE",
        secondSentenceBefore: "If I had more time,",
        secondSentenceAfter: "more regular visits to the gym.",
        answers: ["I would be able to make", "I might be able to make"],
        partialAnswers: ["would be able to make", "might be able to make", "be able to make"],
        points: 2,
      },
    ],
  },
  part5: {
    title: "Cooking shouldn’t be child’s play",
    passage: `Take the fun out of cooking with your kids and there's a chance you'll have bred a chef with a great future. Television cook Nigella Lawson has revealed that her own mother put her and her sister ‘to work’ in the kitchen from the age of five. For the young Nigella, preparing food was certainly not recreational. Sounds intriguing. Will her new series feature her putting young ones through a blistering tough regime, sweating as they bone out chickens and being blessed with their soufflé collapses? Apparently not, but she makes a good point. ‘Parents sometimes feel that they have to get into children's TV presenter mode and make cooking all fun and recreational.’ For the young Lawson, it was about getting a meal on the table. She and her sister took it in turns to cook their father's breakfast.

My mother took a similar view. She tutored us in cooking. We never made grey pastry in amusing shapes or had hilarious squirting sessions with icing bags. If we were going to cook, it was for a purpose. At first, the only aim was that it be edible. But my mother noticed the interest my sister and I had in cooking (in her defence, she never forced us to do it) and set us some challenging tasks. My specialty was sweet pastry. She would look over my shoulder and suggest rolling it thinner ‘so the light shines through it’.

Nowadays, this instructive style of upbringing is frowned upon. Learning to make things has to be all about play and each creation is greeted with exaggerated applause. Parents plaster their kitchen walls with their five-year-olds' paintings and poems. They tell their kids how clever and talented they are in the belief that if you do this often enough, clever and talented they will be. But experts say that overpraised children can, in fact, underachieve and that compliments should be limited and sincere. Analysis by researchers at Stanford University in California found that praising too much demotivates children - interestingly more so with girls than boys.

Playschool cookery exists alongside another culinary crime - making funny faces on the plate. The idea goes that it's nothing but fun, fun and more fun to eat the cherry tomato eyes, mangetout mouth and broccoli hair. Hmm, is it? At some point, the cartoon stuff has to go. I have had dinner with grown men who, I suspect, have yet to get over the fact that their fish is not cut out in the shape of a whale. I'd love to meet the comic genius who decided it was somehow good to urge our children to eat food shaped like an endangered species. Nigella Lawson remembers making giraffe-shaped pizzas for her children, only to be asked why they couldn't have ordinary ones like their dad. Smart kids, those.

Sooner or later we have to chuck out all those books that tell you in the little ones what a laugh cooking is and tell the truth. Cooking is a chore and not an easy one for busy people to keep up. Better to be honest than discover this disagreeable fact later. If my mother had not made cooking something to take seriously, I suspect I would have eaten far more convenience food.

But you can go too far with budding chefs. Nigella might say her early training ‘just felt normal’, but I'm not sure that my childhood culinary regime was an ordinary part of growing up. Perhaps our families were too obsessed with food. We shouldn't be too didactic with our little ones, for children lose out if they never fool around with their parents.

The chef Mary Contini got it right, producing a great children's cookery book, Easy Peasy. The recipes were for real meals - Italian-inspired, common-sense food. Dishes have fun names – Knock-out Garlic Bread and Chocolate Mouse, but all the basics are there. The secret of getting children cooking is perhaps a step away from the intense tutorial given to Nigella and myself. My recipe would be two parts seriousness and one part creative fun. The result should be a youngster with a real passion for food.`,
    questions: [
      { id: 31, text: "In the first paragraph, the writer suggests that there is a connection between", options: { A: "parents’ enthusiasm for cooking and children’s ability to cook.", B: "teaching children to cook and making a popular TV cookery series.", C: "childhood experiences of cooking and success as a professional cook.", D: "the effort children put into cooking and how much they enjoy doing it." }, correct: "C", points: 2 },
      { id: 32, text: "What does the writer say about her mother teaching her how to cook?", options: { A: "She sometimes resented her mother’s demands on her.", B: "Her mother’s comments were intended to encourage her.", C: "Her mother misunderstood her level of interest in cooking.", D: "She wished that her mother would allow her to have more fun doing it." }, correct: "B", points: 2 },
      { id: 33, text: "The writer mentions certain ‘grown men’ as an example of people who", options: { A: "grew up having a lot of fun while learning to cook.", B: "have the wrong idea about how children view food.", C: "pass bad ideas about cooking to their children.", D: "think that everything associated with food has to be fun." }, correct: "D", points: 2 },
      { id: 34, text: "What does the writer suggest about regarding cooking as a ‘chore’?", options: { A: "It is something that children are not able to understand.", B: "It is not necessary.", C: "It can affect the kind of food that people cook and eat.", D: "It is a lazy view." }, correct: "C", points: 2 },
      { id: 35, text: "The writer says that she differs from Nigella Lawson concerning", options: { A: "her aspirations as a cook.", B: "her attitude to her family as a child.", C: "the way that children should be taught how to cook.", D: "the amount of fun she thinks children should have at home." }, correct: "B", points: 2 },
      { id: 36, text: "The writer’s main point in the article is that", options: { A: "children who are taught that cooking is fun lose interest in it later in life.", B: "children should not be given the impression that cookery is an entirely fun activity.", C: "for children, cooking needs to be fun first and taken seriously later.", D: "It is very hard for children to see cooking from an adult perspective." }, correct: "B", points: 2 },
    ],
  },
  part6: {
    title: "The world of freelance work",
    extracts: [
      { letter: "A", body: "Anyone contemplating going freelance should bear in mind that to make a real go of it may well involve working harder than in an employed position. The life doesn't suit everyone, and many employed people see freelancers as a totally different breed of workers, doing something that they couldn't do and wouldn't want to do. Freelancers can find that they have less free time than they used to and that they take on more than they should out of a reluctance to turn down any offer. Furthermore, they may find themselves working for less money as they go along, as any rise in the number of freelancers in their field can drive fees down as a result of competition. Some freelancers will be willing to accept low fees just to get work. There are dangers for companies too. Using a large proportion of freelancers can mean that knowledge that is crucial to the company's operation lies outside the company itself." },
      { letter: "B", body: "As more and more people join the freelance workforce, it is perhaps time for an appraisal of this development. For the freelancers themselves, this means that a higher proportion of the working population consists of people who are free to decide on their own destinies, surely no bad thing. For companies, the development allows them ever-increasing flexibility, enabling them to adapt to changing circumstances quickly rather than having permanent staff who are underemployed at times. Freelance life, as anyone who does it knows well, is tough in some ways, and to do well you need to be highly disciplined and organized, as well as hardworking and reliable, qualities that not everyone has when they are left to their own devices. A lot of employed people don't see things that way at all, tending to assume that freelancers have an easy life in which they can pick and choose what they do and may choose to do little." },
      { letter: "C", body: "An interesting by-product of companies relying on a significant number of freelancers is that a gap can open up between those freelancers and the employed personnel on the premises. This can be problematic, for example, with key personnel in a project not on hand immediately if something urgent comes up. On the other hand, the increasing number of freelancers has big advantages for everyone involved in a wide range of areas, including flexible hours, child care arrangements, and matching personnel to specific requirements. It is common for employed people to envy freelancers their perceived freedom compared to their own situation, but this is largely a myth. To maintain a regular and viable income in freelance work takes effort, and the equation is a simple one of effort and reward. Your income depends on how hard you are prepared to work." },
      { letter: "D", body: "Freelancers often take more responsibility for their work than employed staff who can become bored and demotivated, and in this regard, it can be said that the more freelancers there are out there, the better it is for companies. To ensure the smooth running of this setup, companies need to manage carefully the relationship with the freelance workforce. A coherent and mutually acceptable attitude needs to be developed for dealing with people who cannot be treated in the same way as permanent employees. For freelancers, making a sustainable career can be a nerve-wracking business as it can largely depend on chance encounters, word-of-mouth information from other freelancers, and unexpected approaches from potential clients. It is this high risk factor that puts many employees off the idea of going freelance." },
    ],
    questions: [
      { id: 37, text: "expresses a similar view to writer C on the consequences of employing a large number of freelancers?", correct: "A", points: 2 },
      { id: 38, text: "takes a different view from the others on the desirability of an increase in the number of people becoming freelancers?", correct: "A", points: 2 },
      { id: 39, text: "takes the same view as writer B on the attitude of employed people to freelance work?", correct: "C", points: 2 },
      { id: 40, text: "has a different opinion from the others on the extent to which freelancers are in control of how successful they become?", correct: "D", points: 2 },
    ],
  },
  part7: {
    title: "The sky’s the limit for cloudwatchers",
    subtitle: "Christopher Middleton learns to distinguish an altostratus from a cirrus at Britain’s first Cloud Bar.",
    passage: `High above the Lincolnshire coastline, a swirl of small white clouds moves slowly across a clear blue sky. In normal circumstances, you'd describe them as wispy and feathery. But because we're standing on the roof of Britain's first Cloud Bar, and it's decked out with wall charts, we assembled sky gazers can identify the above-mentioned phenomenon as cirrus fibratus. For the moment anyway, since clouds only live for 10 minutes (it says on the chart).

(41)

‘It's a fantastic idea this place’, says off-duty fireman Peter Ward, who's brought his young family here. ‘Really inspiring.’

(42)

At the last count, membership of the Cloud Appreciation Society stood at 23,066, covering 82 nations and all kinds of skywatchers, from hill walkers to airline pilots. ‘We think that clouds are nature's poetry’, says the society's founder, Gavin Pretor-Pinney, author of The Cloudspotter's Guide (sales of 200,000 and still rising). ‘Clouds are for dreamers and their contemplation benefits the soul.’

(43)

‘In fact, you don't really need to travel at all to see interesting clouds. You can just lie in your back garden and look upwards’, he says. For many cloudwatchers, the most important factor is not so much geographical location, as your philosophical disposition.

(44)

‘That said, clouds can be tremendously exciting too’, he adds. ‘The first cloud I noticed was at the age of four and a half. I saw these magnificent Cumulonimbus with rays of sunshine sprouting out from behind. Even now I love to see those towering great formations. In my mind, clouds are the last great wilderness available to us.’

(45)

Cloudspotters in search of similar experiences flock each autumn to North Queensland in Australia for the tube-shaped phenomenon known as Morning Glory. ‘You go up and surf the wave of air’, says Gavin Pretor-Pinney, whose follow-up book is The Wavewatcher's Companion. ‘Even more thrilling is to travel through clouds on a hang-glider. The strange thing is, you put your hand inside the cloud, but although it's wet and chilly, there's no actual substance to it.’

(46)

‘There's something about clouds which appeals to the soul’, Ian Loxley says. ‘The line I like best is the one that goes “Life is not measured by the number of breaths you take, but by the moments that take your breath away”.’`,
    options: {
      A: "Gavin Pretor-Pinney explains why this is: ‘Because of the stately way in which clouds move and the gradual rate at which they develop, contemplating them is akin to meditation’, he says. ‘The mere act of sitting, watching and observing slows you down to their pace.’",
      B: "Absolutely. And as well as stimulating the imagination, clouds get you out and about. The keeper of the Society's photo gallery, Ian Loxley, has been on cloud-seeking expeditions in places as far afield as Cornwall and Canada, though his favourite location is around his home in the Lincolnshire Wolds.",
      C: "The Cloud Appreciation Society website is full of reports of such encounters. Some, like that one, are in mid-air at close quarters, while others are miles below the ground.",
      D: "Alto clouds are a good example. They are primarily made up of water droplets, making them appear as grey puffy masses. If you see these on a humid summer morning, watch out for a potential thunderstorm later.",
      E: "Yes, spend an hour here and you become an instant expert on telling your altos (four to six miles high) from your cumulos (anything lower). As for these, they don't start until eight miles up and they're identifiable because of their long, thin shape (the name in Latin means a strand of hair).",
      F: "And, like all such places, humans want to explore them. Glider pilot Mike Rubin not only flies inside clouds, but rides on them. ‘You fly underneath, find the thermal shift that is generating this cloud, and climb up by circling inside it’, he says. ‘Use the thermals, and on a good day you can travel hundreds of kilometres.’",
      G: "Other beachgoers aren't as convinced that the country has been crying out for a purpose-built pavilion like this, equipped with adjustable mirrors so that you don't even have to look up at the sky. But the world's nephelophile community (that's cloud enthusiasts) would beg to differ, especially now that more changeable autumn weather offers fewer cloudless blue sky scenarios and lots more action of the scudding and billowing kind.",
    },
    questions: [
      { id: 41, correct: "E", points: 2 },
      { id: 42, correct: "G", points: 2 },
      { id: 43, correct: "B", points: 2 },
      { id: 44, correct: "A", points: 2 },
      { id: 45, correct: "F", points: 2 },
      { id: 46, correct: "C", points: 2 },
    ],
  },
  part8: {
    title: "What lies beneath",
    subtitle: "Marine scientists have discovered strange new species, but their census also reminds us how little we know about sea creatures, says Tim Ecott.",
    sections: [
      { letter: "A", body: "In the latest Census of Marine Life, the Mediterranean has been identified as one of the world’s top five areas for marine biodiversity. The others are the oceans off Australia, Japan, China and the Gulf of Mexico, each containing as many as 33,000 individual forms of life that can be scientifically classified as species. In total, the Census now estimates that there are more than 230,000 known marine species, but that this is probably less than a quarter of what lives in the sea. The Census has involved scientists in more than 80 countries working over a decade. They hope that by creating the first catalogue of the world's oceans, we can begin to understand the great ecological questions about habitat loss, pollution, overfishing and all the other man-made plagues that are being visited upon the sea. The truth is that, at present, much of what passes for scientific facts about the sea and what lives in it are still based on guesswork." },
      { letter: "B", body: "So far, the Census tells us that fish account for about 12% of sea life and that other easily recognizable vertebrates—whales, turtles, seals and so on—are just 2% of what lives beneath the waves. It is the creepy crawlies that are out there in really big numbers. Almost 40% of identified marine species are crustaceans and molluscs—things like crabs, shrimp, squid and sea snails. The Census continues to add images and data relating to a myriad range of creatures that could have slithered out of the pages of science fiction. None of the writers in that genre could do justice to the shape and form of Chiasmodon niger - The Great Swallower - with its cadaverous skull, metallic pink flesh and needle-like teeth, accompanied by an enormous ballooning stomach that allows it to swallow animals bigger than itself. And surely there is something enchanting about the Yeti Crab, Kiwa hirsuta, another new discovery from the Pacific with a delicate porcelain-smooth carapace and arms longer than its body, encased in ‘sleeves’ of what look like ginger fur." },
      { letter: "C", body: "In shallower waters, the iridescent pink fronds of Platoma algae from Australia resemble the sheen of a pair of pink stockings. Juvenile Antarctic octopuses, speckled brown, mauve and orange, look like exquisitely carved netsuke ornaments, perfectly proportioned and endearing for their donnish domed heads. For its bizarre variety and for its enduring mystery, we must learn to treasure the sea. It is easy to be captivated by intelligent, seemingly friendly sea creatures such as dolphins or even by the hunting prowess of the more sinister sharks. The Marine Census helps us understand that it is the less glamorous, less appealing and less dramatic creatures that are the great bedrock of life on which the oceans depend. As Nancy Knowlton, one of the Census scientists, observes: ‘Most ocean organisms will remain nameless and unknown’ - and how would we begin to start naming the 20,000 types of bacteria found in just one liter of seawater trawled from around a Pacific seamount?" },
      { letter: "D", body: "Hidden within the Marine Census results is a dark message. Maps showing the density of large fish populations in tropical waters reveal the numbers of many of the biggest open ocean species have declined by more than 50% since the 1960s, and specific species, including many of the sharks, by as much as 90%. The Census also points to the effect of the so-called ‘alien species’ being found in many of the world's marine ecosystems. The Mediterranean has the largest number of invasive species, most of them having migrated through the Suez Canal from the Red Sea. So far, more than 600 invasive species have been counted, almost 5% of the total marine creatures in the Mediterranean. The annoying jellyfish on Spanish beaches may be sending us a message or at least a warning. There is evidence that the global jellyfish invasion is gathering pace. As Mediterranean turtles lose their nesting sites to beach developments or die in fishing nets, and the vanishing population of other large predators such as bluefin tuna are fished out, their prey is doing what nature does best, filling a void. Smaller, more numerous species like jellyfish are flourishing and plugging the gap left by the animals higher up the food chain. Clearly it is unwise to talk as if the jellyfish have some kind of plan, but many marine experts have been saying for several years that we need to start loving jellyfish because in the not too distant future, they may be the most plentiful marine species around." },
    ],
    questions: [
      { id: 47, text: "The kind of sea creatures that people in general find appealing", correct: "C", points: 1 },
      { id: 48, text: "How certain creatures reached the sea where they are currently found", correct: "D", points: 1 },
      { id: 49, text: "Where descriptions of certain sea creatures might be expected to be found", correct: "B", points: 1 },
      { id: 50, text: "The replacement of various kinds of sea creatures by other kinds", correct: "D", points: 1 },
      { id: 51, text: "The likelihood that only a small proportion of all sea creatures is included in the Census", correct: "A", points: 1 },
      { id: 52, text: "Comparisons between certain sea creatures and certain objects", correct: "C", points: 1 },
      { id: 53, text: "The idea that certain sea creatures are consciously attempting to do something", correct: "D", points: 1 },
      { id: 54, text: "A doubt about the accuracy of existing information about sea creatures", correct: "A", points: 1 },
      { id: 55, text: "The basis on which sea creatures are included in the Census", correct: "A", points: 1 },
      { id: 56, text: "An informal term to describe a large proportion of all sea creatures", correct: "B", points: 1 },
    ],
  },
} as const;
