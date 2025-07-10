import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Metadata } from 'next';
import { ClientConvexProvider } from '@/components/ui/client-convex-provider';


export const metadata: Metadata = {
  title: 'Ecommerce Tienda Nube',
  description: 'Ventas en tiempo real',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-[100dvh] bg-background text-foreground antialiased mx-auto font-sans'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <ClientConvexProvider>
            {children}
          </ClientConvexProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
