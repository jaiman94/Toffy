// --- Backend API Endpoints (Mocked for Demo) ---
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    GOOGLE: '/api/auth/google',
    APPLE: '/api/auth/apple',
  },
  PETS: {
    CREATE: '/api/pets',
    UPDATE: '/api/pets/:id',
  },
  ONBOARDING: {
    SET_PROBLEM: '/api/onboarding/problem',
    GET_QUESTIONS: '/api/questions/:problemId',
    SUBMIT_ASSESSMENT: '/api/assessment',
  },
  PLAN: {
    GET_DIAGNOSIS: '/api/diagnosis/:petId',
    GET_PLAN: '/api/plan/:petId',
  },
};

// --- Breeds List ---
export const BREEDS = [
  'Golden Retriever',
  'Labrador Retriever',
  'German Shepherd',
  'French Bulldog',
  'Bulldog',
  'Poodle',
  'Beagle',
  'Rottweiler',
  'Yorkshire Terrier',
  'Boxer',
  'Dachshund',
  'Shih Tzu',
  'Siberian Husky',
  'Great Dane',
  'Doberman',
  'Australian Shepherd',
  'Cavalier King Charles',
  'Border Collie',
  'Mixed Breed',
  'Other',
];

// --- Age Options ---
export const AGES = [
  { value: 'puppy', label: 'Puppy (under 6 months)', months: 3 },
  { value: 'young', label: '6-12 months', months: 9 },
  { value: 'adolescent', label: '1-2 years', months: 18 },
  { value: 'adult', label: '2-7 years', months: 48 },
  { value: 'senior', label: '7+ years', months: 96 },
];

// --- Problem Categories ---
export const PROBLEMS = [
  {
    id: 'potty',
    emoji: '🚽',
    label: 'Potty Training',
    sublabel: 'Accidents in the house',
    empathy: "Potty training accidents are super common — and totally fixable! I've helped thousands of pups master this.",
    insight: "Based on {dogName}'s age and your schedule, this is likely a routine consistency issue. Most dogs see improvement within 5-7 days with the right approach."
  },
  {
    id: 'leash',
    emoji: '🦮',
    label: 'Leash Pulling',
    sublabel: 'Walks are a struggle',
    empathy: "Leash pulling is exhausting! Let's turn those stressful walks into enjoyable adventures.",
    insight: "Leash pulling often comes from excitement and lack of impulse control. We'll work on focus exercises that make walks calmer within a week."
  },
  {
    id: 'anxiety',
    emoji: '😰',
    label: 'Separation Anxiety',
    sublabel: 'Stressed when alone',
    empathy: "It's heartbreaking to see them stressed. We'll build their confidence together, step by step.",
    insight: "Separation anxiety requires gradual desensitization. Your plan includes progressive alone-time exercises tailored to {dogName}'s comfort level."
  },
  {
    id: 'barking',
    emoji: '🗣️',
    label: 'Excessive Barking',
    sublabel: 'Barks at everything',
    empathy: "Non-stop barking is tough on everyone. Let's figure out what's triggering it and address the root cause.",
    insight: "Excessive barking usually has a trigger — boredom, alerting, or anxiety. Your plan focuses on identifying and addressing {dogName}'s specific triggers."
  },
  {
    id: 'biting',
    emoji: '🦷',
    label: 'Biting & Nipping',
    sublabel: 'Mouthy behavior',
    empathy: "Those puppy teeth are sharp! Let's redirect that energy to appropriate outlets.",
    insight: "Biting is often a sign of teething or play that wasn't properly redirected. We'll teach {dogName} bite inhibition and provide better alternatives."
  },
  {
    id: 'obedience',
    emoji: '🎓',
    label: 'Basic Obedience',
    sublabel: 'Sit, stay, come',
    empathy: "Building a solid foundation is the best gift you can give your dog. Let's start with the essentials!",
    insight: "Basic commands create a language between you and {dogName}. We'll use positive reinforcement to build reliable responses."
  },
];

