export type DieType = 4 | 6 | 8 | 10 | 12 | 20;
export type DieCount = Record<DieType, number>;
export type RollDistribution = Record<number, number>;

export function calcDistribution(diceCount: DieCount): RollDistribution {
  let distribution: RollDistribution = { 0: 1 }; // Start with 100% chance of 0

  // Process each die type separately
  for (const [dieType, count] of Object.entries(diceCount)) {
    const sides = parseInt(dieType);

    // Process each die of this type
    for (let i = 0; i < count; i++) {
      const newDist: RollDistribution = {};

      // For each existing sum in our distribution
      for (const [sum, prob] of Object.entries(distribution)) {
        const currentSum = parseInt(sum);

        // Add probability for each possible roll of the current die
        for (let roll = 1; roll <= sides; roll++) {
          const newSum = currentSum + roll;
          newDist[newSum] = (newDist[newSum] || 0) + prob / sides;
        }
      }

      distribution = newDist;
    }
  }

  return distribution;
}
