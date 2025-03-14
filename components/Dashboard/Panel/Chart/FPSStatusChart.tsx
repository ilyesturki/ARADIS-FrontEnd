"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

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
const fpsData = [
  { status: "Completed", count: 155, fill: "hsl(var(--chart-5))" },
  { status: "Failed", count: 70, fill: "hsl(var(--chart-2))" },
  { status: "Pending", count: 110, fill: "hsl(var(--chart-1))" },
];

const chartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-5))",
  },
  failed: {
    label: "Failed",
    color: "hsl(var(--chart-2))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function FPSStatusChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 text-center">
        <CardTitle className="text-xl text-greenAccent-900">
          FPS Status Overview
        </CardTitle>
        <CardDescription className="text-sm font-semibold text-grayscale-500 text-opacity-60">
          Tracking FPS resolutions
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 pt-2">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-1 h-[240px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={fpsData} dataKey="count" label nameKey="status" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-sm text-center text-muted-foreground">
        Insights into FPS performance trends and resolution progress.
      </CardFooter>
    </Card>
  );
}
