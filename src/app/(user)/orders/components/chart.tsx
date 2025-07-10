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
import { Order } from '@/types/order.type';
import { motion } from 'framer-motion';

type Props = {
  orders: Order[];
};

export function OrdersChart({ orders }: Props) {
  const quantity = orders.length;

  const chartData = [
    {
      quantity,
      fill: '#2e3559',
    },
  ];

  return (
    <motion.div
      key={quantity} // fuerza reanimación cuando cambia
      initial={{ opacity: 0.8, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Card className="w-[300px]">
        <CardHeader className="items-center pb-0">
          <CardTitle>Cantidad de órdenes</CardTitle>
          <CardDescription>Total acumulado</CardDescription>
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
                          Órdenes
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </CardContent>
        <CardFooter className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Últimas órdenes</span>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardFooter>
      </Card>
    </motion.div>
  );
}
