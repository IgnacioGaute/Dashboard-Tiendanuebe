'use client';

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { Product } from '@/types/product.type';
import { OrderProduct } from '@/types/order.type';
import { ProductChartPopover } from './chart-hover-dialog';

export const productColumns = (
  orderProducts: OrderProduct[],
): ColumnDef<Product>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre del producto" />
    ),
    cell: ({ row }) => (
      <ProductChartPopover
        productName={row.getValue('name')}
        orderProducts={orderProducts}
      >
        <div className="min-w-[100px] text-sm">{row.getValue('name')}</div>
      </ProductChartPopover>
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Precio del producto" />
    ),
    cell: ({ row }) => (
      <div className="min-w-[100px] text-sm">{row.getValue('price')}</div>
    ),
  },
];
