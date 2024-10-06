
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

// N₂O usage data from 2012 to 2024
const chartData = [
  { year: "2012", n2o: 5 },
  { year: "2013", n2o: 6 },
  { year: "2014", n2o: 5.5 },
  { year: "2015", n2o: 6.2 },
  { year: "2016", n2o: 6.8 },
  { year: "2017", n2o: 7 },
  { year: "2018", n2o: 7.5 },
  { year: "2019", n2o: 8 },
  { year: "2020", n2o: 8.5 },
  { year: "2021", n2o: 9 },
  { year: "2022", n2o: 9.5 },
  { year: "2023", n2o: 10 },
  { year: "2024", n2o: 10.5 },
];

// Configuring the chart for N₂O emissions
const chartConfig = {
  n2o: {
    label: "N₂O Emissions (in Gigatonnes)",
    color: "hsl(var(--chart-6))", // Using the yellow color variable
  },
} satisfies ChartConfig;

function Ni() {
  return (
    <div className="dark"> {/* Adding the dark class */}
      <Card>
        <CardHeader>
          <CardTitle>N₂O Emissions Over the Years</CardTitle>
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
                dataKey="n2o"
                type="natural"
                stroke="hsl(var(--chart-6))" // Using the yellow color variable
                strokeWidth={2}
                dot={{
                  fill: "hsl(var(--chart-6))",
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
            N₂O Emissions have increased by 5% in the last year{" "}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing N₂O emissions in gigatonnes from 2012 to 2024
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Ni;
