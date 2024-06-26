import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <link rel="icon" href="/icons/favicon.ico" type="image/x-icon" sizes="16x16"/>
      <meta name="application-name" content="Expense Tracker" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Expense Tracker" />
      <meta name="description" content="Tracker and Manager Expenses" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#262626" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#FFFFFF" />

      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/icons/favicon.ico" />

      <meta name="twitter:card" content="Tracker and Manager Expenses and Plan wisely" />
      <meta name="twitter:title" content="Expense Tracker" />
      <meta name="twitter:description" content="Tracker and Manager Expenses" />
      <meta name="twitter:image" content="https://expensetracker-roan.vercel.app/icons/android-launchericon-192-192.png" />
      <meta name="twitter:creator" content="@themrinmoyreal" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Expense Tracker" />
      <meta property="og:description" content="Tracker and Manager Expenses" />
      <meta property="og:site_name" content="Expense Tracker" />
      <meta property="og:url" content="https://expensetracker-roan.vercel.app" />
      <meta property="og:image" content="https://expensetracker-roan.vercel.app/icons/android-launchericon-72-72.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
