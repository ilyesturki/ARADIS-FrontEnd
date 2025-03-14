"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "Jan", scanned: 320, unscanned: 140 },
  { month: "Feb", scanned: 450, unscanned: 180 },
  { month: "Mar", scanned: 390, unscanned: 250 },
  { month: "Apr", scanned: 220, unscanned: 440 },
  { month: "May", scanned: 410, unscanned: 110 },
  { month: "Jun", scanned: 430, unscanned: 310 },
];

const chartConfig = {
  scanned: {
    label: "Scanned",
    color: "hsl(var(--chart-1))",
  },
  unscanned: {
    label: "Unscanned",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function QrScanRadarChart() {
  return (
    <Card>
      <CardHeader className=" pb-4">
        <CardTitle className="text-center text-xl text-greenAccent-900">
          QR Code Scanning Insights
        </CardTitle>
        <CardDescription className="text-center text-sm font-semibold text-grayscale-500 text-opacity-60">
          Scanned vs. unscanned QR trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[220px]"
        >
          <RadarChart
            data={chartData}
            margin={{
              top: -40,
              bottom: -10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="scanned"
              fill="var(--color-scanned)"
              fillOpacity={0.6}
            />
            <Radar dataKey="unscanned" fill="var(--color-unscanned)" />
            <ChartLegend className="mt-8" content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 pt-4 text-sm">
        <div className="leading-none text-muted-foreground">
          Tracking QR scan completion rates
        </div>
      </CardFooter>
    </Card>
  );
}
