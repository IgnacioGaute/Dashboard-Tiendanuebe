'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { OrdersTable } from './orders-table';
import { orderColumns } from './order-columns';
import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OrdersChart } from './chart';

export function OrdersRealtime() {
  const rawOrders = useQuery(api.functions.order.getAllOrders.default, {});
  const rawOrderProducts = useQuery(api.functions.order.getAllOrderProducts.default, {});

  const orders = useMemo(() => rawOrders ?? [], [rawOrders]);
  const orderProducts = useMemo(() => rawOrderProducts ?? [], [rawOrderProducts]);

  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string | null>(null);

  const uniqueProductNames = useMemo(() => {
    const names = new Set(orderProducts.map((p) => p.name));
    return Array.from(names);
  }, [orderProducts]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesProduct = selectedProduct
        ? orderProducts.some(
            (p) =>
              p.orderExternalId === order.externalId &&
              p.name === selectedProduct
          )
        : true;

      const matchesDate = selectedDate
        ? format(new Date(order.createdAt), 'yyyy-MM-dd') ===
          format(selectedDate, 'yyyy-MM-dd')
        : true;

      const matchesPaymentStatus = selectedPaymentStatus
        ? order.payment_status === selectedPaymentStatus
        : true;

      return matchesProduct && matchesDate && matchesPaymentStatus;
    });
  }, [orders, orderProducts, selectedProduct, selectedDate, selectedPaymentStatus]);

  const columns = useMemo(() => orderColumns(orderProducts), [orderProducts]);

  const resetFilters = () => {
    setSelectedProduct(null);
    setSelectedDate(undefined);
    setSelectedPaymentStatus(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 flex-wrap">
        <div className="space-y-2">
          <Label>Filtrar por producto</Label>
          <Select onValueChange={(value) => setSelectedProduct(value === 'all' ? null : value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Seleccionar producto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los productos</SelectItem>
              {uniqueProductNames.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Filtrar por fecha</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[200px] justify-start text-left font-normal"
              >
                {selectedDate ? (
                  format(selectedDate, 'PPP')
                ) : (
                  <span>Seleccionar fecha</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Filtrar por estado de pago</Label>
          <Select onValueChange={(value) => setSelectedPaymentStatus(value === 'all' ? null : value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="paid">Pagado</SelectItem>
              <SelectItem value="pending">Pendiente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 items-end">
          <Label className="invisible">.</Label>
          <Button variant="outline" onClick={resetFilters} className="w-[200px]">
            Restablecer filtros
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="flex-1 min-w-0">
          <OrdersTable columns={columns} data={filteredOrders} />
        </div>
        <div className="w-full lg:w-[320px]">
          <OrdersChart orders={orders} />
        </div>
      </div>
    </div>
  );
}
