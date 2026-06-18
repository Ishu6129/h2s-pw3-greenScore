import {
  calculateXP,
  getStreakMultiplier,
  calculateLevel,
  getXPForNextLevel,
  getXPProgress,
  formatXP,
  getLevelTitle,
  getStreakBonusXP,
} from '../lib/utils/xp-calculator';

describe('XP Calculator Utilities', () => {
  describe('calculateXP', () => {
    test('calculates base XP without streaks', () => {
      // cycling base reward is 50
      expect(calculateXP('cycling', 1)).toBe(50);
    });

    test('applies logarithmic scaling for higher amounts', () => {
      // amount 4: base 50 + floor(log2(4) * 10) = 50 + 20 = 70
      expect(calculateXP('cycling', 4)).toBe(70);
    });

    test('applies streak multiplier correctly', () => {
      // cycling amount 1, streak 7 days (multiplier 1.2): floor(50 * 1.2) = 60
      expect(calculateXP('cycling', 1, 7)).toBe(60);
    });

    test('throws error on negative or zero amounts', () => {
      expect(() => calculateXP('cycling', 0)).toThrow();
    });
  });

  describe('getStreakMultiplier', () => {
    test('returns correct multiplier based on streak days', () => {
      expect(getStreakMultiplier(0)).toBe(1.0);
      expect(getStreakMultiplier(5)).toBe(1.0);
      expect(getStreakMultiplier(7)).toBe(1.2);
      expect(getStreakMultiplier(14)).toBe(1.5);
      expect(getStreakMultiplier(30)).toBe(2.0);
      expect(getStreakMultiplier(60)).toBe(2.5);
      expect(getStreakMultiplier(90)).toBe(3.0);
      expect(getStreakMultiplier(100)).toBe(3.0);
    });
  });

  describe('calculateLevel', () => {
    test('calculates level correctly from total XP', () => {
      expect(calculateLevel(0)).toBe(0);
      expect(calculateLevel(100)).toBe(1);
      expect(calculateLevel(400)).toBe(2);
      expect(calculateLevel(900)).toBe(3);
    });
  });

  describe('getXPForNextLevel', () => {
    test('calculates next level boundary', () => {
      expect(getXPForNextLevel(0)).toBe(100);
      expect(getXPForNextLevel(1)).toBe(400);
      expect(getXPForNextLevel(2)).toBe(900);
    });
  });

  describe('getXPProgress', () => {
    test('returns correct progress information', () => {
      const progress = getXPProgress(250); // level 1 (boundary 100 to 400). progress: (150/300) = 50%
      expect(progress.level).toBe(1);
      expect(progress.currentLevelXP).toBe(150);
      expect(progress.nextLevelXP).toBe(300);
      expect(progress.progress).toBe(50);
    });
  });

  describe('formatXP', () => {
    test('formats smaller XP as is', () => {
      expect(formatXP(250)).toBe('250 XP');
    });

    test('formats thousands and millions', () => {
      expect(formatXP(1200)).toBe('1.2K XP');
      expect(formatXP(1500000)).toBe('1.5M XP');
    });
  });

  describe('getLevelTitle', () => {
    test('returns correct title based on level', () => {
      expect(getLevelTitle(1)).toBe('Eco Beginner');
      expect(getLevelTitle(6)).toBe('Green Enthusiast');
      expect(getLevelTitle(15)).toBe('Environmental Advocate');
      expect(getLevelTitle(25)).toBe('Sustainability Expert');
      expect(getLevelTitle(35)).toBe('Green Guardian');
      expect(getLevelTitle(45)).toBe('Eco Warrior');
      expect(getLevelTitle(55)).toBe('Climate Champion');
    });
  });

  describe('getStreakBonusXP', () => {
    test('returns correct bonus XP', () => {
      expect(getStreakBonusXP(0)).toBe(0);
      expect(getStreakBonusXP(5)).toBe(0);
      expect(getStreakBonusXP(7)).toBe(30);
      expect(getStreakBonusXP(14)).toBe(75);
      expect(getStreakBonusXP(30)).toBe(150);
      expect(getStreakBonusXP(60)).toBe(300);
      expect(getStreakBonusXP(90)).toBe(500);
      expect(getStreakBonusXP(100)).toBe(500);
    });
  });
});
