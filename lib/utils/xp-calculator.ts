import { ActivityType } from '@/types';

/**
 * Base XP rewards for activities
 */
export const BASE_XP_REWARDS: Record<ActivityType, number> = {
  cycling: 50,
  public_transport: 30,
  recycling: 20,
  energy_saving: 40,
  plant_based_meal: 35,
  water_conservation: 25,
  sustainable_shopping: 45,
};

/**
 * XP multipliers for streaks
 */
export const STREAK_MULTIPLIERS = {
  7: 1.2,   // 7-day streak: 20% bonus
  14: 1.5,  // 14-day streak: 50% bonus
  30: 2.0,  // 30-day streak: 100% bonus
  60: 2.5,  // 60-day streak: 150% bonus
  90: 3.0,  // 90-day streak: 200% bonus
};

/**
 * Calculate XP earned for an activity
 * @param activityType - Type of activity
 * @param amount - Amount of activity
 * @param currentStreak - User's current streak
 * @returns XP earned
 */
export function calculateXP(
  activityType: ActivityType,
  amount: number,
  currentStreak: number = 0
): number {
  if (amount <= 0) {
    throw new Error('Amount must be positive');
  }

  // Base XP
  let xp = BASE_XP_REWARDS[activityType];

  // Scale XP based on amount (diminishing returns)
  if (amount > 1) {
    xp += Math.floor(Math.log2(amount) * 10);
  }

  // Apply streak multiplier
  const multiplier = getStreakMultiplier(currentStreak);
  xp = Math.floor(xp * multiplier);

  return xp;
}

/**
 * Get streak multiplier based on current streak
 * @param streak - Current streak days
 * @returns Multiplier value
 */
export function getStreakMultiplier(streak: number): number {
  if (streak >= 90) return STREAK_MULTIPLIERS[90];
  if (streak >= 60) return STREAK_MULTIPLIERS[60];
  if (streak >= 30) return STREAK_MULTIPLIERS[30];
  if (streak >= 14) return STREAK_MULTIPLIERS[14];
  if (streak >= 7) return STREAK_MULTIPLIERS[7];
  return 1.0;
}

/**
 * Calculate level from total XP
 * @param totalXP - Total XP earned
 * @returns Current level
 */
export function calculateLevel(totalXP: number): number {
  // Level formula: level = floor(sqrt(totalXP / 100))
  return Math.floor(Math.sqrt(totalXP / 100));
}

/**
 * Calculate XP needed for next level
 * @param currentLevel - Current level
 * @returns XP needed for next level
 */
export function getXPForNextLevel(currentLevel: number): number {
  // XP needed = (level + 1)^2 * 100
  return Math.pow(currentLevel + 1, 2) * 100;
}

/**
 * Calculate XP progress to next level
 * @param totalXP - Total XP earned
 * @returns Object with current level, progress, and XP needed
 */
export function getXPProgress(totalXP: number): {
  level: number;
  currentLevelXP: number;
  nextLevelXP: number;
  progress: number;
} {
  const level = calculateLevel(totalXP);
  const currentLevelXP = Math.pow(level, 2) * 100;
  const nextLevelXP = getXPForNextLevel(level);
  const xpInCurrentLevel = totalXP - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;
  const progress = (xpInCurrentLevel / xpNeededForLevel) * 100;

  return {
    level,
    currentLevelXP: xpInCurrentLevel,
    nextLevelXP: xpNeededForLevel,
    progress: Math.min(100, Math.max(0, progress)),
  };
}

/**
 * Format XP for display
 * @param xp - XP amount
 * @returns Formatted string
 */
export function formatXP(xp: number): string {
  if (xp >= 1000000) {
    return `${(xp / 1000000).toFixed(1)}M XP`;
  }
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}K XP`;
  }
  return `${xp} XP`;
}

/**
 * Get level title based on level
 * @param level - User level
 * @returns Level title
 */
export function getLevelTitle(level: number): string {
  if (level >= 50) return 'Climate Champion';
  if (level >= 40) return 'Eco Warrior';
  if (level >= 30) return 'Green Guardian';
  if (level >= 20) return 'Sustainability Expert';
  if (level >= 10) return 'Environmental Advocate';
  if (level >= 5) return 'Green Enthusiast';
  return 'Eco Beginner';
}

/**
 * Calculate streak bonus XP
 * @param streak - Current streak
 * @returns Bonus XP for maintaining streak
 */
export function getStreakBonusXP(streak: number): number {
  if (streak >= 90) return 500;
  if (streak >= 60) return 300;
  if (streak >= 30) return 150;
  if (streak >= 14) return 75;
  if (streak >= 7) return 30;
  return 0;
}

// Made with Bob
