"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
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
import { GetStudyType } from "@/app/data/admin/get-study";
import { dateFormat } from "@/utis/date-format";

type iAppProps = {
  items: SelectedItemsForStudyProps;
};

type SelectedItemsForStudyProps = Pick<GetStudyType, "items">["items"];

const chartConfig = {
  total: {
    label: "Total",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function StudyChart({ items }: iAppProps) {
  const monthCounts =
    items.length > 0
      ? items.reduce(
          (
            acc: Record<string, number>,
            item: SelectedItemsForStudyProps[0]
          ) => {
            const date = new Date(item.date);
            const month = date.toLocaleDateString("en-US", { month: "short" });

            acc[month] = (acc[month] || 0) + 1;

            return acc;
          },
          {}
        )
      : undefined;

  const chartData = monthCounts
    ? Object.keys(monthCounts).map((month) => ({
        month: month,
        total: monthCounts[month],
      }))
    : undefined;

  return (
    <Card className="border-none">
      <CardHeader className="items-center">
        <CardTitle>Study Progress</CardTitle>
        <CardDescription>
          A breakdown of completed study answers over the months
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="total"
              fill="var(--color-total)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  );
}
