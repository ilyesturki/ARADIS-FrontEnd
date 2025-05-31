"use client";

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

import { useEffect, useState } from "react";

import axios from "@/utils/axios";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/redux/hooks";


const chartConfig = {
  open: {
    label: "Open",
    color: "hsl(var(--chart-1))",
  },
  done: {
    label: "Done",
    color: "hsl(var(--chart-5))",
  },
  toDo: {
    label: "ToDo",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function TAGStatusChart() {
  const t = useTranslations("TagsPanelPage.charts.tagStatusOverview");
  const [chartData, setChartData] = useState({
    open: 0,
    done: 0,
    toDo: 0,
    total: 0,
  });

  const machine = useAppSelector((state) => state.tags.machine);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/tag/status-overview-chart?machine=${machine}`
        );
        setChartData({
          open: data.data.open,
          done: data.data.done,
          toDo: data.data.toDo,
          total: data.data.total,
        });
      } catch (error) {
        console.error("Error retrieving TAG status data:", error);
      }
    };

    fetchData();
  }, [machine]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 text-center">
        <CardTitle className="text-xl text-greenAccent-900 dark:text-grayscale-400">
          {t("title")}
        </CardTitle>
        <CardDescription className="text-xs font-semibold text-grayscale-500 text-opacity-50">
          {t("description")}
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
              data={[
                {
                  status: "open",
                  count: chartData.open,
                  fill: "var(--color-open)",
                },
                {
                  status: "Done",
                  count: chartData.done,
                  fill: "var(--color-done)",
                },
                {
                  status: "ToDo",
                  count: chartData.toDo,
                  fill: "var(--color-toDo)",
                },
              ].filter((item) => item.count)}
              dataKey="count"
              nameKey="status"
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
                          className="fill-greenAccent-900 dark:fill-greenAccent-800 text-[28px] font-bold"
                        >
                          {chartData.total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-grayscale-500 dark:fill-greenAccent-700 dark:opacity-60 font-medium"
                        >
                          TAG
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
      <CardFooter className="text-sm text-center text-muted-foreground">
        A concise snapshot of execution performance and resolution trends.
      </CardFooter>
    </Card>
  );
}
