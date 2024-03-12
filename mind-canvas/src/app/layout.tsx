import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import db from '@/lib/supabase/db'
import './globals.css';
import { twMerge } from 'tailwind-merge';
import { ThemeProvider } from '@/lib/providers/next-theme-provider';
import { DM_Sans } from "next/font/google";

const inter = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mind Canvas',
  description: 'The collaborative canvas for brilliant minds. ✨',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log(db);
  return (
    <html lang="en">
      <body className={twMerge('bg-background', inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
