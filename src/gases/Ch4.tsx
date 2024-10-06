
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

// CH₄ usage data from 2012 to 2024
const chartData = [
  { year: "2012", ch4: 25 },
  { year: "2013", ch4: 26 },
  { year: "2014", ch4: 27 },
  { year: "2015", ch4: 29 },
  { year: "2016", ch4: 30 },
  { year: "2017", ch4: 31 },
  { year: "2018", ch4: 33 },
  { year: "2019", ch4: 34 },
  { year: "2020", ch4: 36 },
  { year: "2021", ch4: 38 },
  { year: "2022", ch4: 39 },
  { year: "2023", ch4: 41 },
  { year: "2024", ch4: 43 },
];

// Configuring the chart for CH₄ emissions
const chartConfig = {
  ch4: {
    label: "CH₄ Emissions (in Gigatonnes)",
    color: "hsl(var(--chart-9))", // Change this to a suitable color for CH₄
  },
} satisfies ChartConfig;

function Ch4() {
  return (
    <div className="dark"> {/* Adding the dark class */}
      <Card>
        <CardHeader>
          <CardTitle>CH₄ Emissions Over the Years</CardTitle>
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
                dataKey="ch4"
                type="natural"
                stroke="hsl(var(--chart-9))" // Color for CH₄ line
                strokeWidth={2}
                dot={{
                  fill: "hsl(var(--chart-9))", // Color for CH₄ dot
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
            CH₄ Emissions have increased by 5.1% in the last year{" "}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing CH₄ emissions in gigatonnes from 2012 to 2024
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Ch4;
