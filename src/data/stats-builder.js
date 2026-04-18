export function buildStats(stats) {
  return [
    { text: 'Session Analytics', cls: 'heading' },
    { text: '' },
    { text: '  >> Command Usage', cls: 'accent' },
    { text: `    Total Commands Executed: ${stats.totalCommands}`, cls: 'blue' },
    { text: `    Total History Items: ${stats.historyCount}`, cls: 'blue' },
    { text: '' },
    { text: '  >> Most Used Commands', cls: 'accent' },
    ...Object.entries(stats.commandCounts || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([cmd, count], idx) => ({
        text: `    ${idx + 1}. ${cmd}: ${count}x`,
        cls: idx === 0 ? 'green' : 'dim'
      })),
    { text: '' },
    { text: '  >> Session Info', cls: 'accent' },
    { text: `    Session Start: ${stats.sessionStart}`, cls: 'dim' },
    { text: `    Session Duration: ${stats.sessionDuration}`, cls: 'dim' },
    { text: `    AI Chat Messages: ${stats.aiMessages}`, cls: 'dim' },
    { text: '' },
    { text: '  >> Local Data', cls: 'accent' },
    { text: `    Stored Commands: ${stats.storedCommands}`, cls: 'dim' },
    { text: `    Portfolio Entries: ${stats.portfolioSize}`, cls: 'dim' },
    { text: '' },
    { text: `    Made with [LOVE] by Omkaar`, cls: 'dim', style: 'text-align:center' },
  ];
}
