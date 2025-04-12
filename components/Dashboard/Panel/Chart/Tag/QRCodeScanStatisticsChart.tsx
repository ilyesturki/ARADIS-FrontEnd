"use client";

import * as React from "react";
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
import { useAppSelector } from "@/redux/hooks";
import { useTranslations } from "next-intl";

const chartConfig: ChartConfig = {
  scans: { label: "Total Scans" },
  scanned: { label: "Scanned", color: "hsl(var(--chart-1))" },
  unscanned: { label: "Unscanned", color: "hsl(var(--chart-2))" },
};

export default function QRCodeScanStatisticsChart() {
  const t = useTranslations("TagsPanelPage.TagPanel.charts.qrScanStatistics");
  const tagId = useAppSelector((state) => state.tags.tag?.tagId);
  const [chartData, setChartData] = useState({
    total: 0,
    scanned: 0,
    unscanned: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!tagId) return;
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/tag/qr-code-scan-statistics/${tagId}`
        );

        setChartData({
          total: data.data.total,
          scanned: data.data.scanned,
          unscanned: data.data.unScanned,
        });
      } catch (error) {
        console.error("Error fetching QR Code statistics:", error);
      }
    };

    fetchData();
  }, [tagId]);

  const scannedPercentage = useMemo(() => {
    return chartData.total > 0
      ? (chartData.scanned / chartData.total) * 100
      : 0;
  }, [chartData]);

  return (
    <Card className="max-sm:order-1 max-lg:-order-1 flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-[15px] text-greenAccent-900">
          {t("title")}
        </CardTitle>
        <CardDescription className="text-[11px] font-semibold text-grayscale-500 text-opacity-50">
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
                  title: t("labels.scanned"),
                  scanCount: chartData.scanned,
                  fill: "var(--color-scanned)",
                },
                {
                  title: t("labels.unscanned"),
                  scanCount: chartData.unscanned,
                  fill: "var(--color-unscanned)",
                },
              ]}
              dataKey="scanCount"
              nameKey="title"
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
                          {scannedPercentage.toFixed(1)}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-grayscale-500 font-medium"
                        >
                          {t("labels.scanned")}
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
      <CardFooter>
        <div className="flex justify-center w-full text-center leading-relaxed text-sm font-medium text-grayscale-500">
          {t("footerDescription", {
            scanned: chartData.scanned,
            unscanned: chartData.unscanned,
            total: chartData.total,
          })}
        </div>
      </CardFooter>
    </Card>
  );
}
