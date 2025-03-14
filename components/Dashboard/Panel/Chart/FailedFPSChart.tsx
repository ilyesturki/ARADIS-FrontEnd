"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

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
  { month: "Jan", failedFPS: 120 },
  { month: "Feb", failedFPS: 250 },
  { month: "Mar", failedFPS: 180 },
  { month: "Apr", failedFPS: 90 },
  { month: "May", failedFPS: 200 },
  { month: "Jun", failedFPS: 220 },
];

const chartConfig = {
  failedFPS: {
    label: "Failed FPS",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function FailedFPSChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-xl text-greenAccent-900">
          Failed FPS Overview
        </CardTitle>
        <CardDescription className="text-center text-sm font-semibold text-grayscale-500 text-opacity-60">
          Monthly FPS completion trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[220px]"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="failedFPS"
              type="natural"
              stroke="var(--color-failedFPS)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-failedFPS)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="w-full leading-none text-muted-foreground text-center">
          Tracking failed FPS only
        </div>
      </CardFooter>
    </Card>
  );
}
