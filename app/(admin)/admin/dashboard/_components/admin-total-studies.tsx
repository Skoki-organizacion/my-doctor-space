"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { CustomTooltipContent } from "@/components/ui/charts-extra";
import { AdminDoctorType } from "@/app/data/admin/admin-data-service";

const chartConfig = {
  actual: {
    label: "Actual",
    color: "var(--primary)",
  },
  desired: {
    label: "Desired",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;

interface CustomCursorProps {
  fill?: string;
  pointerEvents?: string;
  height?: number;
  points?: Array<{ x: number; y: number }>;
  className?: string;
}

function CustomCursor(props: CustomCursorProps) {
  const { fill, pointerEvents, height, points, className } = props;

  if (!points || points.length === 0) {
    return null;
  }

  const { x, y } = points[0]!;
  return (
    <>
      <Rectangle
        x={x - 12}
        y={y}
        fill={fill}
        pointerEvents={pointerEvents}
        width={24}
        height={height}
        className={className}
        type="linear"
      />
      <Rectangle
        x={x - 1}
        y={y}
        fill={fill}
        pointerEvents={pointerEvents}
        width={1}
        height={height}
        className="recharts-tooltip-inner-cursor"
        type="linear"
      />
    </>
  );
}

export function TotalStudies({
  completed,
  title,
  doctors,
}: {
  completed: boolean;
  title: string;
  doctors: AdminDoctorType[];
}) {
  function transformToChartData1() {
    const currentYear = new Date().getFullYear();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const chartData = months.map((month) => ({
      month: `${month} ${currentYear}`,
      actual: 0,
      desired: 0,
    }));

    doctors.forEach((userData) => {
      userData.doctor.forEach((doctor) => {
        doctor.items.forEach((item) => {
          const itemDate = new Date(item.date);

          if (itemDate.getFullYear() === currentYear) {
            const monthIndex = itemDate.getMonth();
            const today = new Date();

            if (itemDate <= today) {
              chartData[monthIndex].actual++;
            } else {
              chartData[monthIndex].desired++;
            }
          }
        });
      });
    });

    return chartData;
  }

  function transformToChartData2() {
    const currentYear = new Date().getFullYear();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const chartData = months.map((month) => ({
      month: `${month} ${currentYear}`,
      actual: 0,
      desired: 0,
    }));

    doctors.forEach((doc) => {
      doc.doctor.forEach((doctor) => {
        if (doctor.items.length === 21) {
          doctor.items.forEach((item) => {
            const itemDate = new Date(item.date);

            if (itemDate.getFullYear() === currentYear) {
              const monthIndex = itemDate.getMonth();
              const today = new Date();

              if (itemDate <= today) {
                chartData[monthIndex].actual++;
              } else {
                chartData[monthIndex].desired++;
              }
            }
          });
        }
      });
    });

    return chartData;
  }

  return (
    <Card className="gap-4 border-none bg-gradient-to-br from-sidebar/60 to-sidebar">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <CardTitle>{title}</CardTitle>
            <div className="flex items-start gap-2"></div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                aria-hidden="true"
                className="size-1.5 shrink-0 rounded-xs bg-primary border-none"
              ></div>
              <div className="text-[13px]/3 text-muted-foreground/50">
                Actual
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                aria-hidden="true"
                className="size-1.5 shrink-0 rounded-xs bg-destructive border-none"
              ></div>
              <div className="text-[13px]/3 text-muted-foreground/50">
                Desired
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-60 w-full [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-(--chart-1)/15 [&_.recharts-rectangle.recharts-tooltip-inner-cursor]:fill-white/20"
        >
          <LineChart
            accessibilityLayer
            data={completed ? transformToChartData2() : transformToChartData1()}
            margin={{ left: -12, right: 12, top: 12 }}
          >
            <defs>
              <linearGradient id={`{id}-gradient`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--chart-2)" />
                <stop offset="100%" stopColor="var(--chart-1)" />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="2 2"
              stroke="var(--border)"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={12}
              tickFormatter={(value) => value.slice(0, 3)}
              stroke="var(--border)"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => {
                if (value === 0) return "0";
                return `${value}`;
              }}
              interval="preserveStartEnd"
            />
            <Line
              type="linear"
              dataKey="desired"
              stroke="var(--color-desired)"
              strokeWidth={2}
              dot={false}
              activeDot={false}
            />
            <ChartTooltip
              content={
                <CustomTooltipContent
                  colorMap={{
                    actual: "var(--primary)",
                    desired: "var(--destructive)",
                  }}
                  labelMap={{
                    actual: "Actual",
                    desired: "Desired",
                  }}
                  dataKeys={["actual", "desired"]}
                  valueFormatter={(value) => `${value.toLocaleString()}`}
                />
              }
              cursor={<CustomCursor fill="var(--primary)" />}
            />
            <Line
              type="linear"
              dataKey="actual"
              stroke={`url(#{id}-gradient)`}
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 5,
                fill: "var(--chart-1)",
                stroke: "var(--background)",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
