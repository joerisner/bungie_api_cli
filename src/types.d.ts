interface Character {
  baseCharacterLevel: number;
  characterId: string;
  classHash: number;
  classType: number;
  dateLastPlayed?: string;
  emblemBackgroundPath: string;
  emblemColor: {
    alpha?: number;
    blue?: number;
    green?: number;
    red?: number;
  };
  emblemHash: number;
  emblemPath: string;
  genderHash: number;
  genderType: number;
  levelProgression: {
    currentProgress: number;
    dailyLimit: number;
    dailyProgress: number;
    level: number;
    levelCap: number;
    nextLevelAt: number;
    progressionHash: number;
    progressToNextLevel: number;
    stepIndex: number;
    weeklyLimit: number;
    weeklyProgress: number;
  };
  light: number;
  membershipId: string;
  membershipType: number;
  minutesPlayedThisSession: string;
  minutesPlayedTotal: string;
  percentToNextLevel: number;
  raceHash: number;
  raceType: 0 | 1 | 2;
  stats?: Record<string, unknown>;
  titleRecordHash?: number;
}
