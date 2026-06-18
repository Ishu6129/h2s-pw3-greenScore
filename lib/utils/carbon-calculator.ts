import { ActivityType } from '@/types';

/**
 * Carbon emission factors (kg CO2 per unit)
 * Based on average values from environmental studies
 */
export const CARBON_FACTORS = {
  // Transportation (kg CO2 saved per km vs. car)
  cycling: 0.21, // Average car emits 0.21 kg CO2/km
  public_transport: 0.14, // 0.14 kg CO2 saved per km vs. car

  // Recycling (kg CO2 saved per item)
  recycling: {
    plastic: 0.5,
    paper: 0.3,
    glass: 0.2,
    metal: 0.8,
    average: 0.45,
  },

  // Energy (kg CO2 saved per kWh)
  energy_saving: 0.5, // Average grid electricity

  // Food (kg CO2 saved per meal)
  plant_based_meal: 2.5, // vs. meat-based meal

  // Water (kg CO2 saved per liter)
  water_conservation: 0.0003, // Energy for water treatment

  // Shopping (kg CO2 saved per item)
  sustainable_shopping: 1.5, // vs. new item
} as const;

/**
 * Calculate carbon offset for an activity
 * @param activityType - Type of activity
 * @param amount - Amount of activity (km, items, kWh, etc.)
 * @returns Carbon offset in kg CO2
 */
export function calculateCarbonOffset(activityType: ActivityType, amount: number): number {
  if (amount <= 0) {
    throw new Error('Amount must be positive');
  }

  let offset: number;

  switch (activityType) {
    case 'cycling':
      offset = amount * CARBON_FACTORS.cycling;
      break;
    case 'public_transport':
      offset = amount * CARBON_FACTORS.public_transport;
      break;
    case 'recycling':
      offset = amount * CARBON_FACTORS.recycling.average;
      break;
    case 'energy_saving':
      offset = amount * CARBON_FACTORS.energy_saving;
      break;
    case 'plant_based_meal':
      offset = amount * CARBON_FACTORS.plant_based_meal;
      break;
    case 'water_conservation':
      offset = amount * CARBON_FACTORS.water_conservation;
      break;
    case 'sustainable_shopping':
      offset = amount * CARBON_FACTORS.sustainable_shopping;
      break;
    default:
      throw new Error(`Unknown activity type: ${activityType}`);
  }

  return Math.round(offset * 100) / 100; // Round to 2 decimal places
}

/**
 * Calculate carbon score based on total offset and baseline
 * Score ranges from 300 (poor) to 850 (excellent)
 * @param totalOffset - Total carbon offset in kg CO2
 * @param baseline - User's baseline carbon footprint in kg CO2/year
 * @returns Carbon score (300-850)
 */
export function calculateCarbonScore(totalOffset: number, baseline: number = 10000): number {
  // Calculate percentage of baseline offset
  const percentageOffset = (totalOffset / baseline) * 100;

  // Map percentage to score (0% = 300, 100% = 850)
  const score = 300 + percentageOffset * 5.5;

  // Clamp between 300 and 850
  return Math.min(850, Math.max(300, Math.round(score)));
}

/**
 * Get unit for activity type
 * @param activityType - Type of activity
 * @returns Unit string
 */
export function getActivityUnit(activityType: ActivityType): string {
  const units: Record<ActivityType, string> = {
    cycling: 'km',
    public_transport: 'km',
    recycling: 'items',
    energy_saving: 'kWh',
    plant_based_meal: 'meals',
    water_conservation: 'liters',
    sustainable_shopping: 'items',
  };

  return units[activityType];
}

/**
 * Get display name for activity type
 * @param activityType - Type of activity
 * @returns Display name
 */
export function getActivityDisplayName(activityType: ActivityType): string {
  const names: Record<ActivityType, string> = {
    cycling: 'Cycling',
    public_transport: 'Public Transport',
    recycling: 'Recycling',
    energy_saving: 'Energy Saving',
    plant_based_meal: 'Plant-Based Meal',
    water_conservation: 'Water Conservation',
    sustainable_shopping: 'Sustainable Shopping',
  };

  return names[activityType];
}

/**
 * Format carbon offset for display
 * @param offset - Carbon offset in kg CO2
 * @returns Formatted string
 */
export function formatCarbonOffset(offset: number): string {
  if (offset >= 1000) {
    return `${(offset / 1000).toFixed(2)} tons CO₂`;
  }
  return `${offset.toFixed(2)} kg CO₂`;
}

/**
 * Get score color based on carbon score
 * @param score - Carbon score (300-850)
 * @returns Tailwind color class
 */
export function getScoreColor(score: number): string {
  if (score >= 750) return 'text-primary-500';
  if (score >= 650) return 'text-primary-400';
  if (score >= 550) return 'text-yellow-500';
  if (score >= 450) return 'text-orange-500';
  return 'text-danger-500';
}

/**
 * Get score label based on carbon score
 * @param score - Carbon score (300-850)
 * @returns Score label
 */
export function getScoreLabel(score: number): string {
  if (score >= 750) return 'Excellent';
  if (score >= 650) return 'Great';
  if (score >= 550) return 'Good';
  if (score >= 450) return 'Fair';
  return 'Needs Improvement';
}

// Made with Bob
