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

import axios from "@/utils/axios";

import { subDays, format, addDays } from "date-fns"; // Add date-fns

const chartConfig: ChartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  failed: {
    label: "Failed",
    color: "hsl(var(--chart-2))",
  },
};

export default function FPSPerformanceChart({
  className,
}: {
  className?: string;
}) {
  const [timeRange, setTimeRange] = React.useState("90d");
  const [chartData, setChartData] = React.useState<
    { date: string; completed: number; failed: number }[]
  >([]);

  // Helper function to generate the full date range
  function generateFullDateRange(timeRange: string) {
    const days = timeRange === "90d" ? 90 : timeRange === "30d" ? 30 : 7;
    const dates = [];
    let currentDate = subDays(new Date(), days - 1); // start date

    for (let i = 0; i < days; i++) {
      dates.push(format(currentDate, "yyyy-MM-dd")); // or any desired format
      currentDate = addDays(currentDate, 1);
    }
    return dates;
  }

  // Merges your data with missing dates filled with zeros
  function fillMissingDates(
    rawData: { date: string; completed: number; failed: number }[],
    timeRange: string
  ) {
    const fullDates = generateFullDateRange(timeRange);
    const dataMap = new Map(
      rawData.map((item) => [item.date.slice(0, 10), item]) // Use only YYYY-MM-DD
    );

    return fullDates
      .map((date) => dataMap.get(date) ?? { date, completed: 0, failed: 0 })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/fps/performance-stats-chart/${timeRange}`
        );
        console.log(data);

        const filledData = fillMissingDates(data.data, timeRange);
        console.log("Final filled data:", filledData);
        setChartData(filledData);
      } catch (error) {
        console.error("Failed to fetch FPS performance stats:", error);
      }
    }
    fetchData();
  }, [timeRange]);

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
          <AreaChart data={chartData}>
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
              dataKey="completed"
              type="natural"
              fill="url(#fillCompleted)"
              stroke="var(--color-completed)"
              stackId="a"
            />
            <Area
              dataKey="failed"
              type="natural"
              fill="url(#fillFailed)"
              stroke="var(--color-failed)"
              stackId="a"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
