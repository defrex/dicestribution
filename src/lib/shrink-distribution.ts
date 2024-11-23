import { RollDistribution } from "./calc-distribution";

export function simplifyDistribution(
  distribution: RollDistribution,
  maxBuckets: number
): RollDistribution {
  const values = Object.keys(distribution).map(Number);
  if (values.length <= maxBuckets) return distribution;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const bucketSize = (max - min) / (maxBuckets - 1);

  const simplified: RollDistribution = {};

  // Initialize buckets with 0 probability
  for (let i = 0; i < maxBuckets; i++) {
    const bucketValue = Math.round(min + i * bucketSize);
    simplified[bucketValue] = 0;
  }

  // Distribute probabilities into nearest buckets
  for (const [value, probability] of Object.entries(distribution)) {
    const numValue = Number(value);
    const bucketIndex = Math.round((numValue - min) / bucketSize);
    const bucketValue = Math.round(min + bucketIndex * bucketSize);
    simplified[bucketValue] = (simplified[bucketValue] || 0) + probability;
  }

  return simplified;
}