// --- Problem-Specific Questions ---
export const QUESTIONS_BY_PROBLEM = {
  potty: [
    {
      id: 'p1',
      question: "How often is {dogName} having accidents?",
      options: ['Daily', 'Few times a week', 'Once a week', 'Rarely'],
      insight: 'frequency',
    },
    {
      id: 'p2',
      question: "Where do accidents usually happen?",
      options: ['Same spot every time', 'Random places', 'Near the door', 'On soft surfaces (rugs, beds)'],
      insight: 'location',
    },
    {
      id: 'p3',
      question: "How often does {dogName} go outside currently?",
      options: ['Every 1-2 hours', 'Every 3-4 hours', 'A few times a day', 'Only when they ask'],
      insight: 'schedule',
    },
    {
      id: 'p4',
      question: "Does {dogName} signal when they need to go?",
      options: ['Yes, clearly', 'Sometimes', 'Only after an accident', 'Never'],
      insight: 'communication',
    },
    {
      id: 'p5',
      question: "What's your living situation?",
      options: ['House with yard', 'Apartment with balcony', 'Apartment (no outdoor space)', 'Other'],
      insight: 'environment',
    },
  ],
  leash: [
    {
      id: 'l1',
      question: "When does {dogName} pull the most?",
      options: ['Start of the walk', 'When seeing other dogs', 'When seeing people', 'The entire time'],
      insight: 'trigger',
    },
    {
      id: 'l2',
      question: "What equipment do you currently use?",
      options: ['Regular collar', 'Harness', 'Head halter', 'Retractable leash'],
      insight: 'equipment',
    },
    {
      id: 'l3',
      question: "How long are your typical walks?",
      options: ['5-10 minutes', '15-30 minutes', '30-60 minutes', 'Over an hour'],
      insight: 'duration',
    },
    {
      id: 'l4',
      question: "Has {dogName} had any leash training before?",
      options: ['Yes, professional', 'Yes, at home', 'A little bit', 'None'],
      insight: 'history',
    },
    {
      id: 'l5',
      question: "How does {dogName} react when you stop walking?",
      options: ['Keeps pulling', 'Looks back at me', 'Comes back to me', 'Gets frustrated'],
      insight: 'response',
    },
  ],
  anxiety: [
    {
      id: 'a1',
      question: "When did {dogName}'s anxiety start?",
      options: ['Always had it', 'After a move/change', 'After I went back to work', 'Gradually got worse'],
      insight: 'onset',
    },
    {
      id: 'a2',
      question: "What does {dogName} do when left alone?",
      options: ['Barks/howls', 'Destroys things', 'Has accidents', 'Paces/pants'],
      insight: 'symptoms',
    },
    {
      id: 'a3',
      question: "How long can {dogName} be alone before symptoms start?",
      options: ['Immediately', '15-30 minutes', '1-2 hours', 'Several hours'],
      insight: 'threshold',
    },
    {
      id: 'a4',
      question: "Does {dogName} follow you around the house?",
      options: ['Constantly', 'Often', 'Sometimes', 'Rarely'],
      insight: 'attachment',
    },
    {
      id: 'a5',
      question: "How does {dogName} react when you're getting ready to leave?",
      options: ['Gets very anxious', 'Tries to block the door', 'Watches nervously', 'Seems fine'],
      insight: 'anticipation',
    },
  ],
  barking: [
    {
      id: 'b1',
      question: "What triggers {dogName}'s barking most?",
      options: ['Doorbell/knocking', 'People outside', 'Other dogs', 'Seemingly nothing'],
      insight: 'trigger',
    },
    {
      id: 'b2',
      question: "When does the barking happen most?",
      options: ['When alone', 'When I\'m home', 'At night', 'All the time'],
      insight: 'timing',
    },
    {
      id: 'b3',
      question: "How long does a barking episode usually last?",
      options: ['A few barks', '1-5 minutes', '5-15 minutes', 'Until I intervene'],
      insight: 'duration',
    },
    {
      id: 'b4',
      question: "How do you usually respond to the barking?",
      options: ['Tell them to stop', 'Ignore it', 'Distract with toys/treats', 'Remove the trigger'],
      insight: 'response',
    },
    {
      id: 'b5',
      question: "Has {dogName} always barked like this?",
      options: ['Yes, since I got them', 'Started recently', 'Got worse over time', 'Only in certain situations'],
      insight: 'history',
    },
  ],
  biting: [
    {
      id: 'n1',
      question: "When does {dogName} bite/nip most?",
      options: ['During play', 'When excited', 'When I touch certain areas', 'When corrected'],
      insight: 'trigger',
    },
    {
      id: 'n2',
      question: "How hard does {dogName} bite?",
      options: ['Gentle mouthing', 'Moderate - leaves marks', 'Hard - breaks skin', 'Varies'],
      insight: 'intensity',
    },
    {
      id: 'n3',
      question: "Who does {dogName} bite most often?",
      options: ['Me', 'Family members', 'Strangers', 'Everyone equally'],
      insight: 'target',
    },
    {
      id: 'n4',
      question: "What do you do when {dogName} bites?",
      options: ['Say "no" or "ouch"', 'Walk away', 'Redirect to a toy', 'Nothing - not sure what to do'],
      insight: 'response',
    },
    {
      id: 'n5',
      question: "Does {dogName} have appropriate chew toys?",
      options: ['Yes, plenty', 'A few', 'Not really', 'They ignore toys'],
      insight: 'enrichment',
    },
  ],
  obedience: [
    {
      id: 'o1',
      question: "What commands does {dogName} currently know?",
      options: ['None yet', 'Sit only', 'A few basics', 'Several but inconsistent'],
      insight: 'baseline',
    },
    {
      id: 'o2',
      question: "How does {dogName} respond to their name?",
      options: ['Always looks', 'Usually looks', 'Sometimes', 'Rarely'],
      insight: 'attention',
    },
    {
      id: 'o3',
      question: "What motivates {dogName} most?",
      options: ['Food/treats', 'Toys', 'Praise/petting', 'Play'],
      insight: 'motivation',
    },
    {
      id: 'o4',
      question: "How long can {dogName} focus during training?",
      options: ['Under 2 minutes', '2-5 minutes', '5-10 minutes', '10+ minutes'],
      insight: 'focus',
    },
    {
      id: 'o5',
      question: "Where do you plan to train?",
      options: ['Inside only', 'Backyard', 'Parks', 'Everywhere'],
      insight: 'environment',
    },
  ],
};

