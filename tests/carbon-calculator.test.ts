import {
  calculateCarbonOffset,
  calculateCarbonScore,
  getActivityUnit,
  getActivityDisplayName,
  formatCarbonOffset,
  getScoreLabel,
  getScoreColor,
} from '../lib/utils/carbon-calculator';

describe('Carbon Calculator Utilities', () => {
  describe('calculateCarbonOffset', () => {
    test('calculates correct offset for cycling', () => {
      expect(calculateCarbonOffset('cycling', 10)).toBe(2.1);
    });

    test('calculates correct offset for public transport', () => {
      expect(calculateCarbonOffset('public_transport', 10)).toBe(1.4);
    });

    test('calculates correct offset for recycling', () => {
      expect(calculateCarbonOffset('recycling', 10)).toBe(4.5);
    });

    test('calculates correct offset for energy saving', () => {
      expect(calculateCarbonOffset('energy_saving', 10)).toBe(5);
    });

    test('calculates correct offset for plant-based meal', () => {
      expect(calculateCarbonOffset('plant_based_meal', 2)).toBe(5);
    });

    test('calculates correct offset for water conservation', () => {
      expect(calculateCarbonOffset('water_conservation', 1000)).toBe(0.3);
    });

    test('calculates correct offset for sustainable shopping', () => {
      expect(calculateCarbonOffset('sustainable_shopping', 2)).toBe(3);
    });

    test('throws error for negative or zero amounts', () => {
      expect(() => calculateCarbonOffset('cycling', 0)).toThrow();
      expect(() => calculateCarbonOffset('cycling', -5)).toThrow();
    });

    test('throws error for unknown activity types', () => {
      expect(() => calculateCarbonOffset('unknown_type' as any, 10)).toThrow();
    });
  });

  describe('calculateCarbonScore', () => {
    test('returns score within 300 to 850 range', () => {
      expect(calculateCarbonScore(0)).toBe(300);
      expect(calculateCarbonScore(100000)).toBe(850);
    });

    test('calculates correct proportional score', () => {
      // 5000 offset with 10000 baseline is 50% offset
      // 300 + 50 * 5.5 = 300 + 275 = 575
      expect(calculateCarbonScore(5000, 10000)).toBe(575);
    });
  });

  describe('getActivityUnit', () => {
    test('returns correct unit for activity types', () => {
      expect(getActivityUnit('cycling')).toBe('km');
      expect(getActivityUnit('recycling')).toBe('items');
      expect(getActivityUnit('energy_saving')).toBe('kWh');
    });
  });

  describe('getActivityDisplayName', () => {
    test('returns display name for activities', () => {
      expect(getActivityDisplayName('plant_based_meal')).toBe('Plant-Based Meal');
      expect(getActivityDisplayName('water_conservation')).toBe('Water Conservation');
    });
  });

  describe('formatCarbonOffset', () => {
    test('formats smaller values in kg', () => {
      expect(formatCarbonOffset(15.5)).toBe('15.50 kg CO₂');
    });

    test('formats larger values in tons', () => {
      expect(formatCarbonOffset(1500)).toBe('1.50 tons CO₂');
    });
  });

  describe('getScoreLabel', () => {
    test('returns correct label based on score', () => {
      expect(getScoreLabel(800)).toBe('Excellent');
      expect(getScoreLabel(700)).toBe('Great');
      expect(getScoreLabel(600)).toBe('Good');
      expect(getScoreLabel(500)).toBe('Fair');
      expect(getScoreLabel(400)).toBe('Needs Improvement');
    });
  });

  describe('getScoreColor', () => {
    test('returns correct Tailwind color class based on score', () => {
      expect(getScoreColor(800)).toBe('text-primary-500');
      expect(getScoreColor(700)).toBe('text-primary-400');
      expect(getScoreColor(600)).toBe('text-yellow-500');
      expect(getScoreColor(500)).toBe('text-orange-500');
      expect(getScoreColor(400)).toBe('text-danger-500');
    });
  });
});
