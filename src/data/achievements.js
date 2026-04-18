export const ACHIEVEMENTS = {
  'first_command': {
    name: '🚀 First Steps',
    desc: 'Run your first command',
    icon: '🚀'
  },
  'explorer': {
    name: '🔍 Explorer',
    desc: 'Run 10 different commands',
    icon: '🔍',
    condition: (cmdCount, cmdCountsObj) => Object.keys(cmdCountsObj).length >= 10
  },
  'power_user': {
    name: '⚡ Power User',
    desc: 'Run 50 total commands',
    icon: '⚡',
    condition: (cmdCount) => cmdCount >= 50
  },
  'ai_master': {
    name: '🤖 AI Master',
    desc: 'Have 10 AI chat exchanges',
    icon: '🤖',
    condition: (cmdCount, cmdCountsObj, aiConversation) => aiConversation.length >= 20
  },
  'shortcut_pro': {
    name: '⌨️ Shortcut Pro',
    desc: 'Use /shortcuts command',
    icon: '⌨️'
  },
  'theme_collector': {
    name: '🎨 Theme Collector',
    desc: 'Switch to all 4 themes',
    icon: '🎨',
    condition: (cmdCount, cmdCountsObj) => {
      const themeCmds = ['/dark', '/light', '/retro', '/glass'];
      return themeCmds.every(cmd => cmdCountsObj[cmd] && cmdCountsObj[cmd] > 0);
    }
  },
  'voice_warrior': {
    name: '🎤 Voice Warrior',
    desc: 'Use /voice command',
    icon: '🎤'
  },
  'historian': {
    name: '📜 Historian',
    desc: 'Use Ctrl+R history search',
    icon: '📜'
  },
  'konami_master': {
    name: '🎮 Konami Master',
    desc: 'Trigger the Konami code',
    icon: '🎮'
  },
  'coffee_lover': {
    name: '☕ Coffee Lover',
    desc: 'Check the coffee status',
    icon: '☕'
  },
};

export function checkAchievements(cmdCount, commandCounts, aiConversation, achievements = []) {
  const newAchievements = [];

  for (const [key, achievement] of Object.entries(ACHIEVEMENTS)) {
    if (achievements.includes(key)) continue; // Already earned

    let earned = false;

    if (key === 'first_command') {
      earned = cmdCount >= 1;
    } else if (key === 'shortcut_pro') {
      earned = commandCounts['/shortcuts'] > 0;
    } else if (key === 'voice_warrior') {
      earned = commandCounts['/voice'] > 0;
    } else if (key === 'historian') {
      earned = commandCounts['/ctrl+r'] > 0 || commandCounts['ctrl+r'] > 0;
    } else if (key === 'konami_master') {
      earned = commandCounts['/konami'] > 0;
    } else if (key === 'coffee_lover') {
      earned = commandCounts['/coffee'] > 0;
    } else if (achievement.condition) {
      earned = achievement.condition(cmdCount, commandCounts, aiConversation);
    }

    if (earned) {
      newAchievements.push(key);
    }
  }

  return newAchievements;
}

export function getAchievementDisplay(key) {
  const achievement = ACHIEVEMENTS[key];
  if (!achievement) return null;
  return {
    icon: achievement.icon,
    name: achievement.name,
    desc: achievement.desc
  };
}
