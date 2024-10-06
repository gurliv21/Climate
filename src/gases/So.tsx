import React from 'react'
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

// SO₂ usage data from 2012 to 2024
const chartData = [
  { year: "2012", so2: 20 },
  { year: "2013", so2: 22 },
  { year: "2014", so2: 21 },
  { year: "2015", so2: 23 },
  { year: "2016", so2: 25 },
  { year: "2017", so2: 24 },
  { year: "2018", so2: 26 },
  { year: "2019", so2: 27 },
  { year: "2020", so2: 28 },
  { year: "2021", so2: 30 },
  { year: "2022", so2: 31 },
  { year: "2023", so2: 33 },
  { year: "2024", so2: 35 },
];

// Configuring the chart for SO₂ emissions
const chartConfig = {
  so2: {
    label: "SO₂ Emissions (in Gigatonnes)",
    color: "hsl(var(--chart-2))", // Change this to a suitable color for SO₂
  },
} satisfies ChartConfig;

function So() {
  return (
    <div className="dark"> {/* Adding the dark class */}
      <Card>
        <CardHeader>
          <CardTitle>SO₂ Emissions Over the Years</CardTitle>
          <CardDescription>2012 - 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value}
                tick={{ fill: "hsl(var(--foreground))" }} // Set tick color for dark theme
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="so2"
                type="natural"
                stroke="hsl(var(--chart-2))" // Color for SO₂ line
                strokeWidth={2}
                dot={{
                  fill: "hsl(var(--chart-2))", // Color for SO₂ dot
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
          <div className="flex gap-2 font-medium leading-none">
            SO₂ Emissions have increased by 6.5% in the last year{" "}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing SO₂ emissions in gigatonnes from 2012 to 2024
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default So;
