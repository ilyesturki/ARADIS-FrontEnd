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

import { useEffect, useMemo, useState } from "react";

import axios from "@/utils/axios";

const data = [
  { month: "Jan", scanned: 0, unscanned: 0 },
  { month: "Feb", scanned: 0, unscanned: 0 },
  { month: "Mar", scanned: 0, unscanned: 0 },
  { month: "Apr", scanned: 0, unscanned: 0 },
  { month: "May", scanned: 0, unscanned: 0 },
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
  const [chartData, setChartData] =
    useState<{ month: string; scanned: number; unscanned: number }[]>(data);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/fps/all-qr-codes-scan-statistics`
        );
        console.log(data);
        if (data?.data && Array.isArray(data.data)) {
          setChartData(data.data); // Already formatted!
        }
      } catch (error) {
        console.error("Error fetching QR scan stats:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader className="items-center pb-4 text-center">
        <CardTitle className="text-xl text-greenAccent-800">
          QR Code Scanning Insights
        </CardTitle>
        <CardDescription className="text-xs font-semibold text-grayscale-500 text-opacity-50">
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
