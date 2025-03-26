import type { Metadata } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/otherui/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Buzzly",
  description: "Buzzly is a vibrant social media platform where you can share your moments, follow inspiring creators, like, comment, and connect with a community that shares your interests.",
};

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <body className="antialiased ">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
           <div className="min-h-screen ">
  <Navbar />
  <main className="py-8">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar for large screens */}
        <div className="hidden lg:block lg:col-span-3">
          Sidebar
        </div>

        {/* Main content area */}
        <div className="lg:col-span-9">
          {children}
        </div>
      </div>
    </div>
  </main>
</div>

          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
