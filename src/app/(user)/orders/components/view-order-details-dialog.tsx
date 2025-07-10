'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Order, OrderProduct } from '@/types/order.type';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {
  order: Order;
  orderProducts: OrderProduct[];
};

export function ViewOrderDialog({ order, orderProducts }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start text-left text-sm">
          Ver detalles
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Orden de {order.customerName}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 text-sm mt-2">
          <div>
            <p><span className="font-medium">Total:</span> ${order.total}</p>
            <p><span className="font-medium">Estado:</span> {order.status}</p>
          </div>
          <div>
            <p><span className="font-medium">Pago:</span> {order.payment_status}</p>
            <p><span className="font-medium">Fecha:</span> {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <h3 className="font-medium text-base">Productos</h3>
          <ScrollArea className="max-h-[250px] rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Precio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderProducts.map((product) => (
                  <TableRow key={product.productId}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>${product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
