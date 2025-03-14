"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const chartData = [
  { date: "2024-04-01", completed: 222, failed: 150 },
  { date: "2024-04-02", completed: 97, failed: 180 },
  { date: "2024-04-03", completed: 167, failed: 120 },
  { date: "2024-04-04", completed: 242, failed: 260 },
  { date: "2024-04-05", completed: 373, failed: 290 },
  { date: "2024-04-06", completed: 301, failed: 340 },
  { date: "2024-04-07", completed: 245, failed: 180 },
  { date: "2024-04-08", completed: 409, failed: 320 },
  { date: "2024-04-09", completed: 59, failed: 110 },
  { date: "2024-04-10", completed: 261, failed: 190 },
  { date: "2024-04-11", completed: 327, failed: 350 },
  { date: "2024-04-12", completed: 292, failed: 210 },
  { date: "2024-04-13", completed: 342, failed: 380 },
  { date: "2024-04-14", completed: 137, failed: 220 },
  { date: "2024-04-15", completed: 120, failed: 170 },
  { date: "2024-04-16", completed: 138, failed: 190 },
  { date: "2024-04-17", completed: 446, failed: 360 },
  { date: "2024-04-18", completed: 364, failed: 410 },
  { date: "2024-04-19", completed: 243, failed: 180 },
  { date: "2024-04-20", completed: 89, failed: 150 },
  { date: "2024-04-21", completed: 137, failed: 200 },
  { date: "2024-04-22", completed: 224, failed: 170 },
  { date: "2024-04-23", completed: 138, failed: 230 },
  { date: "2024-04-24", completed: 387, failed: 290 },
  { date: "2024-04-25", completed: 215, failed: 250 },
  { date: "2024-04-26", completed: 75, failed: 130 },
  { date: "2024-04-27", completed: 383, failed: 420 },
  { date: "2024-04-28", completed: 122, failed: 180 },
  { date: "2024-04-29", completed: 315, failed: 240 },
  { date: "2024-04-30", completed: 454, failed: 380 },
  { date: "2024-05-01", completed: 165, failed: 220 },
  { date: "2024-05-02", completed: 293, failed: 310 },
  { date: "2024-05-03", completed: 247, failed: 190 },
  { date: "2024-05-04", completed: 385, failed: 420 },
  { date: "2024-05-05", completed: 481, failed: 390 },
  { date: "2024-05-06", completed: 498, failed: 520 },
  { date: "2024-05-07", completed: 388, failed: 300 },
  { date: "2024-05-08", completed: 149, failed: 210 },
  { date: "2024-05-09", completed: 227, failed: 180 },
  { date: "2024-05-10", completed: 293, failed: 330 },
  { date: "2024-05-11", completed: 335, failed: 270 },
  { date: "2024-05-12", completed: 197, failed: 240 },
  { date: "2024-05-13", completed: 197, failed: 160 },
  { date: "2024-05-14", completed: 448, failed: 490 },
  { date: "2024-05-15", completed: 473, failed: 380 },
  { date: "2024-05-16", completed: 338, failed: 400 },
  { date: "2024-05-17", completed: 499, failed: 420 },
  { date: "2024-05-18", completed: 315, failed: 350 },
  { date: "2024-05-19", completed: 235, failed: 180 },
  { date: "2024-05-20", completed: 177, failed: 230 },
  { date: "2024-05-21", completed: 82, failed: 140 },
  { date: "2024-05-22", completed: 81, failed: 120 },
  { date: "2024-05-23", completed: 252, failed: 290 },
  { date: "2024-05-24", completed: 294, failed: 220 },
  { date: "2024-05-25", completed: 201, failed: 250 },
  { date: "2024-05-26", completed: 213, failed: 170 },
  { date: "2024-05-27", completed: 420, failed: 460 },
  { date: "2024-05-28", completed: 233, failed: 190 },
  { date: "2024-05-29", completed: 78, failed: 130 },
  { date: "2024-05-30", completed: 340, failed: 280 },
  { date: "2024-05-31", completed: 178, failed: 230 },
  { date: "2024-06-01", completed: 178, failed: 200 },
  { date: "2024-06-02", completed: 470, failed: 410 },
  { date: "2024-06-03", completed: 103, failed: 160 },
  { date: "2024-06-04", completed: 439, failed: 380 },
  { date: "2024-06-05", completed: 88, failed: 140 },
  { date: "2024-06-06", completed: 294, failed: 250 },
  { date: "2024-06-07", completed: 323, failed: 370 },
  { date: "2024-06-08", completed: 385, failed: 320 },
  { date: "2024-06-09", completed: 438, failed: 480 },
  { date: "2024-06-10", completed: 155, failed: 200 },
  { date: "2024-06-11", completed: 92, failed: 150 },
  { date: "2024-06-12", completed: 492, failed: 420 },
  { date: "2024-06-13", completed: 81, failed: 130 },
  { date: "2024-06-14", completed: 426, failed: 380 },
  { date: "2024-06-15", completed: 307, failed: 350 },
  { date: "2024-06-16", completed: 371, failed: 310 },
  { date: "2024-06-17", completed: 475, failed: 520 },
  { date: "2024-06-18", completed: 107, failed: 170 },
  { date: "2024-06-19", completed: 341, failed: 290 },
  { date: "2024-06-20", completed: 408, failed: 450 },
  { date: "2024-06-21", completed: 169, failed: 210 },
  { date: "2024-06-22", completed: 317, failed: 270 },
  { date: "2024-06-23", completed: 480, failed: 530 },
  { date: "2024-06-24", completed: 132, failed: 180 },
  { date: "2024-06-25", completed: 141, failed: 190 },
  { date: "2024-06-26", completed: 434, failed: 380 },
  { date: "2024-06-27", completed: 448, failed: 490 },
  { date: "2024-06-28", completed: 149, failed: 200 },
  { date: "2024-06-29", completed: 103, failed: 160 },
  { date: "2024-06-30", completed: 446, failed: 400 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  failed: {
    label: "Failed",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function FPSPerformanceChart({ className }: { className?: string }) {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className={className}>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="text-lg text-greenAccent-900">
            FPS Performance Overview
          </CardTitle>
          <CardDescription className="text-xs font-semibold text-grayscale-500 text-opacity-60">
            Tracking completed vs. failed FPS over time
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillFailed" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-failed)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-failed)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="failed"
              type="natural"
              fill="url(#fillFailed)"
              stroke="var(--color-failed)"
              stackId="a"
            />
            <Area
              dataKey="completed"
              type="natural"
              fill="url(#fillCompleted)"
              stroke="var(--color-completed)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
