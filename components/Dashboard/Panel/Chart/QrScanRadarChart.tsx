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

// const chartData = [
//   { month: "Jan", scanned: 320, unscanned: 140 },
//   { month: "Feb", scanned: 450, unscanned: 180 },
//   { month: "Mar", scanned: 390, unscanned: 250 },
//   { month: "Apr", scanned: 220, unscanned: 440 },
//   { month: "May", scanned: 410, unscanned: 110 },
//   { month: "Jun", scanned: 430, unscanned: 310 },
// ];

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
  const [chartData, setChartData] = useState<
    { month: string; scanned: number; unscanned: number }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/fps/all-qr-codes-scan-statistics`
        );

        // Get last 5 months (YYYY-MM format)
        const lastFiveMonths = Array.from({ length: 5 }, (_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          return date.toISOString().slice(0, 7);
        }).reverse(); // Keep chronological order

        const apiData: Record<
          string,
          { month: string; scanned: number; unscanned: number }
        > = {};

        if (data?.data && Array.isArray(data.data)) {
          data.data.forEach(
            (e: { month: string; scanned: number; unscanned: number }) => {
              apiData[e.month] = e; // Store fetched data in an object for quick lookup
            }
          );
        }

        // Ensure all last 5 months are present with default values if missing
        const formattedData = lastFiveMonths.map((month) => ({
          month,
          scanned: apiData[month]?.scanned || 0,
          unscanned: apiData[month]?.unscanned || 0,
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching QR scan stats:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader className="items-center pb-4 text-center">
        <CardTitle className="text-xl text-greenAccent-900">
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
