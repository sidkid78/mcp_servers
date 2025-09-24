import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HOMEase | AI Platform",
  description: "Interactive platform powered by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="border-b bg-white dark:bg-gray-900 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                    HOMEase | AI Platform
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Home
                  </Link>
                  <Link href="/learning" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Learning Platform
                  </Link>
                  <Link href="/business-intelligence" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Business Intelligence
                  </Link>
                  <Link href="/federal-assistance" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Federal Assistance
                  </Link>
                  <Link href="/infrastructure-automation" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Infrastructure Automation
                  </Link>
                  <Link href="/smart-dev-env" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Smart Dev Environment
                  </Link>
                  <Link href="/project-management" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Project Management
                  </Link>
                  <Link href="/mcp" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    MCP Services
                  </Link>
                  <Link href="/mcp-test" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    MCP Test
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