// --- Onboarding Flow (Chat questions after PetProfileScreen collects name/breed/age) ---
export const ONBOARDING_FLOW = [
  // Step 0: Intro (personalized greeting)
  {
    id: 'intro',
    type: 'intro',
    message: "Hey there! 👋 I'm Toffy, your AI dog trainer. I already know a bit about {name} — now let's dive deeper to create the perfect training plan!",
    buttonText: "Let's do it!",
  },

  // Step 1: Living situation (Visual Grid)
  {
    id: 'living',
    type: 'grid',
    question: "Where does {name} live?",
    columns: 3,
    options: [
      { emoji: '🏠', label: 'House', sublabel: 'with yard', value: 'house_yard' },
      { emoji: '🏢', label: 'Apartment', sublabel: 'with balcony', value: 'apt_balcony' },
      { emoji: '🏢', label: 'Apartment', sublabel: 'no outdoor', value: 'apt_no_outdoor' },
    ],
    summaryTemplate: (value, label) => {
      const summaries = {
        'house_yard': 'We live in a house with a yard',
        'apt_balcony': 'We live in an apartment with a balcony',
        'apt_no_outdoor': 'We live in an apartment without outdoor space',
      };
      return summaries[value] || label;
    },
    acknowledgementMap: {
      'house_yard': "A yard is a huge advantage for training. We'll put it to good use.",
      'apt_balcony': "Balcony space helps! We'll adapt exercises for apartment living.",
      'apt_no_outdoor': "No yard? No problem. Some of our best results come from apartment training.",
    },
  },

  // Step 3: Main training goal (Visual Grid)
  {
    id: 'goal',
    type: 'grid',
    question: "What's your #1 training goal?",
    columns: 4,
    options: [
      { emoji: '🚽', label: 'Potty', sublabel: 'Training', value: 'potty' },
      { emoji: '🦮', label: 'Leash', sublabel: 'Manners', value: 'leash' },
      { emoji: '🎓', label: 'Basic', sublabel: 'Obedience', value: 'obedience' },
      { emoji: '😤', label: 'Behavior', sublabel: 'Issues', value: 'behavior' },
    ],
    summaryTemplate: (value, label) => {
      const summaries = {
        'potty': 'My main goal is potty training',
        'leash': 'My main goal is better leash manners',
        'obedience': 'My main goal is basic obedience',
        'behavior': 'My main goal is fixing behavior issues',
      };
      return summaries[value] || `My main goal is ${label.toLowerCase()}`;
    },
    acknowledgementMap: {
      'potty': "Potty training is the #1 reason people come to us — and it's one of the fastest to fix.",
      'leash': "Leash issues are so common. The good news? Most dogs improve dramatically in under 2 weeks.",
      'obedience': "Smart move starting with the basics. Everything else builds on a solid obedience foundation.",
      'behavior': "Behavior issues can feel overwhelming, but they almost always have a clear root cause. Let's find it.",
    },
  },

  // --- NEW: Leadership Assessment Part 1 ---
  {
    id: 'leadership_intro',
    type: 'intro',
    message: "Now let's understand your relationship with {name}. These questions help me see the pack dynamics.",
    buttonText: "Let's go",
    credential: "These questions come from canine behavioral research on pack dynamics",
  },
  {
    id: 'leadership_1',
    type: 'speedround',
    title: "Quick yes/no about your routine with {name}:",
    questions: [
      { id: 'table_scraps', question: 'Have you ever fed {name} scraps from the table while eating?' },
      { id: 'door_wait', question: 'Does {name} wait for you to go through doors first?' },
      { id: 'raise_voice', question: 'Do you often raise your voice when {name} misbehaves?' },
      { id: 'leash_pull', question: 'Does {name} pull on the leash during walks?' },
      { id: 'approach_signal', question: 'Does {name} wait for your signal before approaching new people or dogs?' },
      { id: 'playtime_signal', question: 'Do you clearly signal when playtime begins and ends?' },
    ],
    summaryTemplate: (answers) => {
      const issues = [];
      if (answers.table_scraps) issues.push('table feeding');
      if (!answers.door_wait) issues.push('door manners');
      if (answers.raise_voice) issues.push('voice correction');
      if (answers.leash_pull) issues.push('leash pulling');
      if (issues.length === 0) return "Good leadership foundation";
      return `Areas to work on: ${issues.join(', ')}`;
    },
  },

  // --- NEW: Leadership Assessment Part 2 ---
  {
    id: 'leadership_2',
    type: 'speedround',
    title: "A few more about boundaries:",
    questions: [
      { id: 'recall_repeat', question: 'Do you have to call {name} multiple times before they respond?' },
      { id: 'earn_treats', question: 'Does {name} earn treats instead of getting them freely?' },
      { id: 'furniture_invite', question: 'Does {name} jump on furniture without being invited?' },
      { id: 'move_around', question: 'When {name} is lying down, do you walk around them instead of asking them to move?' },
      { id: 'designated_spot', question: 'Does {name} have a designated resting spot?' },
    ],
    summaryTemplate: (answers) => {
      const score = [answers.earn_treats, !answers.recall_repeat, !answers.furniture_invite, !answers.move_around, answers.designated_spot].filter(Boolean).length;
      if (score >= 4) return "Strong boundary structure";
      if (score >= 2) return "Some boundaries need work";
      return "Boundaries need attention";
    },
    acknowledgement: "Thanks for being honest about those! It really helps. 💪",
  },

  // --- NEW: 5 Things Assessment ---
  {
    id: 'five_things_intro',
    type: 'intro',
    message: "Great! Now let's check if {name} is getting the essentials every dog needs.",
    buttonText: "Check essentials",
    credential: "Based on veterinary behavioral guidelines",
  },
  {
    id: 'five_things',
    type: 'speedround',
    title: "Is {name} getting these daily?",
    questions: [
      { id: 'sensory', question: 'Activities that stimulate sight, smell, and hearing?' },
      { id: 'walks', question: 'Walks of at least 20-30 minutes, twice a day?' },
      { id: 'training', question: 'A few minutes of basic training practice?' },
      { id: 'diet', question: 'A balanced diet meeting nutritional needs?' },
      { id: 'bonding', question: 'Daily play, cuddles, or calm bonding time?' },
    ],
    summaryTemplate: (answers) => {
      const yesCount = Object.values(answers).filter(Boolean).length;
      if (yesCount === 5) return "{name} is getting all 5 essentials!";
      if (yesCount >= 3) return `{name} is getting ${yesCount}/5 essentials`;
      return `{name} may be missing some key needs (${yesCount}/5)`;
    },
    dynamicAcknowledgement: (answers) => {
      const yesCount = Object.values(answers).filter(Boolean).length;
      if (yesCount === 5) return "That's rare — most owners miss at least one. Great job covering all the bases.";
      if (yesCount >= 3) return `${yesCount} out of 5 is solid. Those gaps are likely connected to what you're experiencing.`;
      return "Those gaps are likely connected to what you're experiencing. We'll address them in your plan.";
    },
  },

  // --- NEW: Sensitivity / Reactivity Assessment ---
  {
    id: 'sensitivities_intro',
    type: 'intro',
    message: "Now let's check how {name} reacts to specific triggers. This helps me understand their stress thresholds.",
    buttonText: "Check reactivity",
    credential: "Based on certified veterinary behaviorist screening protocols",
  },
  {
    id: 'sensitivities',
    type: 'matrix',
    question: "How does {name} react to these?",
    items: [
      { id: 'resource_guarding', label: 'Resource Guarding', sublabel: 'Have you ever seen {name} show aggression when you approach something they value? (for example: food, toys, or family members)', defaultValue: 20 },
      { id: 'sound', label: 'Sound Sensitivity', sublabel: 'Does {name} show any reaction to loud noises? (this could look like fear, aggression, or even tolerance)', defaultValue: 20 },
      { id: 'movement', label: 'Movement Sensitivity', sublabel: 'Does {name} show any reaction to sudden movements? (this could look like fear, aggression, or even tolerance)', defaultValue: 20 },
      { id: 'touch', label: 'Touch Sensitivity', sublabel: 'Does {name} show any reaction when being touched? (this could look like fear, aggression, or even tolerance)', defaultValue: 20 },
      { id: 'food', label: 'Food Aggression', sublabel: 'Does {name} get aggressive when you are near their food bowl or try to take it away?', defaultValue: 20 },
    ],
    summaryTemplate: (values) => {
      const reactiveItems = Object.entries(values).filter(([, v]) => v > 50);
      if (reactiveItems.length === 0) return '{name} is generally calm across all triggers';
      if (reactiveItems.length === 1) return '{name} shows some reactivity in 1 area';
      return `{name} shows reactivity in ${reactiveItems.length} areas`;
    },
    dynamicAcknowledgement: (values) => {
      const reactiveCount = Object.values(values).filter(v => v > 50).length;
      if (reactiveCount === 0) return "Low reactivity is great news — it means the core issue is likely behavioral, not temperamental.";
      if (reactiveCount <= 2) return "A couple of reactive areas is very normal. Your plan will include desensitization exercises for these.";
      return "Multiple reactive triggers tell me we need a careful, structured approach. Your plan will prioritize safety and gradual exposure.";
    },
  },

  // Step: Severity slider (combines severity + frequency)
  {
    id: 'severity',
    type: 'slider',
    question: "Overall, how serious is this issue?",
    leftLabel: 'Mild & rare',
    rightLabel: 'Severe & constant',
    min: 0,
    max: 100,
    defaultValue: 50,
    summaryTemplate: (value, label) => {
      if (value <= 25) return "It's a mild issue that happens occasionally";
      if (value <= 50) return "It's a moderate concern";
      if (value <= 75) return "It's becoming a serious problem";
      return "It's a severe issue that happens constantly";
    },
    dynamicAcknowledgement: (value) => {
      if (value <= 30) return "Catching it early is smart. Mild issues are the easiest to correct before they become habits.";
      if (value <= 60) return "Moderate issues are the sweet spot for training — noticeable enough to stay motivated, but very fixable.";
      return "This is really impacting your daily life. The plan will prioritize quick wins first so you see relief fast.";
    },
  },

  // Step: Training time (Visual Grid)
  {
    id: 'training_time',
    type: 'grid',
    question: "How much time can you train daily?",
    columns: 3,
    options: [
      { emoji: '⏱️', label: '5-10 min', value: '5-10' },
      { emoji: '⏱️', label: '15-30 min', value: '15-30' },
      { emoji: '⏱️', label: '30+ min', value: '30+' },
    ],
    summaryTemplate: (value) => `I can train ${value} minutes daily`,
    acknowledgementMap: {
      '5-10': "Even 5-10 minutes of focused training beats an hour of unfocused work. We'll make every minute count.",
      '15-30': "This isn't a quick fix — but with 15-30 min/day for 3-4 weeks, most dogs show dramatic improvement.",
      '30+': "That kind of commitment is rare and powerful. You'll likely see results faster than most.",
    },
  },

  // Step: Notification reminder
  {
    id: 'notification_reminder',
    type: 'intro',
    message: "One last thing! Consistency is the #1 factor for success with {name}. Would you like to turn on notifications so you don't forget your daily training sessions?",
    buttonText: "Turn on notifications",
    secondaryButtonText: "Maybe later",
    credential: "Trainers see 3x better results when owners stay consistent",
  },

  // Step: Completion
  {
    id: 'complete',
    type: 'complete',
    message: "Perfect! I know {name} now. Creating your personalized plan...",
  },
];

