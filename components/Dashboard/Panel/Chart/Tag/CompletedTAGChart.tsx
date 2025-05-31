"use client";

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

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/redux/hooks";

const data = [
  { month: "Jan", tagCount: 0 },
  { month: "Feb", tagCount: 0 },
  { month: "Mar", tagCount: 0 },
  { month: "Apr", tagCount: 0 },
  { month: "May", tagCount: 0 },
  { month: "Jun", tagCount: 0 },
];

const chartConfig: ChartConfig = {
  completedTAG: {
    label: "Completed TAG",
    color: "hsl(var(--chart-5))",
  },
};

export default function CompletedTAGChart() {
  const t = useTranslations("TagsPanelPage.charts.completedTAG");
  const [chartData, setChartData] =
    useState<{ month: string; tagCount: number }[]>(data);

    const machine = useAppSelector((state) => state.tags.machine);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/tag/completed-tag-chart?machine=${machine}`
        );
        setChartData(data.data);
      } catch (error) {
        console.error("Failed to fetch completed TAG stats:", error);
      }
    }
    fetchData();
  }, [machine]);

  return (
    <Card>
      <CardHeader className="items-center pb-4 text-center">
        <CardTitle className="text-xl text-greenAccent-900  dark:text-grayscale-400">
          {t("title")}
        </CardTitle>
        <CardDescription className="text-xs font-semibold text-grayscale-500 text-opacity-50">
          {t("description")}
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
              dataKey="tagCount"
              type="natural"
              stroke="var(--color-completedTAG)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-completedTAG)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground dark:fill-neutral-50"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="w-full leading-none text-muted-foreground text-center">
          {t("footerDescription")}
        </div>
      </CardFooter>
    </Card>
  );
}
