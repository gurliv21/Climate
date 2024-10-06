import React from 'react';
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

// NOₓ usage data from 2012 to 2024
const chartData = [
  { year: "2012", nox: 20 },
  { year: "2013", nox: 22 },
  { year: "2014", nox: 21 },
  { year: "2015", nox: 23 },
  { year: "2016", nox: 25 },
  { year: "2017", nox: 26 },
  { year: "2018", nox: 27 },
  { year: "2019", nox: 28 },
  { year: "2020", nox: 29 },
  { year: "2021", nox: 30 },
  { year: "2022", nox: 31 },
  { year: "2023", nox: 32 },
  { year: "2024", nox: 34 },
];

// Configuring the chart for NOₓ emissions
const chartConfig = {
  nox: {
    label: "NOₓ Emissions (in Gigatonnes)",
    color: "hsl(var(--chart-7))", // Using the dark green color variable
  },
} satisfies ChartConfig;

function Nox() {
  return (
    <div className="dark"> {/* Adding the dark class */}
      <Card>
        <CardHeader>
          <CardTitle>NOₓ Emissions Over the Years</CardTitle>
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
                dataKey="nox"
                type="natural"
                stroke="hsl(var(--chart-7))" // Using the dark green color variable
                strokeWidth={2}
                dot={{
                  fill: "hsl(var(--chart-7))",
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
            NOₓ Emissions have increased by 4% in the last year{" "}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing NOₓ emissions in gigatonnes from 2012 to 2024
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Nox;
