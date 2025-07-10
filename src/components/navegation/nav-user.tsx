"use client";
import { useState } from 'react';
import {
  ChevronsUpDown,
  List,
  Package,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';

export function NavUser() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="flex items-center justify-center w-8 h-8 bg-blue-800 hover:bg-blue-500 rounded-md shadow-md transition-colors duration-200 text-black"
                style={{ backgroundColor: '#2e3559' }}
              >
                <ChevronsUpDown className="w-10 h-10" />
              </SidebarMenuButton>

            </DropdownMenuTrigger>

            <DropdownMenuContent
              className={`w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg transition-all duration-300 ${
                isExpanded ? 'h-auto' : 'h-full'
              }`}
              side="bottom"
              align="center"
              sideOffset={8}
            >

              <Link href={'/orders'}>
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                    <List />
                    Ordenes de compras
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </Link>

              <DropdownMenuSeparator />

              <Link href={'/products'}>
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                    <Package   />
                    Productos
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </Link>


            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
