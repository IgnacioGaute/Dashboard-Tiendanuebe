'use client';

import { TrendingUp } from 'lucide-react';
import {
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  Label as RechartLabel,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { OrderProduct } from '@/types/order.type';

type Props = {
  productName: string;
  orderProducts: OrderProduct[];
  children: React.ReactNode;
};

export function ProductChartPopover({ productName, orderProducts, children }: Props) {
  const quantity = orderProducts
    .filter((p) => p.name === productName)
    .reduce((acc, curr) => acc + curr.quantity, 0);

  const chartData = [
    {
      name: productName,
      quantity,
      fill: '#2e3559' ,
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="hover:underline cursor-pointer">{children}</span>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <Card className="w-[300px]">
          <CardHeader className="items-center pb-0">
            <CardTitle>{productName}</CardTitle>
            <CardDescription>Cantidad vendida</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <RadialBarChart
              data={chartData}
              startAngle={90}
              endAngle={450}
              innerRadius={70}
              outerRadius={110}
              width={250}
              height={250}
            >
              <PolarGrid radialLines={false} />
              <RadialBar dataKey="quantity" background cornerRadius={10} />
              <PolarRadiusAxis tick={false} axisLine={false}>
                <RechartLabel
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
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
                            className="fill-foreground text-4xl font-bold"
                          >
                            {quantity}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            unidades
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </CardContent>
          <CardFooter className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total acumulado</span>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
