// Levenshtein distance for fuzzy matching
export function levenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

export function findSuggestion(input, allCommands) {
  const cleaned = input.toLowerCase().trim();
  if (!cleaned) return null;

  const candidates = allCommands.map(cmd => ({
    cmd,
    distance: levenshteinDistance(cleaned, cmd.toLowerCase())
  })).filter(x => x.distance < 4 && x.distance > 0);

  if (candidates.length === 0) return null;
  candidates.sort((a, b) => a.distance - b.distance);
  return candidates[0].cmd;
}
