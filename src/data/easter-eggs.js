export function buildRegedit() {
  return [
    { text: 'Registry Editor', cls: 'heading' },
    { text: '' },
    { text: '  🪟 Windows Registry™ (Parody Edition)', cls: 'accent' },
    { text: '' },
    { text: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Omkaar', cls: 'blue' },
    { text: '' },
    { text: '  Name                              Type       Value', cls: 'dim' },
    { text: '  ─────────────────────────────────────────────────────', cls: 'dim' },
    { text: '  CoffeeRequired                    DWORD      0x1 (Critical)', cls: 'red' },
    { text: '  ProductivityLevel                 DWORD      0x8F (143%)', cls: 'green' },
    { text: '  SelfDoubt                         REG_SZ     "removed"', cls: 'green' },
    { text: '  DarkMode                          DWORD      0x1 (True)', cls: 'cyan' },
    { text: '  ShippingMentality                 REG_SZ     "default"', cls: 'green' },
    { text: '  DeadlinesHit                      DWORD      0x12 (18/18)', cls: 'green' },
    { text: '  BugsFiled                         DWORD      0x0 "features"', cls: 'yellow' },
    { text: '  TimeSpentDebuggin                 REG_SZ     "too.long"', cls: 'dim' },
    { text: '  CodeComments                      REG_SZ     "self-explanatory"', cls: 'dim' },
    { text: '' },
    { text: '  ⚠️  Warning: Modifying these values may result in', cls: 'yellow' },
    { text: '      increased productivity and life satisfaction.', cls: 'yellow' },
    { text: '' },
    { text: '  // This is a joke. Please exit immediately.', cls: 'dim' },
  ];
}

const META_JOKES = [
  "I'd tell you a joke about variables, but I'm afraid they're already initialized.",
  "Why did the developer go broke? They used up all their cache!",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "Why do Java developers wear glasses? Because they can't C#!",
  "I would make a joke about this portfolio, but it would be too self-referential.",
  "Why did the TypeScript developer quit? They didn't get the type of recognition they deserved.",
  "You've found an easter egg! Congratulations, you're observant.",
  "Is this a feature or a bug? Honestly, at this point, who knows?",
  "I told my computer I needed a break. Now it won't stop calling me.",
  "There are only 10 types of people in the world: those who understand binary and those who don't.",
];

export function getRandomJoke() {
  return META_JOKES[Math.floor(Math.random() * META_JOKES.length)];
}

export function buildDeveloperMode() {
  return [
    { text: '🔧 DEVELOPER MODE ACTIVATED 🔧', cls: 'heading' },
    { text: '' },
    { text: '  Status: Console is watching... always watching.', cls: 'cyan' },
    { text: '  Bugs spawned this session: ' + Math.floor(Math.random() * 47), cls: 'yellow' },
    { text: '  Features shipped: all of them (none broken, we swear)', cls: 'green' },
    { text: '  Sanity level: ' + Math.floor(Math.random() * 100) + '%', cls: 'blue' },
    { text: '' },
    { text: '  Random joke for you:', cls: 'accent' },
    { text: '  "' + getRandomJoke() + '"', cls: 'dim' },
  ];
}
