"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calcDistribution, DieCount, DieType } from "@/lib/calc-distribution";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { useCallback, useState } from "react";
import { DistributionBarChart } from "./distribution-chart";

const defaultDieCount: DieCount = {
  4: 0,
  6: 0,
  8: 0,
  10: 0,
  12: 0,
  20: 0,
};

export function Dicestribution() {
  const [diceRolls, setDiceRolls] = useState<DieCount>(defaultDieCount);

  const rollDie = useCallback((dieType: DieType) => {
    setDiceRolls((prevRolls) => ({
      ...prevRolls,
      [dieType]: (prevRolls[dieType] || 0) + 1,
    }));
  }, []);

  const resetRolls = useCallback(() => {
    setDiceRolls(defaultDieCount);
  }, []);

  const distribution = calcDistribution(diceRolls);

  const diceTypes: DieType[] = [4, 6, 8, 10, 12, 20];

  const rollDisplay = Object.entries(diceRolls)
    .filter(([, count]) => count > 0)
    .map(([die, count]) => `${count}d${die}`)
    .join(" + ");

  return (
    <div
      className={cn(
        "min-h-screen",
        "flex",
        "items-end",
        "md:items-center",
        "justify-center",
        "p-4",
        "bg-gray-900"
      )}
    >
      <Card
        className={cn(
          "w-full",
          "max-w-4xl",
          "mx-auto",
          "bg-gray-800",
          "border-gray-700"
        )}
      >
        <CardHeader>
          <CardTitle
            className={cn("text-3xl", "font-bold", "text-center", "text-white")}
          >
            Dicestribution
          </CardTitle>
        </CardHeader>
        <CardContent
          className={cn("space-y-6", "flex", "flex-col", "md:gap-12")}
        >
          <div
            className={cn(
              "rounded-md",
              "flex",
              "items-center",
              "justify-center",
              "text-white",
              "order-1",
              "md:order-3"
            )}
          >
            <DistributionBarChart distribution={distribution} />
          </div>

          <div
            className={cn(
              "flex",
              "flex-col",
              "justify-center",
              "items-center",
              "gap-4",
              "order-2"
            )}
          >
            <div
              className={cn(
                "relative",
                "flex-1",
                "w-full",
                "md:w-1/2",
                "order-2",
                "md:order-1"
              )}
            >
              <div
                className={cn(
                  "text-lg",
                  "font-medium",
                  "p-4",
                  "bg-gray-700",
                  "rounded-md",
                  "min-h-[3rem]",
                  "flex",
                  "items-center",
                  "justify-center",
                  "text-white",
                  "pr-12"
                )}
                aria-live="polite"
              >
                {rollDisplay || "Roll some dice!"}
              </div>
              <Button
                onClick={resetRolls}
                className={cn(
                  "absolute",
                  "right-2",
                  "top-1/2",
                  "transform",
                  "-translate-y-1/2",
                  "bg-transparent",
                  "hover:bg-gray-600",
                  "text-white",
                  "p-2",
                  "rounded-full"
                )}
                aria-label="Reset dice rolls"
              >
                <RefreshCw className={cn("h-5", "w-5")} />
              </Button>
            </div>

            <div
              className={cn(
                "flex",
                "flex-wrap",
                "gap-2",
                "w-full",
                "md:w-1/2",
                "order-3",
                "md:order-2"
              )}
            >
              {diceTypes.map((dieType) => (
                <Button
                  key={dieType}
                  onClick={() => rollDie(dieType)}
                  className={cn(
                    "flex-1",
                    "min-w-[60px]",
                    "bg-pink-500",
                    "hover:bg-pink-600",
                    "text-white"
                  )}
                >
                  d{dieType}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
