
import { SidebarInset } from '@/components/ui/sidebar';
import Link from 'next/link';
import { ReactNode } from 'react';
import { NavUser } from './nav-user';
import { Package } from 'lucide-react';

interface AppNavbarProps {
  children: ReactNode;
}

export async function AppNavbar({ children}: AppNavbarProps) {

  return (
    <>
      <SidebarInset className="flex flex-col">
        <header className="relative flex h-14 items-center gap-2 border-b shadow-sm px-6">
          <div className="flex items-center w-full justify-between">
            <Link href="/tickets">
              <div className="flex items-center ml-20 mt-4 mb-3 space-x-3">
                <div className="px-3 py-1.5 rounded-md shadow-md flex items-center space-x-2" style={{ backgroundColor: '#2e3559' }}>
                  <Package className="w-5 h-5 text-black" />
                  <span className="text-black text-base font-bold">Ecommers</span>
                </div>
                <span className="text-white text-lg font-semibold">Tienda Nube</span>
              </div>
             </Link>
            <div className="flex items-center gap-6">
              <NavUser />
            </div>
          </div>
        </header>
        {children}
      </SidebarInset>
    </>
  );
}
