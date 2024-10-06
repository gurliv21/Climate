
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

// CO₂ usage data from 2012 to 2024
const chartData = [
  { year: "2012", co2: 35 },
  { year: "2013", co2: 36 },
  { year: "2014", co2: 34 },
  { year: "2015", co2: 37 },
  { year: "2016", co2: 38 },
  { year: "2017", co2: 39 },
  { year: "2018", co2: 40 },
  { year: "2019", co2: 41 },
  { year: "2020", co2: 42 },
  { year: "2021", co2: 43 },
  { year: "2022", co2: 45 },
  { year: "2023", co2: 47 },
  { year: "2024", co2: 49 },
];

// Configuring the chart for CO₂ emissions
const chartConfig = {
  co2: {
    label: "CO₂ Emissions (in Gigatonnes)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;


function Co() {
  return (
    <div>
        <div className="dark"> {/* Adding the dark class */}
      <Card>
        <CardHeader>
          <CardTitle>CO₂ Emissions Over the Years</CardTitle>
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
                dataKey="co2"
                type="natural"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={{
                  fill: "hsl(var(--chart-1))",
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
            CO₂ Emissions have increased by 4.2% in the last year{" "}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing CO₂ emissions in gigatonnes from 2012 to 2024
          </div>
        </CardFooter>
      </Card>
    </div>
      
    </div>
  )
}

export default Co
