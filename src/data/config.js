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
    acknowledgement: "Got it! That helps me understand your space. 🏠",
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
    acknowledgement: "That's our most requested goal — great choice! 🎯",
  },

  // --- NEW: Leadership Assessment Part 1 ---
  {
    id: 'leadership_intro',
    type: 'intro',
    message: "Now let's understand your relationship with {name}. These questions help me see the pack dynamics.",
    buttonText: "Let's go",
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
    acknowledgement: "Perfect! Almost done... 🙌",
  },

  // --- Sensitivities Assessment (Matrix) ---
  {
    id: 'sensitivities_intro',
    type: 'intro',
    message: "Almost done! Let's check how {name} handles certain situations.",
    buttonText: "Continue",
  },
  {
    id: 'sensitivities',
    type: 'matrix',
    question: "How does {name} react to these?",
    items: [
      { id: 'food', label: 'Near food bowl', defaultValue: 20 },
      { id: 'touch', label: 'Firm touch/massage', defaultValue: 20 },
      { id: 'movement', label: 'Sudden movements', defaultValue: 20 },
      { id: 'noise', label: 'Loud noises', defaultValue: 30 },
      { id: 'possessions', label: 'Toys & bones', defaultValue: 20 },
    ],
    summaryTemplate: (values) => {
      const reactiveCount = Object.values(values).filter(v => v > 50).length;
      if (reactiveCount === 0) return '{name} is generally calm';
      if (reactiveCount === 1) return '{name} has 1 sensitivity area';
      return `{name} has ${reactiveCount} sensitivity areas`;
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
  { id: 2, label: "Reviewing your answers" },
  { id: 3, label: "Matching with expert techniques" },
  { id: 4, label: "Building your custom plan" },
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
