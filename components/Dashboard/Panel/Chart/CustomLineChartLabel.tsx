"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, LineProps } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Sample data with only completed FPS counts per month
const chartData = [
  { month: "Jan", completedFPS: 120 },
  { month: "Feb", completedFPS: 250 },
  { month: "Mar", completedFPS: 180 },
  { month: "Apr", completedFPS: 90 },
  { month: "May", completedFPS: 200 },
  { month: "Jun", completedFPS: 220 },
];

export default function CompletedFPSChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed FPS Per Month</CardTitle>
        <CardDescription>Tracking the number of completed FPS from Jan to Jun 2024</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, left: 10, right: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis allowDecimals={false} tickMargin={10} />
            <Tooltip content={<ChartTooltipContent indicator="line" />} />
            <Line
              type="monotone"
              dataKey="completedFPS"
              stroke="hsl(var(--chart-1))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--chart-1))", r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Displaying only completed FPS counts per month
        </div>
      </CardFooter>
    </Card>
  );
}
