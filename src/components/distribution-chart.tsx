import { simplifyDistribution } from "@/lib/shrink-distribution";
import { cn } from "@/lib/utils";

interface DistributionBarChartProps {
  distribution: Record<number, number>;
}

export function DistributionBarChart({
  distribution,
}: DistributionBarChartProps) {
  const barsDistribution = simplifyDistribution(
    distribution,
    Math.min(Object.values(distribution).length, 64),
    4
  );
  const bars = Object.keys(barsDistribution)
    .map(Number)
    .sort((a, b) => a - b);

  const xLabelsDistribution = simplifyDistribution(distribution, 12);
  const xLabels = Object.keys(xLabelsDistribution)
    .map(Number)
    .sort((a, b) => a - b);

  // Determine the maximum probability for scaling
  const maxProbability =
    Math.max(...Object.values(barsDistribution), 0.0001) * 1.1;

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

      <div className="flex-grow flex-col w-full">
        <div
          className="flex-grow grid justify-end h-full divide-x divide-x-dashed divide-gray-700"
          style={{
            gridTemplateColumns: `repeat(${bars.length}, 1fr)`,
          }}
        >
          {bars.map((result) => {
            const probability = barsDistribution[result];
            const heightPercentage = (probability / maxProbability) * 100;

            return (
              <div key={result}>
                <div
                  className="bg-gray-800 transition-[height] duration-700 ease-out"
                  style={{
                    height: `${100 - heightPercentage}%`,
                  }}
                />
                <div
                  className={cn("transition-[height] duration-700 ease-out", {
                    "bg-pink-500": result > 0,
                  })}
                  style={{
                    height: `${heightPercentage}%`,
                  }}
                />
              </div>
            );
          })}
        </div>

        <div
          className="grid justify-end"
          style={{
            gridTemplateColumns: `repeat(${xLabels.length}, 1fr)`,
          }}
        >
          {xLabels.map((result) => (
            <div key={result}>
              {/* X-axis label */}
              <div className="text-center pt-1 transition-opacity duration-500 delay-500">
                {result}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
