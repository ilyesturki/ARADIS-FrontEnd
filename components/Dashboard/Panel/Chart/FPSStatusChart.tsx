"use client";

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

import { useEffect, useMemo, useState } from "react";

import axios from "@/utils/axios";
import { useTranslations } from "next-intl";

// const data = [
//   { status: "Completed", count: 155, fill: "hsl(var(--chart-5))" },
//   { status: "Failed", count: 70, fill: "hsl(var(--chart-2))" },
//   { status: "Pending", count: 110, fill: "hsl(var(--chart-1))" },
// ];

const chartConfig = {
  inProgress: {
    label: "In Progress",
    color: "hsl(var(--chart-1))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-5))",
  },
  failed: {
    label: "Failed",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function FPSStatusChart() {
  const t = useTranslations("FpssPanelPage.charts.fpsStatusOverview");
  const [chartData, setChartData] = useState({
    inProgress: 0,
    completed: 0,
    failed: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/fps/status-overview-chart`
        );
        console.log(data);
        setChartData({
          inProgress: data.data.inProgress,
          completed: data.data.completed,
          failed: data.data.failed,
          total: data.data.total,
        });
      } catch (error) {
        console.error("Error retrieving FPS status data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 text-center">
        <CardTitle className="text-xl text-greenAccent-900">
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
                  status: "inProgress",
                  count: chartData.inProgress,
                  fill: "var(--color-inProgress)",
                },
                {
                  status: "Completed",
                  count: chartData.completed,
                  fill: "var(--color-completed)",
                },
                {
                  status: "Failed",
                  count: chartData.failed,
                  fill: "var(--color-failed)",
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
                          className="fill-greenAccent-900 text-[28px] font-bold"
                        >
                          {chartData.total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-grayscale-500 font-medium"
                        >
                          FPS
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
