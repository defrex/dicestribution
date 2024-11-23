import { simplifyDistribution } from "@/lib/shrink-distribution";
import { cn } from "@/lib/utils";

interface DistributionBarChartProps {
  distribution: Record<number, number>;
}

export function DistributionBarChart({
  distribution,
}: DistributionBarChartProps) {
  const simplifiedDistribution = simplifyDistribution(distribution, 20);

  // Extract and sort the keys (results)
  const results = Object.keys(simplifiedDistribution)
    .map(Number)
    .sort((a, b) => a - b);

  const probabilities = results.map((result) => simplifiedDistribution[result]);

  // Determine the maximum probability for scaling
  const maxProbability = Math.max(...probabilities, 0.0001) * 1.1;

  return (
    <div className="flex flex-row min-h-48 items-stretch w-full pb-6">
      {/* Y-axis labels */}
      <div className="flex flex-col justify-between items-end pr-2">
        {[...Array(5)].map((_, i) => {
          const value = ((maxProbability / 4) * (4 - i) * 100).toFixed(0);
          return (
            <div key={i} className="text-white text-xs translate-y-1/2">
              {value}%
            </div>
          );
        })}
      </div>

      {/* Chart container */}
      <div
        className="flex-grow grid justify-end divide-x divide-x-dashed divide-gray-700"
        style={{
          gridTemplateColumns: `repeat(${results.length}, 1fr)`,
        }}
      >
        {/* Bars */}
        {results.map((result) => {
          const probability = simplifiedDistribution[result];
          const heightPercentage = (probability / maxProbability) * 100;

          return (
            <div key={result}>
              <div
                className="bg-gray-800"
                style={{
                  height: `${100 - heightPercentage}%`,
                }}
              />
              <div
                className={cn({ "bg-pink-500": result > 0 })}
                style={{
                  height: `${heightPercentage}%`,
                }}
              />

              {/* X-axis label */}
              <div className="text-center pt-1">{result}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}