// --- Generation Steps ---
export const GENERATION_STEPS = [
  { id: 1, label: "Analyzing {dogName}'s profile" },
  { id: 2, label: "Calculating leadership & boundaries scores" },
  { id: 3, label: "Evaluating daily essentials" },
  { id: 4, label: "Matching with expert techniques" },
  { id: 5, label: "Building your custom plan" },
];

// --- Plan Structure ---
export const getPlanDays = (problemId, dogName) => ({
  potty: [
    {
      day: 1,
      title: 'Foundation',
      description: 'Establish a consistent schedule and identify patterns',
      lessons: 3,
      duration: '15 min',
    },
    {
      day: 2,
      title: 'Signal Training',
      description: `Teach ${dogName} to communicate their needs`,
      lessons: 2,
      duration: '10 min',
    },
    {
      day: 3,
      title: 'Routine Building',
      description: 'Reinforce good habits with positive association',
      lessons: 3,
      duration: '12 min',
    },
    {
      day: 4,
      title: 'Handling Accidents',
      description: 'What to do when mistakes happen',
      lessons: 2,
      duration: '8 min',
    },
    {
      day: 5,
      title: 'Extending Duration',
      description: 'Gradually increase time between breaks',
      lessons: 2,
      duration: '10 min',
    },
    {
      day: 6,
      title: 'Independence',
      description: 'Building reliable habits without constant supervision',
      lessons: 2,
      duration: '10 min',
    },
    {
      day: 7,
      title: 'Maintenance',
      description: 'Long-term success strategies',
      lessons: 2,
      duration: '8 min',
    },
  ],
  // Add more problem-specific plans as needed
  default: [
    { day: 1, title: 'Getting Started', description: 'Foundation exercises', lessons: 3, duration: '15 min' },
    { day: 2, title: 'Building Skills', description: 'Core technique practice', lessons: 3, duration: '12 min' },
    { day: 3, title: 'Consistency', description: 'Reinforcement and repetition', lessons: 2, duration: '10 min' },
    { day: 4, title: 'Challenges', description: 'Handling setbacks', lessons: 2, duration: '10 min' },
    { day: 5, title: 'Progress', description: 'Advancing to next level', lessons: 3, duration: '12 min' },
    { day: 6, title: 'Real World', description: 'Applying skills in daily life', lessons: 2, duration: '10 min' },
    { day: 7, title: 'Mastery', description: 'Long-term success plan', lessons: 2, duration: '8 min' },
  ],
});

