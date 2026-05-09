export type Scores = Record<string, number>;

export function calculateResult(scores: Scores): string {
  const maxPts: Record<string, number> = {
    Ni: 8, Ne: 8, Ti: 8, Te: 8, Fi: 4, Fe: 4, Si: 4, Se: 4
  };

  const normalized: Record<string, number> = {};
  Object.keys(maxPts).forEach(fn => {
    normalized[fn] = (scores[fn] || 0) / maxPts[fn];
  });

  const avg = (...fns: string[]) => fns.reduce((sum, fn) => sum + (normalized[fn] || 0), 0) / fns.length;

  // ALGO 1 - Axis-based
  const isI1 = avg("Ni", "Ti", "Fi", "Si") >= avg("Ne", "Te", "Fe", "Se");
  const isN1 = avg("Ni", "Ne") >= avg("Si", "Se");
  const isT1 = avg("Ti", "Te") >= avg("Fi", "Fe");
  const isJ1 = isT1 ? (normalized.Te >= normalized.Ti) : (normalized.Fe >= normalized.Fi);
  const type1 = `${isI1 ? 'I' : 'E'}${isN1 ? 'N' : 'S'}${isT1 ? 'T' : 'F'}${isJ1 ? 'J' : 'P'}`;

  // ALGO 2 - Dominant function
  const dominant = Object.entries(normalized).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  const domMap: Record<string, string[]> = {
    Ni: ['I', 'N', 'J'], Ne: ['E', 'N', 'P'], Ti: ['I', 'T', 'P'], Te: ['E', 'T', 'J'],
    Fi: ['I', 'F', 'P'], Fe: ['E', 'F', 'J'], Si: ['I', 'S', 'J'], Se: ['E', 'S', 'P']
  };
  const base2 = domMap[dominant];
  const type2 = `${base2[0]}${base2[1]}${base2[2]}${base2[2] === 'J' || base2[2] === 'P' ? base2[2] : (isJ1 ? 'J' : 'P')}`;
  // Correcting type2 construction
  const type2Final = `${base2[0]}${base2[1]}${base2[2]}${domMap[dominant][2]}`;

  // ALGO 3 - Myers Letters
  const isI3 = avg("Ni", "Si") >= avg("Ne", "Se");
  const isN3 = avg("Ni", "Ne") >= avg("Si", "Se");
  const isT3 = avg("Ti", "Te") >= avg("Fi", "Fe");
  const isJ3 = avg("Te", "Fe") >= avg("Ti", "Fi");
  const type3 = `${isI3 ? 'I' : 'E'}${isN3 ? 'N' : 'S'}${isT3 ? 'T' : 'F'}${isJ3 ? 'J' : 'P'}`;

  // Majority Vote
  const votes: Record<string, number> = {};
  [type1, type2Final, type3].forEach(t => votes[t] = (votes[t] || 0) + 1);
  const winner = Object.entries(votes).reduce((a, b) => a[1] >= b[1] ? a : b)[0];

  return winner;
}

export function mbtiToPersonality(mbti: string): string {
  const map: Record<string, string> = {
    ISTJ: "BUCK",
    ISFJ: "BUCK",
    INFP: "SLICK",
    ISFP: "SLICK",
    ESFP: "JOLLY",
    ESTP: "JOLLY",
    ENTJ: "SNIP",
    ENTP: "SNIP",
    ESFJ: "HOPE",
    ENFJ: "HOPE",
    INTP: "CENTI",
    INTJ: "CENTI",
    INFJ: "BONDY",
    ENFP: "BONDY",
    ESTJ: "TRIMM",
    ISTP: "TRIMM"
  };
  return map[mbti] || "BONDY";
}
