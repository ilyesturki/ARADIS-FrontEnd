"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { title: "scanned", scanCount: 380, fill: "var(--color-scanned)" },
  { title: "unscanned", scanCount: 200, fill: "var(--color-unscanned)" },
  // { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  // { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  // { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  scans: {
    label: "Total Scans",
  },
  scanned: {
    label: "Scanned",
    color: "hsl(var(--chart-1))",
  },
  unscanned: {
    label: "Unscanned",
    color: "hsl(var(--chart-2))",
  },
  // firefox: {
  //   label: "Firefox",
  //   color: "hsl(var(--chart-3))",
  // },
  // edge: {
  //   label: "Edge",
  //   color: "hsl(var(--chart-4))",
  // },
  // other: {
  //   label: "Other",
  //   color: "hsl(var(--chart-5))",
  // },
} satisfies ChartConfig;

export default function PieChartDonutwithText() {
  const scannedPercentage = React.useMemo(() => {
    return (
      (chartData[0].scanCount * 100) /
      chartData.reduce((acc, curr) => acc + curr.scanCount, 0)
    );
  }, []);

  return (
    <Card className="max-sm:order-1 max-lg:-order-1 flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-grayscale-500">
          QR Code Scan Statistics
        </CardTitle>
        <CardDescription className="text-xs font-semibold text-grayscale-500 text-opacity-50">
          Recent Activity Overview
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-1 max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="scanCount"
              nameKey="title"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {scannedPercentage.toFixed(1)}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Scanned
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-xs font-medium text-grayscale-500">
        {chartData[0].scanCount} users scanned, {chartData[1].scanCount}{" "}
        pending.
      </CardFooter>
    </Card>
  );
}