// --- Milestone Roadmap (4-week plan for DiagnosisScreen) ---
export const MILESTONE_ROADMAP = [
  { week: 1, title: 'Foundation', description: 'Build the core habits and communication patterns' },
  { week: 2, title: 'Reinforcement', description: 'Strengthen consistency and address setbacks' },
  { week: 3, title: 'Real-World', description: 'Apply training in distracting environments' },
  { week: 4, title: 'Independence', description: 'Reliable behavior without constant guidance' },
];

// --- Diagnosis Functions ---
export const computeDiagnosisScores = (chatResponses) => {
  // Leadership score from leadership_1 answers
  const l1 = chatResponses.leadership_1 || {};
  const leadershipGood = [
    !l1.table_scraps,
    l1.door_wait === true,
    !l1.raise_voice,
    !l1.leash_pull,
    l1.approach_signal === true,
    l1.playtime_signal === true,
  ].filter(Boolean).length;
  const leadership = Math.round((leadershipGood / 6) * 100);

  // Boundaries score from leadership_2 answers
  const l2 = chatResponses.leadership_2 || {};
  const boundaryGood = [
    l2.earn_treats === true,
    !l2.recall_repeat,
    !l2.furniture_invite,
    !l2.move_around,
    l2.designated_spot === true,
  ].filter(Boolean).length;
  const boundaries = Math.round((boundaryGood / 5) * 100);

  // Essentials score from five_things answers
  const ft = chatResponses.five_things || {};
  const essentialsCount = Object.values(ft).filter(Boolean).length;
  const essentials = Math.round((essentialsCount / 5) * 100);

  // Reactivity score from sensitivities (inverted — higher = more reactive = worse)
  const sens = chatResponses.sensitivities || {};
  const sensValues = Object.values(sens);
  const reactivity = sensValues.length > 0
    ? Math.round(sensValues.reduce((a, b) => a + b, 0) / sensValues.length)
    : 20;

  return { leadership, boundaries, essentials, reactivity };
};

export const getDiagnosisNarrative = (dogName, scores, goal) => {
  const weakAreas = [];
  if (scores.leadership < 50) weakAreas.push('leadership structure');
  if (scores.boundaries < 50) weakAreas.push('boundary consistency');
  if (scores.essentials < 60) weakAreas.push('daily essentials');

  const goalLabels = {
    potty: 'potty training',
    leash: 'leash behavior',
    obedience: 'obedience',
    behavior: 'behavior issues',
  };
  const goalLabel = goalLabels[goal] || 'training goals';

  if (weakAreas.length === 0) {
    return `${dogName} has a solid foundation across leadership, boundaries, and daily care. Your ${goalLabel} goal is very achievable — we just need to channel this foundation into targeted exercises.`;
  }

  return `${dogName}'s assessment shows that ${weakAreas.join(' and ')} ${weakAreas.length === 1 ? 'needs' : 'need'} attention. This is directly connected to your ${goalLabel} challenges. The good news: these are exactly the areas your plan targets first.`;
};

export const getEscalationWarning = (dogName, age, severity, goal) => {
  const isYoung = ['puppy', 'young'].includes(age);
  const isSevere = severity > 60;

  const goalLabels = {
    potty: 'house training issues',
    leash: 'leash reactivity',
    obedience: 'obedience gaps',
    behavior: 'behavioral patterns',
  };
  const issue = goalLabels[goal] || 'these behaviors';

  if (isYoung && isSevere) {
    return `At ${dogName}'s age, ${issue} can become permanent habits within weeks if not addressed. The window for easiest correction is right now.`;
  }
  if (isYoung) {
    return `Young dogs like ${dogName} are in their prime learning window. Addressing ${issue} now prevents them from becoming ingrained adult behaviors.`;
  }
  if (isSevere) {
    return `With a severity level this high, ${issue} typically escalate over time without structured intervention. Each week of delay makes correction harder.`;
  }
  return `Left unaddressed, ${issue} tend to gradually worsen. Starting now means faster results and less frustration for both you and ${dogName}.`;
};

export const getMirrorSummary = (dogName, chatResponses) => {
  const bullets = [];

  // Living situation
  const livingLabels = {
    'house_yard': 'Lives in a house with a yard',
    'apt_balcony': 'Lives in an apartment with a balcony',
    'apt_no_outdoor': 'Lives in an apartment without outdoor space',
  };
  if (chatResponses.living) {
    bullets.push(livingLabels[chatResponses.living] || 'Living situation noted');
  }

  // Goal
  const goalLabels = {
    'potty': 'Main goal: potty training',
    'leash': 'Main goal: leash manners',
    'obedience': 'Main goal: basic obedience',
    'behavior': 'Main goal: behavior issues',
  };
  if (chatResponses.goal) {
    bullets.push(goalLabels[chatResponses.goal] || 'Training goal set');
  }

  // Essentials gaps
  const ft = chatResponses.five_things || {};
  const yesCount = Object.values(ft).filter(Boolean).length;
  if (yesCount < 5) {
    const missing = [];
    if (!ft.sensory) missing.push('sensory stimulation');
    if (!ft.walks) missing.push('regular walks');
    if (!ft.training) missing.push('daily training');
    if (!ft.diet) missing.push('diet review');
    if (!ft.bonding) missing.push('bonding time');
    if (missing.length > 0) {
      bullets.push(`Missing essentials: ${missing.slice(0, 3).join(', ')}`);
    }
  } else {
    bullets.push('All 5 daily essentials covered');
  }

  // Sensitivities
  const sens = chatResponses.sensitivities;
  if (sens && Object.keys(sens).length > 0) {
    const reactive = Object.entries(sens).filter(([, v]) => v > 50);
    if (reactive.length > 0) {
      const sensLabels = { food: 'food guarding', touch: 'touch sensitivity', movement: 'movement reactivity', noise: 'noise sensitivity', possessions: 'resource guarding' };
      const names = reactive.map(([k]) => sensLabels[k] || k);
      bullets.push(`Sensitivities: ${names.join(', ')}`);
    } else {
      bullets.push('Low reactivity across all areas');
    }
  }

  // Severity
  if (chatResponses.severity !== undefined) {
    const sev = chatResponses.severity;
    if (sev <= 30) bullets.push('Issue severity: mild');
    else if (sev <= 60) bullets.push('Issue severity: moderate');
    else bullets.push('Issue severity: high');
  }

  return bullets;
};
